# Technology Stack

## Runtime & Framework

**Primary Framework:** Astro 4.5.0
- **Output mode:** Hybrid (static + SSR)
- **Adapter:** Netlify (legacy, deployed on Vercel)
- **Language:** TypeScript (ESM modules)

**Configuration:** `astro.config.mjs`
- Integrations: Tailwind CSS
- Dev toolbar disabled
- Netlify adapter configured

## Build & Package Management

**Package Manager:** npm (package-lock.json in repo)
**Build Scripts:**
- `npm run dev` — Start Astro dev server
- `npm run build` — Build for production (SSR + static)
- `npm run preview` — Preview production build locally

**Key Build Artifacts:**
- `dist/` — Production build output (35 subdirectories, fully built)
- `.astro/` — Astro cache directory

## Core Dependencies

| Dependency | Version | Purpose |
|-----------|---------|---------|
| `astro` | ^4.5.0 | SSR framework |
| `@astrojs/tailwind` | ^5.1.0 | Tailwind integration |
| `@astrojs/netlify` | ^5.5.4 | Netlify deployment adapter |
| `@astrojs/node` | ^8.3.4 | Node.js runtime adapter |
| `@supabase/supabase-js` | ^2.100.1 | Supabase client library |
| `openai` | ^6.33.0 | OpenAI API client |
| `firebase` | ^10.9.0 | Firebase integration |
| `resend` | ^6.9.4 | Email service API |

## Styling

**CSS Framework:** Tailwind CSS 3.4.1
**Configuration:** `tailwind.config.mjs` (149 lines)

**Design System:**
- **Colors:** Primary teal (#006479), secondary orange (#964300), tertiary pink (#b4005d), surfaces
- **Typography:** Plus Jakarta Sans (headlines), Be Vietnam Pro (body)
- **Spacing:** Tailwind defaults
- **Shadows:** Custom glow effects, card shadows
- **Animations:** float, shimmer, slide-up, fade-in, bounce-slow
- **Gradients:** liquid, liquid-soft, liquid-warm, liquid-hot, mesh

**Utility Extensions:**
- 25+ custom color variants
- Custom border radius tokens
- Backdrop blur, animations, keyframes
- Shadow effects for cards and glass-morphism

## Frontend Assets

**Icons:** Material Symbols Outlined (loaded in BaseLayout via Google Fonts API)
**Fonts:** Plus Jakarta Sans, Be Vietnam Pro (Google Fonts CDN)
**Images:** Stored in `public/` and embedded in components
- `file.jpg` (475KB) — main asset
- KMZ map file (BKK recs)
- XLSX data file (songkran_broad-match_th_2026-03-29.xlsx)

## Development Tools

- **Node.js runtime:** Astro's default (no explicit version constraint in package.json)
- **TypeScript:** Implicit via Astro (tsconfig not explicitly shown, but env.d.ts exists)
- **Git:** Repository initialized (.git/ present)
- **IDE support:** VSCode extensions available (.vscode config possible)

## Environment Configuration

**Environment Variables:**
- `OPENAI_API_KEY` — Server-side OpenAI API key
- `PUBLIC_SUPABASE_URL` — Supabase project URL (public)
- `PUBLIC_SUPABASE_ANON_KEY` — Supabase anon key (public, safe to expose)
- `PUBLIC_MAPBOX_TOKEN` — Mapbox public token (public)
- `RESEND_API_KEY` — Resend email service key

**Deployment:**
- **Primary:** Vercel (currently deployed)
- **Fallback:** Netlify (adapter configured but not active)
- **Build command:** `npm run build`
- **Publish directory:** `dist/`

## Notable Configurations

**Netlify Security Headers** (`netlify.toml`):
- HSTS with preload
- CSP (Content Security Policy) — restrictive for all origins except GTM, Google Analytics, Mapbox, Cookieyes, Supabase, OpenAI
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Long-term caching for static assets (images, fonts, JS, CSS)
- Stale-while-revalidate for HTML

**Secrets Scanning:** SECRETS_SCAN_OMIT_KEYS configured for Supabase keys (expected public exposure)

## File Statistics

- **TypeScript files:** 15 files across `src/`
- **Astro components:** 47 components
- **API routes:** 7 endpoints in `src/pages/api/`
- **Pages:** 40+ total pages (including i18n variants)

## Tech Debt & Notes

- Astro version 4.5.0 is mid-lifecycle; latest is 5.x
- Netlify adapter configured but deployed on Vercel (creates minor warning noise, no functional impact)
- Multiple adapters in package.json (@astrojs/netlify + @astrojs/node) — typical for flexibility
