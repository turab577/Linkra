import { NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs/promises'

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

export async function GET() {
  try {
    const integrationsPath = path.join(process.cwd(), 'data', 'integrations.json')
    const integrations = (await readJson(integrationsPath)) || {}
    let botUsername = null
    if (integrations.telegramToken) {
      try {
        const res = await fetch(`https://api.telegram.org/bot${integrations.telegramToken}/getMe`)
        const json = await res.json()
        if (json && json.ok && json.result.username) botUsername = `@${json.result.username}`
      } catch (e) {
        console.error('Error fetching bot info', e)
      }
    }
    return NextResponse.json({ telegram: !!integrations.telegramToken, botUsername })
  } catch (err) {
    console.error('GET /api/integrations/telegram error', err)
    return NextResponse.json({ telegram: false })
  }
}

export async function POST(req: Request) {
  try {
    const { token } = await req.json()
    if (!token) return NextResponse.json({ ok: false, message: 'Missing token' }, { status: 400 })

    // validate token by calling getMe
    const res = await fetch(`https://api.telegram.org/bot${token}/getMe`)
    const json = await res.json()
    if (!json || !json.ok) {
      return NextResponse.json({ ok: false, message: 'Invalid token' }, { status: 400 })
    }

    const username = json.result.username ? `@${json.result.username}` : json.result.first_name || null

    const integrationsPath = path.join(process.cwd(), 'data', 'integrations.json')
    const integrations = (await readJson(integrationsPath)) || {}
    integrations.telegramToken = token
    await writeJson(integrationsPath, integrations)

    // Update platforms.json to mark Telegram connected and set account info
    const platformsPath = path.join(process.cwd(), 'data', 'platforms.json')
    const platforms = (await readJson(platformsPath)) || []
    const updated = platforms.map((p: any) => {
      if (p.name === 'Telegram') {
        return { ...p, status: 'Connected', account: username }
      }
      return p
    })
    await writeJson(platformsPath, updated)

    return NextResponse.json({ ok: true, username })
  } catch (err) {
    console.error('POST /api/integrations/telegram error', err)
    return NextResponse.json({ ok: false, message: 'Server error' }, { status: 500 })
  }
}
