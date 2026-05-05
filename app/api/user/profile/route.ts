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
    console.error('JWT Error:', e)
    return null
  }
}

export async function GET() {
  const payload = await getUser()
  if (!payload) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

  const user = await prisma.user.findUnique({ where: { id: payload.userId as string } })
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
      where: { id: payload.userId as string },
      data: { name, image }
    })

    return NextResponse.json({ message: 'Profile updated successfully', user })
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}
