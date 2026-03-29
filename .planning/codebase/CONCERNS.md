# Technical Debt & Concerns

## 🔴 CRITICAL Issues

### 1. Environment Variables Exposed in Working Directory
**Severity:** CRITICAL (Security Risk)
**Location:** `.env` file in repository root
**Issue:**
- File contains real API keys: `OPENAI_API_KEY`, `RESEND_API_KEY`, `PUBLIC_MAPBOX_TOKEN`
- `.gitignore` correctly excludes `.env`, but file exists in working directory
- Risk: If committed accidentally or shared, credentials are exposed
- Keys visible in earlier analysis: sk-proj-..., re_dCADQF6v_..., etc.

**Current State:**
- Not in git (verified via `git ls-files`)
- `.gitignore` correctly configured

**Action Required:**
1. ✅ `.env` is already in `.gitignore` (good)
2. ⚠️ Verify no `.env` has been committed historically
3. ⚠️ If keys were ever exposed, rotate them immediately:
   - Generate new OpenAI API key
   - Generate new Resend API key
   - Rotate Mapbox token
4. Add `.env.example` with placeholder values for documentation

**Recommendation:**
```bash
# Always use .env.local (gitignored) for local development
# OR
# Use environment-specific files:
# .env.local → local development (gitignored)
# .env.test → test environment (gitignored)
# .env.production → production (never commit, use CI/CD secrets)
```

### 2. Large Page Components (Monolithic Astro Files)
**Severity:** HIGH (Maintainability Risk)
**Locations:**
- `src/pages/meetup.astro` — 1,312 lines
- `src/pages/tickets.astro` — 855 lines
- `src/pages/gay-guide.astro` — 664 lines
- `src/pages/index.astro` — 404 lines

**Issue:**
- Single file handles data, logic, and rendering
- Difficult to test individual components
- Hard to reuse sections across pages (e.g., meetup filtering used in multiple places)
- Styling is inline (Tailwind), makes logic-to-style relationship hard to track

**Example (meetup.astro):**
```astro
---
// 100+ lines of party definitions
// 100+ lines of utility functions (formatDate, filterParties)
// 100+ lines of client-side JS (fetch, localStorage, modals)
---
<!-- 1000+ lines of HTML template -->
```

**Recommendation:**
Extract reusable molecules/organisms:
```
src/components/organisms/MeetupPartyList.astro    ← Party display logic
src/components/organisms/MeetupEntryForm.astro    ← Form submission
src/components/organisms/MeetupUnlockModal.astro  ← Reveal UI
src/lib/meetup.ts                                  ← Validation & formatting
```

### 3. No Automated Tests
**Severity:** HIGH (Quality Risk)
**Issue:**
- Zero test coverage
- No unit tests for utilities (moderation, rate limiting)
- No integration tests for API routes
- No E2E tests for critical user paths
- Moderation filters (bad words, fraud detection) untested
- Rate limiting logic untested

**Example - Untested Moderation Logic** (`src/lib/moderation.ts`):
```typescript
// No tests — impossible to verify:
// - Does case-insensitive detection work?
// - Are edge cases (e.g., "fu\u0063k") detected?
// - False positive rate on innocent content?
```

**Recommendation:**
Add Vitest + Playwright for:
1. Unit tests: moderation, rate limiting, utilities
2. Integration tests: API endpoints
3. E2E tests: homepage, blog, meetup flow

Suggested coverage targets:
- 100% for security-critical code (moderation, rate limiting)
- 80% for API routes
- 60% for page components

---

## 🟡 HIGH Priority Issues

### 4. Missing Error Handling in API Routes
**Severity:** HIGH (Reliability Risk)
**Locations:**
- `src/pages/api/chat.ts` — OpenAI call not wrapped in try/catch
- `src/pages/api/contact.ts` — Resend call error handling unclear
- `src/pages/api/meetup.ts` — Supabase fetch error handling unclear

