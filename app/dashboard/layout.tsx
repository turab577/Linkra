'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard, Settings, User, Link as LinkIcon,
  MessageCircle, Menu, X, LogOut
} from 'lucide-react'
import Image from 'next/image'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [profile, setProfile] = useState<any>(null)
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)

  useEffect(() => {
    fetch('/api/user/profile')
      .then(res => res.json())
      .then(data => {
        if (data.id) setProfile(data)
      })
  }, [])

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
  }

  const navLinks = [
    { name: 'Overview', href: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Profile', href: '/dashboard/profile', icon: <User size={20} /> },
    { name: 'Connections', href: '/dashboard/connections', icon: <LinkIcon size={20} /> },
    { name: 'Inbox', href: '/dashboard/inbox', icon: <MessageCircle size={20} /> },
    { name: 'Settings', href: '/dashboard/settings', icon: <Settings size={20} /> },
  ]

  const SidebarContent = () => (
    <>
      <div className="p-6 flex items-center gap-3 border-b border-white/5">
        {/* <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00C2FF] to-blue-500 flex items-center justify-center shadow-[0_0_15px_rgba(0,194,255,0.3)]">
          <LayoutDashboard size={20} className="text-white" />
        </div> */}
        <Image src="/images/Logo.svg" alt='Logo' height={30} width={30} />
        <span className="font-bold text-xl text-white tracking-wide">Linkra</span>
      </div>

      <div className="p-4 flex-1 flex flex-col gap-2">
        {navLinks.map((link) => {
          const isActive = pathname === link.href
          return (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                ? 'bg-[#00C2FF]/10 text-[#00C2FF] font-semibold'
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
            >
              {link.icon}
              {link.name}
            </Link>
          )
        })}

        <div className="mt-auto">
          <button
            onClick={() => setIsLogoutModalOpen(true)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-red-400 hover:bg-red-500/10 hover:text-red-500 font-semibold"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>

      {profile && (
        <div className="p-4 border-t border-white/5 m-4 bg-white/5 rounded-2xl flex items-center gap-3">
          {profile.image ? (
            <img src={profile.image} alt="Profile" className="w-10 h-10 rounded-full object-cover" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-[#00C2FF]/20 flex items-center justify-center text-[#00C2FF] font-bold">
              {profile.name?.charAt(0) || 'U'}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">{profile.name || 'User'}</p>
            <p className="text-xs text-gray-400 truncate">{profile.email}</p>
          </div>
        </div>
      )}
    </>
  )

  return (
    <div className="min-h-screen bg-[#050D1A] flex font-sans overflow-hidden">

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-72 border-r border-white/5 bg-[#0A1628]/40 backdrop-blur-xl">
        <SidebarContent />
      </aside>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
          <aside className="w-[80%] max-w-sm bg-[#0A1628] h-full flex flex-col border-r border-white/10 relative z-10">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-6 right-4 p-2 bg-white/5 rounded-xl text-gray-400"
            >
              <X size={20} />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">

        {/* Mobile Header */}
        <header className="md:hidden shrink-0 sticky top-0 z-40 bg-[#0A1628]/80 backdrop-blur-xl border-b border-white/5 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 bg-white/5 rounded-xl text-white">
              <Menu size={20} />
            </button>
            <span className="font-bold text-lg text-white">Linkra</span>
          </div>
          {profile && (
            <div className="w-8 h-8 rounded-full bg-[#00C2FF]/20 flex items-center justify-center text-[#00C2FF] font-bold">
              {profile.name?.charAt(0) || 'U'}
            </div>
          )}
        </header>

        <main className="flex-1 min-h-0 flex flex-col overflow-y-auto">
          {children}
        </main>
      </div>
      {/* Logout Confirmation Modal */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#0A1628] w-full max-w-sm rounded-3xl border border-white/10 p-8 shadow-2xl flex flex-col items-center text-center relative">
            <button
              onClick={() => setIsLogoutModalOpen(false)}
              className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 transition-colors"
            >
              <X size={18} />
            </button>

            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
              <LogOut size={32} className="text-red-500" />
            </div>

            <h3 className="text-2xl font-bold mb-2 text-white">Log Out?</h3>
            <p className="text-gray-400 text-sm mb-8 leading-relaxed">
              Are you sure you want to log out of your Linkra account? You will need to sign in again to access your dashboard.
            </p>

            <div className="flex gap-3 w-full">
              <button
                onClick={() => setIsLogoutModalOpen(false)}
                className="flex-1 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-sm font-semibold text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 py-3.5 rounded-xl bg-red-500 hover:bg-red-600 text-white transition-all text-sm font-bold shadow-[0_0_15px_rgba(239,68,68,0.4)]"
              >
                Yes, Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
