export const prerender = false;

import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabase';

const rateMap = new Map<string, { count: number; reset: number }>();
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.reset) { rateMap.set(ip, { count: 1, reset: now + 3_600_000 }); return false; }
  if (entry.count >= 10) return true;
  entry.count++;
  return false;
}

const KNOWN_PROVIDERS = /^[^\s@]+@(gmail|googlemail|yahoo|ymail|outlook|hotmail|live|msn|icloud|me|mac|proton|protonmail|fastmail|hey|aol|zoho)\.(com|co\.uk|fr|de|es|it|nl|be|ch|at|ca|com\.au|co\.nz|co\.za|co\.in|co\.jp|com\.br|co\.id)$/i;

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } });
}

export const POST: APIRoute = async ({ request }) => {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown';
  if (isRateLimited(ip)) return json({ error: 'Too many requests — try again later.' }, 429);

  let body: any;
  try { body = await request.json(); } catch { return json({ error: 'Invalid request.' }, 400); }

  const { email, turnstileToken, newsletter } = body;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return json({ error: 'Please enter a valid email address.' }, 400);

  if (!KNOWN_PROVIDERS.test(email))
    return json({ error: 'Please use a real email provider (Gmail, Outlook, Yahoo, iCloud, etc.).' }, 400);

  const secret = import.meta.env.TURNSTILE_SECRET_KEY;
  if (secret) {
    if (!turnstileToken) return json({ error: 'Bot check required.' }, 403);
    const tsRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret, response: turnstileToken, remoteip: ip }),
    });
    const tsData: any = await tsRes.json();
    if (!tsData.success) return json({ error: 'Bot check failed. Please try again.' }, 403);
  }

  // Store in subscribers table if they opted in (upsert to avoid duplicates)
  if (newsletter === true) {
    await supabase.from('subscribers').upsert(
      { email: email.toLowerCase().trim(), source: 'meetup_unlock', newsletter: true },
      { onConflict: 'email', ignoreDuplicates: false }
    );
  }

  return json({ ok: true });
};
