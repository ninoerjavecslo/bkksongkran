# System Architecture

## High-Level Architecture

```
┌─────────────────────────────────────────────────────┐
│              Client (Browser)                        │
├─────────────────────────────────────────────────────┤
│                                                      │
│  Astro SSR/SSG Routes  ←→  API Endpoints           │
│  (HTML + CSS + JS)          (/api/*)               │
│                                                      │
│  • Static pages             • /api/chat.ts          │
│  • Dynamic routes           • /api/meetup.ts        │
│  • i18n variants (zh)       • /api/contact.ts       │
│                             • /api/tickets.ts       │
│                             • /api/reveal.ts        │
└────────┬────────────────────┬──────────────────────┘
         │                    │
         ▼                    ▼
    ┌────────────┐    ┌──────────────────┐
    │  External  │    │   Server-Side    │
    │   APIs     │    │   Services       │
    │            │    │                  │
    │ • OpenAI   │    │ • Rate limiting  │
    │ • Supabase │    │ • Moderation     │
    │ • Mapbox   │    │ • Validation     │
    │ • Resend   │    └──────────────────┘
    │ • GTM/GA4  │
    └────────────┘
```

## Data Flow Architecture

### Content Data Flow
1. **Static Data** (`src/data/*.ts`)
   - Pre-compiled at build time
   - Used by page templates
   - No runtime fetch needed
   - Examples: festivals, zones, checklist, articles

2. **Dynamic Page Generation**
   - Blog: `src/pages/blog/[slug].astro` → reads `articles.ts`
   - i18n: English + Chinese variants with shared data structures

3. **Real-time Data** (Supabase)
   - Meetup entries table
   - Community responses
   - Fetched client-side via Supabase JS client
   - Public read, gated write

### Request Handling Flow
```
Client Request
    │
    ├─ Static Page (SSG)
    │   └─ Served from CDN cache
    │
    ├─ Dynamic Page (SSR)
    │   ├─ Run Astro component
    │   ├─ Inject data from src/data/
    │   └─ Return HTML
    │
    └─ API Route (Node.js on Vercel)
        ├─ Rate limit check
        ├─ CORS validation
        ├─ Run business logic
        ├─ Call external API if needed
        └─ Return JSON response
```

## Component Architecture

**Atomic Design Pattern** (Atoms → Molecules → Organisms → Pages)

### Layer 1: Atoms (`src/components/atoms/`)
Smallest reusable units:
- `Icon.astro` — Material Symbols wrapper
- `Button.astro` — CTA button component
- `Badge.astro` — Label badge
- `Tag.astro` — Metadata tag
- `Breadcrumb.astro` — Navigation breadcrumb
- `CrowdMeter.astro` — Crowd level indicator

### Layer 2: Molecules (`src/components/molecules/`)
Combinations of atoms:
- `EventCard.astro` — Festival/event card (icon + badge + button)
- `ScheduleRow.astro` — Artist in timetable
- `ChecklistItem.astro` — Checklist item (checkbox + label)
- `WetnessWatch.astro` — Water fight hazard indicator
- `AdBanner.astro` — Advertisement banner

### Layer 3: Organisms (`src/components/organisms/`)
Complex, feature-rich components:
- `Navbar.astro` — Site navigation + Ask AI button
- `FestivalSchedule.astro` — Full event timetable with artist details
- `SurvivalChecklist.astro` — Interactive packing checklist (localStorage)
- `HeatMap.astro` — Crowd density visualization (Mapbox)

### Layer 4: Layout (`src/components/layout/`)
Page-level shells:
- `BaseLayout.astro` — Global wrapper (head meta, nav, footer, GTM)

### Layer 5: Pages (`src/pages/`)
Route handlers (Astro components or API functions)

## State Management

**No external state library** — Uses built-in patterns:

1. **Build-time State** (Data exports)
   - `src/data/index.ts` — All static content
   - Imported by pages and components
   - Compiled into final HTML

2. **Browser LocalStorage**
   - Survival checklist progress
   - User preferences (may be added)
   - Managed by client-side JS

3. **Server Session State**
   - OpenAI chat rate limiting (in-memory IP map)
   - Per-request context (not persistent)

4. **External State**
   - Supabase for meetup entries (cloud database)
   - Google Analytics events

## Routing & Page Generation

### Static Pages (SSG)
Pre-built at deploy time:
- `/` — Homepage
- `/events` — All events listing
- `/survival-kit` — Packing checklist
- `/privacy`, `/terms`, `/disclaimer` — Legal pages
- `/gay-guide` — LGBTQ+ resource guide
- `/blog` — Blog index and articles
- `/zh/*` — Chinese language variants

**Benefit:** Fast CDN delivery, no server compute

### Dynamic Pages (SSR)
Rendered per-request:
- `/api/*` — All API routes (prerender=false)
- Enables real-time logic, external API calls

### Dynamic Routes
- `/blog/[slug].astro` — Slug-based article template
  - Reads `articles.ts` at build time
  - Maps slug → article content
  - Supports i18n variants

## Entry Points

### Web Entry Points
1. `src/pages/index.astro` — Main homepage (imports data, renders featured content)
2. `src/pages/blog/[slug].astro` — Blog article template
3. `src/pages/api/chat.ts` — LLM chat API
4. API routes for form submissions (contact, meetup, etc.)

### Data Entry Points
1. `src/data/index.ts` — Master data file (festivals, zones, checklist, nav)
2. `src/data/articles.ts` — Blog articles
3. `src/data/articles.zh.ts` — Chinese blog articles
4. `src/data/bkkGuide.ts` — Supplementary guide content
5. `src/data/zh.ts` — Chinese localization strings

## Error Handling

**Client-Side:**
- `src/pages/404.astro` — Custom 404 page

**Server-Side (API Routes):**
- Rate limit errors → 429 response
- CORS errors → 403 response
- API failures → 500 response with message
- Validation errors → 400 response

**Content Moderation** (`src/lib/moderation.ts`):
- Bad words detection
- Fraud pattern detection
- Applied to user submissions (meetup, tickets, contact)

## Performance Optimizations

1. **Hybrid Output**
   - Static pages cached at CDN edge
   - API routes auto-scale via Vercel Functions
   - No cold starts for frequently accessed routes

2. **Asset Caching** (netlify.toml)
   - Images/fonts: 1-year immutable cache
   - Astro build assets (JS/CSS): Immutable, fingerprinted
   - HTML: 1-hour CDN cache + stale-while-revalidate

3. **Data Co-location**
   - All event data in `src/data/index.ts`
   - No runtime data fetches (except Supabase, Mapbox APIs)
   - Static content included in HTML

## Security Boundaries

**Client ↔ Server:**
- OpenAI key never exposed (server-side only)
- Resend key never exposed (server-side only)
- Supabase anon key intentionally public (limited permissions)

**User Input:**
- Server-side moderation required
- Client-side validation is UX-only

**CORS:**
- OpenAI API calls: Origin whitelist
- Supabase: Public anon key (no custom CORS)

**CSP:**
- Restrictive default (`default-src 'self'`)
- Specific allowlists for GTM, Analytics, Mapbox, etc.

## External Abstractions

None explicitly used. Components directly:
- Import data from `src/data/`
- Call APIs via `fetch()` in client-side scripts
- No helper utility layers (kept minimal)
