'use client'

import { Settings, Instagram, Phone, Send, MessageCircle } from 'lucide-react'

export default function ConnectionsPage() {
  return (
    <div className="p-4 md:p-8 space-y-8 max-w-5xl mx-auto pb-20">
      <header>
        <h1 className="text-3xl font-bold text-white mb-2">Platform Connections</h1>
        <p className="text-gray-400">Manage your connected social accounts and messaging platforms.</p>
      </header>

      <div className="bg-[#0A1628]/60 p-6 rounded-3xl border border-white/5 backdrop-blur-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { name: 'Instagram', description: 'Connect Instagram Direct to reply from Linkra.', icon: <Instagram size={28} className="text-pink-500" />, status: 'Active' },
            { name: 'WhatsApp', description: 'Integrate WhatsApp Business API for automated responses.', icon: <Phone size={28} className="text-green-500" />, status: 'Disconnected' },
            { name: 'Telegram', description: 'Link your Telegram bots to manage community chats.', icon: <Send size={28} className="text-blue-400" />, status: 'Active' },
            { name: 'Messenger', description: 'Sync Facebook Messenger for cross-platform messaging.', icon: <MessageCircle size={28} className="text-blue-600" />, status: 'Disconnected' },
          ].map((platform) => (
            <div key={platform.name} className="bg-[#050D1A] p-6 rounded-2xl border border-white/5 flex flex-col gap-6 hover:border-white/10 transition-colors">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/5 rounded-2xl">{platform.icon}</div>
                <div>
                  <h3 className="font-bold text-lg text-white mb-1">{platform.name}</h3>
                  <p className="text-sm text-gray-400">{platform.description}</p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                <span className="flex items-center gap-2 text-sm font-medium">
                  <span className={`w-2 h-2 rounded-full ${platform.status === 'Active' ? 'bg-green-500' : 'bg-gray-500'}`}></span>
                  <span className={platform.status === 'Active' ? 'text-green-400' : 'text-gray-500'}>{platform.status}</span>
                </span>
                <button className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors ${platform.status === 'Active' ? 'bg-white/5 text-white hover:bg-white/10' : 'bg-[#00C2FF] text-[#050D1A] hover:bg-[#00C2FF]/90'}`}>
                  {platform.status === 'Active' ? 'Manage Settings' : 'Connect Account'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
