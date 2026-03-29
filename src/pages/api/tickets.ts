export const prerender = false;

import type { APIRoute } from 'astro';
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const DATA_PATH = join(process.cwd(), 'data', 'tickets.json');

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
    const body = await request.json();
    const { type, festival, dates, tier, quantity, price, contact, contactType, email, note } = body;

    if (!type || !festival || !dates || !tier || !quantity || !price || !contact || !contactType || !email) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    const ticket = {
      id: `t-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      type,
      festival,
      dates,
      tier,
      quantity: Number(quantity),
      price: Number(price),
      contact,
      contactType,
      email,
      note: note || '',
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
