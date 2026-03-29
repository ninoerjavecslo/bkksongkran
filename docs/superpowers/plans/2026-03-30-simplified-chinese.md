# Simplified Chinese (zh) Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Simplified Chinese versions of the 6 main pages under `/zh/`, with a language switcher in the navbar and full hreflang SEO support.

**Architecture:** Static Astro pages under `src/pages/zh/` that reuse all existing components and data, with a shared Chinese translations object in `src/data/zh.ts`. The navbar gains a compact EN/中文 toggle. BaseLayout accepts an optional `lang` prop to set `<html lang>` and emit hreflang link tags.

**Tech Stack:** Astro 4 (static), Tailwind CSS, TypeScript. No new dependencies.

---

## Chunk 1: Translations data + BaseLayout lang support

### Task 1: Create Chinese translations file

**Files:**
- Create: `src/data/zh.ts`

- [ ] Create `src/data/zh.ts` with all UI strings needed across the 6 pages:

```ts
// src/data/zh.ts
export const zh = {
  // Navbar
  nav: {
    home: '首页',
    events: '活动',
    guide: '攻略',
    ticketExchange: '票务交换',
    survivalKit: '生存指南',
    bangkokMap: '曼谷地图',
    heatMap: '热力图',
    askAI: '问AI',
  },

  // Common
  common: {
    seeAllEvents: '查看全部活动',
    survivalKit: '生存指南',
    fullLineupDetails: '查看完整阵容',
    days: '天',
    hours: '小时',
    mins: '分',
    secs: '秒',
    songkranStartsIn: '宋干节倒计时',
    liveFromBangkok: '直播来自曼谷 · 2026年4月10–15日',
    aprilDates: '2026年4月10–15日 · 泰国曼谷',
    continueReading: '继续阅读',
    readMore: '了解更多',
    scroll: '滚动',
  },

  // Homepage
  home: {
    metaTitle: '曼谷宋干节2026 — 完整节日指南、演出阵容与实时地图',
    metaDescription: '2026年曼谷宋干节完整指南。S2O、暹罗宋干、GCircuit实时演出阵容，实时人群热力图，AI行程规划，生存清单。4月10-15日。',
    heroTag: '直播来自曼谷 · 2026年4月10–15日',
    heroTitle: '曼谷宋干节',
    heroSubtitle: '每一场节日。每一个演出阵容。每一个泼水区。曼谷宋干节唯一完整指南。',
    festivalHighlights: '节日亮点',
    theBigThree: '三大盛会',
    stats: [
      { n: '20+', l: '节日与活动' },
      { n: '8', l: '泼水区' },
      { n: '7', l: '狂欢天数' },
    ],
    // Quick links
    allEventsTitle: '全部活动',
    allEventsDesc: '20多个节日、街头派对和文化活动。',
    allEventsCta: '浏览活动',
    survivalKitTitle: '生存指南',
    survivalKitDesc: '必备清单。掌握你的准备状态。',
    survivalKitCta: '查看清单',
    heatMapTitle: '实时热力图',
    heatMapDesc: '实时查看曼谷各区人群密度。',
    heatMapCta: '查看地图',
    aiPlannerTitle: 'AI行程规划',
    aiPlannerDesc: '获取个性化行程、阵容对比和实时建议。',
    aiPlannerCta: '开始规划',
    // Guide section
    guideTitle: '宋干节攻略',
    guideCta: '查看全部攻略',
    // Festival cards
    siamTag: '主舞台 · 4月11–14日',
    siamNights: '4晚',
    s2oTag: 'EDM · 4月11–13日',
    gcircuitTag: 'LGBTQ+ · 4月10–13日',
    gcircuitSub: 'ADRO-MADA：明日之城',
  },

  // Events page
  events: {
    metaTitle: '宋干节2026活动与时刻表 — 全部节日、演出阵容与门票',
    metaDescription: '完整的2026宋干节活动日历。S2O、暹罗宋干、GCircuit逐日演出阵容及门票信息。',
    pageLabel: '节日日历',
    h1Line1: '全部',
    h1Line2: '泼水活动',
    intro: '2026年曼谷宋干节期间的每一个节日、街头派对、泼水区和文化活动。',
    jumpHeadliners: '头条节日',
    jumpWaterFights: '泼水区',
    jumpFree: '免费活动',
    jumpCultural: '文化活动',
    intensityInsane: '超燃',
    intensityHigh: '超嗨',
    intensityMedium: '轻松',
  },

  // Blog index
  blog: {
    metaTitle: '宋干节攻略 — 2026年曼谷完整指南',
    metaDescription: '宋干节2026完整知识库。本地人撰写，为2026年更新。',
    pageLabel: '宋干节知识库',
    h1Line1: '宋干节',
    h1Line2: '攻略',
    intro: '关于泰国水节你需要了解的一切。由本地人撰写，为2026年更新。',
    featuredLabel: '精选文章',
    allArticles: '全部攻略',
    minRead: '分钟阅读',
  },

  // Survival Kit
  survivalKit: {
    metaTitle: '宋干节生存指南 — 2026年曼谷必备清单',
    metaDescription: '完整的宋干节打包清单。防水装备、健康必备、交通攻略——曼谷水节一切所需。',
    pageLabel: '打包清单',
    h1Line1: '生存',
    h1Line2: '指南',
    intro: '宋干节的完整打包清单。勾选每项，追踪你的准备状态。',
  },

  // AI page
  ai: {
    metaTitle: 'AI宋干节向导 — 向Nong询问2026年曼谷信息',
    metaDescription: '向我们的AI向导询问任何关于2026年宋干节的问题。获取个性化行程、节日对比、LGBTQ+景点和实时建议。',
    pageLabel: '实时节日管家',
    meet: '认识',
    nong: 'Nong',
    intro: '你的宋干节AI — 了解每一个2026年演出阵容、每一个LGBTQ+景点、每一个场馆。随时提问，获得真实答案。',
    placeholder: '问任何关于宋干节的问题...',
    send: '发送',
  },

  // Meetup page
  meetup: {
    metaTitle: '谁要去？— 寻找节日同伴 | 2026年曼谷宋干节',
    metaDescription: '报名参加宋干节2026派对。寻找去同一活动的伙伴，协调预饮和派对后续。',
    pageLabel: '社区',
    h1Line1: '谁要',
    h1Line2: '去？',
    intro: '寻找同伴。报名参加活动，添加预饮、派对后续——在一个地方协调一切。',
  },

  // Footer
  footer: {
    description: '2026年曼谷宋干节完整指南。演出阵容、泼水区、交通、生存攻略。',
    dates: '2026年4月10–15日 · 泰国曼谷',
    festival: '节日',
    allEvents: '全部活动',
    tools: '工具',
    legal: '法律',
    privacy: '隐私政策',
    terms: '使用条款',
    disclaimer: '免责声明',
    cookiePolicy: 'Cookie政策',
    contact: '联系我们',
    advertise: '广告合作',
    copyright: '© 2026 BKK Songkran · 泰国曼谷',
    independent: '独立指南 — 与任何节日主办方无关',
  },
};
```

