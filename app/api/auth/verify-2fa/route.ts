import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-jwt-key'

export async function POST(req: Request) {
  try {
    const { token, otp } = await req.json()

    if (!token || !otp) {
      return NextResponse.json({ message: 'Token and OTP are required' }, { status: 400 })
    }

    // Verify temp token
    let decoded: any
    try {
      decoded = jwt.verify(token, JWT_SECRET)
    } catch (err) {
      return NextResponse.json({ message: 'Session expired or invalid. Please log in again.' }, { status: 401 })
    }

    if (!decoded.is2fa || !decoded.userId || !decoded.email) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    })

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    if (user.otp !== otp || !user.otpExpiry || user.otpExpiry < new Date()) {
      return NextResponse.json({ message: 'Invalid or expired OTP' }, { status: 401 })
    }

    // Clear OTP after successful verification
    await prisma.user.update({
      where: { id: user.id },
      data: { otp: null, otpExpiry: null }
    })

    // Generate real auth token
    const authToken = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '1d' }
    )

    const response = NextResponse.json(
      { message: 'Login successful', user: { id: user.id, email: user.email, name: user.name } },
      { status: 200 }
    )

    response.cookies.set('auth_token', authToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    })

    return response
  } catch (error) {
    console.error('2FA Verification error:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}
