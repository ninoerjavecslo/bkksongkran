# SIAM SPLASH — Songkran 2026 Bangkok

> Bangkok's complete Songkran 2026 guide. Real timetables, live crowd heat map, survival checklist, AI festival planner.

---

## 🚀 Quick Start

```bash
npm install
npm run dev
# → http://localhost:4321
```

## 📁 Project Structure

```
src/
├── components/
│   ├── atoms/              # Base elements
│   │   ├── Badge.astro         — live / featured / custom badges
│   │   ├── Button.astro        — primary / ghost / outline variants
│   │   ├── CrowdMeter.astro    — low / medium / high / insane indicator
│   │   ├── Icon.astro          — Material Symbols wrapper
│   │   └── Tag.astro           — vibe tags with color system
│   │
│   ├── molecules/          # Composed elements
│   │   ├── ChecklistItem.astro — checkbox with localStorage + priority
│   │   ├── EventCard.astro     — festival card with crowd, CTA
│   │   ├── ScheduleRow.astro   — headliner / support / pool party rows
│   │   └── WetnessWatch.astro  — animated live hotspot card
│   │
│   ├── organisms/          # Feature blocks
│   │   ├── FestivalSchedule.astro — day-tab schedule for all 3 fests
│   │   ├── HeatMap.astro          — live crowd report system
│   │   ├── Navbar.astro           — glass pill nav + mobile menu
│   │   └── SurvivalChecklist.astro — score tracker + share
│   │
│   └── layout/
│       └── BaseLayout.astro   — head, fonts, nav, footer, PWA
│
├── pages/
│   ├── index.astro            — Landing: hero + countdown + events bento
│   ├── events.astro           — Full timetables: S2O + Siam + GCircuit
│   ├── map.astro              — Live heat map + survival checklist
│   └── ai.astro               — AI Nong chat (Claude API)
│
├── data/
│   └── index.ts               — All data: festivals, schedules, zones, checklist
│
└── styles/
    └── global.css             — Tailwind base + glass, liquid-gradient utilities
```

---

## 🔥 Firebase Setup (Heat Map live data)

1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Create project: `siamsplash-2026`
3. Add Realtime Database → Start in test mode
4. Add your config to `src/components/organisms/HeatMap.astro`:

```javascript
const FIREBASE_CONFIG = {
  apiKey: "YOUR_API_KEY",
  databaseURL: "https://siamsplash-2026-default-rtdb.firebaseio.com",
  projectId: "siamsplash-2026",
  authDomain: "siamsplash-2026.firebaseapp.com",
};

import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, onValue } from 'firebase/database';

const app = initializeApp(FIREBASE_CONFIG);
const db = getDatabase(app);

// Write report
push(ref(db, `zones/${zoneId}/reports`), { level, ts: Date.now() });

// Read aggregate
onValue(ref(db, `zones/${zoneId}/reports`), snap => { ... });
```

---

## 🌐 Deploy to Vercel

```bash
# One-time
npm i -g vercel
vercel login

# Deploy
vercel --prod
```

Or connect GitHub repo in vercel.com dashboard → auto-deploys on push.

**Add domain:** In Vercel → Settings → Domains → add `siamsplash.com`

---

## 🤖 Claude API

The AI chat on `/ai` calls the Anthropic API directly from the browser.

In production, proxy through an edge function to hide your API key:

```
/api/chat.ts (Vercel edge function)
```

```typescript
// src/pages/api/chat.ts
export const prerender = false;

export async function POST({ request }) {
  const body = await request.json();
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': import.meta.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify(body),
  });
  return new Response(res.body, { headers: { 'Content-Type': 'application/json' } });
}
```

Then update the fetch URL in `ai.astro` to `/api/chat`.

---

## 📱 PWA / Add to Home Screen

The site is PWA-ready. On mobile:
- Safari iOS: Share → Add to Home Screen
- Chrome Android: Menu → Add to Home Screen

Users get an app-like experience with no app store needed.

---

## 🎨 Design Tokens

All colors defined in `tailwind.config.mjs`:
- `primary` → Teal/Cyan (#006479 / #40cef3)
- `secondary` → Orange/Amber (#964300)
- `tertiary` → Pink/Rose (#b4005d)
- `surface` → Light blue-white (#eef8ff)

Custom utilities in `global.css`:
- `.glass` — glassmorphism card
- `.liquid-gradient` — primary cyan gradient
- `.mesh-bg` — radial gradient mesh
- `.text-gradient-primary` — gradient text

---

## 📋 10-Day Launch Checklist

- [ ] `npm run build` — zero errors
- [ ] Domain purchased (siamsplash.com / splashbkk.com)
- [ ] Vercel project connected to GitHub
- [ ] Firebase Realtime DB created and wired
- [ ] Anthropic API key added as env var
- [ ] OG image created (1200×630) → `/public/og.jpg`
- [ ] PWA icons created (192×192, 512×512)
- [ ] Post in GCircuit Facebook group
- [ ] Post in r/ThailandTourism + r/Bangkok
- [ ] LinkedIn post from personal/Renderspace account

---

Built by Renderspace d.o.o. for Songkran 2026 🌊
