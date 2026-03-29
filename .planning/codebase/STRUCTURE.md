# Directory & File Structure

## Root Structure
```
.
├── .astro/                    # Astro cache directory (auto-generated)
├── .claude/                   # Claude Code workspace config
├── .git/                      # Git repository
├── .gitignore                 # Git ignore rules
├── .netlify/                  # Netlify build cache
├── .playwright-mcp/           # Playwright MCP server (browser automation)
├── .planning/                 # GSD planning directory (project roadmaps, docs)
├── dist/                      # Build output (generated on npm run build)
├── docs/                      # Project documentation
├── data/                      # Data exports (should be src/data/)
├── node_modules/              # Dependencies (npm)
├── public/                    # Static assets (served at root)
├── src/                       # Source code (TypeScript, Astro, styles)
├── .env                       # Environment variables (should be .env.local, not committed)
├── .env.example               # Example env (for documentation)
├── CLAUDE.md                  # Codebase instructions & conventions
├── README.md                  # Project readme
├── astro.config.mjs           # Astro configuration
├── netlify.toml               # Netlify deployment config
├── package.json               # Dependencies & scripts
├── package-lock.json          # Dependency lock file
├── tailwind.config.mjs        # Tailwind CSS configuration
└── tsconfig.json              # TypeScript configuration (implicit)
```

## Source Directory (`src/`)
```
src/
├── assets/                    # Images, fonts, media (referenced by components)
├── components/                # Astro components (atomic design)
│   ├── atoms/                 # Base components (Icon, Button, Tag, etc.)
│   │   ├── Icon.astro
│   │   ├── Button.astro
│   │   ├── Badge.astro
│   │   ├── Tag.astro
│   │   ├── Breadcrumb.astro
│   │   └── CrowdMeter.astro
│   ├── molecules/             # Composite components (EventCard, ScheduleRow, etc.)
│   │   ├── EventCard.astro
│   │   ├── AdBanner.astro
│   │   ├── ScheduleRow.astro
│   │   ├── WetnessWatch.astro
│   │   └── ChecklistItem.astro
│   ├── organisms/             # Complex feature components
│   │   ├── Navbar.astro       # Site navigation
│   │   ├── FestivalSchedule.astro  # Timetables
│   │   ├── HeatMap.astro      # Mapbox visualization
│   │   └── SurvivalChecklist.astro # Interactive checklist
│   └── layout/                # Page shells
│       └── BaseLayout.astro   # Global wrapper (head, nav, footer)
├── data/                      # Data exports (build-time)
│   ├── index.ts               # Master data: festivals, zones, checklist, nav, etc.
│   ├── articles.ts            # English blog articles (56KB)
│   ├── articles.zh.ts         # Chinese blog articles (57KB)
│   ├── bkkGuide.ts            # Extended guide content
│   └── zh.ts                  # Chinese localization strings
├── lib/                       # Utility functions & services
│   ├── supabase.ts            # Supabase client initialization
│   └── moderation.ts          # Content moderation (badwords, fraud detection)
├── pages/                     # Routes (Astro pages & API endpoints)
│   ├── index.astro            # Homepage /
│   ├── 404.astro              # Custom 404 page
│   ├── events.astro           # All events listing
│   ├── ai.astro               # AI chat guide
│   ├── map.astro              # Map view (coming soon)
│   ├── heat-map.astro         # Heat map view
│   ├── survival-kit.astro     # Packing checklist
│   ├── meetup.astro           # Community "who's going"
│   ├── contact.astro          # Contact page
│   ├── advertise.astro        # Advertising info
│   ├── gay-guide.astro        # LGBTQ+ guide
│   ├── getting-there.astro    # Directions (noindex)
│   ├── privacy.astro          # Privacy policy
│   ├── terms.astro            # Terms of service
│   ├── disclaimer.astro       # Disclaimer
│   ├── tickets.astro          # Ticket info
│   ├── delete-ticket.astro    # Ticket deletion utility
│   ├── robots.txt.ts          # Robots.txt generator
│   ├── blog/                  # Blog section
│   │   ├── index.astro        # Blog index page
│   │   └── [slug].astro       # Blog post template (dynamic)
│   ├── zh/                    # Chinese language variants
│   │   ├── index.astro
│   │   ├── events.astro
│   │   ├── ai.astro
│   │   ├── survival-kit.astro
│   │   ├── getting-there.astro
│   │   ├── gay-guide.astro
│   │   ├── advertise.astro
│   │   ├── heat-map.astro
│   │   ├── contact.astro
│   │   └── blog/
│   │       ├── index.astro
│   │       └── [slug].astro
│   └── api/                   # Server-side API endpoints
│       ├── chat.ts            # OpenAI chat endpoint
│       ├── contact.ts         # Email contact form
│       ├── meetup.ts          # Meetup entry management
│       ├── unlock-meetup.ts   # Meetup unlock logic
│       ├── reveal.ts          # Unknown (possibly ticket reveal)
│       └── tickets.ts         # Ticket management
├── styles/                    # Global CSS
│   └── global.css             # Base styles (imported by BaseLayout)
└── env.d.ts                   # TypeScript environment definitions

```

