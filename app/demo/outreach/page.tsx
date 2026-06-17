'use client'

import { useState } from 'react'
import { TrendingUp, Phone, Mail, Calendar, Clock, Users, Target, BarChart3, AlertCircle, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { getOutreachMetrics, getCommunicationRecords, getFollowUps, getCampaigns } from '@/lib/outreach-seeds'

export default function OutreachDashboard() {
  const metrics = getOutreachMetrics()
  const communications = getCommunicationRecords()
  const followUps = getFollowUps()
  const campaigns = getCampaigns()

  const activeCampaigns = campaigns.filter(c => c.status === 'active')
  const overdue = followUps.filter(f => f.status === 'overdue')

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#0F172A' }}>
      {/* Header */}
      <div className="border-b p-8" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
        <div>
          <h1 className="text-4xl font-bold" style={{ color: '#FFFFFF' }}>
            Outreach Operations
          </h1>
          <p style={{ color: '#94A3B8' }} className="text-lg mt-2">
            Command center for communication, relationships, and engagement
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        {/* Key Metrics */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4" style={{ color: '#FFFFFF' }}>
            This Week&apos;s Metrics
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Activities */}
            <div className="p-4 rounded-lg border" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
              <div className="flex items-start justify-between mb-2">
                <p style={{ color: '#94A3B8' }} className="text-sm font-medium">
                  Total Activities
                </p>
                <BarChart3 className="w-5 h-5" style={{ color: '#06B6D4' }} />
              </div>
              <p className="text-3xl font-bold" style={{ color: '#FFFFFF' }}>
                {metrics.activitiesThisWeek}
              </p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-4 h-4" style={{ color: '#10B981' }} />
                <span style={{ color: '#10B981' }} className="text-sm">
                  +12% vs last week
                </span>
              </div>
            </div>

            {/* Calls */}
            <div className="p-4 rounded-lg border" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
              <div className="flex items-start justify-between mb-2">
                <p style={{ color: '#94A3B8' }} className="text-sm font-medium">
                  Calls Completed
                </p>
                <Phone className="w-5 h-5" style={{ color: '#06B6D4' }} />
              </div>
              <p className="text-3xl font-bold" style={{ color: '#FFFFFF' }}>
                {metrics.callsCompleted}
              </p>
              <p style={{ color: '#94A3B8' }} className="text-xs mt-2">
                {((metrics.callsCompleted / metrics.activitiesThisWeek) * 100).toFixed(0)}% of activities
              </p>
            </div>

            {/* Emails */}
            <div className="p-4 rounded-lg border" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
              <div className="flex items-start justify-between mb-2">
                <p style={{ color: '#94A3B8' }} className="text-sm font-medium">
                  Emails Sent
                </p>
                <Mail className="w-5 h-5" style={{ color: '#06B6D4' }} />
              </div>
              <p className="text-3xl font-bold" style={{ color: '#FFFFFF' }}>
                {metrics.emailsSent}
              </p>
              <p style={{ color: '#94A3B8' }} className="text-xs mt-2">
                {((metrics.emailsSent / metrics.activitiesThisWeek) * 100).toFixed(0)}% of activities
              </p>
            </div>

            {/* Response Rate */}
            <div className="p-4 rounded-lg border" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
              <div className="flex items-start justify-between mb-2">
                <p style={{ color: '#94A3B8' }} className="text-sm font-medium">
                  Response Rate
                </p>
                <TrendingUp className="w-5 h-5" style={{ color: '#06B6D4' }} />
              </div>
              <p className="text-3xl font-bold" style={{ color: '#FFFFFF' }}>
                {metrics.responseRate}%
              </p>
              <p style={{ color: '#94A3B8' }} className="text-xs mt-2">
                Positive outcomes
              </p>
            </div>
          </div>
        </div>

        {/* Priority Alerts */}
        {(metrics.overdueTasks > 0 || overdue.length > 0) && (
          <div className="mb-8 p-4 rounded-lg border" style={{ borderColor: '#EF4444', backgroundColor: '#EF444415' }}>
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 mt-0.5" style={{ color: '#EF4444' }} />
              <div className="flex-1">
                <h3 className="font-semibold mb-2" style={{ color: '#EF4444' }}>
                  {overdue.length} Overdue Follow-Ups
                </h3>
                <p style={{ color: '#94A3B8' }} className="text-sm mb-3">
                  {overdue.length > 0 && `${overdue[0].description} is overdue since ${new Date(overdue[0].dueDate).toLocaleDateString()}`}
                </p>
                <Link href="/demo/outreach/follow-ups">
                  <button
                    className="text-sm font-medium px-3 py-1 rounded-lg transition-colors"
                    style={{ backgroundColor: '#EF4444', color: '#FFFFFF' }}
                  >
                    View Overdue
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Communications */}
          <div className="border rounded-lg p-6" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold" style={{ color: '#FFFFFF' }}>
                Recent Communications
              </h3>
              <Link href="/demo/outreach/activity">
                <button
                  className="text-sm px-3 py-1 rounded-lg transition-colors"
                  style={{ backgroundColor: '#06B6D415', color: '#06B6D4' }}
                >
                  View All
                </button>
              </Link>
            </div>

            <div className="space-y-3">
              {communications.slice(0, 5).map(comm => (
                <div
                  key={comm.id}
                  className="p-3 rounded-lg border"
                  style={{
                    borderColor: '#475569',
                    backgroundColor: '#0F172A',
                  }}
                >
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex items-center gap-2">
                      {comm.type === 'call' && <Phone className="w-4 h-4" style={{ color: '#06B6D4' }} />}
                      {comm.type === 'email' && <Mail className="w-4 h-4" style={{ color: '#06B6D4' }} />}
                      {comm.type === 'meeting' && <Calendar className="w-4 h-4" style={{ color: '#06B6D4' }} />}
                      <span className="font-medium text-sm" style={{ color: '#FFFFFF' }}>
                        {comm.subject}
                      </span>
                    </div>
                    <span
                      className="text-xs px-2 py-1 rounded"
                      style={{
                        backgroundColor: comm.outcome === 'positive' ? '#10B98140' : comm.outcome === 'negative' ? '#EF444440' : '#64748B40',
                        color: comm.outcome === 'positive' ? '#10B981' : comm.outcome === 'negative' ? '#EF4444' : '#94A3B8',
                      }}
                    >
                      {comm.outcome}
                    </span>
                  </div>
                  <p style={{ color: '#94A3B8' }} className="text-xs">
                    {new Date(comm.date).toLocaleDateString()} • {comm.direction}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Follow-Ups */}
          <div className="border rounded-lg p-6" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold" style={{ color: '#FFFFFF' }}>
                Upcoming Follow-Ups
              </h3>
              <Link href="/demo/outreach/follow-ups">
                <button
                  className="text-sm px-3 py-1 rounded-lg transition-colors"
                  style={{ backgroundColor: '#06B6D415', color: '#06B6D4' }}
                >
                  View All
                </button>
              </Link>
            </div>

            <div className="space-y-3">
              {followUps.slice(0, 5).map(fup => (
                <div
                  key={fup.id}
                  className="p-3 rounded-lg border"
                  style={{
                    borderColor: '#475569',
                    backgroundColor: '#0F172A',
                  }}
                >
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex-1">
                      <p className="font-medium text-sm" style={{ color: '#FFFFFF' }}>
                        {fup.description}
                      </p>
                      <p style={{ color: '#94A3B8' }} className="text-xs mt-1">
                        Assigned to {fup.assignedTo}
                      </p>
                    </div>
                    <span
                      className="text-xs px-2 py-1 rounded flex-shrink-0"
                      style={{
                        backgroundColor: fup.priority === 'high' ? '#EF444440' : fup.priority === 'medium' ? '#F59E0B40' : '#10B98140',
                        color: fup.priority === 'high' ? '#EF4444' : fup.priority === 'medium' ? '#F59E0B' : '#10B981',
                      }}
                    >
                      {fup.priority}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs mt-2">
                    <Clock className="w-3 h-3" style={{ color: '#94A3B8' }} />
                    <span style={{ color: '#94A3B8' }}>
                      Due {new Date(fup.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Campaigns and Team Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Active Campaigns */}
          <div className="border rounded-lg p-6" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
            <h3 className="text-lg font-bold mb-4" style={{ color: '#FFFFFF' }}>
              Active Campaigns ({activeCampaigns.length})
            </h3>
            <div className="space-y-3">
              {activeCampaigns.map(campaign => (
                <div
                  key={campaign.id}
                  className="p-3 rounded-lg border"
                  style={{
                    borderColor: '#475569',
                    backgroundColor: '#0F172A',
                  }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium" style={{ color: '#FFFFFF' }}>
                      {campaign.name}
                    </h4>
                    <Target className="w-4 h-4" style={{ color: '#06B6D4' }} />
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <p style={{ color: '#94A3B8' }}>Reached</p>
                      <p style={{ color: '#FFFFFF' }} className="font-semibold">
                        {campaign.metrics.contactsReached}/{campaign.targetAudience.count}
                      </p>
                    </div>
                    <div>
                      <p style={{ color: '#94A3B8' }}>Engagement</p>
                      <p style={{ color: '#06B6D4' }} className="font-semibold">
                        {(campaign.metrics.engagementRate * 100).toFixed(0)}%
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team Activity Summary */}
          <div className="border rounded-lg p-6" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
            <h3 className="text-lg font-bold mb-4" style={{ color: '#FFFFFF' }}>
              Team Activity
            </h3>
            <div className="space-y-3">
              <div className="p-3 rounded-lg" style={{ backgroundColor: '#0F172A' }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" style={{ color: '#06B6D4' }} />
                    <span style={{ color: '#FFFFFF' }}>Team Members Active</span>
                  </div>
                  <span className="text-lg font-bold" style={{ color: '#FFFFFF' }}>
                    8
                  </span>
                </div>
              </div>
              <div className="p-3 rounded-lg" style={{ backgroundColor: '#0F172A' }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" style={{ color: '#10B981' }} />
                    <span style={{ color: '#FFFFFF' }}>Tasks Completed Today</span>
                  </div>
                  <span className="text-lg font-bold" style={{ color: '#FFFFFF' }}>
                    24
                  </span>
                </div>
              </div>
              <div className="p-3 rounded-lg" style={{ backgroundColor: '#0F172A' }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" style={{ color: '#F59E0B' }} />
                    <span style={{ color: '#FFFFFF' }}>Pending Review</span>
                  </div>
                  <span className="text-lg font-bold" style={{ color: '#FFFFFF' }}>
                    7
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="mt-8 flex gap-3 flex-wrap">
          <Link href="/demo/outreach/contacts">
            <button
              className="px-4 py-2 rounded-lg font-medium transition-colors"
              style={{ backgroundColor: '#06B6D4', color: '#0F172A' }}
            >
              View All Contacts
            </button>
          </Link>
          <Link href="/demo/outreach/activity">
            <button
              className="px-4 py-2 rounded-lg font-medium transition-colors border"
              style={{ borderColor: '#334155', backgroundColor: 'transparent', color: '#06B6D4' }}
            >
              View Activity Timeline
            </button>
          </Link>
          <Link href="/demo/outreach/follow-ups">
            <button
              className="px-4 py-2 rounded-lg font-medium transition-colors border"
              style={{ borderColor: '#334155', backgroundColor: 'transparent', color: '#06B6D4' }}
            >
              Manage Follow-Ups
            </button>
          </Link>
        </div>
      </div>
    </main>
  )
}
