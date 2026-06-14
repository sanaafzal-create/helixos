'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Users, FileText, CheckSquare, ActivitySquare, LogOut } from 'lucide-react'
import { authClient } from '@/lib/auth-client'

export function Sidebar() {
  const pathname = usePathname()

  const navItems = [
    { href: '/', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/providers', label: 'Providers', icon: Users },
    { href: '/members', label: 'Members', icon: Users },
    { href: '/cases', label: 'Cases', icon: FileText },
    { href: '/tasks', label: 'Tasks', icon: CheckSquare },
    { href: '/activity', label: 'Activity', icon: ActivitySquare },
  ]

  const handleLogout = async () => {
    await authClient.signOut()
  }

  return (
    <div
      className="w-64 h-screen flex flex-col border-r"
      style={{ backgroundColor: '#0F172A', borderColor: '#334155' }}
    >
      {/* Logo */}
      <div className="p-6 border-b" style={{ borderColor: '#334155' }}>
        <h1 className="text-2xl font-bold" style={{ color: '#06B6D4' }}>
          HelixOS
        </h1>
        <p className="text-sm" style={{ color: '#94A3B8' }}>
          Case Management
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors"
              style={{
                backgroundColor: isActive ? '#1E293B' : 'transparent',
                color: isActive ? '#06B6D4' : '#94A3B8',
              }}
            >
              <Icon size={20} />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t" style={{ borderColor: '#334155' }}>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors"
          style={{ color: '#94A3B8' }}
        >
          <LogOut size={20} />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </div>
  )
}
