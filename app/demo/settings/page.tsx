'use client'

import { Settings, Bell, Lock, Users, Palette } from 'lucide-react'

export default function DemoSettingsPage() {
  return (
    <div style={{ backgroundColor: '#0F172A' }} className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2" style={{ color: '#FFFFFF' }}>
          Settings
        </h1>
        <p style={{ color: '#94A3B8' }}>
          Configure your HelixOS workspace
        </p>
      </div>

      <div className="max-w-2xl space-y-6">
        {/* Organization Settings */}
        <div className="p-6 rounded-lg border" style={{ backgroundColor: '#1E293B', borderColor: '#334155' }}>
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-6 h-6" style={{ color: '#06B6D4' }} />
            <h3 style={{ color: '#FFFFFF' }} className="text-lg font-bold">
              Organization
            </h3>
          </div>
          <div className="space-y-4">
            <div>
              <label style={{ color: '#94A3B8' }} className="text-sm font-medium block mb-2">
                Organization Name
              </label>
              <div
                className="px-4 py-2 rounded-lg border"
                style={{ backgroundColor: '#0F172A', borderColor: '#334155', color: '#FFFFFF' }}
              >
                Metro Healthcare Network
              </div>
            </div>
            <div>
              <label style={{ color: '#94A3B8' }} className="text-sm font-medium block mb-2">
                Members
              </label>
              <div
                className="px-4 py-2 rounded-lg border"
                style={{ backgroundColor: '#0F172A', borderColor: '#334155', color: '#FFFFFF' }}
              >
                1,243 active members
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="p-6 rounded-lg border" style={{ backgroundColor: '#1E293B', borderColor: '#334155' }}>
          <div className="flex items-center gap-3 mb-4">
            <Bell className="w-6 h-6" style={{ color: '#F59E0B' }} />
            <h3 style={{ color: '#FFFFFF' }} className="text-lg font-bold">
              Notifications
            </h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span style={{ color: '#FFFFFF' }}>Email notifications</span>
              <div
                className="w-10 h-6 rounded-full cursor-pointer"
                style={{ backgroundColor: '#06B6D4' }}
              />
            </div>
            <div className="flex items-center justify-between">
              <span style={{ color: '#FFFFFF' }}>Task reminders</span>
              <div
                className="w-10 h-6 rounded-full cursor-pointer"
                style={{ backgroundColor: '#06B6D4' }}
              />
            </div>
            <div className="flex items-center justify-between">
              <span style={{ color: '#FFFFFF' }}>Alert notifications</span>
              <div
                className="w-10 h-6 rounded-full cursor-pointer"
                style={{ backgroundColor: '#06B6D4' }}
              />
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="p-6 rounded-lg border" style={{ backgroundColor: '#1E293B', borderColor: '#334155' }}>
          <div className="flex items-center gap-3 mb-4">
            <Lock className="w-6 h-6" style={{ color: '#EF4444' }} />
            <h3 style={{ color: '#FFFFFF' }} className="text-lg font-bold">
              Security
            </h3>
          </div>
          <div className="space-y-3">
            <button
              className="w-full px-4 py-2 rounded-lg text-left font-medium transition-opacity hover:opacity-80"
              style={{ backgroundColor: '#334155', color: '#FFFFFF' }}
            >
              Change Password
            </button>
            <button
              className="w-full px-4 py-2 rounded-lg text-left font-medium transition-opacity hover:opacity-80"
              style={{ backgroundColor: '#334155', color: '#FFFFFF' }}
            >
              Two-Factor Authentication
            </button>
            <button
              className="w-full px-4 py-2 rounded-lg text-left font-medium transition-opacity hover:opacity-80"
              style={{ backgroundColor: '#334155', color: '#FFFFFF' }}
            >
              View Active Sessions
            </button>
          </div>
        </div>

        {/* Appearance */}
        <div className="p-6 rounded-lg border" style={{ backgroundColor: '#1E293B', borderColor: '#334155' }}>
          <div className="flex items-center gap-3 mb-4">
            <Palette className="w-6 h-6" style={{ color: '#10B981' }} />
            <h3 style={{ color: '#FFFFFF' }} className="text-lg font-bold">
              Appearance
            </h3>
          </div>
          <div className="space-y-3">
            <div>
              <label style={{ color: '#94A3B8' }} className="text-sm font-medium block mb-2">
                Theme
              </label>
              <select
                className="w-full px-4 py-2 rounded-lg"
                style={{
                  backgroundColor: '#0F172A',
                  borderColor: '#334155',
                  color: '#FFFFFF',
                  border: '1px solid #334155',
                }}
              >
                <option>Dark (Default)</option>
                <option>Light</option>
                <option>Auto</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
