import { NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs/promises'
import crypto from 'crypto'
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

async function writeJson(file: string, data: any) {
  await fs.writeFile(file, JSON.stringify(data, null, 2), 'utf-8')
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

function verifyTelegramAuth(query: Record<string,string>) {
  const hash = query.hash
  if (!hash) return false
  const data: string[] = []
  Object.keys(query).filter(k => k !== 'hash').sort().forEach(k => {
    data.push(`${k}=${query[k]}`)
  })
  const dataCheckString = data.join('\n')

  const integrationsPath = path.join(process.cwd(), 'data', 'integrations.json')
  return readJson(integrationsPath).then(integrations => {
    const botToken = process.env.TELEGRAM_BOT_TOKEN || integrations?.telegramToken
    if (!botToken) return false
    const secretKey = crypto.createHash('sha256').update(botToken).digest()
    const hmac = crypto.createHmac('sha256', secretKey).update(dataCheckString).digest('hex')
    return hmac === hash
  })
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const params = Object.fromEntries(url.searchParams.entries()) as Record<string,string>

    const valid = await verifyTelegramAuth(params)
    if (!valid) {
      return NextResponse.redirect(new URL('/dashboard/connections?telegram=failed', req.url))
    }

    const payload = await getUser()
    if (!payload) {
      return NextResponse.redirect(new URL('/auth/login?next=/dashboard/connections', req.url))
    }

    // store mapping for this user
    const integrationsPath = path.join(process.cwd(), 'data', 'integrations.json')
    const integrations = (await readJson(integrationsPath)) || {}
    integrations.users = integrations.users || {}
    integrations.users[payload.userId] = integrations.users[payload.userId] || {}
    integrations.users[payload.userId].telegram = {
      id: params.id,
      username: params.username || null,
      first_name: params.first_name || null,
      last_name: params.last_name || null
    }
    await writeJson(integrationsPath, integrations)

    // update platforms.json for display (global) — mark Telegram Connected
    const platformsPath = path.join(process.cwd(), 'data', 'platforms.json')
    const platforms = (await readJson(platformsPath)) || []
    const updated = platforms.map((p: any) => {
      if (p.name === 'Telegram') {
        return { ...p, status: 'Connected', account: params.username ? `@${params.username}` : p.account }
      }
      return p
    })
    await writeJson(platformsPath, updated)

    return NextResponse.redirect(new URL('/dashboard/connections?telegram=success', req.url))
  } catch (err) {
    console.error('Telegram auth error', err)
    return NextResponse.redirect(new URL('/dashboard/connections?telegram=failed', req.url))
  }
}
