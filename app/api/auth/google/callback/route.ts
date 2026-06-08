import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { getPublicOrigin, getGoogleRedirectUri } from '@/lib/oauth'

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-jwt-key'

async function exchangeCodeForTokens(code: string, redirectUri: string) {
  const params = new URLSearchParams({
    code,
    client_id: process.env.GOOGLE_CLIENT_ID || '',
    client_secret: process.env.GOOGLE_CLIENT_SECRET || '',
    redirect_uri: redirectUri,
    grant_type: 'authorization_code',
  })

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  })
  if (!res.ok) {
    const txt = await res.text()
    console.error('Token exchange failed:', res.status, txt)
    throw new Error('Failed to exchange code for tokens: ' + txt)
  }

  return res.json()
}

async function getUserInfo(accessToken: string) {
  const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  if (!res.ok) {
    const txt = await res.text()
    console.error('Userinfo fetch failed:', res.status, txt)
    throw new Error('Failed to fetch userinfo: ' + txt)
  }
  return res.json()
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const origin = getPublicOrigin(req)
    const code = url.searchParams.get('code')
    const error = url.searchParams.get('error')

    if (error) {
      return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(error)}`)
    }

    if (!code) {
      return NextResponse.redirect(`${origin}/login?error=missing_code`)
    }

    const redirectUri = getGoogleRedirectUri(req)

    const tokenResponse: any = await exchangeCodeForTokens(code, redirectUri)
    const accessToken = tokenResponse.access_token
    if (!accessToken) throw new Error('No access token')

    const profile: any = await getUserInfo(accessToken)

    if (!profile || !profile.email || !profile.email_verified) {
      return NextResponse.redirect(`${origin}/login?error=google_email_not_verified`)
    }

    // Find or create user
    let user = await prisma.user.findUnique({ where: { email: profile.email } })
    if (!user) {
      const randomPassword = Math.random().toString(36).slice(2)
      const hashed = await bcrypt.hash(randomPassword, 10)
      user = await prisma.user.create({
        data: {
          email: profile.email,
          name: profile.name || undefined,
          password: hashed,
          image: profile.picture || undefined,
        },
      })
    } else {
      // Optionally update picture/name if missing
      const needsUpdate = (!user.image && profile.picture) || (!user.name && profile.name)
      if (needsUpdate) {
        await prisma.user.update({ where: { id: user.id }, data: { image: profile.picture || undefined, name: profile.name || undefined } })
      }
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1d' })

    const response = NextResponse.redirect(`${origin}/dashboard`)
    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24,
      path: '/',
    })

    return response
  } catch (err: any) {
    console.error('Google callback error:', err)
    try {
      const origin = getPublicOrigin(req)
      return NextResponse.redirect(`${origin}/login?error=google_callback_failure`)
    } catch (e) {
      const fallbackOrigin = process.env.NEXT_PUBLIC_APP_URL || 'https://www.linkra.it.com'
      return NextResponse.redirect(`${fallbackOrigin}/login?error=google_callback_failure`)
    }
  }
}
