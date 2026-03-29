# BKK Songkran — CLAUDE.md

## Project
Songkran 2026 Bangkok festival guide. Live at **bkksongkran.com**.
GitHub: `ninoerjavecslo/bkksongkran` → auto-deploys to Vercel on push to `main`.

## Stack
- **Astro 4** — hybrid output (static + SSR)
- **Tailwind CSS** — utility classes, no component library
- **Netlify adapter** (legacy, deployed on Vercel — ignore adapter warnings)
- **Supabase** — meetup_entries table for /meetup page
- **OpenAI GPT-4o** — /api/chat.ts (server-side only, key in env)
- **GTM-W2PGW75M** — Google Tag Manager, GA4 measurement ID G-C9YT0H7GJP

## Key files
| File | Purpose |
|------|---------|
| `src/components/layout/BaseLayout.astro` | Global layout, head meta, GTM, navbar, footer |
| `src/components/organisms/Navbar.astro` | Nav links + Ask AI button |
| `src/data/index.ts` | All structured data: events, checklist, water zones, transport |
| `src/data/articles.ts` | Blog articles (12 total) |
| `src/pages/index.astro` | Homepage |
| `src/pages/events.astro` | All events page |
| `src/pages/blog/[slug].astro` | Blog post template |
| `src/pages/survival-kit.astro` | Interactive packing checklist (localStorage) |
| `src/pages/meetup.astro` | Community who's going page (Supabase) |
| `src/pages/map.astro` | Heat map (coming soon) |
| `src/pages/ai.astro` | AI chat guide |
| `src/pages/api/chat.ts` | OpenAI API route (SSR, prerender=false) |
| `public/sitemap.xml` | Manual sitemap — update when adding pages |
| `public/robots.txt` | Points to sitemap |

## Design system
- **Colors:** primary `#006479`, accent `#40cef3`, dark `#003345`, muted `#6b8fa3`, pink `#b4005d`, orange `#FF9F0A`
- **Fonts:** `font-headline` = Bebas Neue (headings), Plus Jakarta Sans (body)
- **Icons:** Material Symbols Outlined (loaded in BaseLayout head)
- **Cards:** `background:white`, `border:1px solid rgba(192,232,255,0.5)`, `border-radius:1.25rem`, subtle shadow
- **Page headers:** `pt-36 pb-16`, light blue gradient `linear-gradient(180deg,rgba(225,243,255,0.8),rgba(238,248,255,0))`
- **Big H1 pattern:** dark top word + gradient second word using `-webkit-background-clip:text`

## Conventions
- All inline styles for one-off values, Tailwind for spacing/layout
- No innerHTML — always use DOM APIs (textContent, createElement) for dynamic content
- XSS-safe: never put user input into innerHTML
- Data lives in `src/data/index.ts` and `src/data/articles.ts` — edit there, pages read from it
- `noindex={true}` prop on BaseLayout hides pages from Google (used on /getting-there)
- New pages need entry in `public/sitemap.xml`

## Supabase (meetup page)
- URL: `https://wipegwhwfbykbjznfpry.supabase.co`
- Table: `meetup_entries` — columns: id, name, party, day, note, event_name, is_custom, created_at
- RLS: public read + public insert (with name length check)
- Anon key in `src/pages/meetup.astro` (publishable, safe to expose)

## Environment variables (Vercel)
- `OPENAI_API_KEY` — for /api/chat.ts

## Nav links (current)
Home · Events · Guide (blog) · Survival Kit · Heat Map · Who's Going? | Ask AI button

## Pages (indexed)
/, /events, /blog, /blog/[slug] (12 posts), /survival-kit, /map, /ai, /meetup
- /getting-there exists but is noindex (not ready)
- /tickets, /bkk-guide exist but unused

## Do not
- Add cookie banners — user uses CookieYes (third-party)
- Move system prompt to client-side (security risk — stays in api/chat.ts)
- Use innerHTML for user-generated content
- Commit .env files
