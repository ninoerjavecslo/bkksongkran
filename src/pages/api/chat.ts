export const prerender = false;

import type { APIRoute } from 'astro';
import OpenAI from 'openai';
import { verifyTurnstile } from '../../lib/turnstile';

const openai = new OpenAI({ apiKey: import.meta.env.OPENAI_API_KEY });

// ── Rate limiting ─────────────────────────────────────────────
// Per-IP: max 10 requests per minute + 50 per day
interface IpRecord {
  minuteCount: number;
  minuteReset: number;
  dayCount: number;
  dayReset: number;
}
const ipMap = new Map<string, IpRecord>();

function checkRateLimit(ip: string): { blocked: boolean; reason?: string } {
  const now = Date.now();
  let rec = ipMap.get(ip);
  if (!rec) {
    rec = { minuteCount: 0, minuteReset: now + 60_000, dayCount: 0, dayReset: now + 86_400_000 };
    ipMap.set(ip, rec);
  }

  // Reset windows if expired
  if (now > rec.minuteReset) { rec.minuteCount = 0; rec.minuteReset = now + 60_000; }
  if (now > rec.dayReset)    { rec.dayCount = 0;    rec.dayReset = now + 86_400_000; }

  if (rec.minuteCount >= 10) return { blocked: true, reason: 'Too many requests — wait a minute.' };
  if (rec.dayCount >= 50)    return { blocked: true, reason: 'Daily limit reached. Come back tomorrow!' };

  rec.minuteCount++;
  rec.dayCount++;
  return { blocked: false };
}

// Cleanup old entries every hour to prevent memory growth
setInterval(() => {
  const now = Date.now();
  for (const [ip, rec] of ipMap) {
    if (now > rec.dayReset) ipMap.delete(ip);
  }
}, 3_600_000);

// ── Allowed origins ───────────────────────────────────────────
const ALLOWED_ORIGINS = [
  'https://bkksongkran.com',
  'https://www.bkksongkran.com',
];

const SYSTEM_PROMPT = `You are Nong, a warm, fun, and knowledgeable Songkran 2026 festival guide AI. You are embedded in bkksongkran.com, a Bangkok Songkran festival website.

CONFIRMED 2026 LINEUPS:

S2O Songkran 2026 (Apr 11-13, S2O Land, Ratchada Rd, MRT Thailand Cultural Centre, ฿1,800-2,500):
- Apr 11: AC Slater → William Black → I Hate Models → Lost Frequencies → Alan Walker × Steve Aoki HEADLINER ("Lonely Club" world premiere)
- Apr 12: Marie Vaunt → Dabin → SIDEPIECE → Don Diablo (CTRL ALT DELETE Asia debut) → Zedd HEADLINER
- Apr 13: Da Tweekaz → Ray Volpe → GRYFFIN → Kygo HEADLINER

Siam Songkran "The Melora" 2026 (Apr 11-14, Bravo BKK Arena, RCA, ฿1,500-2,000):
- Apr 11: 22Bullets → Andromedik → Ben Nicky → Afrojack b2b R3HAB HEADLINER
- Apr 12: Arcando → Slushii → Third Party b3b DubVision b3b Matisse&Sadko → Alok (Urban Theory Show) → Marshmello HEADLINER
- Apr 13: Layton Giordani → Agents of Time → ARTBAT b2b R3HAB → Martin Garrix HEADLINER (world #1)
- Apr 14: DCR Milda → Gorgon City → Vini Vici → John Summit HEADLINER

GCircuit Songkran 2026 - 20th Anniversary "ADRO-MADA: City of Tomorrow" (Apr 10-13, UOB Live Hall + Tribe Sky Beach Club, Emsphere, BTS Phrom Phong, ฿2,800-4,900):
- Apr 10 (Illuminate Opening, Theme: Chrome/Tactical): TAKI & RITA → Mario Beckman HEADLINER → Allan Natal
- Apr 11 (Boy Pool Party noon-7pm at Tribe Sky Beach Club, Theme: Galactic Royalty): CHU & SUN JUNE → Luis Vazquez HEADLINER → Alex Ramos
- Apr 12 (Bear Pool Party/AquaXXL noon-7pm, Theme: Silver/Chrome/Glow): Grant Jang → Tomer Maizner HEADLINER → Sagi Kariv
- Apr 13 (Automata Closing, Theme: Kinky/Leather): Herric Pu → Isak Salazar → Tom Stephan HEADLINER (closing set)

LGBTQ+ SCENE:
- Silom Soi 2 & 4: Bangkok's gay epicenter, free, incredible Apr 13-15, bars open noon
- GCircuit: Asia's biggest gay circuit party, inclusive regardless of age/looks/body
- DJ Station: Drag shows 11pm and 1am, ฿200-350
- Bangkok Songkran Bear Week (BSBW): Apr 10-16, Silom area and Royal Orchid Sheraton
- 2026: First year alcohol sales from 11am (new Thai law, previously restricted 2-5pm)

PRACTICAL INFO:
- S2O new venue: S2O Land, Ratchada Rd, MRT Thailand Cultural Centre (new larger site)
- Hotels near GCircuit: Hilton Sukhumvit, DoubleTree Sukhumvit (3-5 min walk), Novotel Sukhumvit 20
- Hotels near S2O: near MRT Thailand Cultural Centre / Ratchada
- Hotels near Siam Songkran: near MRT Phetchaburi or Asoke
- All major ticketed events 20+, original passport required, no photo copies
- Transport: BTS/MRT only during Songkran — taxis are chaos
- Street water fights peak Apr 13-15
- Free events: Silom, Khao San, Siam Square, Maha Songkran (Sanam Luang)
- LGBTQ+ street: Silom Soi 2 & 4 starts around noon Apr 13

YOUR PERSONALITY:
- Warm, fun, slightly cheeky, use occasional Thai (krap, sawadee, sanook=fun, sabai=chill)
- Give specific, actionable advice
- Be openly welcoming about LGBTQ+ scene
- Format with line breaks for readability
- Keep under 200 words unless a full day plan is requested
- For day plans, be detailed and specific with times`;

