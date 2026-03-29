export const prerender = false;

import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabase';
import { moderateTicket } from '../../lib/moderation';

const ALLOWED_FESTIVALS    = ['S2O', 'Siam Songkran', 'GCircuit', 'Other'];
const ALLOWED_TYPES        = ['selling', 'buying'];
const ALLOWED_CONTACT_TYPES = ['telegram', 'line', 'whatsapp', 'instagram'];

// Rate limiter: max 5 POSTs per IP per hour
const postRateMap = new Map<string, { count: number; reset: number }>();
function isPostRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = postRateMap.get(ip);
  if (!entry || now > entry.reset) { postRateMap.set(ip, { count: 1, reset: now + 3_600_000 }); return false; }
  if (entry.count >= 5) return true;
  entry.count++;
  return false;
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } });
}

// GET — return listings without email / contact / delete_token
export const GET: APIRoute = async () => {
  const { data, error } = await supabase
    .from('tickets')
    .select('id, type, festival, dates, tier, quantity, price, contact_type, note, created_at')
    .order('created_at', { ascending: false });

  if (error) return json({ error: error.message }, 500);
  return json(data);
};

// POST — create listing, return delete link token
export const POST: APIRoute = async ({ request }) => {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown';
  if (isPostRateLimited(ip)) return json({ error: 'Too many requests — try again later' }, 429);

  let body: any;
  try { body = await request.json(); } catch { return json({ error: 'Invalid JSON' }, 400); }

  const { type, festival, dates, tier, quantity, price, contact, contact_type, email, note } = body;

  const isBuying = type === 'buying';
  if (!type || !festival || !dates || !tier || !quantity || (!isBuying && !price) || !contact || !contact_type || !email)
    return json({ error: 'Missing required fields' }, 400);

  if (!ALLOWED_TYPES.includes(type))         return json({ error: 'Invalid type' }, 400);
  if (!ALLOWED_FESTIVALS.includes(festival)) return json({ error: 'Invalid festival' }, 400);
  if (!ALLOWED_CONTACT_TYPES.includes(contact_type)) return json({ error: 'Invalid contact_type' }, 400);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ error: 'Invalid email' }, 400);

  const str = (v: unknown, max: number) => String(v ?? '').slice(0, max);
  const qty = Math.min(Math.max(1, Number(quantity)), 20);
  const prc = isBuying ? 0 : Math.min(Math.max(0, Number(price)), 999_999);
  if (isNaN(qty) || isNaN(prc)) return json({ error: 'Invalid quantity or price' }, 400);

  const mod = moderateTicket({ note: str(note, 500), tier: str(tier, 100), contact: str(contact, 200) });
  if (!mod.ok) return json({ error: mod.reason }, 422);

  const { data, error } = await supabase
    .from('tickets')
    .insert({
      type,
      festival,
      dates:        str(dates, 100),
      tier:         str(tier, 100),
      quantity:     qty,
      price:        prc,
      contact:      str(contact, 200),
      contact_type,
      email:        str(email, 254),
      note:         str(note, 500),
    })
    .select('id, delete_token')
    .single();

  if (error) return json({ error: error.message }, 500);

  // Return the delete token — frontend shows a link the user can bookmark/email
  return json({ id: data.id, deleteToken: data.delete_token }, 201);
};

// DELETE — remove listing by id + delete_token
export const DELETE: APIRoute = async ({ url }) => {
  const id          = url.searchParams.get('id');
  const deleteToken = url.searchParams.get('token');

  if (!id || !deleteToken) return json({ error: 'Missing id or token' }, 400);

  const { data: ticket, error: fetchErr } = await supabase
    .from('tickets')
    .select('id, delete_token')
    .eq('id', id)
    .single();

  if (fetchErr || !ticket) return json({ error: 'Listing not found' }, 404);
  if (ticket.delete_token !== deleteToken) return json({ error: 'Invalid token' }, 403);

  const { error } = await supabase.from('tickets').delete().eq('id', id);
  if (error) return json({ error: error.message }, 500);

  return json({ success: true });
};
