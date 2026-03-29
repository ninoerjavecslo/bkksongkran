export const prerender = false;

import type { APIRoute } from 'astro';
import { Resend } from 'resend';

const ALLOWED_TYPES = ['feature-event', 'report-scam', 'whos-going', 'general'];

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } });
}

// Rate limit: 3 submissions per IP per hour
const rateMap = new Map<string, { count: number; reset: number }>();
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.reset) { rateMap.set(ip, { count: 1, reset: now + 3_600_000 }); return false; }
  if (entry.count >= 3) return true;
  entry.count++;
  return false;
}

export const POST: APIRoute = async ({ request }) => {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown';
  if (isRateLimited(ip)) return json({ error: 'Too many requests — try again later.' }, 429);

  let body: any;
  try { body = await request.json(); } catch { return json({ error: 'Invalid request.' }, 400); }

  const { type, name, email, message } = body;

  if (!type || !name || !email || !message) return json({ error: 'Missing required fields.' }, 400);
  if (!ALLOWED_TYPES.includes(type)) return json({ error: 'Invalid type.' }, 400);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ error: 'Invalid email.' }, 400);

  const str = (v: unknown, max: number) => String(v ?? '').slice(0, max);

  const subjectMap: Record<string, string> = {
    'feature-event': '🎉 Feature Event Request',
    'report-scam':   '🚨 Scammer Report',
    'whos-going':    '👥 Who\'s Going? Enquiry',
    'general':       '✉️ Contact Form',
  };

  const resend = new Resend(import.meta.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from:    'BKK Songkran <onboarding@resend.dev>',
    to:      'nino.erjavec.2000@gmail.com',
    subject: subjectMap[type],
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;">
        <h2 style="color:#003345;margin-bottom:4px;">${subjectMap[type]}</h2>
        <p style="color:#6b8fa3;font-size:13px;margin-bottom:24px;">Submitted via bkksongkran.com</p>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px 0;color:#6b8fa3;font-size:13px;width:100px;">Name</td><td style="padding:8px 0;color:#003345;font-size:14px;font-weight:600;">${str(name, 100)}</td></tr>
          <tr><td style="padding:8px 0;color:#6b8fa3;font-size:13px;">Email</td><td style="padding:8px 0;color:#003345;font-size:14px;"><a href="mailto:${str(email, 254)}" style="color:#006479;">${str(email, 254)}</a></td></tr>
        </table>
        <div style="margin-top:16px;padding:16px;background:#f0f9ff;border-radius:10px;border-left:4px solid #40cef3;">
          <p style="color:#003345;font-size:14px;line-height:1.6;margin:0;">${str(message, 2000).replace(/\n/g, '<br>')}</p>
        </div>
      </div>
    `,
  });

  if (error) return json({ error: 'Failed to send — please try again.' }, 500);
  return json({ success: true });
};