- [ ] Commit: `git add src/data/zh.ts && git commit -m "feat(zh): add simplified chinese translations data"`

---

### Task 2: Add lang + hreflang support to BaseLayout

**Files:**
- Modify: `src/components/layout/BaseLayout.astro`

- [ ] Add `lang` and `enUrl` props to BaseLayout interface:

```ts
interface Props {
  title?: string;
  description?: string;
  canonical?: string;
  class?: string;
  noindex?: boolean;
  ogImage?: string;
  lang?: 'en' | 'zh';      // ← add
  enUrl?: string;           // ← add (canonical EN equivalent, for zh pages)
}
```

- [ ] Destructure new props (default `lang` to `'en'`):

```ts
const {
  // ... existing props ...
  lang = 'en',
  enUrl,
} = Astro.props;
```

- [ ] Update `<html>` tag to use the lang prop:

```html
<html lang={lang === 'zh' ? 'zh-Hans' : 'en'} class="scroll-smooth">
```

- [ ] Add hreflang tags after the canonical tag (inside `<head>`):

```astro
{lang === 'zh' && enUrl && (
  <>
    <link rel="alternate" hreflang="zh-Hans" href={canonical ?? Astro.url.href} />
    <link rel="alternate" hreflang="en" href={enUrl} />
    <link rel="alternate" hreflang="x-default" href={enUrl} />
  </>
)}
{lang === 'en' && canonical && (
  <>
    <link rel="alternate" hreflang="en" href={canonical} />
    <link rel="alternate" hreflang="zh-Hans" href={canonical.replace('https://bkksongkran.com', 'https://bkksongkran.com/zh')} />
    <link rel="alternate" hreflang="x-default" href={canonical} />
  </>
)}
```

