import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
  const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/api/auth/google/callback'

  if (!GOOGLE_CLIENT_ID) {
    return NextResponse.json({ message: 'Google client id not configured' }, { status: 500 })
  }

  const params = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: 'code',
    scope: 'openid email profile',
    access_type: 'offline',
    prompt: 'select_account',
  })

  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
  return NextResponse.redirect(authUrl)
}
