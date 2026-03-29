/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  // Server-side only (never prefix with PUBLIC_ — these are secret)
  readonly OPENAI_API_KEY: string;
  readonly RESEND_API_KEY: string;
  readonly CONTACT_RECIPIENT_EMAIL?: string;
  readonly TURNSTILE_SECRET?: string;

  // Public (safe to expose to client)
  readonly PUBLIC_SUPABASE_URL: string;
  readonly PUBLIC_SUPABASE_ANON_KEY: string;
  readonly PUBLIC_MAPBOX_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}