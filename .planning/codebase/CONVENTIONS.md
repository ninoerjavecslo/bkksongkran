# Code Conventions & Patterns

## Component Patterns

### Astro Component Structure
All components follow Astro's frontmatter + template pattern:

```astro
---
import OtherComponent from './OtherComponent.astro';

interface Props {
  id: string;
  name: string;
  optional?: boolean;
}

const { id, name, optional = false } = Astro.props;
const computedValue = name.toUpperCase();
---

<div>
  <h1>{name}</h1>
  {optional && <p>Optional content</p>}
</div>
```

**Key patterns:**
- Props always destructured from `Astro.props`
- Type definitions via `interface Props`
- Default values applied during destructuring
- No className concatenation helper (manual string concat when needed)
- Inline styles for dynamic values (`style={`color:${color}`}`)
- Tailwind utilities for static styles

### Inline Styles vs Tailwind
**Tailwind for:**
- Spacing (p-, m-, gap-, etc.)
- Layout (flex, grid, block, etc.)
- Color constants (primary, surface, etc.)
- Responsive behavior
- Shadows, borders, rounded corners

**Inline styles for:**
- Dynamic colors from data (`style={`background:${color}`}`)
- One-off values not in Tailwind
- Component-specific gradients

Example from `EventCard.astro`:
```astro
<div class="h-1.5 w-full" style={`background:linear-gradient(90deg,${colorDark},${color});`}></div>
```

## Type Definitions

**API Routes:**
All API routes explicitly type their handler with `APIRoute` from Astro:
```typescript
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  // Handle request
};
```

**Component Props:**
Always use `interface Props` (not individual prop typing):
```astro
interface Props {
  id: string;
  name: string;
  crowd: 'low' | 'medium' | 'high' | 'insane';
  variant?: 'default' | 'featured';
}
```

**Data types:**
Large data structures typically untyped in `src/data/` files — values are objects with known shape, leveraged for tree-shaking.

## Error Handling Patterns

**API Routes:**
```typescript
function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });
}

// Usage
if (!valid) return json({ error: 'Invalid input' }, 400);
```

**Rate Limiting Pattern:**
```typescript
const rateMap = new Map<string, { count: number; reset: number }>();
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.reset) {
    rateMap.set(ip, { count: 1, reset: now + 3_600_000 });
    return false;
  }
  if (entry.count >= 3) return true;
  entry.count++;
  return false;
}
```

**Moderation Pattern:**
Server-side validation before processing:
```typescript
// src/lib/moderation.ts defines patterns
import { moderateContent } from '../lib/moderation';

const violation = moderateContent(userInput);
if (violation) return json({ error: 'Content not allowed' }, 400);
```

## Naming Conventions

### Files
- **Components:** PascalCase (`EventCard.astro`, `BaseLayout.astro`, `Icon.astro`)
- **Data exports:** camelCase (`index.ts`, `articles.ts`, `bkkGuide.ts`)
- **Routes:** kebab-case (`survival-kit.astro`, `/blog/[slug].astro`)
- **Utilities:** camelCase (`moderation.ts`, `supabase.ts`)

### Variables & Functions
- **camelCase** for all TypeScript variables and functions
- **SCREAMING_SNAKE_CASE** for constants (e.g., `ALLOWED_ORIGINS`, `TURNSTILE_SECRET`)
- **PascalCase** for component and interface names

### CSS & Classes
- **Tailwind utilities** — no custom class naming needed
- When custom styles needed, use inline `style={}` or `<style>` blocks

## Data Structure Patterns

**Master data export:**
```typescript
export const festivals = [
  {
    id: 's2o',
    name: 'S2O Songkran Festival',
    tagline: '...',
    // ... properties
  },
];
```

**Nested data with computed properties:**
```typescript
export const festivals = [
  {
    id: 's2o',
    schedule: {
      'Apr 11': [
        { name: 'Artist', sub: 'B2B Details', genre: 'Genre' },
      ],
    },
  },
];
```

**Import and use in components:**
```astro
---
import { festivals } from '../data/index';

const festival = festivals.find(f => f.id === id);
---
```

## DOM Patterns

