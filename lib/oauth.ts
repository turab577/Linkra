// Single source of truth for resolving the public origin and OAuth redirect URIs.
//
// The token-exchange step requires a redirect_uri byte-identical to the one used
// in the authorization (dialog) step, otherwise the provider rejects the code.
// Both the redirect route and the callback route MUST derive it the same way,
// which is why this lives in one place.
//
// Resolution is ALWAYS driven by the actual request origin so the flow adapts to
// whatever domain the browser used: a request from localhost redirects back to
// localhost, a request from the deployed host redirects back to that host. We
// honor Vercel proxy headers because req.url can be http:// + an internal host
// behind the serverless proxy.
//
// Note: we deliberately do NOT read GOOGLE_REDIRECT_URI / FACEBOOK_REDIRECT_URI /
// NEXT_PUBLIC_APP_URL here — a fixed env value would pin every environment to one
// origin and break the localhost-vs-deployed behavior above. Each origin's
// callback URL must still be registered in the provider console.

export function getPublicOrigin(req: Request): string {
  const headers = req.headers
  const proto = headers.get('x-forwarded-proto')?.split(',')[0].trim() || 'https'
  const host = headers.get('x-forwarded-host') || headers.get('host')
  if (host) return `${proto}://${host}`

  // Last resort: parse req.url (works locally where there is no proxy).
  return new URL(req.url).origin
}

export function getFacebookRedirectUri(req: Request): string {
  return `${getPublicOrigin(req)}/api/auth/facebook/callback`
}

export function getGoogleRedirectUri(req: Request): string {
  return `${getPublicOrigin(req)}/api/auth/google/callback`
}
