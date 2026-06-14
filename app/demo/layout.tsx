'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Users, Building2, ClipboardList, Phone, CheckSquare, FileText, Brain, Settings, LogOut, Menu, X } from 'lucide-react'

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const pathname = usePathname()

  const navItems = [
    { name: 'Dashboard', href: '/demo', icon: LayoutDashboard },
    { name: 'Cases', href: '/demo/cases', icon: ClipboardList },
    { name: 'Providers', href: '/demo/providers', icon: Building2 },
    { name: 'Members', href: '/demo/members', icon: Users },
    { name: 'Outreach', href: '/demo/outreach', icon: Phone },
    { name: 'Tasks', href: '/demo/tasks', icon: CheckSquare },
    { name: 'Reports', href: '/demo/reports', icon: FileText },
    { name: 'AI Operations', href: '/demo/ai-ops', icon: Brain },
    { name: 'Settings', href: '/demo/settings', icon: Settings },
  ]

  return (
    <div className="flex h-screen" style={{ backgroundColor: '#0F172A' }}>
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? 'w-64' : 'w-0'} flex flex-col border-r transition-all duration-300 overflow-hidden`}
        style={{ backgroundColor: '#1E293B', borderColor: '#334155' }}
      >
        <div className="p-6 border-b" style={{ borderColor: '#334155' }}>
          <h1 className="text-2xl font-bold" style={{ color: '#06B6D4' }}>
            HelixOS
          </h1>
          <p style={{ color: '#94A3B8' }} className="text-sm">
            Demo Workspace
          </p>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors"
                style={{
                  backgroundColor: isActive ? '#334155' : 'transparent',
                  color: isActive ? '#06B6D4' : '#94A3B8',
                }}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t" style={{ borderColor: '#334155' }}>
          <Link
            href="/sign-in"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:opacity-80 transition-colors"
            style={{ color: '#EF4444' }}
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Exit Demo</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="border-b flex items-center justify-between p-4" style={{ borderColor: '#334155', backgroundColor: '#0F172A' }}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:opacity-80"
            style={{ color: '#94A3B8' }}
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <div className="flex items-center gap-4">
            <span style={{ color: '#94A3B8' }} className="text-sm">
              Demo Mode • Sarah Chen • Metro Healthcare Network
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  )
}
