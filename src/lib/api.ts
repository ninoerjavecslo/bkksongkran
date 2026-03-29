/**
 * Shared API response utilities for all API routes.
 * Provides consistent response formatting and error handling.
 */

/**
 * Returns a JSON response with the given status code.
 */
export function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

/**
 * Returns a JSON error response with the given message and status code.
 */
export function jsonError(message: string, status: number): Response {
  return json({ error: message }, status);
}

/**
 * Generic error message for any database/Supabase error.
 * Never expose raw error.message to clients (may leak schema details).
 */
export const DB_ERROR = 'Database error, please try again.' as const;
