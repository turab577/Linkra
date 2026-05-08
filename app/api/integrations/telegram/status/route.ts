import { NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs/promises'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { cookies } from 'next/headers'

async function readJson(file: string) {
  try {
    const raw = await fs.readFile(file, 'utf-8')
    return JSON.parse(raw)
  } catch {
    return null
  }
}

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
  if (!payload) return NextResponse.json({ connected: false })

  const integrationsPath = path.join(process.cwd(), 'data', 'integrations.json')
  const integrations = (await readJson(integrationsPath)) || {}
  const user = integrations.users?.[payload.userId]
  if (user && user.telegram) {
    return NextResponse.json({ connected: true, telegram: user.telegram })
  }
  return NextResponse.json({ connected: false })
}