- [ ] Commit: `git add src/components/layout/BaseLayout.astro && git commit -m "feat(zh): add lang prop and hreflang to BaseLayout"`

---

### Task 3: Add language switcher to Navbar

**Files:**
- Modify: `src/components/organisms/Navbar.astro`

- [ ] Add currentLang detection and zh path mapping at the top of the frontmatter:

```ts
const currentPath = Astro.url.pathname;
const isZh = currentPath.startsWith('/zh');

// Map current path to its counterpart language
function switchLangPath(path: string): string {
  if (path.startsWith('/zh')) {
    // zh → en: strip /zh prefix
    const enPath = path.replace(/^\/zh/, '') || '/';
    return enPath;
  } else {
    // en → zh: add /zh prefix
    if (path === '/') return '/zh';
    return '/zh' + path;
  }
}
const langSwitchHref = switchLangPath(currentPath);
```

- [ ] Add the language switcher button in the "Right actions" div, before the Ask AI button:

```astro
<!-- Language switcher -->
<a
  href={langSwitchHref}
  class="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold border transition-all hover:scale-105"
  style="border-color:rgba(0,100,121,0.25);color:#006479;background:rgba(0,100,121,0.06);"
  aria-label={isZh ? 'Switch to English' : '切换到中文'}
>
  {isZh ? '🇬🇧 EN' : '🇨🇳 中文'}
</a>
```

- [ ] Add the same switcher to the mobile menu (after the nav links, before the Ask AI button):

```astro
<a
  href={langSwitchHref}
  class="mobile-menu-link font-headline font-bold text-xl text-on-surface py-3 border-b border-surface-container-high hover:text-primary transition-colors flex items-center gap-2"
>
  {isZh ? '🇬🇧 Switch to English' : '🇨🇳 切换到中文'}
</a>
```

- [ ] Commit: `git add src/components/organisms/Navbar.astro && git commit -m "feat(zh): add EN/中文 language switcher to navbar"`

---

## Chunk 2: Chinese page files

### Task 4: Chinese homepage — /zh/index.astro

**Files:**
- Create: `src/pages/zh/index.astro`

- [ ] Create `src/pages/zh/index.astro`. This mirrors `src/pages/index.astro` exactly in structure but replaces all user-visible strings with values from `zh.home` and `zh.common`. Key differences:
  - `<BaseLayout lang="zh" enUrl="https://bkksongkran.com/" canonical="https://bkksongkran.com/zh">`
  - All text strings use `zh.*` translations
  - All `href` links to internal pages prepend `/zh` (e.g. `/zh/events`, `/zh/survival-kit`, `/zh/blog`)
  - Countdown labels use Chinese (`zh.common.days` etc.)
  - Stats use `zh.home.stats`
  - The `Ask AI` button links to `/zh/ai`

  Full file:

