import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-jwt-key'

export async function DELETE(req: Request) {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get('auth_token')?.value

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string }
    
    // Delete user from db
    await prisma.user.delete({
      where: { id: decoded.userId }
    })

    // Clear the cookie
    const response = NextResponse.json({ message: 'User deleted successfully' }, { status: 200 })
    response.cookies.delete('auth_token')
    
    return response
  } catch (error) {
    console.error('Delete user error:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}