**Issue:**
```typescript
// chat.ts — No error handling for OpenAI call
const response = await openai.chat.completions.create({...});
// If API is down, response is undefined, breaks downstream code
```

**Recommendation:**
```typescript
try {
  const response = await openai.chat.completions.create({...});
  return json({ choices: response.choices });
} catch (error) {
  console.error('OpenAI API error:', error);
  return json(
    { error: 'Failed to process request. Please try again.' },
    500
  );
}
```

### 5. No Retry Logic for External API Calls
**Severity:** HIGH (Reliability Risk)
**Issue:**
- OpenAI API calls fail silently if network hiccup occurs
- No exponential backoff
- No circuit breaker pattern
- User gets 500 error instead of retry

**Recommendation:**
Implement retry wrapper:
```typescript
async function retryWithBackoff(fn, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      const delay = 100 * Math.pow(2, i);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}
```

### 6. Rate Limiting Uses In-Memory Storage
**Severity:** HIGH (Scalability Risk)
**Locations:**
- `src/pages/api/chat.ts` — In-memory `Map<string, IpRecord>`
- `src/pages/api/contact.ts` — In-memory `Map<string, RateRecord>`

**Issue:**
```typescript
// This won't work across multiple server instances
const ipMap = new Map<string, IpRecord>();
// On Vercel Functions (serverless), each request might hit a different instance
// Rate limit resets between requests, defeating the purpose
```

**Recommendation:**
- **Local development:** In-memory is fine (single instance)
- **Production:** Use external store:
  - Redis (for speed)
  - Upstash (serverless Redis)
  - DynamoDB (AWS)
  - Vercel KV (native integration)

```typescript
import { kv } from '@vercel/kv';

async function checkRateLimit(ip: string) {
  const count = await kv.incr(`ratelimit:${ip}:min`);
  if (count === 1) await kv.expire(`ratelimit:${ip}:min`, 60);
  return count > 10;
}
```

### 7. Hardcoded Event Dates
**Severity:** HIGH (Maintenance Risk)
**Location:** `src/data/index.ts`, `src/pages/meetup.astro`
**Issue:**
- Songkran dates (April 10-15) hardcoded
- No way to update dates without code change
- Pages (gay-guide, events, etc.) reference fixed dates

**Recommendation:**
Extract to config:
```typescript
// src/data/config.ts
export const FESTIVAL_2026 = {
  startDate: new Date('2026-04-10'),
  endDate: new Date('2026-04-15'),
  days: [
    { id: 'apr10', label: 'Apr 10', dayOfWeek: 'Friday' },
    // ...
  ],
};
```

### 8. Inline Client-Side Scripts (Security Concern)
**Severity:** MEDIUM-HIGH (Security Risk)
**Issue:**
Large pages like `meetup.astro` contain inline `<script>` blocks with:
- Fetch calls to `/api/meetup`
- LocalStorage manipulation
- DOM manipulation

**Risk:**
- Hard to audit (scripts scattered throughout pages)
- Potential XSS if data not properly escaped
- CSP directives might be bypassed

**Recommendation:**
Extract to `src/lib/client/*.ts` files:
```typescript
// src/lib/client/meetup.ts
export async function loadMeetupEntries() {
  const response = await fetch('/api/meetup');
  return response.json();
}

export function saveMeetupState(state) {
  localStorage.setItem('meetup-state', JSON.stringify(state));
}
```

Include via `<script>` tag with integrity checks.

---

## 🟡 MEDIUM Priority Issues

### 9. No Input Validation Schema
**Severity:** MEDIUM (Data Integrity Risk)
**Issue:**
- No schema validation library (Zod, Yup, etc.)
- Manual validation scattered across routes
- Easy to introduce validation bugs

**Example:**
```typescript
// contact.ts — Manual string length check
if (!name || name.length < 2) return json({...}, 400);
if (email && !email.includes('@')) return json({...}, 400);
// No single source of truth for validation rules
```

