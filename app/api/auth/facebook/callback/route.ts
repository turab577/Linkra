import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-jwt-key'

async function exchangeCodeForTokens(code: string, redirectUri: string) {
  const params = new URLSearchParams({
    code,
    client_id: process.env.FACEBOOK_CLIENT_ID || '',
    client_secret: process.env.FACEBOOK_CLIENT_SECRET || '',
    redirect_uri: redirectUri,
  })

  const res = await fetch(`https://graph.facebook.com/v19.0/oauth/access_token?${params.toString()}`, {
    method: 'GET',
  })
  if (!res.ok) {
    const txt = await res.text()
    console.error('Token exchange failed:', res.status, txt)
    throw new Error('Failed to exchange code for tokens: ' + txt)
  }

  return res.json()
}

async function getUserInfo(accessToken: string) {
  // We need to specifically ask for email and name via fields parameter
  const params = new URLSearchParams({
    fields: 'id,name,email,picture',
    access_token: accessToken,
  })
  const res = await fetch(`https://graph.facebook.com/me?${params.toString()}`)
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
    const origin = url.origin
    const code = url.searchParams.get('code')
    const error = url.searchParams.get('error')

    if (error) {
      return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(error)}`)
    }

    if (!code) {
      return NextResponse.redirect(`${origin}/login?error=missing_code`)
    }

    const redirectUri = process.env.FACEBOOK_REDIRECT_URI || `${origin}/api/auth/facebook/callback`

    const tokenResponse: any = await exchangeCodeForTokens(code, redirectUri)
    const accessToken = tokenResponse.access_token
    if (!accessToken) throw new Error('No access token')

    const profile: any = await getUserInfo(accessToken)

    // email is sometimes not returned by FB if user didn't grant permission or didn't verify their phone/email
    if (!profile || !profile.email) {
      return NextResponse.redirect(`${origin}/login?error=facebook_email_missing`)
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
          image: profile.picture?.data?.url || undefined,
        },
      })
    } else {
      // Optionally update picture/name if missing
      const picUrl = profile.picture?.data?.url
      const needsUpdate = (!user.image && picUrl) || (!user.name && profile.name)
      if (needsUpdate) {
        await prisma.user.update({ where: { id: user.id }, data: { image: picUrl || undefined, name: profile.name || undefined } })
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
    console.error('Facebook callback error:', err)
    try {
      const origin = new URL(req.url).origin
      return NextResponse.redirect(`${origin}/login?error=facebook_callback_failure`)
    } catch (e) {
      return NextResponse.redirect('http://localhost:3000/login?error=facebook_callback_failure')
    }
  }
}
