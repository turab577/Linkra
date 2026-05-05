import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

async function getUser() {
  const token = cookies().get('auth_token')?.value
  if (!token) return null
  try {
    const secret = process.env.JWT_SECRET || 'super-secret-jwt-key'
    const payload = jwt.verify(token, secret)
    return payload
  } catch (e) {
    return null
  }
}

// Enable 2FA Directly
export async function POST(req: Request) {
  const payload = await getUser()
  if (!payload) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

  try {
    const user = await prisma.user.findUnique({ where: { id: payload.userId as string } })
    
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    if (user.twoFactorEnabled) {
      return NextResponse.json({ message: '2FA is already enabled' }, { status: 400 })
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { twoFactorEnabled: true }
    })

    return NextResponse.json({ message: '2FA Enabled Successfully' })
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}

// Disable 2FA
export async function DELETE() {
  const payload = await getUser()
  if (!payload) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

  await prisma.user.update({
    where: { id: payload.userId as string },
    data: { twoFactorEnabled: false }
  })

  return NextResponse.json({ message: '2FA Disabled' })
}
