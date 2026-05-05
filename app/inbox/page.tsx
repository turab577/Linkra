'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  Instagram, MessageCircle, Send, Phone, Search, 
  MoreVertical, CheckCheck, Loader2, LogOut,
  Bell, Settings, Hash, LayoutDashboard, ArrowLeft, Menu, X
} from 'lucide-react'

// Dummy Data
const DUMMY_MESSAGES = [
  { id: 1, platform: 'whatsapp', sender: 'Alice Johnson', avatar: 'https://i.pravatar.cc/150?u=1', lastMessage: 'Hey! Are we still meeting tomorrow?', time: '10:30 AM', unread: 2, online: true },
  { id: 2, platform: 'instagram', sender: 'john_doe_99', avatar: 'https://i.pravatar.cc/150?u=2', lastMessage: 'Loved your recent post!', time: '9:15 AM', unread: 0, online: false },
  { id: 3, platform: 'telegram', sender: 'Crypto Group', avatar: 'https://i.pravatar.cc/150?u=3', lastMessage: 'Bitcoin just hit 100k!', time: 'Yesterday', unread: 15, online: true },
  { id: 4, platform: 'messenger', sender: 'Mom', avatar: 'https://i.pravatar.cc/150?u=4', lastMessage: 'Call me when you are free.', time: 'Yesterday', unread: 0, online: false },
  { id: 5, platform: 'whatsapp', sender: 'Tech Team', avatar: 'https://i.pravatar.cc/150?u=5', lastMessage: 'PR is merged to main branch.', time: 'Tue', unread: 0, online: true },
]

