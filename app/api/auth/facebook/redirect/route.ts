import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const FACEBOOK_CLIENT_ID = process.env.FACEBOOK_CLIENT_ID
  const REDIRECT_URI = process.env.FACEBOOK_REDIRECT_URI || 'http://localhost:3000/api/auth/facebook/callback'

  if (!FACEBOOK_CLIENT_ID) {
    return NextResponse.json({ message: 'Facebook client id not configured' }, { status: 500 })
  }

  const params = new URLSearchParams({
    client_id: FACEBOOK_CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: 'code',
    scope: 'email public_profile',
  })

  const authUrl = `https://www.facebook.com/v19.0/dialog/oauth?${params.toString()}`
  return NextResponse.redirect(authUrl)
}
