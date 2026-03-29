export const prerender = false;

import type { APIRoute } from 'astro';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: import.meta.env.OPENAI_API_KEY });

export const POST: APIRoute = async ({ request }) => {
  try {
    const { system, messages } = await request.json();

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      max_tokens: 1000,
      messages: [
        { role: 'system', content: system },
        ...messages,
      ],
    });

    const reply = completion.choices[0]?.message?.content || 'Something went wrong — try again!';

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message || 'API error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