**Recommendation:**
Use Zod for schema validation:
```typescript
import { z } from 'zod';

const ContactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  type: z.enum(['feature-event', 'report-scam', 'general']),
});

const body = await request.json();
const result = ContactSchema.safeParse(body);
if (!result.success) return json({ error: result.error }, 400);
```

### 10. Blog Data Duplication (English + Chinese)
**Severity:** MEDIUM (Maintenance Risk)
**Locations:**
- `src/data/articles.ts` — ~1400 lines
- `src/data/articles.zh.ts` — ~1400 lines (copy with translations)

**Issue:**
- Article structure identical, only content differs
- Updating one article requires updating both
- No single source of truth
- Easy to forget syncing

**Example:**
```typescript
// articles.ts
export const articles = [{
  id: 'first-article',
  slug: 'first-article-slug',
  title: 'English Title',
  content: 'English content...',
}];

// articles.zh.ts (duplicated)
export const articles = [{
  id: 'first-article',  // Same ID
  slug: 'first-article-slug',  // Same slug
  title: '中文标题',
  content: '中文内容...',
}];
```

**Recommendation:**
Restructure to single source:
```typescript
// src/data/articles/index.ts
export const articles = [
  {
    id: 'first-article',
    slug: 'first-article-slug',
    translations: {
      en: { title: 'English Title', content: '...' },
      zh: { title: '中文标题', content: '...' },
    },
  },
];

// Query like: articles[0].translations[lang].title
```

### 11. Missing TypeScript Types in Data Files
**Severity:** MEDIUM (Type Safety Risk)
**Issue:**
- `src/data/index.ts` exports objects without types
- Tree-shaking optimized for small builds, but loses type safety
- Festival schema not formally documented

**Example:**
```typescript
// No type definition
export const festivals = [{ ... }];

// Consumer can't autocomplete properties
const fest = festivals[0];
fest.nam// <- doesn't autocomplete, can't catch typo
```

**Recommendation:**
Add types while preserving build optimization:
```typescript
interface Festival {
  id: string;
  name: string;
  tagline: string;
  dates: string;
  // ...
}

export const festivals: Festival[] = [{ ... }];
```

### 12. No Logging in API Routes
**Severity:** MEDIUM (Observability Risk)
**Issue:**
- Silent failures (API errors not logged)
- No error tracking (Sentry, LogRocket)
- Impossible to debug production issues
- Rate limit violations not tracked

**Recommendation:**
```typescript
import { captureException } from '@sentry/astro';

try {
  const response = await openai.chat.completions.create({...});
  console.log(`[chat.ts] Generated response for IP: ${ip}`);
} catch (error) {
  console.error(`[chat.ts] OpenAI error: ${error.message}`);
  captureException(error);
  return json({ error: '...' }, 500);
}
```

---

## 🟠 MEDIUM-LOW Priority Issues

### 13. Static Cache Headers May Cause Issues
**Severity:** MEDIUM-LOW (Deployment Risk)
**Location:** `netlify.toml`
**Issue:**
```toml
# 1-year immutable cache on JS/CSS
[[headers]]
  for = "/*.js"
  Cache-Control = "public, max-age=31536000, immutable"
```

**Risk:**
- If deploying old build, users get stale JS for a year
- No way to purge cache on emergency fix
- Astro fingerprints assets, so should be safe, but verify

**Verification:**
- Check if Astro build outputs fingerprinted filenames:
  - ✅ Good: `_astro/chunk.HASH.js`
  - ❌ Bad: `_astro/chunk.js`

**Recommendation:**
Verify Astro 4.5 fingerprints assets correctly. If not, reduce cache to 1 month as fallback.

### 14. Astro Version Lag
**Severity:** MEDIUM-LOW (Maintenance Risk)
**Issue:**
- Using Astro 4.5.0
- Current version is Astro 5.x+
- Missing performance improvements, bug fixes

