import { NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs/promises'

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'platforms.json')
    const raw = await fs.readFile(filePath, 'utf-8')
    const data = JSON.parse(raw)
    return NextResponse.json(data)
  } catch (err) {
    console.error('Failed to read platforms data:', err)
    return NextResponse.json([], { status: 200 })
  }
}
