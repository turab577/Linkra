import { NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs/promises'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

async function readJson(file: string) {
  try {
    const raw = await fs.readFile(file, 'utf-8')
    return JSON.parse(raw)
  } catch {
    return null
  }
}

async function getUser() {
  const token = cookies().get('auth_token')?.value
  if (!token) return null
  try {
    const secret = process.env.JWT_SECRET || 'super-secret-jwt-key'
    const payload = jwt.verify(token, secret)
    return payload as any
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