**Recommendation:**
Schedule upgrade path:
1. Read Astro 5.0 migration guide
2. Test on dev branch
3. Check dependency compatibility
4. Upgrade in next sprint

### 15. Missing .env.example
**Severity:** LOW (Documentation Risk)
**Issue:**
- No `.env.example` file for developers
- New team members don't know which vars are needed
- Can't document var purposes

**Recommendation:**
Create `.env.example`:
```
# OpenAI API for /api/chat.ts
OPENAI_API_KEY=sk-...

# Mapbox for heat map visualization
PUBLIC_MAPBOX_TOKEN=pk....

# Supabase project
PUBLIC_SUPABASE_URL=https://...
PUBLIC_SUPABASE_ANON_KEY=...

# Resend email service
RESEND_API_KEY=re_...

# Cloudflare Turnstile CAPTCHA
TURNSTILE_SECRET_KEY=...
```

### 16. Missing Sitemap Maintenance
**Severity:** LOW (SEO Risk)
**Location:** `public/sitemap.xml`
**Issue:**
- Manual XML sitemap
- Must update whenever adding pages
- Easy to forget

**Recommendation:**
Use Astro integration:
```bash
npm install @astrojs/sitemap
```

```typescript
// astro.config.mjs
export default defineConfig({
  integrations: [sitemap()],
  site: 'https://bkksongkran.com',
});
```

---

## 🟢 LOW Priority Issues

### 17. Missing Analytics Configuration Details
**Severity:** LOW (Analytics Risk)
**Issue:**
- GA4 measurement ID configured
- GTM tracking pixels loaded
- No documentation of event tracking strategy

**Recommendation:**
Document in `CLAUDE.md`:
- Event names being tracked
- Custom dimensions used
- Conversion goals

### 18. No Performance Monitoring
**Severity:** LOW (Performance Risk)
**Issue:**
- No Core Web Vitals tracking
- No API latency monitoring
- No error rate alerts

**Recommendation:**
Integrate Vercel Web Analytics:
```astro
<script src="/_vercel/insights/script.js" defer></script>
```

### 19. Incomplete i18n Implementation
**Severity:** LOW (Feature Completeness)
**Issue:**
- Only English + Chinese supported
- No language selector visible on site
- No `/` to `/zh/` redirect based on browser locale

**Recommendation:**
Add language selector in Navbar:
```astro
<select onChange="window.location.href = selectedLang">
  <option value="/en">English</option>
  <option value="/zh">中文</option>
</select>
```

### 20. Missing SVG Optimization
**Severity:** LOW (Performance Risk)
**Issue:**
- No SVGO or inline SVG optimization
- Favicon.svg exists but not optimized

---

## Summary Risk Matrix

| Issue | Severity | Category | Status |
|-------|----------|----------|--------|
| Exposed env vars | CRITICAL | Security | ⚠️ Monitor |
| Large page files | HIGH | Maintainability | ❌ Refactor |
| No automated tests | HIGH | Quality | ❌ Implement |
| Missing error handling | HIGH | Reliability | ❌ Fix |
| No retry logic | HIGH | Reliability | ❌ Implement |
| In-memory rate limiting | HIGH | Scalability | ⚠️ Monitor (dev only) |
| Hardcoded dates | HIGH | Maintenance | ❌ Refactor |
| Inline client scripts | MED-HIGH | Security | ⚠️ Review |
| No input validation | MEDIUM | Data Integrity | ❌ Implement |
| Data duplication (i18n) | MEDIUM | Maintenance | ❌ Refactor |
| Missing TypeScript | MEDIUM | Type Safety | ⚠️ Improve |
| No logging | MEDIUM | Observability | ❌ Add |
| Cache headers | MED-LOW | Deployment | ✅ Verify |
| Astro 4.x (not 5.x) | MED-LOW | Maintenance | ⚠️ Plan upgrade |

**Legend:** ❌ = Action needed, ⚠️ = Monitor, ✅ = OK
