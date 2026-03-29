export const prerender = false;

import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabase';

// Rate limiter: max 30 reveals per IP per hour
const revealRateMap = new Map<string, { count: number; reset: number }>();
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = revealRateMap.get(ip);
  if (!entry || now > entry.reset) { revealRateMap.set(ip, { count: 1, reset: now + 3_600_000 }); return false; }
  if (entry.count >= 30) return true;
  entry.count++;
  return false;
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } });
}

// POST — given a valid email, return ALL contacts (one-time unlock stored client-side)
export const POST: APIRoute = async ({ request }) => {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown';
  if (isRateLimited(ip)) return json({ error: 'Too many requests — try again later' }, 429);

  let body: any;
  try { body = await request.json(); } catch { return json({ error: 'Invalid JSON' }, 400); }

  const { email, turnstileToken } = body;
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return json({ error: 'Valid email required' }, 400);

  // Turnstile verification
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

  // Fetch all contacts
  const { data: tickets, error } = await supabase
    .from('tickets')
    .select('id, contact, contact_type')
    .order('created_at', { ascending: false });

  if (error) return json({ error: error.message }, 500);

  // Return map of id → { contact, contact_type }
  const contacts: Record<string, { contact: string; contact_type: string }> = {};
  for (const t of tickets ?? []) {
    contacts[t.id] = { contact: t.contact, contact_type: t.contact_type };
  }

  return json({ contacts });
};