```astro
---
import BaseLayout from '../../components/layout/BaseLayout.astro';
import EventCard from '../../components/molecules/EventCard.astro';
import { festivals, additionalEvents } from '../../data/index';
import { articles } from '../../data/articles';
import { zh } from '../../data/zh';

const allEvents = [
  ...festivals.map(f => ({ ...f, isFestival: true })),
  ...additionalEvents.filter(e => e.type === 'festival').map(e => ({ ...e, isFestival: false })),
];
const featuredArticles = articles.slice(0, 3);
const t = zh;
---

<BaseLayout
  title={t.home.metaTitle}
  description={t.home.metaDescription}
  canonical="https://bkksongkran.com/zh"
  enUrl="https://bkksongkran.com/"
  lang="zh"
>
  <!-- ═══ HERO ═══ -->
  <section class="relative min-h-screen flex items-center pt-28 pb-20 px-6 overflow-hidden">
    <div class="absolute inset-0 z-0">
      <picture>
        <source type="image/webp" srcset="/hero-songkran-800.webp 800w, /hero-songkran.webp 1400w" sizes="100vw" />
        <img src="/hero-songkran.jpg" alt="2026年曼谷宋干节泼水节人群" class="w-full h-full object-cover" loading="eager" fetchpriority="high" decoding="async" width="1400" height="933" />
      </picture>
      <div class="absolute inset-0" style="background:linear-gradient(135deg,rgba(0,30,50,0.85) 0%,rgba(0,100,121,0.6) 50%,rgba(0,51,69,0.8) 100%);"></div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
      <div class="space-y-7">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold" style="background:rgba(255,197,166,0.2);color:#ffdcc8;border:1px solid rgba(255,197,166,0.35);">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-fixed opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-secondary-fixed"></span>
          </span>
          {t.home.heroTag}
        </div>

        <h1 class="font-headline font-extrabold leading-[0.88] tracking-tighter text-white" style="font-size:clamp(3rem,8vw,6rem);text-shadow:0 4px 32px rgba(0,100,121,0.5);">
          {t.home.heroTitle}<br/>
          <span class="text-hero-accent">SONGKRAN</span><br/>
          2026
        </h1>

        <p class="text-lg font-medium leading-relaxed max-w-[480px]" style="color:#fff;">
          {t.home.heroSubtitle}
        </p>

        <div class="flex gap-4 flex-wrap">
          <a href="/zh/events" class="btn-primary px-8 py-4 text-base">
            <span class="material-symbols-outlined text-xl" style="font-variation-settings:'FILL' 1;">calendar_month</span>
            {t.common.seeAllEvents}
          </a>
          <a href="/zh/survival-kit" class="btn px-8 py-4 text-base text-white transition-all hover:bg-white/20 hover:scale-105" style="background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.3);">
            <span class="material-symbols-outlined text-xl text-hero-accent" style="font-variation-settings:'FILL' 1;">backpack</span>
            {t.common.survivalKit}
          </a>
        </div>

        <div class="flex gap-10 pt-2">
          {t.home.stats.map(s => (
            <div>
              <div class="font-headline font-black text-3xl text-hero-accent">{s.n}</div>
              <div class="text-xs font-semibold" style="color:#fff;">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      <!-- COUNTDOWN -->
      <div class="flex flex-col items-center gap-6">
        <div class="rounded-3xl p-8 text-center w-full" style="background:rgba(0,30,50,0.5);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(93,216,247,0.2);">
          <div class="text-xs font-bold uppercase tracking-[0.25em] mb-5 text-hero-accent">{t.common.songkranStartsIn}</div>
          <div class="grid grid-cols-4 gap-3" id="countdown-grid">
            <div>
              <div class="font-headline font-black text-4xl md:text-5xl text-white" id="cd-days">--</div>
              <div class="text-[10px] font-bold uppercase tracking-widest mt-1 text-hero-accent">{t.common.days}</div>
            </div>
            <div>
              <div class="font-headline font-black text-4xl md:text-5xl text-white" id="cd-hours">--</div>
              <div class="text-[10px] font-bold uppercase tracking-widest mt-1 text-hero-accent">{t.common.hours}</div>
            </div>
            <div>
              <div class="font-headline font-black text-4xl md:text-5xl text-white" id="cd-mins">--</div>
              <div class="text-[10px] font-bold uppercase tracking-widest mt-1 text-hero-accent">{t.common.mins}</div>
            </div>
            <div>
              <div class="font-headline font-black text-4xl md:text-5xl text-white" id="cd-secs">--</div>
              <div class="text-[10px] font-bold uppercase tracking-widest mt-1 text-hero-accent">{t.common.secs}</div>
            </div>
          </div>
          <div class="mt-6 pt-4" style="border-top:1px solid rgba(93,216,247,0.15);">
            <span class="text-sm font-semibold text-hero-text-muted">{t.common.aprilDates}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
      <span class="text-xs font-bold uppercase tracking-widest text-white">{t.common.scroll}</span>
      <div class="w-px h-10" style="background:linear-gradient(to bottom,#fff,transparent);"></div>
    </div>
  </section>

  <!-- ═══ BENTO HIGHLIGHTS ═══ -->
  <section class="section">
    <div class="section-inner">
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div class="text-xs font-bold tracking-[0.2em] uppercase mb-2 text-primary">{t.home.festivalHighlights}</div>
          <h2 class="font-headline text-4xl md:text-5xl font-extrabold text-on-surface">{t.home.theBigThree}</h2>
        </div>
        <a href="/zh/events" class="flex items-center gap-2 text-sm font-bold text-primary transition-all hover:gap-4 group">
          {t.common.fullLineupDetails}
          <span class="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
        </a>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
        <a href="/zh/events#siam" class="md:col-span-7 relative group overflow-hidden rounded-2xl block" style="min-height:380px;">
          <img src="/festival-siam-songkran.webp" alt="2026年曼谷暹罗宋干节" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="eager" fetchpriority="high" width="2000" height="1153" />
          <div class="absolute inset-0" style="background:linear-gradient(to top,rgba(0,51,69,0.97) 0%,rgba(0,51,69,0.55) 55%,rgba(0,51,69,0.2) 100%);"></div>
          <div class="absolute bottom-0 left-0 p-8 w-full">
            <span class="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3" style="background:rgba(93,216,247,0.25);color:#b0ecff;border:1px solid rgba(93,216,247,0.35);">{t.home.siamTag}</span>
            <h3 class="font-headline text-3xl md:text-4xl font-black text-white mb-2">Siam Songkran</h3>
            <p class="text-sm font-medium text-hero-text-dim">Martin Garrix · Marshmello · John Summit · ARTBAT</p>
            <div class="flex items-center gap-3 mt-4">
              <span class="text-xs px-3 py-1 rounded-full font-bold" style="background:rgba(255,142,178,0.25);color:#ffb8d0;">{t.home.siamNights}</span>
            </div>
          </div>
        </a>

        <div class="md:col-span-5 grid grid-rows-2 gap-6">
          <a href="/zh/events#s2o" class="relative group overflow-hidden rounded-2xl block" style="min-height:200px;">
            <img src="/festival-s2o.jpg" alt="2026年曼谷S2O宋干音乐节" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="eager" width="1440" height="555" />
            <div class="absolute inset-0" style="background:linear-gradient(to top,rgba(0,51,69,0.97) 0%,rgba(0,51,69,0.5) 55%,rgba(0,51,69,0.15) 100%);"></div>
            <div class="absolute bottom-0 left-0 p-6">
              <span class="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold mb-1" style="background:rgba(93,216,247,0.25);color:#b0ecff;">{t.home.s2oTag}</span>
              <h3 class="font-headline text-2xl font-black text-white">S2O Festival</h3>
              <p class="text-xs font-medium mt-1 text-hero-text-muted">Alan Walker × Steve Aoki · Zedd · Kygo</p>
            </div>
          </a>
          <a href="/zh/events#gcircuit" class="relative group overflow-hidden rounded-2xl block" style="min-height:200px;">
            <img src="/festival-gcircuit.jpg" alt="2026年曼谷GCircuit宋干LGBTQ+派对" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="eager" width="750" height="289" />
            <div class="absolute inset-0" style="background:linear-gradient(to top,rgba(76,29,149,0.97) 0%,rgba(76,29,149,0.6) 55%,rgba(180,0,93,0.25) 100%);"></div>
            <div class="absolute bottom-0 left-0 p-6">
              <span class="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold mb-1" style="background:rgba(255,142,178,0.25);color:#ffb8d0;border:1px solid rgba(255,142,178,0.35);"><span class="material-symbols-outlined text-[10px]" style="font-variation-settings:'FILL' 1;">diversity_3</span> {t.home.gcircuitTag}</span>
              <h3 class="font-headline text-2xl font-black text-white">GCircuit 20th</h3>
              <p class="text-xs font-medium mt-1" style="color:#ecc4d4;">{t.home.gcircuitSub}</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- ═══ QUICK LINKS ═══ -->
  <section class="px-6 py-12">
    <div class="section-inner grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <a href="/zh/events" class="card p-5 space-y-3 group block bg-surface-container-low cursor-pointer">
        <div class="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 bg-primary">
          <span class="material-symbols-outlined text-white text-lg" style="font-variation-settings:'FILL' 1;">calendar_month</span>
        </div>
        <h3 class="font-headline font-bold text-base text-on-surface">{t.home.allEventsTitle}</h3>
        <p class="text-sm text-content-muted">{t.home.allEventsDesc}</p>
        <div class="flex items-center gap-1 text-sm font-bold text-primary group-hover:gap-3 transition-all">
          {t.home.allEventsCta}
          <span class="material-symbols-outlined text-base transition-transform group-hover:translate-x-1">arrow_forward</span>
        </div>
      </a>

      <a href="/zh/survival-kit" class="card p-5 space-y-3 group block bg-secondary-on cursor-pointer">
        <div class="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 bg-secondary">
          <span class="material-symbols-outlined text-white text-lg" style="font-variation-settings:'FILL' 1;">checklist</span>
        </div>
        <h3 class="font-headline font-bold text-base text-on-surface">{t.home.survivalKitTitle}</h3>
        <p class="text-sm text-content-muted">{t.home.survivalKitDesc}</p>
        <div class="flex items-center gap-1 text-sm font-bold text-secondary group-hover:gap-3 transition-all">
          {t.home.survivalKitCta}
          <span class="material-symbols-outlined text-base transition-transform group-hover:translate-x-1">arrow_forward</span>
        </div>
      </a>

      <a href="/zh/heat-map" class="card p-5 space-y-3 group block cursor-pointer" style="background:rgba(255,59,48,0.04);">
        <div class="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style="background:#FF3B30;">
          <span class="material-symbols-outlined text-white text-lg" style="font-variation-settings:'FILL' 1;">local_fire_department</span>
        </div>
        <h3 class="font-headline font-bold text-base text-on-surface">{t.home.heatMapTitle}</h3>
        <p class="text-sm text-content-muted">{t.home.heatMapDesc}</p>
        <div class="flex items-center gap-1 text-sm font-bold group-hover:gap-3 transition-all" style="color:#FF3B30;">
          {t.home.heatMapCta}
          <span class="material-symbols-outlined text-base transition-transform group-hover:translate-x-1">arrow_forward</span>
        </div>
      </a>

      <a href="/zh/ai" class="card p-5 space-y-3 group block cursor-pointer" style="background:rgba(180,0,93,0.04);">
        <div class="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style="background:linear-gradient(135deg,#b4005d,#ff8eb2);">
          <span class="material-symbols-outlined text-white text-lg" style="font-variation-settings:'FILL' 1;">auto_awesome</span>
        </div>
        <h3 class="font-headline font-bold text-base text-on-surface">{t.home.aiPlannerTitle}</h3>
        <p class="text-sm text-content-muted">{t.home.aiPlannerDesc}</p>
        <div class="flex items-center gap-1 text-sm font-bold group-hover:gap-3 transition-all" style="color:#b4005d;">
          {t.home.aiPlannerCta}
          <span class="material-symbols-outlined text-base transition-transform group-hover:translate-x-1">arrow_forward</span>
        </div>
      </a>
    </div>
  </section>

  <!-- ═══ GUIDE SECTION ═══ -->
  <section class="section">
    <div class="section-inner">
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <h2 class="font-headline text-4xl md:text-5xl font-extrabold text-on-surface">{t.home.guideTitle}</h2>
        <a href="/zh/blog" class="flex items-center gap-2 text-sm font-bold text-primary transition-all hover:gap-4 group">
          {t.home.guideCta}
          <span class="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
        </a>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredArticles.map(article => (
          <a href={`/blog/${article.slug}`} class="card p-0 overflow-hidden group block">
            <div class="relative overflow-hidden" style="height:180px;">
              <img src={article.featuredImage} alt={article.title} width="1200" height="630" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
              <div class="absolute inset-0" style="background:linear-gradient(to top,rgba(0,51,69,0.7),transparent);"></div>
            </div>
            <div class="p-5 space-y-2">
              <span class="text-[10px] font-bold uppercase tracking-wider" style={`color:${article.categoryColor};`}>{article.category}</span>
              <h3 class="font-headline font-bold text-base leading-snug group-hover:text-primary transition-colors" style="color:#003345;">{article.h1}</h3>
              <span class="text-[10px]" style="color:#86b3cc;">{article.readTime} {t.blog.minRead}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>

</BaseLayout>

<script>
// Countdown — identical to EN homepage
const target = new Date('2026-04-10T00:00:00+07:00');
function update() {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) { ['days','hours','mins','secs'].forEach(id => { const el = document.getElementById('cd-' + id); if(el) el.textContent = '0'; }); return; }
  const d = Math.floor(diff/86400000);
  const h = Math.floor((diff%86400000)/3600000);
  const m = Math.floor((diff%3600000)/60000);
  const s = Math.floor((diff%60000)/1000);
  const set = (id: string, v: number) => { const el = document.getElementById(id); if(el) el.textContent = String(v).padStart(2,'0'); };
  set('cd-days', d); set('cd-hours', h); set('cd-mins', m); set('cd-secs', s);
}
update();
setInterval(update, 1000);
</script>
```

