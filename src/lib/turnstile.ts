/**
 * Shared Cloudflare Turnstile verification utility.
 * All API routes must use this function — never inline Turnstile calls.
 *
 * Env var: TURNSTILE_SECRET (server-side only, never PUBLIC_)
 */

/**
 * Verifies a Cloudflare Turnstile token.
 *
 * - Returns true in DEV when TURNSTILE_SECRET is not set (skip verification for local development).
 * - Returns false (fail closed) in production when TURNSTILE_SECRET is not set.
 * - Returns false if the fetch to Cloudflare fails (network error — fail closed).
 * - remoteip is optional; pass it when available for stronger bot detection and reporting.
 *
 * @param token - The Turnstile token from the client
 * @param remoteip - Optional client IP for stronger verification
 * @returns true if token is valid, false otherwise
 */
export async function verifyTurnstile(
  token: string,
  remoteip?: string
): Promise<boolean> {
  const secret = import.meta.env.TURNSTILE_SECRET;
  // In local dev without the secret configured, allow testing without Turnstile
  if (!secret) {
    if (import.meta.env.DEV) return true;
    // In production with no secret, fail closed (deny the request)
    return false;
  }

  try {
    const body: Record<string, string> = {
      secret,
      response: token,
    };
    // Include client IP if available for stronger verification
    if (remoteip) {
      body.remoteip = remoteip;
    }

    const res = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }
    );

    const data = (await res.json()) as { success: boolean };
    return data.success === true;
  } catch (error) {
    // Network failure to Cloudflare: fail closed (deny the request)
    // This is safer than allowing through when verification can't be reached
    console.error('[turnstile] verification fetch failed:', error);
    return false;
  }
}
