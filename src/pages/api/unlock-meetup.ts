export const prerender = false;

import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabase';
import { verifyTurnstile } from '../../lib/turnstile';
import { json } from '../../lib/api';

const rateMap = new Map<string, { count: number; reset: number }>();
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.reset) { rateMap.set(ip, { count: 1, reset: now + 3_600_000 }); return false; }
  if (entry.count >= 10) return true;
  entry.count++;
  return false;
}

// Domain must be at least 3 chars, TLD at least 2 chars — blocks s.com, a.io etc.
const VALID_EMAIL_DOMAIN = /^[^\s@]+@[a-zA-Z0-9]([a-zA-Z0-9\-]{1,})[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;

export const POST: APIRoute = async ({ request }) => {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown';
    if (isRateLimited(ip)) return json({ error: 'Too many requests — try again later.' }, 429);

    let body: any;
    try { body = await request.json(); } catch { return json({ error: 'Invalid request.' }, 400); }

    const { email, turnstileToken, newsletter } = body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return json({ error: 'Please enter a valid email address.' }, 400);

    if (!VALID_EMAIL_DOMAIN.test(email))
      return json({ error: 'Please enter a valid email (e.g. you@gmail.com or you@company.com).' }, 400);

    if (!turnstileToken) return json({ error: 'Bot check required.' }, 403);
    const turnstileOk = await verifyTurnstile(String(turnstileToken), ip);
    if (!turnstileOk) return json({ error: 'Bot check failed. Please try again.' }, 403);

    // Store in subscribers table if they opted in (upsert to avoid duplicates)
    // Best-effort: don't fail if newsletter signup doesn't work
    if (newsletter === true) {
      try {
        await supabase.from('subscribers').upsert(
          { email: email.toLowerCase().trim(), source: 'meetup_unlock', newsletter: true },
          { onConflict: 'email', ignoreDuplicates: false }
        );
      } catch (err) {
        console.error('Newsletter signup error:', err);
        // Don't fail the request on newsletter error
      }
    }

    return json({ ok: true });
  } catch (err) {
    console.error('Unlock meetup API error:', err);
    return json({ error: 'Server error. Please try again later.' }, 500);
  }
};
