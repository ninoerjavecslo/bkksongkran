export const prerender = false;

import type { APIRoute } from 'astro';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const TICKETS_PATH = join(process.cwd(), 'data', 'tickets.json');
const LEADS_PATH = join(process.cwd(), 'data', 'leads.json');

// Rate limiter: max 20 reveals per IP per hour
const revealRateMap = new Map<string, { count: number; reset: number }>();
function isRevealRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = revealRateMap.get(ip);
  if (!entry || now > entry.reset) {
    revealRateMap.set(ip, { count: 1, reset: now + 3_600_000 });
    return false;
  }
  if (entry.count >= 20) return true;
  entry.count++;
  return false;
}

function readLeads(): any[] {
  try {
    if (!existsSync(LEADS_PATH)) return [];
    return JSON.parse(readFileSync(LEADS_PATH, 'utf-8'));
  } catch {
    return [];
  }
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown';
    if (isRevealRateLimited(ip)) {
      return new Response(JSON.stringify({ error: 'Too many requests — try again later' }), { status: 429 });
    }

    const { ticketId, email } = await request.json();

    if (!ticketId || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ error: 'Valid email required' }), { status: 400 });
    }

    // Find the ticket
    const tickets = JSON.parse(readFileSync(TICKETS_PATH, 'utf-8'));
    const ticket = tickets.find((t: any) => t.id === ticketId);
    if (!ticket) {
      return new Response(JSON.stringify({ error: 'Listing not found' }), { status: 404 });
    }

    // Store the lead
    const leads = readLeads();
    leads.push({
      email,
      ticketId,
      festival: ticket.festival,
      type: ticket.type,
      createdAt: new Date().toISOString(),
    });
    writeFileSync(LEADS_PATH, JSON.stringify(leads, null, 2));

    // Return contact info
    return new Response(JSON.stringify({
      contact: ticket.contact,
      contactType: ticket.contactType,
    }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
};
