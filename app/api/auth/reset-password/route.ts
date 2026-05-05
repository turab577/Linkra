import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
  try {
    const { email, otp, newPassword } = await req.json()
    if (!email || !otp || !newPassword) return NextResponse.json({ message: 'Missing fields' }, { status: 400 })

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return NextResponse.json({ message: 'User not found' }, { status: 404 })

    if (user.otp !== otp) {
      return NextResponse.json({ message: 'Invalid OTP' }, { status: 400 })
    }
    if (!user.otpExpiry || user.otpExpiry < new Date()) {
      return NextResponse.json({ message: 'OTP has expired' }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)

    await prisma.user.update({
      where: { email },
      data: {
        password: hashedPassword,
        otp: null,
        otpExpiry: null
      }
    })

    return NextResponse.json({ message: 'Password reset successfully' })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}
