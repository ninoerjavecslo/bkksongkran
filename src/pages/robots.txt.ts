export const prerender = true;

import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const content = `User-agent: *
Disallow: /delete-ticket
Disallow: /bkk-guide

Sitemap: https://bkksongkran.com/sitemap.xml
`;
  return new Response(content, {
    headers: { 'Content-Type': 'text/plain' },
  });
};
