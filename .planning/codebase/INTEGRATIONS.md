# External Integrations

## API Services

### OpenAI (LLM)
**Endpoint:** `/api/chat.ts` (Server-side only, prerender=false)
**Authentication:** API key via `OPENAI_API_KEY` environment variable
**Usage:**
- AI chat guide for Songkran festival
- Rate limiting: 10 requests/minute per IP, 50 requests/day per IP
- In-memory IP tracking with hourly cleanup
- CORS origin whitelist: `bkksongkran.com` domains only
- Error handling: Returns 429 (rate limit), 403 (CORS), 500 (API errors)

**Client Connection:**
- Allowed origins: `https://bkksongkran.com`, `https://www.bkksongkran.com`
- Server-side system prompt sanitized (never client-side)
- Moderation applied via `src/lib/moderation.ts`

### Supabase (Database & Auth)
**Type:** PostgreSQL database + real-time subscriptions
**Project URL:** `https://wipegwhwfbykbjznfpry.supabase.co`
**Client Library:** `@supabase/supabase-js` v2.100.1
**Authentication:** Public anon key (safe to expose)

**Tables:**
- `meetup_entries` — Community "who's going" feature
  - Columns: id, name, party, day, note, event_name, is_custom, created_at
  - RLS: Public read + public insert (with name length validation)
  - Used on `/meetup.astro` page

**Usage Locations:**
- `src/lib/supabase.ts` — Client initialization
- `src/pages/meetup.astro` — Read/write meetup entries

### Google Tag Manager & Analytics
**GTM ID:** GTM-W2PGW75M
**GA4 Measurement ID:** G-C9YT0H7GJP
**Placement:** BaseLayout head (global)
**Purpose:** Event tracking, user journey analysis
**CSP Allowance:** googletagmanager.com, google-analytics.com

### Mapbox
**Service:** Map visualization API
**Token:** `PUBLIC_MAPBOX_TOKEN` (public)
**Usage Pages:**
- `/map.astro` — Heat map (coming soon)
- `/heat-map.astro` — Alternative heat map page
**Resources:**
- API endpoints: `api.mapbox.com`, `events.mapbox.com`
- CSP Allowance: Both domains whitelisted

### Resend (Email Service)
**API Key:** `RESEND_API_KEY` environment variable
**Client Library:** `resend` v6.9.4
**Usage Endpoint:** `/api/contact.ts` (email submissions likely)
**Purpose:** Transactional emails from contact forms

### Firebase
**Client Library:** `firebase` v10.9.0
**Purpose:** Not clearly identified from codebase
**Note:** Present in dependencies but usage not immediately evident in core files

### CookieYes (Consent Management)
**CDN Domain:** `cdn-cookieyes.com`
**Purpose:** GDPR/cookie consent banner
**CSP Allowance:** Script, style, font, connect, frame origins whitelisted
**Not implemented by author:** Third-party provider mentioned in CLAUDE.md

## Security & Moderation

**Content Moderation** (`src/lib/moderation.ts`):
- Bad words filtering (22+ terms, case-insensitive)
- Fraud pattern detection (crypto, gift cards, wire transfers, scams)
- Phishing link detection
- Server-side validation (client-side is UX-only)
- Used on ticket submissions and meetup entries

**Rate Limiting:**
- OpenAI chat: 10 req/min, 50 req/day per IP
- In-memory IP tracking
- Auto-cleanup hourly

## Deployment & Hosting

**Platform:** Vercel (primary)
**Backup Adapter:** Netlify
**Build Trigger:** Git push to `main` branch (auto-deploy)
**Environment Management:**
- Secrets stored in Vercel environment
- OPENAI_API_KEY protected (server-only)
- Public tokens exposed safely (Supabase anon, Mapbox public)

## Data Flow

```
Client (Browser)
    ↓
Astro Routes
    ├→ Static pages (SSG)
    ├→ Dynamic routes (SSR)
    └→ API endpoints
        ├→ /api/chat.ts → OpenAI
        ├→ /api/meetup.ts → Supabase
        ├→ /api/contact.ts → Resend
        ├→ /api/tickets.ts → (TBD)
        └→ /api/unlock-meetup.ts → Supabase
    ├→ Tracking pixels → GTM/GA4
    └→ Maps API → Mapbox
```

## CSP (Content Security Policy) Summary

**Restrictive defaults:**
- `default-src: 'self'` — Only self-hosted resources by default
- `object-src: 'none'` — No plugins/objects
- `base-uri: 'self'` — Restrict base URL

**Allowlisted external domains:**
- Google: googletagmanager.com, google-analytics.com
- Mapbox: api.mapbox.com, events.mapbox.com
- Supabase: *.supabase.co
- OpenAI: api.openai.com
- Cloudflare: challenges.cloudflare.com (CAPTCHA)
- CookieYes: cdn-cookieyes.com
- Fonts: fonts.googleapis.com, fonts.gstatic.com

## Environment Variable Summary

| Variable | Public? | Purpose |
|----------|---------|---------|
| `OPENAI_API_KEY` | No | Server-side OpenAI API |
| `PUBLIC_SUPABASE_URL` | Yes | Database URL |
| `PUBLIC_SUPABASE_ANON_KEY` | Yes | Public Supabase auth |
| `PUBLIC_MAPBOX_TOKEN` | Yes | Map API token |
| `RESEND_API_KEY` | No | Email service (server) |