## Public Assets (`public/`)
```
public/
├── sitemap.xml                # Manual sitemap (update when adding pages)
├── robots.txt                 # Robots file (points to sitemap)
├── favicon.svg                # Site favicon
├── og-image.jpg               # Open Graph default image
└── [other images, fonts]      # Static media files
```

## Key File Purposes

| File | Lines | Purpose |
|------|-------|---------|
| `src/data/index.ts` | ~600 | Master data: festivals, zones, checklist, events, transport, nav |
| `src/data/articles.ts` | ~1400 | 12 English blog articles with metadata |
| `src/data/articles.zh.ts` | ~1400 | 12 Chinese blog articles |
| `src/components/layout/BaseLayout.astro` | ~100+ | Global page shell (meta, GTM, nav, footer) |
| `src/pages/index.astro` | ~150+ | Homepage (featured content, event cards) |
| `src/pages/blog/[slug].astro` | ~80+ | Blog post template |
| `src/pages/api/chat.ts` | ~200+ | OpenAI chat endpoint with rate limiting |
| `src/lib/moderation.ts` | ~100+ | Content moderation (badwords, fraud patterns) |
| `tailwind.config.mjs` | 149 | Design tokens (colors, fonts, animations) |
| `netlify.toml` | 81 | Security headers, caching, build config |
| `CLAUDE.md` | 90+ | Project conventions, tech stack, data structure |

## i18n Structure

**English (Default)**
- Routes: `/`, `/events`, `/blog/[slug]`, `/survival-kit`, etc.
- Data: `src/data/index.ts`, `src/data/articles.ts`

**Chinese**
- Routes: `/zh/`, `/zh/events`, `/zh/blog/[slug]`, `/zh/survival-kit`, etc.
- Data: `src/data/zh.ts`, `src/data/articles.zh.ts`

**Duplicate pages:**
- `src/pages/advertise.astro` + `src/pages/zh/advertise.astro`
- `src/pages/ai.astro` + `src/pages/zh/ai.astro`
- `src/pages/events.astro` + `src/pages/zh/events.astro`
- Etc. (full set for both languages)

**Implementation:**
- Each page uses BaseLayout with `lang` prop (`'en'` or `'zh'`)
- Alternate link tags for language variants

## Build Artifacts

After `npm run build`, output:
```
dist/                         # Production build (35 directories)
├── _astro/                   # Chunked JS/CSS (fingerprinted)
├── en/                       # English pages (HTML)
├── zh/                       # Chinese pages (HTML)
├── index.html
├── 404.html
└── [other compiled pages]
```

## Naming Conventions

**Files:**
- PascalCase for Astro components: `EventCard.astro`, `BaseLayout.astro`
- camelCase for data files: `articles.ts`, `bkkGuide.ts`
- camelCase for utilities: `moderation.ts`
- kebab-case for routes: `/heat-map.astro`, `/survival-kit.astro`

**Variables & Functions:**
- camelCase in TypeScript files
- PascalCase for React/JSX (not used here, but for future)

**CSS Classes:**
- Tailwind utilities (provided by framework)
- No custom class names in components (use Tailwind inline)

## Data File Structure

**Master data** (`src/data/index.ts`):
- `tokens` — Design tokens (colors, fonts)
- `nav` — Navigation links
- `festivals` — Major festivals with lineups
- `zones` — Water fight zones
- `additionalEvents` — Other events
- `waterFightZones` — Detailed water zones
- `checklist` — Packing items
- `roadClosures` — Traffic info
- `venueTransport` — How to reach venues

**Articles** (`src/data/articles.ts`):
- Array of objects with: id, slug, title, excerpt, date, author, image, content

**Localization** (`src/data/zh.ts`):
- Key-value pairs for Chinese translations
