import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-jwt-key'

export async function POST(req: Request) {
  try {
    const { email, token } = await req.json()

    let user
    if (token) {
      try {
        const decoded: any = jwt.verify(token, JWT_SECRET)
        if (!decoded || !decoded.userId) return NextResponse.json({ message: 'Invalid token' }, { status: 401 })
        user = await prisma.user.findUnique({ where: { id: decoded.userId } })
      } catch (err) {
        return NextResponse.json({ message: 'Session expired or invalid. Please log in again.' }, { status: 401 })
      }
    } else if (email) {
      user = await prisma.user.findUnique({ where: { email } })
    } else {
      return NextResponse.json({ message: 'Email or token required' }, { status: 400 })
    }

    if (!user) return NextResponse.json({ message: 'User not found' }, { status: 404 })
    if (!user.twoFactorEnabled) return NextResponse.json({ message: '2FA not enabled for user' }, { status: 400 })

    // Generate new OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000)

    await prisma.user.update({ where: { id: user.id }, data: { otp, otpExpiry } })

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

    const tempToken = jwt.sign({ is2fa: true, userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '10m' })

    return NextResponse.json({ message: 'OTP resent', token: tempToken })
  } catch (error) {
    console.error('Resend 2FA error:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}
