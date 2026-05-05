'use client'

import { useState, useEffect } from 'react'
import { AlertTriangle, ShieldCheck, ShieldAlert, Key, FileText, Trash2, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

export default function SettingsPage() {
  const [profile, setProfile] = useState<any>(null)
  const [twoFaError, setTwoFaError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  // Delete Profile
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteInput, setDeleteInput] = useState('')

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    const res = await fetch('/api/user/profile')
    const data = await res.json()
    if (data.id) setProfile(data)
  }

  const handleSetup2FA = async () => {
    setTwoFaError('')
    setSuccessMsg('')
    const res = await fetch('/api/user/2fa', { method: 'POST' })
    if (res.ok) {
      setSuccessMsg('2FA Enabled Successfully!')
      fetchProfile()
    } else {
      const data = await res.json()
      setTwoFaError(data.message)
    }
  }

  const handleDisable2FA = async () => {
    setSuccessMsg('')
    await fetch('/api/user/2fa', { method: 'DELETE' })
    fetchProfile()
  }

  const handleDeleteProfile = async () => {
    if (deleteInput !== 'delete account') return
    const res = await fetch('/api/user/delete', { method: 'DELETE' })
    if (res.ok) window.location.href = '/register'
  }

  if (!profile) return <div className="p-8 text-gray-400 flex justify-center">Loading settings...</div>

  return (
    <div className="p-4 md:p-8 space-y-8  pb-20">
      <header>
        <h1 className="text-3xl font-bold text-white mb-2">Account Settings</h1>
        <p className="text-gray-400">Manage security, two-factor authentication, and privacy policies.</p>
      </header>

      {/* Security & 2FA */}
      <div className="bg-[#0A1628]/60 p-6 md:p-8 rounded-3xl border border-white/5 backdrop-blur-md space-y-6">
        <div className="flex items-center gap-3 mb-2">
          <Key className="text-[#00C2FF]" />
          <h2 className="text-xl font-bold text-white">Security & 2FA</h2>
        </div>

        <div className="p-6 bg-[#050D1A] rounded-2xl border border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-bold text-white flex items-center gap-2 mb-1">
              Two-Factor Authentication
              {profile.twoFactorEnabled ? <ShieldCheck className="text-green-500" size={18} /> : <ShieldAlert className="text-orange-500" size={18} />}
            </h3>
            <p className="text-sm text-gray-400">
              {profile.twoFactorEnabled
                ? "Your account is highly secure. 2FA is currently active."
                : "Add an extra layer of security to your account using an authenticator app."}
            </p>
          </div>

          {!profile.twoFactorEnabled && (
            <button onClick={handleSetup2FA} className="px-6 py-2.5 bg-[#69c0d2] text-[#050D1A] font-bold rounded-xl whitespace-nowrap hover:scale-105 transition-transform">
              Enable 2FA
            </button>
          )}

          {profile.twoFactorEnabled && (
            <button onClick={handleDisable2FA} className="px-6 py-2.5 bg-red-500/10 text-red-500 font-bold rounded-xl whitespace-nowrap hover:bg-red-500/20 transition-colors">
              Disable 2FA
            </button>
          )}
        </div>

        {successMsg && (
          <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-sm font-medium">
            {successMsg}
          </div>
        )}
        
        {twoFaError && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm font-medium">
            {twoFaError}
          </div>
        )}
      </div>

      {/* Legal & Privacy */}
      <div className="bg-[#0A1628]/60 p-6 md:p-8 rounded-3xl border border-white/5 backdrop-blur-md">
        <div className="flex items-center gap-3 mb-6">
          <FileText className="text-purple-400" />
          <h2 className="text-xl font-bold text-white">Legal & Privacy</h2>
        </div>
        <div className="space-y-4">
          <Link href="/privacy" className="flex items-center justify-between p-4 bg-[#050D1A] hover:bg-white/5 rounded-2xl border border-white/5 transition-colors group">
            <div>
              <p className="font-bold text-white group-hover:text-[#00C2FF] transition-colors">Privacy Policy</p>
              <p className="text-sm text-gray-400">Read how we handle your data and privacy.</p>
            </div>
            <ArrowUpRight className="text-gray-500 group-hover:text-[#00C2FF]" />
          </Link>
          <Link href="/terms" className="flex items-center justify-between p-4 bg-[#050D1A] hover:bg-white/5 rounded-2xl border border-white/5 transition-colors group">
            <div>
              <p className="font-bold text-white group-hover:text-[#00C2FF] transition-colors">Terms of Service</p>
              <p className="text-sm text-gray-400">Read our terms and conditions.</p>
            </div>
            <ArrowUpRight className="text-gray-500 group-hover:text-[#00C2FF]" />
          </Link>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-500/5 p-6 md:p-8 rounded-3xl border border-red-500/20 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2 text-red-400 mb-2">
            <AlertTriangle size={20} />
            Danger Zone
          </h2>
          <p className="text-sm text-gray-400 max-w-xl">
            Permanently delete your Linkra account, erase all active campaigns, metrics, and sever all active platform integrations. This action is irreversible.
          </p>
        </div>
        <button
          onClick={() => setShowDeleteModal(true)}
          className="w-full md:w-auto px-6 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 font-bold rounded-xl transition-colors whitespace-nowrap flex items-center justify-center gap-2"
        >
          <Trash2 size={18} />
          Delete Account
        </button>
      </div>

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
                disabled={deleteInput !== 'delete account'}
                onClick={handleDeleteProfile}
                className="flex-1 py-3 rounded-xl bg-red-500 text-white transition-all text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-600"
              >
                Permanently Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
