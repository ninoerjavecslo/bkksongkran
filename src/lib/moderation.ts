/**
 * Server-side content moderation for tickets and meetup entries.
 * All checks run on the server — client-side validation is UX-only and cannot be trusted.
 */

// ── Bad words ────────────────────────────────────────────────────────────────
// Keep short — focus on content clearly inappropriate for a festival community board.
const BAD_WORDS = [
  'fuck', 'shit', 'cunt', 'bitch', 'asshole', 'nigger', 'nigga', 'faggot',
  'retard', 'whore', 'slut', 'bastard', 'dick', 'cock', 'pussy', 'motherfuck',
  'kys', 'kill yourself', 'rape',
];

// ── Fraud / scam patterns ────────────────────────────────────────────────────
const FRAUD_PATTERNS: RegExp[] = [
  // Crypto payment demands
  /\b(bitcoin|btc|eth|ethereum|usdt|crypto|binance|coinbase|metamask|wallet\s*address)\b/i,
  // Gift card scams
  /\b(gift\s*card|itunes|google\s*play\s*card|amazon\s*card|steam\s*card)\b/i,
  // Wire transfer pressure
  /\b(wire\s*transfer|western\s*union|moneygram|zelle|cashapp|venmo|paypal\.me)\b/i,
  // Urgency + price manipulation
  /\b(act\s*now|limited\s*time|expires?\s*soon|last\s*chance|today\s*only)\b/i,
  // Guaranteed profit / 100% safe claims
  /\b(guaranteed|100%\s*safe|no\s*risk|risk.?free|trusted\s*seller|verified\s*seller)\b/i,
  // Phishing-style link patterns
  /https?:\/\//i,
  /www\./i,
  /\.(com|net|io|xyz|ru|me|tk|cc|info)\b/i,
  // URL shorteners used in scams
  /\b(bit\.ly|tinyurl|t\.co|goo\.gl|rb\.gy|shorturl|cutt\.ly)\b/i,
  // Placeholder scam phrases
  /\b(send\s+first|pay\s+first|pay\s*upfront|50%\s*deposit|full\s*payment\s+before)\b/i,
  // Fake ticket promises
  /\b(e-?ticket|digital\s*ticket|screenshot\s*ticket|pdf\s*ticket|i\s*can\s*transfer)\b/i,
  // Multi-level / referral spam
  /\b(referral|affiliate|commission|join\s*my\s*team|earn\s*money|make\s*money)\b/i,
];

// ── Promo / advertising patterns (not allowed on community boards) ───────────
// Applied to both tickets and meetup entries.
const PROMO_PATTERNS: RegExp[] = [
  /\b(guestlist|guest\s*list)\b/i,
  /\b(bottle\s*service|vip\s*table|table\s*booking)\b/i,
  /\b(club\s*promo|event\s*promo|official\s*seller|authorised\s*seller)\b/i,
  /\b(free\s*ticket|comp\s*ticket|complimentary)\b/i,
  /\b(linktree|linktr\.ee)\b/i,
];

// ── Meetup-only promo patterns ────────────────────────────────────────────────
// "discount / deal / promo code" are spam in meetup context but legitimate in
// ticket listings (e.g. "selling below face value, slight discount").
const MEETUP_PROMO_PATTERNS: RegExp[] = [
  /\b(promo|promotion|discount|coupon|promo\s*code)\b/i,
  /\d{2,}%\s*off/i,
  /฿\d+.*\b(deal|special|offer)\b/i,
];

// ── Helpers ──────────────────────────────────────────────────────────────────

function normalise(text: string): string {
  return text
    .toLowerCase()
    // collapse leet-speak substitutions: @ → a, 3 → e, 0 → o, 1 → i/l, $ → s
    .replace(/@/g, 'a').replace(/3/g, 'e').replace(/0/g, 'o')
    .replace(/1/g, 'i').replace(/\$/g, 's').replace(/5/g, 's')
    // strip repeated punctuation used to bypass filters (f.u.c.k → fuck)
    .replace(/[.\-_*|]+/g, '');
}

function containsBadWord(text: string): boolean {
  const norm = normalise(text);
  return BAD_WORDS.some(w => {
    // Word-boundary match on normalised text
    const re = new RegExp(`(?<![a-z])${w.replace(/\s+/g, '\\s*')}(?![a-z])`, 'i');
    return re.test(norm);
  });
}

function containsFraud(text: string): boolean {
  return FRAUD_PATTERNS.some(p => p.test(text));
}

function containsPromo(text: string, includeMeetupPatterns = false): boolean {
  if (PROMO_PATTERNS.some(p => p.test(text))) return true;
  if (includeMeetupPatterns && MEETUP_PROMO_PATTERNS.some(p => p.test(text))) return true;
  return false;
}

// ── Public API ───────────────────────────────────────────────────────────────

export type ModerationResult =
  | { ok: true }
  | { ok: false; reason: string };

/**
 * Moderate ticket listing fields.
 * Checks: bad language, fraud signals, external links.
 * Contact field (Telegram/Instagram/WhatsApp handle) is exempted from promo checks
 * since handles may contain common words.
 */
export function moderateTicket(fields: {
  note?: string;
  tier?: string;
  contact?: string;
}): ModerationResult {
  const { note = '', tier = '', contact = '' } = fields;

  for (const [label, value] of [['note', note], ['tier', tier]] as [string, string][]) {
    if (containsBadWord(value))
      return { ok: false, reason: `Your ${label} contains language that isn't allowed.` };
    if (containsFraud(value))
      return { ok: false, reason: `Your ${label} contains content that looks fraudulent (links, crypto, payment pressure). Remove it and try again.` };
    if (containsPromo(value))
      return { ok: false, reason: `Your ${label} looks like an advertisement. This board is for peer-to-peer ticket exchange only.` };
  }

  // Contact: only check for fraud (URLs, crypto) — not promo
  if (containsBadWord(contact))
    return { ok: false, reason: 'Your contact info contains language that isn\'t allowed.' };
  if (containsFraud(contact))
    return { ok: false, reason: 'Your contact info contains a link or payment service that isn\'t allowed. Enter your handle or number only.' };

  return { ok: true };
}

/**
 * Moderate meetup entry fields.
 * name, note, event_name are all checked.
 */
export function moderateMeetup(fields: {
  name?: string;
  note?: string;
  event_name?: string;
}): ModerationResult {
  const { name = '', note = '', event_name = '' } = fields;

  for (const [label, value] of [
    ['name', name],
    ['event name', event_name],
    ['note', note],
  ] as [string, string][]) {
    if (containsBadWord(value))
      return { ok: false, reason: `Your ${label} contains language that isn't allowed.` };
    if (containsFraud(value))
      return { ok: false, reason: `Your ${label} contains links or payment content that isn't allowed.` };
  }

  // Promo check only on event_name and note — not personal name
  // includeMeetupPatterns=true: also blocks discount/deal/promo codes which are
  // legitimate in ticket listings but are spam in the meetup context.
  for (const [label, value] of [['event name', event_name], ['note', note]] as [string, string][]) {
    if (containsPromo(value, true))
      return { ok: false, reason: `Your ${label} looks like an advertisement. This space is for personal meetups only.` };
  }

  return { ok: true };
}
