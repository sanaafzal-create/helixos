'use client'

import { demoOutreach } from '@/lib/demo-data'
import { Phone, Mail, Users } from 'lucide-react'

export default function DemoOutreachPage() {
  return (
    <div style={{ backgroundColor: '#0F172A' }} className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2" style={{ color: '#FFFFFF' }}>
          Outreach
        </h1>
        <p style={{ color: '#94A3B8' }}>
          Track member and provider engagement activities
        </p>
      </div>

      <div className="grid gap-4">
        {demoOutreach.map((activity) => {
          const Icon = activity.type === 'Phone Call' ? Phone : activity.type === 'Email' ? Mail : Users
          return (
            <div
              key={activity.id}
              className="p-6 rounded-lg border"
              style={{ backgroundColor: '#1E293B', borderColor: '#334155' }}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg" style={{ backgroundColor: '#0F172A' }}>
                  <Icon className="w-6 h-6" style={{ color: '#06B6D4' }} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold" style={{ color: '#FFFFFF' }}>
                      {activity.type}
                    </h3>
                    <span
                      className="px-3 py-1 rounded text-xs font-semibold"
                      style={{
                        backgroundColor: '#10B98140',
                        color: '#10B981',
                      }}
                    >
                      {activity.result}
                    </span>
                  </div>
                  <p style={{ color: '#94A3B8' }} className="text-sm mb-3">
                    {activity.member}
                  </p>
                  <p style={{ color: '#FFFFFF' }} className="text-sm mb-3">
                    {activity.notes}
                  </p>
                  <div className="flex gap-6 text-sm">
                    <span style={{ color: '#94A3B8' }}>
                      {new Date(activity.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                    {activity.duration && (
                      <span style={{ color: '#94A3B8' }}>Duration: {activity.duration}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
