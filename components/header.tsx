'use client'

import { Search, Bell, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { signOut } from '@/lib/auth-client'

export function Header() {
  const router = useRouter()
  const [signingOut, setSigningOut] = useState(false)

  const handleSignOut = async () => {
    setSigningOut(true)
    await signOut()
    router.push('/sign-in')
    router.refresh()
  }

  return (
    <div
      className="flex items-center justify-between px-8 py-4 border-b"
      style={{ backgroundColor: '#0F172A', borderColor: '#334155' }}
    >
      {/* Search bar */}
      <div className="flex-1 max-w-md">
        <div
          className="flex items-center gap-2 px-4 py-2 rounded-lg border"
          style={{ backgroundColor: '#1E293B', borderColor: '#334155' }}
        >
          <Search size={18} style={{ color: '#94A3B8' }} />
          <input
            type="text"
            placeholder="Search cases, members..."
            className="bg-transparent flex-1 outline-none text-sm"
            style={{ color: '#FFFFFF' }}
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4 ml-8">
        <button className="p-2 rounded-lg hover:opacity-80" style={{ color: '#94A3B8' }}>
          <Bell size={20} />
        </button>
        <button
          onClick={handleSignOut}
          disabled={signingOut}
          className="flex items-center gap-2 p-2 rounded-lg hover:opacity-80 disabled:opacity-50 text-sm"
          style={{ color: '#94A3B8' }}
          aria-label="Sign out"
        >
          <LogOut size={18} />
          {signingOut ? 'Signing out...' : 'Sign out'}
        </button>
      </div>
    </div>
  )
}