export default function InboxPage() {
  const router = useRouter()
  const [activePlatform, setActivePlatform] = useState('all')
  const [messages, setMessages] = useState<typeof DUMMY_MESSAGES>([])
  const [loading, setLoading] = useState(true)
  const [activeChat, setActiveChat] = useState<number | null>(null)
  
  // Mobile responsive states
  const [showSidebar, setShowSidebar] = useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      if (activePlatform === 'all') {
        setMessages(DUMMY_MESSAGES)
      } else {
        setMessages(DUMMY_MESSAGES.filter(m => m.platform === activePlatform))
      }
      setLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [activePlatform])

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
  }

  const getPlatformIcon = (platform: string, size = 18) => {
    switch(platform) {
      case 'whatsapp': return <Phone size={size} className="text-green-500" />
      case 'instagram': return <Instagram size={size} className="text-pink-500" />
      case 'telegram': return <Send size={size} className="text-blue-400" />
      case 'messenger': return <MessageCircle size={size} className="text-blue-500" />
      default: return <MessageCircle size={size} className="text-gray-400" />
    }
  }

  const activeChatData = messages.find(m => m.id === activeChat) || (messages.length > 0 ? messages[0] : null)

  return (
    <div className="flex h-screen bg-[#050D1A] text-white overflow-hidden font-sans relative">
      
      {/* Mobile Sidebar Toggle & Header */}
      <div className="md:hidden absolute top-0 left-0 right-0 h-16 bg-[#0A1628]/90 backdrop-blur-md z-40 border-b border-white/10 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <button onClick={() => setShowSidebar(!showSidebar)} className="p-2 -ml-2 text-white">
            {showSidebar ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#00C2FF] to-blue-500 flex items-center justify-center">
            <MessageCircle size={16} className="text-white" />
          </div>
          <span className="font-bold">Inbox</span>
        </div>
        {activeChat && (
          <button onClick={() => setActiveChat(null)} className="text-sm font-medium text-[#00C2FF]">
            Back to List
          </button>
        )}
      </div>

      {/* Sidebar - Hidden on mobile unless toggled */}
      <div className={`
        fixed md:static inset-y-0 left-0 z-30 w-64 md:w-20 lg:w-64 border-r border-white/10 bg-[#0A1628]/95 md:bg-[#0A1628]/50 backdrop-blur-xl flex flex-col justify-between p-4 transition-transform duration-300
        ${showSidebar ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        pt-20 md:pt-4
      `}>
        <div>
          <div className="hidden md:flex items-center gap-3 mb-10 px-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00C2FF] to-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <MessageCircle size={24} className="text-white" />
            </div>
            <h1 className="text-xl font-bold hidden lg:block tracking-wide">Linkra</h1>
          </div>

          <nav className="space-y-2">
            {[
              { id: 'all', name: 'All Messages', icon: <MessageCircle size={20} /> },
              { id: 'whatsapp', name: 'WhatsApp', icon: <Phone size={20} /> },
              { id: 'instagram', name: 'Instagram', icon: <Instagram size={20} /> },
              { id: 'telegram', name: 'Telegram', icon: <Send size={20} /> },
            ].map((platform) => (
              <button
                key={platform.id}
                onClick={() => { setActivePlatform(platform.id); setShowSidebar(false); }}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${
                  activePlatform === platform.id 
                  ? 'bg-white/10 text-white shadow-inner' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className={`${activePlatform === platform.id ? 'text-[#00C2FF]' : 'group-hover:text-[#00C2FF] transition-colors'}`}>
                  {platform.icon}
                </div>
                <span className="font-medium md:hidden lg:block">{platform.name}</span>
                {activePlatform === platform.id && (
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00C2FF] ml-auto md:hidden lg:block shadow-[0_0_10px_#00C2FF]"></div>
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="space-y-2">
          <Link href="/dashboard" className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-colors">
            <LayoutDashboard size={20} />
            <span className="font-medium md:hidden lg:block">Dashboard</span>
          </Link>
          <button 
            onClick={() => setShowLogoutModal(true)}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium md:hidden lg:block">Sign Out</span>
          </button>
        </div>
      </div>

      {/* Inbox List - Hidden on mobile if chat is active */}
      <div className={`
        w-full md:w-80 border-r border-white/10 bg-[#0A1628]/30 flex-col backdrop-blur-md pt-16 md:pt-0
        ${activeChat ? 'hidden md:flex' : 'flex'}
      `}>
        <div className="p-4 md:p-6 border-b border-white/10">
          <div className="flex justify-between items-center mb-4 md:mb-6">
            <h2 className="text-xl font-bold hidden md:block">Messages</h2>
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors ml-auto md:ml-0">
              <Bell size={16} className="text-gray-300" />
            </div>
          </div>
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search conversations..." 
              className="w-full bg-black/20 border border-white/5 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-[#00C2FF]/50 focus:bg-black/40 transition-all text-white placeholder-gray-500"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full space-y-4 text-gray-400">
              <Loader2 size={32} className="animate-spin text-[#00C2FF]" />
            </div>
          ) : (
            <div className="p-3 space-y-1">
              {messages.map((msg) => (
                <div 
                  key={msg.id}
                  onClick={() => setActiveChat(msg.id)}
                  className={`p-3 rounded-xl cursor-pointer transition-all duration-200 border ${
                    activeChat === msg.id 
                    ? 'bg-gradient-to-r from-white/10 to-transparent border-white/10' 
                    : 'border-transparent hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img src={msg.avatar} alt={msg.sender} className="w-12 h-12 rounded-full object-cover border border-white/10" />
                      <div className="absolute -bottom-1 -right-1 bg-[#0A1628] rounded-full p-0.5">
                        {getPlatformIcon(msg.platform, 14)}
                      </div>
                      {msg.online && (
                        <div className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0A1628]"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="font-semibold text-sm truncate">{msg.sender}</h3>
                        <span className="text-xs text-gray-500">{msg.time}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-xs text-gray-400 truncate pr-2">{msg.lastMessage}</p>
                        {msg.unread > 0 && (
                          <span className="bg-[#00C2FF] text-[#050D1A] text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                            {msg.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Chat Area - Hidden on mobile if NO chat is active */}
      <div className={`
        flex-1 flex-col bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed relative
        ${!activeChat ? 'hidden md:flex' : 'flex'} pt-16 md:pt-0
      `}>
        {activeChatData ? (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-[#050D1A]/95 via-[#050D1A]/98 to-[#050D1A] z-0"></div>
            
            {/* Chat Header */}
            <div className="h-16 md:h-20 border-b border-white/10 px-4 md:px-6 flex items-center justify-between bg-[#0A1628]/80 backdrop-blur-md z-10 sticky top-0 hidden md:flex">
              <div className="flex items-center gap-4">
                <img src={activeChatData.avatar} alt="avatar" className="w-10 h-10 rounded-full border border-white/10" />
                <div>
                  <h2 className="font-bold text-md flex items-center gap-2">
                    {activeChatData.sender}
                    {getPlatformIcon(activeChatData.platform, 16)}
                  </h2>
                  <p className="text-xs text-[#00C2FF]">Online now</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-gray-400">
                <Search size={20} className="cursor-pointer hover:text-white transition-colors" />
                <MoreVertical size={20} className="cursor-pointer hover:text-white transition-colors" />
              </div>
            </div>

            {/* Messages Window */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 z-10">
              <div className="text-center">
                <span className="text-xs font-medium text-gray-500 bg-black/20 px-3 py-1 rounded-full border border-white/5">
                  Today
                </span>
              </div>
              
              <div className="flex items-end gap-2 max-w-[90%] md:max-w-[80%]">
                <img src={activeChatData.avatar} className="w-8 h-8 rounded-full mb-1 hidden sm:block" />
                <div className="bg-white/10 backdrop-blur-sm border border-white/10 p-3 md:p-4 rounded-2xl rounded-bl-sm text-sm text-gray-100 shadow-lg">
                  <p>{activeChatData.lastMessage}</p>
                  <div className="flex items-center gap-1 mt-2 text-[10px] text-gray-400">
                    <span>{activeChatData.time}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-end gap-2 max-w-[90%] md:max-w-[80%] ml-auto justify-end">
                <div className="bg-gradient-to-br from-[#00C2FF] to-blue-600 p-3 md:p-4 rounded-2xl rounded-br-sm text-sm text-white shadow-[0_4px_20px_rgba(0,194,255,0.2)]">
                  <p>Sounds great! I'll get back to you shortly with the details.</p>
                  <div className="flex items-center justify-end gap-1 mt-2 text-[10px] text-blue-100">
                    <span>Just now</span>
                    <CheckCheck size={12} />
                  </div>
                </div>
              </div>
            </div>

            {/* Input Area */}
            <div className="p-3 md:p-4 bg-[#0A1628]/80 backdrop-blur-md border-t border-white/10 z-10">
              <div className="max-w-4xl mx-auto flex items-end gap-2 md:gap-3 bg-black/20 p-1.5 md:p-2 rounded-2xl border border-white/5 shadow-inner">
                <button className="p-2 md:p-3 text-gray-400 hover:text-[#00C2FF] transition-colors rounded-xl hover:bg-white/5">
                  <Hash size={20} />
                </button>
                <textarea 
                  rows={1}
                  placeholder="Type a message..."
                  className="flex-1 bg-transparent resize-none focus:outline-none py-2.5 md:py-3 text-sm text-white placeholder-gray-500 max-h-32"
                />
                <button className="p-2 md:p-3 bg-gradient-to-r from-[#00C2FF] to-blue-500 text-white rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all transform hover:scale-105">
                  <Send size={18} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center bg-[#050D1A] z-10 text-gray-500 relative h-full">
            <div className="absolute inset-0 bg-gradient-to-b from-[#050D1A]/95 via-[#050D1A]/98 to-[#050D1A] z-0"></div>
            <MessageCircle size={64} className="mb-4 opacity-20 z-10" />
            <p className="z-10 font-medium">Select a conversation to start messaging</p>
          </div>
        )}
      </div>

      {/* Global Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#0A1628] w-full max-w-sm rounded-3xl border border-white/10 p-6 shadow-2xl">
            <h3 className="text-xl font-bold mb-2">Sign Out</h3>
            <p className="text-gray-400 text-sm mb-6">Are you sure you want to log out of your account?</p>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button 
                onClick={handleLogout}
                className="flex-1 py-2.5 rounded-xl bg-[#00C2FF] hover:bg-blue-500 text-[#050D1A] transition-colors text-sm font-bold"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
      
    </div>
  )
}