- [ ] Commit: `git add src/pages/zh/index.astro && git commit -m "feat(zh): add chinese homepage /zh"`

---

### Task 5: Chinese events page — /zh/events.astro

**Files:**
- Create: `src/pages/zh/events.astro`

- [ ] Create `src/pages/zh/events.astro` — copy `src/pages/events.astro` exactly, then:
  - Change imports to use `../` relative paths (`../../components/...`, `../../data/...`)
  - Add `import { zh } from '../../data/zh';` and `const t = zh;`
  - Update `<BaseLayout>` to add `lang="zh" enUrl="https://bkksongkran.com/events" canonical="https://bkksongkran.com/zh/events"`
  - Replace all user-visible strings (page label, h1 words, intro paragraph, jump link labels, intensity labels) with `t.events.*`
  - Add Breadcrumb with Chinese labels: `crumbs={[{ label: "首页", href: "/zh" }, { label: "活动" }]}`
  - Keep all data, event cards, and schema identical — only translate text
  - All internal links in the page body stay as `/events#...` (these are anchor links to sections on the same page)

- [ ] Commit: `git add src/pages/zh/events.astro && git commit -m "feat(zh): add chinese events page /zh/events"`

---

### Task 6: Chinese blog index — /zh/blog/index.astro

**Files:**
- Create: `src/pages/zh/blog/index.astro`

