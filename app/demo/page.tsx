'use client'

import { demoDashboardData, demoProviders, demoMembers, demoCases } from '@/lib/demo-data'
import { TrendingUp, Users, Building2, ClipboardList, AlertCircle, Clock, CheckCircle2, Activity } from 'lucide-react'

export default function DemoDashboardPage() {
  const data = demoDashboardData

  return (
    <div className="p-8 space-y-8" style={{ backgroundColor: '#0F172A' }}>
      {/* Welcome Header */}
      <div>
        <h1 className="text-4xl font-bold mb-2" style={{ color: '#FFFFFF' }}>
          Welcome to HelixOS Demo
        </h1>
        <p style={{ color: '#94A3B8' }}>
          Explore the case management platform with realistic enterprise data • 6 months of operational activity
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="p-6 rounded-lg border" style={{ backgroundColor: '#1E293B', borderColor: '#334155' }}>
          <div className="flex items-center justify-between mb-2">
            <p style={{ color: '#94A3B8' }} className="text-sm font-semibold">
              Active Cases
            </p>
            <ClipboardList className="w-5 h-5" style={{ color: '#06B6D4' }} />
          </div>
          <p style={{ color: '#FFFFFF' }} className="text-2xl font-bold">
            {data.stats.activeCases}
          </p>
        </div>

        <div className="p-6 rounded-lg border" style={{ backgroundColor: '#1E293B', borderColor: '#334155' }}>
          <div className="flex items-center justify-between mb-2">
            <p style={{ color: '#94A3B8' }} className="text-sm font-semibold">
              Pending Tasks
            </p>
            <Clock className="w-5 h-5" style={{ color: '#F59E0B' }} />
          </div>
          <p style={{ color: '#FFFFFF' }} className="text-2xl font-bold">
            {data.stats.pendingTasks}
          </p>
        </div>

        <div className="p-6 rounded-lg border" style={{ backgroundColor: '#1E293B', borderColor: '#334155' }}>
          <div className="flex items-center justify-between mb-2">
            <p style={{ color: '#94A3B8' }} className="text-sm font-semibold">
              Members
            </p>
            <Users className="w-5 h-5" style={{ color: '#10B981' }} />
          </div>
          <p style={{ color: '#FFFFFF' }} className="text-2xl font-bold">
            {data.stats.totalMembers.toLocaleString()}
          </p>
        </div>

        <div className="p-6 rounded-lg border" style={{ backgroundColor: '#1E293B', borderColor: '#334155' }}>
          <div className="flex items-center justify-between mb-2">
            <p style={{ color: '#94A3B8' }} className="text-sm font-semibold">
              Providers
            </p>
            <Building2 className="w-5 h-5" style={{ color: '#8B5CF6' }} />
          </div>
          <p style={{ color: '#FFFFFF' }} className="text-2xl font-bold">
            {data.stats.totalProviders}
          </p>
        </div>

        <div className="p-6 rounded-lg border" style={{ backgroundColor: '#1E293B', borderColor: '#334155' }}>
          <div className="flex items-center justify-between mb-2">
            <p style={{ color: '#94A3B8' }} className="text-sm font-semibold">
              Engagement
            </p>
            <TrendingUp className="w-5 h-5" style={{ color: '#06B6D4' }} />
          </div>
          <p style={{ color: '#FFFFFF' }} className="text-2xl font-bold">
            {data.stats.engagementRate}%
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upcoming Follow-ups */}
        <div className="lg:col-span-2 p-6 rounded-lg border" style={{ backgroundColor: '#1E293B', borderColor: '#334155' }}>
          <h2 className="text-xl font-bold mb-4" style={{ color: '#FFFFFF' }}>
            Upcoming Follow-ups
          </h2>
          <div className="space-y-4">
            {data.upcomingFollowUps.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-lg flex items-start gap-4"
                style={{ backgroundColor: '#0F172A', borderLeft: `4px solid ${item.priority === 'high' ? '#EF4444' : '#F59E0B'}` }}
              >
                <AlertCircle
                  className="w-5 h-5 mt-0.5 flex-shrink-0"
                  style={{ color: item.priority === 'high' ? '#EF4444' : '#F59E0B' }}
                />
                <div className="flex-1">
                  <p style={{ color: '#FFFFFF' }} className="font-semibold">
                    {item.member} • Case {item.case}
                  </p>
                  <p style={{ color: '#94A3B8' }} className="text-sm">
                    {item.description}
                  </p>
                  <p style={{ color: '#94A3B8' }} className="text-xs mt-2">
                    Due: {new Date(item.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Workload */}
        <div className="p-6 rounded-lg border" style={{ backgroundColor: '#1E293B', borderColor: '#334155' }}>
          <h2 className="text-xl font-bold mb-4" style={{ color: '#FFFFFF' }}>
            Team Workload
          </h2>
          <div className="space-y-4">
            {data.teamWorkload.map((member) => (
              <div key={member.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ backgroundColor: '#06B6D4', color: '#0F172A' }}
                  >
                    {member.avatar}
                  </div>
                  <div>
                    <p style={{ color: '#FFFFFF' }} className="text-sm font-semibold">
                      {member.name}
                    </p>
                    <p style={{ color: '#94A3B8' }} className="text-xs">
                      {member.activeCount} active
                    </p>
                  </div>
                </div>
                <p style={{ color: '#10B981' }} className="text-sm font-semibold">
                  {member.completedToday}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="p-6 rounded-lg border" style={{ backgroundColor: '#1E293B', borderColor: '#334155' }}>
        <h2 className="text-xl font-bold mb-4" style={{ color: '#FFFFFF' }}>
          Recent Activity
        </h2>
        <div className="space-y-4">
          {data.recentActivity.map((activity) => (
            <div key={activity.id} className="flex gap-4 pb-4 border-b" style={{ borderColor: '#334155' }}>
              <Activity className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#06B6D4' }} />
              <div className="flex-1">
                <p style={{ color: '#FFFFFF' }} className="font-semibold">
                  {activity.description}
                </p>
                <p style={{ color: '#94A3B8' }} className="text-sm mt-1">
                  {activity.user} • {activity.timestamp.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
