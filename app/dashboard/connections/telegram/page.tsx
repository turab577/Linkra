"use client"

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function TelegramConnectPage() {
  const [botUsername, setBotUsername] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetch('/api/integrations/telegram')
      .then(r => r.json())
      .then(data => {
        setBotUsername(data.botUsername || null)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className="p-4 md:p-8 space-y-6 w-full mx-auto pb-20">
      <header>
        <h1 className="text-2xl font-bold text-white">Connect Telegram</h1>
        <p className="text-gray-400">Authorize Linkra to access your Telegram account chats.</p>
      </header>

      <div className="bg-[#0A1628]/60 p-6 rounded-3xl border border-white/5">
        {loading && <div className="text-gray-400">Loading…</div>}
        {!loading && !botUsername && (
          <div className="text-sm text-gray-300">
            Telegram bot is not configured on the server. Ask the site admin to set the bot token in environment variable `TELEGRAM_BOT_TOKEN` or via the admin integrations setup.
          </div>
        )}

        {!loading && botUsername && (
          <div className="mt-6">
            <p className="text-sm text-gray-300 mb-4">Click the button below to sign in with Telegram and authorize Linkra.</p>
            <div>
              <script async src="https://telegram.org/js/telegram-widget.js?15" data-telegram-login={botUsername.replace('@','')} data-size="large" data-userpic="false" data-auth-url="/api/integrations/telegram/auth" data-request-access="write"></script>
            </div>
            <div className="mt-4 text-xs text-gray-500">After authorizing, you'll be redirected back to the connections page.</div>
          </div>
        )}

        <div className="mt-6">
          <button onClick={() => router.push('/dashboard/connections')} className="px-4 py-2 rounded-xl bg-white/5 text-white">Back</button>
        </div>
      </div>
    </div>
  )
}
