export const prerender = false;

import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabase';
import { moderateMeetup } from '../../lib/moderation';
import { verifyTurnstile } from '../../lib/turnstile';
import { json, DB_ERROR } from '../../lib/api';
import { MEETUP_DAYS } from '../../data/meetup';

const ALLOWED_DAYS = MEETUP_DAYS.map(d => d.id);
const ALLOWED_CATS = ['pre-drinks', 'afterparty', 'meetup', 'other'];

// Rate limiter: max 10 meetup entries per IP per hour
const rateMap = new Map<string, { count: number; reset: number }>();
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.reset) { rateMap.set(ip, { count: 1, reset: now + 3_600_000 }); return false; }
  if (entry.count >= 10) return true;
  entry.count++;
  return false;
}

const str = (v: unknown, max: number) => String(v ?? '').trim().slice(0, max);

export const POST: APIRoute = async ({ request }) => {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown';
    if (isRateLimited(ip)) return json({ error: 'Too many requests — try again later.' }, 429);

    let body: any;
    try { body = await request.json(); } catch { return json({ error: 'Invalid request.' }, 400); }

    const { name, party, day, note, event_name, is_custom, category, email, turnstileToken } = body;

    // Turnstile — required for custom events (which expose more data publicly)
    // Regular party sign-ups are protected by rate limiting + moderation instead
    if (is_custom) {
      if (!turnstileToken) return json({ error: 'Security check required.' }, 403);
      const turnstileOk = await verifyTurnstile(String(turnstileToken), ip);
      if (!turnstileOk) return json({ error: 'Security check failed. Please try again.' }, 403);
    }

    // Required fields
    if (!name || !party || !day) return json({ error: 'Missing required fields.' }, 400);

    // Allowlist validation
    if (!ALLOWED_DAYS.includes(day)) return json({ error: 'Invalid day.' }, 400);
    if (is_custom) {
      if (!event_name) return json({ error: 'Event name is required.' }, 400);
      if (category && !ALLOWED_CATS.includes(category)) return json({ error: 'Invalid category.' }, 400);
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
        return json({ error: 'A valid email is required for custom events.' }, 400);
    }

    // Length caps (defence in depth — RLS also enforces these)
    const safeName       = str(name, 30);
    const safeNote       = str(note, 300);
    const safeEventName  = str(event_name, 60);
    const safeEmail      = str(email, 254);

    if (!safeName) return json({ error: 'Name is required.' }, 400);

    // Content moderation
    const mod = moderateMeetup({ name: safeName, note: safeNote, event_name: safeEventName });
    if (!mod.ok) return json({ error: mod.reason }, 422);

    // Write to Supabase
    const payload: Record<string, unknown> = {
      name:       safeName,
      party:      str(party, 80),
      day,
      note:       safeNote || null,
      is_custom:  Boolean(is_custom),
    };
    if (is_custom) {
      payload.event_name = safeEventName;
      payload.category   = category || 'other';
      payload.email      = safeEmail;
    }

    const { data, error } = await supabase
      .from('meetup_entries')
      .insert(payload)
      .select()
      .single();

    if (error) {
      console.error('Meetup insert error:', error);
      return json({ error: DB_ERROR }, 500);
    }
    return json(data, 201);
  } catch (err) {
    console.error('Meetup API error:', err);
    return json({ error: 'Server error. Please try again later.' }, 500);
  }
};
