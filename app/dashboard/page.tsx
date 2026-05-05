'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Settings, LogOut, Trash2, LayoutDashboard,
  MessageCircle, Instagram, Phone, Send, AlertTriangle, Users, TrendingUp, Activity
} from 'lucide-react'

export default function DashboardPage() {
  const router = useRouter()
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const [deleteInput, setDeleteInput] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
  }

  const handleDeleteProfile = async () => {
    if (deleteInput !== 'delete account') return
    setIsDeleting(true)
    try {
      const res = await fetch('/api/user/delete', { method: 'DELETE' })
      if (res.ok) {
        router.push('/register')
      }
    } catch (error) {
      console.error(error)
      setIsDeleting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#050D1A] text-white p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0A1628]/60 p-6 rounded-3xl border border-white/10 backdrop-blur-md">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#00C2FF] to-blue-500 flex items-center justify-center shadow-[0_0_20px_rgba(0,194,255,0.3)]">
              <LayoutDashboard size={28} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Account Overview</h1>
              <p className="text-sm text-gray-400">Welcome back! Here's what's happening with your channels today.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push('/inbox')}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-[#00C2FF] hover:bg-blue-500 text-[#050D1A] font-bold rounded-xl transition-all shadow-lg hover:shadow-[#00C2FF]/30"
            >
              <MessageCircle size={18} />
              Open Inbox
            </button>
            <button
              onClick={() => setShowLogoutModal(true)}
              className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors text-gray-300"
            >
              <LogOut size={20} />
            </button>
          </div>
        </header>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'Total Messages', value: '1,248', icon: <MessageCircle size={20} className="text-[#00C2FF]" />, trend: '+12% this week' },
            { title: 'Active Platforms', value: '3 / 4', icon: <Activity size={20} className="text-purple-400" />, trend: 'All systems operational' },
            { title: 'New Leads', value: '84', icon: <Users size={20} className="text-green-400" />, trend: '+5% this week' },
            { title: 'Avg. Response Rate', value: '94%', icon: <TrendingUp size={20} className="text-orange-400" />, trend: 'Top 10% in your industry' },
          ].map((stat, i) => (
            <div key={i} className="bg-[#0A1628]/40 p-5 rounded-2xl border border-white/5 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-white/5 rounded-lg">{stat.icon}</div>
                <h3 className="text-sm text-gray-400 font-medium">{stat.title}</h3>
              </div>
              <p className="text-2xl font-bold mb-1">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.trend}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Platforms */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Settings size={20} className="text-[#00C2FF]" />
              Connected Platforms
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { name: 'Instagram', icon: <Instagram size={24} className="text-pink-500" />, connected: true },
                { name: 'WhatsApp', icon: <Phone size={24} className="text-green-500" />, connected: false },
                { name: 'Telegram', icon: <Send size={24} className="text-blue-400" />, connected: true },
                { name: 'Messenger', icon: <MessageCircle size={24} className="text-blue-600" />, connected: false },
              ].map((platform) => (
                <div key={platform.name} className="bg-[#0A1628]/40 p-5 rounded-2xl border border-white/5 flex items-center justify-between hover:bg-[#0A1628]/60 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/5 rounded-xl">
                      {platform.icon}
                    </div>
                    <span className="font-semibold">{platform.name}</span>
                  </div>
                  <button className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${platform.connected ? 'bg-green-500/10 text-green-400 hover:bg-green-500/20' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}>
                    {platform.connected ? 'Connected' : 'Connect'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Danger Zone */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2 text-red-400">
              <AlertTriangle size={20} />
              Danger Zone
            </h2>
            <div className="bg-red-500/5 p-6 rounded-3xl border border-red-500/20 space-y-4">
              <h3 className="font-bold text-red-400">Delete Profile</h3>
              <p className="text-sm text-gray-400">
                Permanently remove your account and all associated data. This action cannot be undone.
              </p>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="w-full py-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <Trash2 size={18} />
                Delete Account
              </button>
            </div>
          </div>
        </div>
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

      {/* Sensitive Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#0A1628] w-full max-w-md rounded-3xl border border-red-500/30 p-8 shadow-2xl">
            <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mb-4">
              <AlertTriangle size={24} className="text-red-500" />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-red-400">Delete Account</h3>
            <p className="text-gray-300 text-sm mb-6 leading-relaxed">
              This action is <span className="font-bold text-white">permanent and cannot be undone</span>.
              All your messages, connected platforms, and settings will be wiped immediately.
            </p>

            <div className="mb-6">
              <label className="block text-sm text-gray-400 mb-2">
                Type <span className="font-bold text-white select-none">delete account</span> to confirm
              </label>
              <input
                type="text"
                value={deleteInput}
                onChange={e => setDeleteInput(e.target.value)}
                placeholder="delete account"
                className="w-full bg-black/40 border border-red-500/30 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-red-500 transition-colors"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => { setShowDeleteModal(false); setDeleteInput(''); }}
                className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button
                disabled={deleteInput !== 'delete account' || isDeleting}
                onClick={handleDeleteProfile}
                className="flex-1 py-3 rounded-xl bg-red-500 text-white transition-all text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-600"
              >
                {isDeleting ? 'Deleting...' : 'Permanently Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
