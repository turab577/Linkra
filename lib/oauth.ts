// Single source of truth for resolving the public origin and OAuth redirect URIs.
//
// The token-exchange step requires a redirect_uri byte-identical to the one used
// in the authorization (dialog) step, otherwise the provider rejects the code.
// Both the redirect route and the callback route MUST derive it the same way,
// which is why this lives in one place.
//
// Resolution order:
//   1. Explicit env (FACEBOOK_REDIRECT_URI / GOOGLE_REDIRECT_URI) — exact control.
//   2. NEXT_PUBLIC_APP_URL — canonical app origin.
//   3. The actual request origin, honoring Vercel proxy headers so we get the
//      real https:// + public host the browser used (req.url can be http:// and
//      an internal host behind the serverless proxy).
//
// (3) makes OAuth auto-adapt to whatever domain the user is on (www or apex),
// so a www/non-www env mismatch can no longer break the flow.

function trimTrailingSlash(value: string) {
  return value.replace(/\/+$/, '')
}

export function getPublicOrigin(req: Request): string {
  const fromEnv = process.env.NEXT_PUBLIC_APP_URL
  if (fromEnv) return trimTrailingSlash(fromEnv)

  const headers = req.headers
  const proto = headers.get('x-forwarded-proto')?.split(',')[0].trim() || 'https'
  const host = headers.get('x-forwarded-host') || headers.get('host')
  if (host) return `${proto}://${host}`

  // Last resort: parse req.url (works locally where there is no proxy).
  return new URL(req.url).origin
}

export function getFacebookRedirectUri(req: Request): string {
  if (process.env.FACEBOOK_REDIRECT_URI) return process.env.FACEBOOK_REDIRECT_URI
  return `${getPublicOrigin(req)}/api/auth/facebook/callback`
}

export function getGoogleRedirectUri(req: Request): string {
  if (process.env.GOOGLE_REDIRECT_URI) return process.env.GOOGLE_REDIRECT_URI
  return `${getPublicOrigin(req)}/api/auth/google/callback`
}