**No innerHTML usage** — always use Astro templates or safe DOM APIs:
```astro
<!-- Good -->
<div>{userContent}</div>

<!-- Bad — would cause XSS -->
<div set:html={userContent}></div>
```

**Icon rendering:**
```astro
<span class="material-symbols-outlined">home</span>
```

**Conditional rendering:**
```astro
{featured && <div>Featured badge</div>}

{items.length > 0 ? (
  <ul>
    {items.map(item => <li>{item}</li>)}
  </ul>
) : (
  <p>No items</p>
)}
```

## Environment Variable Patterns

**Public variables** (prefixed `PUBLIC_`):
```typescript
const url = import.meta.env.PUBLIC_SUPABASE_URL;
// Safe to expose, intentional for public consumption
```

**Secret variables** (no prefix):
```typescript
const apiKey = import.meta.env.OPENAI_API_KEY;
// Server-side only, never exposed to client
```

**Development-only:**
```typescript
if (import.meta.env.DEV) {
  console.log('Development mode');
}
```

## Async Patterns

**API routes use async/await:**
```typescript
export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const response = await externalApi.call(body);
  return json(response);
};
```

**Server-side page functions:**
```astro
---
const data = await fetchSomeData();
const filtered = data.filter(item => item.active);
---

<div>{filtered.map(item => <p>{item.name}</p>)}</div>
```

## Comments & Documentation

**Inline comments for complex logic:**
```typescript
// Per-IP: max 10 requests per minute + 50 per day
interface IpRecord {
  minuteCount: number;
  minuteReset: number;
  dayCount: number;
  dayReset: number;
}
```

**Section separators (for large files):**
```typescript
// ── Rate limiting ─────────────────────────────────────────────
// ── CORS validation ────────────────────────────────────────────
```

**No JSDoc for obvious functions** — Astro components rarely need documentation

## CSS Patterns

**No global CSS classes** — Tailwind utilities used inline:
```astro
<div class="flex gap-4 p-6">
  <div class="flex-1 bg-surface rounded-lg">
    Content
  </div>
</div>
```

**Global styles in `src/styles/global.css`:**
- Base resets (if needed)
- Font imports
- CSS variables (rarely used, design tokens in Tailwind instead)

**Component-scoped styles (optional `<style>` block):**
```astro
<style>
  .card {
    transition: transform 0.3s;
  }
  .card:hover {
    transform: translateY(-2px);
  }
</style>

<div class="card">...</div>
```

## Conditional Routes

**Static pages (SSG):**
- Built at deploy time
- No `prerender` specified (default true)

**Dynamic API routes (SSR):**
```typescript
export const prerender = false;

export const POST: APIRoute = async ({ request }) => { ... };
```

## Performance Patterns

**Data co-location:**
- All static content in `src/data/`
- Built into HTML, no fetch needed
- Minimal JS shipped to client

**Lazy loading for external APIs:**
```astro
<script client:idle>
  // Only loads when browser idle, non-critical enhancement
</script>
```

**No prop drilling:**
- Components import data directly from `src/data/`
- Pass only necessary IDs/identifiers

## i18n Patterns

**Duplicate pages with language variant:**
```
src/pages/events.astro        → /events (English)
src/pages/zh/events.astro     → /zh/events (Chinese)
```

**Language-specific data:**
```typescript
// src/data/articles.ts — English
// src/data/articles.zh.ts — Chinese
```

**Alternate link tags:**
```astro
{lang === 'zh' && enUrl && (
  <link rel="alternate" hrefLang="en" href={enUrl} />
)}
```

## Security Patterns

**API origin validation:**
```typescript
const ALLOWED_ORIGINS = [
  'https://bkksongkran.com',
  'https://www.bkksongkran.com',
];

const origin = request.headers.get('origin');
if (!ALLOWED_ORIGINS.includes(origin)) {
  return json({ error: 'Unauthorized' }, 403);
}
```

**User input validation:**
- Always validate on server
- Client-side validation is UX-only
- Apply moderation filters before storing

**CSP headers (netlify.toml):**
- Restrictive defaults
- Explicit allowlists for external services
