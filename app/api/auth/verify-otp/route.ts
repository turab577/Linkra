import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-jwt-key'

export async function POST(req: Request) {
  try {
    const { email, otp, type } = await req.json()
    if (!email || !otp) return NextResponse.json({ message: 'Email and OTP required' }, { status: 400 })

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return NextResponse.json({ message: 'User not found' }, { status: 404 })

    if (user.otp !== otp) {
      return NextResponse.json({ message: 'Invalid OTP' }, { status: 400 })
    }

    if (!user.otpExpiry || user.otpExpiry < new Date()) {
      return NextResponse.json({ message: 'OTP has expired' }, { status: 400 })
    }

    if (type === 'login') {
      // Clear OTP
      await prisma.user.update({
        where: { id: user.id },
        data: { otp: null, otpExpiry: null }
      })

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: '1d' }
      )

      const response = NextResponse.json(
        { message: 'Login successful', isLogin: true, user: { id: user.id, email: user.email, name: user.name } },
        { status: 200 }
      )

      response.cookies.set('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
      })

      return response
    }

    // Success - clear OTP but keep track that they are verified maybe?
    // For simplicity, we just respond success, but leave OTP until reset-password is called
    // or we can pass a token. For now, reset-password will also require the OTP to be safe.
    
    return NextResponse.json({ message: 'OTP verified' })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}