- [ ] Create `src/pages/zh/blog/index.astro` — mirror `src/pages/blog/index.astro`:
  - Import paths: `../../../components/...`, `../../../data/...`
  - Add `import { zh } from '../../../data/zh';`
  - Update BaseLayout: `lang="zh" enUrl="https://bkksongkran.com/blog" canonical="https://bkksongkran.com/zh/blog"`
  - Replace all UI strings with `t.blog.*`
  - Article links point to English blog posts (`/blog/${article.slug}`) — no need to translate articles at this stage
  - Add Breadcrumb: `crumbs={[{ label: "首页", href: "/zh" }, { label: "攻略" }]}`

- [ ] Commit: `git add src/pages/zh/blog/index.astro && git commit -m "feat(zh): add chinese blog index /zh/blog"`

---

### Task 7: Chinese survival kit — /zh/survival-kit.astro

**Files:**
- Create: `src/pages/zh/survival-kit.astro`

- [ ] Create `src/pages/zh/survival-kit.astro` — mirror `src/pages/survival-kit.astro`:
  - Import paths: `../../components/...`, `../../data/...`
  - Add `import { zh } from '../../data/zh';`
  - Update BaseLayout with lang/enUrl/canonical
  - Replace page label, h1, intro with `t.survivalKit.*`
  - Checklist item labels come from `src/data/index.ts` (English) — leave them as-is for now; translating data is out of scope
  - Add Breadcrumb: `crumbs={[{ label: "首页", href: "/zh" }, { label: "生存指南" }]}`

