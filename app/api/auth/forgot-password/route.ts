import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
  try {
    const { email } = await req.json()
    if (!email) return NextResponse.json({ message: 'Email required' }, { status: 400 })

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return NextResponse.json({ message: 'User with this email does not exist' }, { status: 404 })

    // Generate 6 digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000) // 10 mins

    await prisma.user.update({
      where: { email },
      data: { otp, otpExpiry }
    })

    console.log(`\n\n=== OTP for ${email} is: ${otp} ===\n\n`)

    // Attempt to send email using nodemailer
    try {
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        let transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        await transporter.sendMail({
          from: '"Linkra Security" <' + process.env.EMAIL_USER + '>',
          to: email,
          subject: "Linkra - Your Password Reset OTP",
          text: `Your OTP code is ${otp}. It will expire in 10 minutes.`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px;">
              <h2 style="color: #0f172a; text-align: center;">Password Reset Request</h2>
              <p style="color: #334155; font-size: 16px;">Hello,</p>
              <p style="color: #334155; font-size: 16px;">We received a request to reset your Linkra password. Use the verification code below to proceed:</p>
              <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; text-align: center; margin: 20px 0;">
                <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #00c2ff;">${otp}</span>
              </div>
              <p style="color: #64748b; font-size: 14px;">This code will expire in 10 minutes. If you did not request a password reset, please ignore this email.</p>
              <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
              <p style="color: #94a3b8; font-size: 12px; text-align: center;">© ${new Date().getFullYear()} Linkra. All rights reserved.</p>
            </div>
          `
        })
        console.log(`Email successfully sent to ${email}`);
      } else {
        console.log('No EMAIL_USER or EMAIL_PASS in .env, skipping real email send.');
      }
    } catch (e) {
      console.log('Nodemailer error:', e)
    }

    return NextResponse.json({ message: 'OTP sent successfully (Check terminal for the code!)' })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}
