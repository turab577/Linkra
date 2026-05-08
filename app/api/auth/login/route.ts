import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-jwt-key'

export async function POST(req: Request) {
  try {
    const { email, password, twoFactorCode } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 })
    }
    
    if (user.twoFactorEnabled) {
      if (!twoFactorCode) {
        // Generate OTP and send to email
        const otp = Math.floor(100000 + Math.random() * 900000).toString()
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000)

        await prisma.user.update({
          where: { id: user.id },
          data: { otp, otpExpiry }
        })

        console.log(`\n\n=== 2FA Login OTP for ${user.email} is: ${otp} ===\n\n`)

        try {
          if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            let transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
            });
            await transporter.sendMail({
              from: '"Linkra Security" <' + process.env.EMAIL_USER + '>',
              to: user.email,
              subject: "Linkra - Login OTP",
              text: `Your OTP for login is ${otp}. It will expire in 10 minutes.`
            })
          }
        } catch (e) { console.log('Nodemailer error:', e) }

        // Create a short-lived temporary token for 2FA verification (not the auth token)
        const tempToken = jwt.sign(
          { is2fa: true, userId: user.id, email: user.email },
          JWT_SECRET,
          { expiresIn: '10m' }
        )

        return NextResponse.json({ requiresTwoFactor: true, token: tempToken, message: 'OTP sent to email' })
      }

      if (user.otp !== twoFactorCode || !user.otpExpiry || user.otpExpiry < new Date()) {
        return NextResponse.json({ message: 'Invalid or expired OTP' }, { status: 401 })
      }

      // Clear OTP after successful login
      await prisma.user.update({
        where: { id: user.id },
        data: { otp: null, otpExpiry: null }
      })
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '1d' }
    )

    const response = NextResponse.json(
      { message: 'Login successful', user: { id: user.id, email: user.email, name: user.name } },
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
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}
