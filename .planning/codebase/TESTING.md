# Testing & Quality Assurance

## Current State

**No automated tests** found in codebase.
- No test files in `src/`
- No test runner configured (Jest, Vitest, etc.)
- No test dependencies in package.json
- Quality relies on manual testing and code review

## Manual Testing Approach

Based on codebase patterns, testing appears manual:

1. **Local dev server** (`npm run dev`)
   - Astro rebuilds on file save
   - Hot module replacement for fast iteration

2. **Build verification** (`npm run build`)
   - Ensures TypeScript compilation succeeds
   - Verifies all pages generate correctly
   - Checks for missing dependencies

3. **Preview** (`npm run preview`)
   - Tests production build locally
   - Verifies static asset serving
   - Tests API routes with real environment

## Testing Considerations

### Components to Test (if automated testing added)

**Atomic Components** (`src/components/atoms/`):
- Icon rendering and fallbacks
- Button click handlers
- Tag and badge styling

**Molecules** (`src/components/molecules/`):
- EventCard prop rendering
- ScheduleRow data formatting
- ChecklistItem state persistence (localStorage)

**Organisms** (`src/components/organisms/`):
- Navbar navigation links
- FestivalSchedule data transformation
- SurvivalChecklist localStorage integration
- HeatMap API integration

**Pages & Routes:**
- Homepage renders featured content
- Blog slug routes resolve correctly
- Dynamic language variants (i18n) load correct data
- 404 page displays for unknown routes

### API Routes to Test

**`src/pages/api/chat.ts`:**
- Rate limiting per IP (10/min, 50/day)
- CORS origin validation
- OpenAI API error handling
- Moderation filtering

**`src/pages/api/contact.ts`:**
- TURNSTILE captcha verification
- Rate limiting (3/hour per IP)
- Email submission via Resend
- Input validation and sanitization

**`src/pages/api/meetup.ts`:**
- Supabase read operations
- Insert validation (name length, content moderation)
- Response formatting

**`src/pages/api/tickets.ts`:**
- Ticket data management
- Error handling for invalid requests

### Data Integrity Tests

**Data sources** to verify:
- `src/data/index.ts` — Valid festival objects, no missing properties
- `src/data/articles.ts` — All articles have required metadata (id, slug, title, date)
- `src/data/articles.zh.ts` — Chinese articles match English count

### Content Moderation Tests

**`src/lib/moderation.ts`:**
- Bad words detection (case-insensitive)
- Fraud pattern detection (crypto, gift cards, scams)
- Phishing URL detection
- False positives/negatives on edge cases

### Performance Testing

**Current optimizations:**
- Static pages cached at CDN edge
- Long-term cache headers for assets (1 year)
- Astro build output minified and tree-shaken

**Metrics to monitor:**
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)
- Time to Interactive (TTI)
- Core Web Vitals

### Browser Compatibility

**Assumed support:**
- Modern browsers (Chrome, Firefox, Safari, Edge)
- iOS Safari (iPhone/iPad)
- Android Chrome

**Features relying on recent APIs:**
- LocalStorage (survival-kit.astro)
- Fetch API (client-side data requests)
- CSS Grid/Flexbox (Tailwind)

### Security Testing

**Manual checks for:**
- No API keys exposed in client bundle
- OPENAI_API_KEY not included in dist/
- RESEND_API_KEY not included in dist/
- CSP headers allow intended resources
- CORS origin whitelist working correctly

**Content security:**
- XSS prevention: No `set:html=` on user input
- Moderation filters applied server-side
- Rate limiting prevents abuse

### Deployment Testing

**Vercel deployment checklist:**
- Environment variables set correctly
- Build succeeds without warnings
- All pages accessible at live URL
- API routes return correct responses
- Static assets cached appropriately

## Recommended Testing Additions

If adding automated tests, recommended approach:

### Test Framework

**Option 1: Vitest** (lightweight, Vite-native)
```typescript
import { describe, it, expect } from 'vitest';
import { moderateContent } from '../src/lib/moderation';

describe('moderation', () => {
  it('detects bad words', () => {
    expect(moderateContent('This is bad')).toBeTruthy();
  });
});
```

**Option 2: Jest** (industry standard, more features)
```typescript
import { moderateContent } from '../src/lib/moderation';

describe('moderation', () => {
  test('detects bad words', () => {
    expect(moderateContent('This is bad')).toBeTruthy();
  });
});
```

