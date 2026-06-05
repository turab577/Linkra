import { NextResponse } from 'next/server'
import { getFacebookRedirectUri } from '@/lib/oauth'

export async function GET(req: Request) {
  const FACEBOOK_CLIENT_ID = process.env.FACEBOOK_CLIENT_ID

  if (!FACEBOOK_CLIENT_ID) {
    return NextResponse.json({ message: 'Facebook client id not configured' }, { status: 500 })
  }

  const REDIRECT_URI = getFacebookRedirectUri(req)

  const params = new URLSearchParams({
    client_id: FACEBOOK_CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: 'code',
    scope: 'email public_profile',
  })

  const authUrl = `https://www.facebook.com/v19.0/dialog/oauth?${params.toString()}`
  return NextResponse.redirect(authUrl)
}