- [ ] Commit: `git add src/pages/zh/survival-kit.astro && git commit -m "feat(zh): add chinese survival kit /zh/survival-kit"`

---

### Task 8: Chinese AI page — /zh/ai.astro

**Files:**
- Create: `src/pages/zh/ai.astro`

- [ ] Create `src/pages/zh/ai.astro` — mirror `src/pages/ai.astro`:
  - Import paths: `../../components/...`
  - Add `import { zh } from '../../data/zh';`
  - Update BaseLayout with lang/enUrl/canonical
  - Replace all visible UI strings (page label, Meet Nong intro, chat placeholder, send button) with `t.ai.*`
  - The chat input and API call (`/api/chat`) remain identical — the OpenAI system prompt is server-side and already handles multiple languages
  - Add Breadcrumb: `crumbs={[{ label: "首页", href: "/zh" }, { label: "AI向导" }]}`

- [ ] Commit: `git add src/pages/zh/ai.astro && git commit -m "feat(zh): add chinese AI page /zh/ai"`

---

### Task 9: Chinese meetup page — /zh/meetup.astro

**Files:**
- Create: `src/pages/zh/meetup.astro`

- [ ] Create `src/pages/zh/meetup.astro` — mirror `src/pages/meetup.astro`:
  - Import paths: `../../components/...`
  - Add `import { zh } from '../../data/zh';`
  - Update BaseLayout with lang/enUrl/canonical
  - Replace page label, h1, intro paragraph with `t.meetup.*`
  - All Supabase logic, form fields, and interactive JS remain identical
  - Add Breadcrumb: `crumbs={[{ label: "首页", href: "/zh" }, { label: "谁要去？" }]}`