function jsonError(message: string, status: number) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export const POST: APIRoute = async ({ request }) => {
  const TURNSTILE_SECRET = import.meta.env.TURNSTILE_SECRET;
  try {
    // ── Origin check (blocks direct API hammering from scripts) ──
    const origin = request.headers.get('origin') ?? '';
    if (origin && !ALLOWED_ORIGINS.includes(origin)) {
      return jsonError('Forbidden', 403);
    }

    // ── IP rate limit ─────────────────────────────────────────
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown';
    const { blocked, reason } = checkRateLimit(ip);
    if (blocked) return jsonError(reason!, 429);

    // ── Parse & validate body ─────────────────────────────────
    let body: any;
    try { body = await request.json(); } catch { return jsonError('Invalid JSON', 400); }

    // ── Turnstile verification ────────────────────────────────
    const { messages, turnstileToken } = body;
    if (TURNSTILE_SECRET) {
      if (!turnstileToken) return jsonError('Bot check required.', 403);
      const valid = await verifyTurnstile(turnstileToken, ip);
      if (!valid) return jsonError('Bot check failed. Please try again.', 403);
    }
    if (!Array.isArray(messages) || messages.length === 0 || messages.length > 10) {
      return jsonError('Invalid request', 400);
    }

    // Sanitize: only user/assistant roles, max 500 chars per message
    const safeMessages = messages.map((m: any) => ({
      role: m.role === 'user' ? 'user' : 'assistant' as const,
      content: String(m.content ?? '').slice(0, 500),
    }));

    // ── OpenAI call ───────────────────────────────────────────
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',   // cheaper, fast enough for this use case
      max_tokens: 400,         // ~300 words max output
      temperature: 0.7,
      messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...safeMessages],
    });

    const reply = completion.choices[0]?.message?.content || 'Something went wrong — try again!';
    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    console.error('[chat API error]', err?.message ?? err);
    return jsonError('Service temporarily unavailable. Please try again later.', 500);
  }
};
