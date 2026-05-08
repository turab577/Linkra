import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'
import jwt, { JwtPayload } from 'jsonwebtoken'

type UserToken = { userId: string }

async function getUser(): Promise<UserToken | null> {
  const token = cookies().get('auth_token')?.value
  if (!token) return null
  try {
    const secret = process.env.JWT_SECRET || 'super-secret-jwt-key'
    const payload = jwt.verify(token, secret) as JwtPayload | string
    if (typeof payload === 'string') return null
    const userId = (payload as any).userId && typeof (payload as any).userId === 'string'
      ? (payload as any).userId
      : payload.sub && typeof payload.sub === 'string'
      ? payload.sub
      : null
    if (!userId) return null
    return { userId }
  } catch (e) {
    console.error('JWT Error:', e)
    return null
  }
}

export async function GET() {
  const payload = await getUser()
  if (!payload) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

  const user = await prisma.user.findUnique({ where: { id: payload.userId } })
  if (!user) return NextResponse.json({ message: 'User not found' }, { status: 404 })

  return NextResponse.json({
    id: user.id,
    name: user.name,
    email: user.email,
    image: user.image,
    twoFactorEnabled: user.twoFactorEnabled
  })
}

export async function PUT(req: Request) {
  const payload = await getUser()
  if (!payload) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

  try {
    const { name, image } = await req.json()
    
    const user = await prisma.user.update({
      where: { id: payload.userId },
      data: { name, image }
    })

    return NextResponse.json({ message: 'Profile updated successfully', user })
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}