- [ ] Commit: `git add src/pages/zh/meetup.astro && git commit -m "feat(zh): add chinese meetup page /zh/meetup"`

---

## Chunk 3: SEO + nav wiring + sitemap

### Task 10: Update Navbar zh-aware links

**Files:**
- Modify: `src/components/organisms/Navbar.astro`

- [ ] Make the nav links zh-aware — when on a `/zh/*` path, all nav links should point to `/zh/*` equivalents:

```ts
const zhLinks = [
  { label: '首页',     href: '/zh' },
  { label: '活动',     href: '/zh/events' },
  { label: '攻略',     href: '/zh/blog' },
  { label: '票务交换', href: '/tickets' },       // no zh version yet
  { label: '生存指南', href: '/zh/survival-kit' },
  { label: '曼谷地图', href: '/map' },           // no zh version yet
  { label: '热力图',   href: '/zh/heat-map' },   // redirects to /heat-map
];

const activeLinks = isZh ? zhLinks : links;
```

  Replace `links.map(...)` with `activeLinks.map(...)` in both desktop and mobile nav.

  Note: Pages without zh versions (`/tickets`, `/map`, `/heat-map`) link to the English version.

- [ ] Commit: `git add src/components/organisms/Navbar.astro && git commit -m "feat(zh): wire navbar to use zh links on zh pages"`

---

### Task 11: Update sitemap

**Files:**
- Modify: `public/sitemap.xml`

- [ ] Add zh URL entries to `public/sitemap.xml` for all 6 new pages:

```xml
<url>
  <loc>https://bkksongkran.com/zh</loc>
  <changefreq>weekly</changefreq>
  <priority>0.9</priority>
</url>
<url>
  <loc>https://bkksongkran.com/zh/events</loc>
  <changefreq>weekly</changefreq>
  <priority>0.8</priority>
</url>
<url>
  <loc>https://bkksongkran.com/zh/blog</loc>
  <changefreq>weekly</changefreq>
  <priority>0.7</priority>
</url>
<url>
  <loc>https://bkksongkran.com/zh/survival-kit</loc>
  <changefreq>monthly</changefreq>
  <priority>0.7</priority>
</url>
<url>
  <loc>https://bkksongkran.com/zh/ai</loc>
  <changefreq>monthly</changefreq>
  <priority>0.6</priority>
</url>
<url>
  <loc>https://bkksongkran.com/zh/meetup</loc>
  <changefreq>daily</changefreq>
  <priority>0.6</priority>
</url>
```

- [ ] Commit: `git add public/sitemap.xml && git commit -m "feat(zh): add zh pages to sitemap"`

---

### Task 12: Smoke test

- [ ] Run dev server: `npm run dev`
- [ ] Visit `http://localhost:4321/zh` — verify Chinese text renders, countdown works, language switcher shows "🇬🇧 EN"
- [ ] Visit `http://localhost:4321/` — verify switcher shows "🇨🇳 中文", clicking it goes to `/zh`
- [ ] Visit `http://localhost:4321/zh/events` — verify Chinese labels, breadcrumb shows 首页 / 活动
- [ ] Visit `http://localhost:4321/zh/blog` — verify Chinese labels, articles load
- [ ] Visit `http://localhost:4321/zh/survival-kit` — verify page label and h1 in Chinese
- [ ] Visit `http://localhost:4321/zh/ai` — verify Chinese UI, chat still works
- [ ] Visit `http://localhost:4321/zh/meetup` — verify Chinese header, form still works
- [ ] Check `<html lang="zh-Hans">` is set on zh pages (view source)
- [ ] Check hreflang tags appear in `<head>` on both en and zh versions
- [ ] Commit any fixes: `git commit -m "fix(zh): smoke test fixes"`
