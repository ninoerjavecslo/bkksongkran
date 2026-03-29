export const prerender = false;

import type { APIRoute } from 'astro';
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const DATA_PATH = join(process.cwd(), 'data', 'tickets.json');

const ALLOWED_FESTIVALS = ['S2O', 'Siam Songkran', 'GCircuit', 'Other'];
const ALLOWED_TYPES = ['selling', 'buying'];
const ALLOWED_CONTACT_TYPES = ['telegram', 'line', 'whatsapp', 'email'];

// Rate limiter: max 5 POSTs per IP per hour
const postRateMap = new Map<string, { count: number; reset: number }>();
function isPostRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = postRateMap.get(ip);
  if (!entry || now > entry.reset) {
    postRateMap.set(ip, { count: 1, reset: now + 3_600_000 });
    return false;
  }
  if (entry.count >= 5) return true;
  entry.count++;
  return false;
}

function readTickets() {
  try {
    return JSON.parse(readFileSync(DATA_PATH, 'utf-8'));
  } catch {
    return [];
  }
}

function writeTickets(tickets: any[]) {
  writeFileSync(DATA_PATH, JSON.stringify(tickets, null, 2));
}

export const GET: APIRoute = async () => {
  const tickets = readTickets().map((t: any) => {
    const { email, contact, contactType, ...rest } = t;
    return { ...rest, contactType };
  });
  return new Response(JSON.stringify(tickets), {
    headers: { 'Content-Type': 'application/json' },
  });
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown';
    if (isPostRateLimited(ip)) {
      return new Response(JSON.stringify({ error: 'Too many requests — try again later' }), { status: 429 });
    }

    const body = await request.json();
    const { type, festival, dates, tier, quantity, price, contact, contactType, email, note } = body;

    if (!type || !festival || !dates || !tier || !quantity || !price || !contact || !contactType || !email) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    // Allowlist validation
    if (!ALLOWED_TYPES.includes(type)) {
      return new Response(JSON.stringify({ error: 'Invalid type' }), { status: 400 });
    }
    if (!ALLOWED_FESTIVALS.includes(festival)) {
      return new Response(JSON.stringify({ error: 'Invalid festival' }), { status: 400 });
    }
    if (!ALLOWED_CONTACT_TYPES.includes(contactType)) {
      return new Response(JSON.stringify({ error: 'Invalid contactType' }), { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email' }), { status: 400 });
    }

    // Length limits
    const str = (v: unknown, max: number) => String(v ?? '').slice(0, max);
    const qty = Math.min(Math.max(1, Number(quantity)), 20);
    const prc = Math.min(Math.max(0, Number(price)), 999999);
    if (isNaN(qty) || isNaN(prc)) {
      return new Response(JSON.stringify({ error: 'Invalid quantity or price' }), { status: 400 });
    }

    const ticket = {
      id: `t-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      type,
      festival,
      dates: str(dates, 100),
      tier: str(tier, 100),
      quantity: qty,
      price: prc,
      contact: str(contact, 200),
      contactType,
      email: str(email, 254),
      note: str(note, 500),
      createdAt: new Date().toISOString(),
    };

    const tickets = readTickets();
    tickets.unshift(ticket);
    writeTickets(tickets);

    const { email: _, ...safe } = ticket;
    return new Response(JSON.stringify(safe), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
};

export const DELETE: APIRoute = async ({ url }) => {
  const id = url.searchParams.get('id');
  const email = url.searchParams.get('email');

  if (!id || !email) {
    return new Response(JSON.stringify({ error: 'Missing id or email' }), { status: 400 });
  }

  const tickets = readTickets();
  const ticket = tickets.find((t: any) => t.id === id);

  if (!ticket) {
    return new Response(JSON.stringify({ error: 'Listing not found' }), { status: 404 });
  }

  if (ticket.email !== email) {
    return new Response(JSON.stringify({ error: 'Email does not match' }), { status: 403 });
  }

  const filtered = tickets.filter((t: any) => t.id !== id);
  writeTickets(filtered);

  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
};
