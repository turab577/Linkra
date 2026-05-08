"use client"

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Settings, Instagram, Phone, Send, MessageCircle } from 'lucide-react'

type Platform = {
  name: string
  description: string
  status: string
  account?: string | null
}

const ICON_MAP: Record<string, JSX.Element> = {
  Instagram: <Instagram size={28} className="text-pink-500" />,
  WhatsApp: <Phone size={28} className="text-green-500" />,
  Telegram: <Send size={28} className="text-blue-400" />,
  Messenger: <MessageCircle size={28} className="text-blue-600" />,
}

export default function ConnectionsPage() {
  const router = useRouter()
  const [platforms, setPlatforms] = useState<Platform[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    fetch('/api/platforms')
      .then((res) => res.json())
      .then((data) => {
        if (!mounted) return
        setPlatforms(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Failed to load platforms', err)
        if (!mounted) return
        setError('Failed to load platform data')
        setLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [])

  async function handleConnectTelegram() {
    router.push('/dashboard/connections/telegram')
  }

  const fallback: Platform[] = [
    { name: 'Instagram', description: 'Connect Instagram Direct to reply from Linkra.', status: 'Disconnected' },
    { name: 'WhatsApp', description: 'Integrate WhatsApp Business API for automated responses.', status: 'Disconnected' },
    { name: 'Telegram', description: 'Link your Telegram bots to manage community chats.', status: 'Disconnected' },
    { name: 'Messenger', description: 'Sync Facebook Messenger for cross-platform messaging.', status: 'Disconnected' },
  ]

  const list = platforms ?? fallback

  return (
    <div className="p-4 md:p-8 space-y-8 w-full mx-auto pb-20">
      <header>
        <h1 className="text-3xl font-bold text-white mb-2">Platform Connections</h1>
        <p className="text-gray-400">Manage your connected social accounts and messaging platforms.</p>
      </header>

      <div className="bg-[#0A1628]/60 p-4 md:p-6 rounded-3xl border border-white/5 backdrop-blur-md">
        {loading && <div className="text-gray-400 text-sm mb-4">Loading platforms…</div>}
        {error && <div className="text-red-400 text-sm mb-4">{error}</div>}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {list.map((platform) => (
            <div key={platform.name} className="bg-[#050D1A] p-4 md:p-6 rounded-2xl border border-white/5 flex flex-col gap-6 hover:border-white/10 transition-colors">
              <div className="flex items-start gap-4">
                <div className="p-2 md:p-3 bg-white/5 rounded-2xl">{ICON_MAP[platform.name] ?? <Settings />}</div>
                <div>
                  <h3 className="font-bold text-lg text-white mb-1">{platform.name}</h3>
                  <p className="text-sm text-gray-400">{platform.description}</p>
                  {platform.account && <div className="text-xs text-gray-500 mt-1">{platform.account}</div>}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center sm:justify-between mt-auto pt-4 border-t border-white/5 gap-3">
                <span className="flex items-center gap-2 text-sm font-medium">
                  <span className={`w-2 h-2 rounded-full ${platform.status.toLowerCase().includes('connect') ? 'bg-green-500' : 'bg-gray-500'}`}></span>
                  <span className={platform.status.toLowerCase().includes('connect') ? 'text-green-400' : 'text-gray-500'}>{platform.status}</span>
                </span>
                <button
                  onClick={async () => {
                    if (platform.name === 'Telegram') {
                      await handleConnectTelegram()
                    } else {
                      // placeholder behavior for other platforms
                      alert(platform.status.toLowerCase().includes('connect') ? 'Open settings for ' + platform.name : 'Connect flow not implemented yet')
                    }
                  }}
                  className={`w-full sm:w-auto px-4 py-2 rounded-xl text-sm font-bold text-center transition-colors ${platform.status.toLowerCase().includes('connect') ? 'bg-white/5 text-white hover:bg-white/10' : 'bg-[#00C2FF] text-[#050D1A] hover:bg-[#00C2FF]/90'}`}
                >
                  {platform.status.toLowerCase().includes('connect') ? 'Manage Settings' : 'Connect Account'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