### Test Structure

```
src/
├── lib/
│   ├── moderation.ts
│   └── moderation.test.ts      ← Test file alongside source
├── pages/
│   └── api/
│       ├── chat.ts
│       └── chat.test.ts
└── components/
    └── organisms/
        ├── SurvivalChecklist.astro
        └── SurvivalChecklist.test.ts
```

### Example: Unit Test for Moderation

```typescript
import { describe, it, expect } from 'vitest';
import { moderateContent, badWords, fraudPatterns } from '../lib/moderation';

describe('Content Moderation', () => {
  describe('Bad Words Detection', () => {
    it('should detect bad words (case-insensitive)', () => {
      expect(moderateContent('fuck off')).toBeTruthy();
      expect(moderateContent('FUCK OFF')).toBeTruthy();
      expect(moderateContent('FuCk OfF')).toBeTruthy();
    });

    it('should not flag clean content', () => {
      expect(moderateContent('hello world')).toBeFalsy();
    });
  });

  describe('Fraud Pattern Detection', () => {
    it('should detect crypto payment demands', () => {
      expect(moderateContent('Send bitcoin to 1A1z...')).toBeTruthy();
      expect(moderateContent('pay with ethereum')).toBeTruthy();
    });

    it('should detect gift card scams', () => {
      expect(moderateContent('buy iTunes gift card')).toBeTruthy();
    });

    it('should detect phishing links', () => {
      expect(moderateContent('http://fake-site.com')).toBeTruthy();
    });
  });
});
```

### Example: Integration Test for API

```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { POST } from '../pages/api/chat';

describe('GET /api/chat', () => {
  it('should rate limit after 10 requests per minute', async () => {
    const request = new Request('https://example.com', {
      method: 'POST',
      headers: { 'x-forwarded-for': '192.168.1.1' },
      body: JSON.stringify({ message: 'hello' }),
    });

    // Make 10 requests
    for (let i = 0; i < 10; i++) {
      await POST({ request } as any);
    }

    // 11th request should be rate limited
    const result = await POST({ request } as any);
    expect(result.status).toBe(429);
  });
});
```

### E2E Testing (Optional)

Use Playwright (already installed in .playwright-mcp/) for full integration tests:

```typescript
import { test, expect } from '@playwright/test';

test('Homepage loads and shows featured events', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Check title
  expect(await page.title()).toContain('Bangkok Songkran');

  // Check featured event card
  const eventCard = page.locator('[data-event-id="s2o"]');
  await expect(eventCard).toBeVisible();

  // Check navigation
  const navLink = page.locator('a[href="/events"]');
  await expect(navLink).toBeVisible();
});

test('Blog article page renders correctly', async ({ page }) => {
  await page.goto('http://localhost:3000/blog/first-article-slug');

  // Verify article content loads
  const title = page.locator('h1');
  await expect(title).toBeVisible();
});
```

## CI/CD Testing

**Recommended GitHub Actions workflow:**

```yaml
name: Test & Build

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run test  # if tests added
      - run: npm run build

  deploy:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm install
      - run: npm run build
      - uses: vercel/action@main
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
```

## Monitoring & Observability

**Current tracking:**
- Google Analytics 4 (GA4, measurement ID G-C9YT0H7GJP)
- Google Tag Manager (GTM-W2PGW75M)

**Recommended additions:**
- Error tracking (Sentry, LogRocket)
- Performance monitoring (Web Vitals, Vercel Analytics)
- User session replay (for bug investigation)
- API error logging (for chat, contact, meetup endpoints)

## Known Issues & Edge Cases

1. **Emoji handling** in user-generated content (contact form, meetup entries)
2. **Very long festival names** in EventCard layout
3. **Network timeouts** when calling OpenAI API (no retry logic)
4. **Timezone handling** for event dates (April 10-15, 2026 is hardcoded)
5. **Cache invalidation** for articles (static content, hard to update)

## Quality Metrics

**Lines of code:**
- TypeScript: ~15 files
- Astro: ~47 components
- Styles: Tailwind inline

**Code coverage (if tests added):**
- Target: 80%+ coverage for API routes
- Target: 60%+ for components
- Target: 100% for critical utilities (moderation, rate limiting)
