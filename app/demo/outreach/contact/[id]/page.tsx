'use client'

import { useState, useEffect } from 'react'
import { Mail, Phone, Building2, Users, Calendar, TrendingUp, Plus, MessageSquare, CheckSquare, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { getContact } from '@/lib/outreach-seeds'

export default function ContactProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const [activeTab, setActiveTab] = useState('overview')
  const [id, setId] = useState<string | null>(null)

  useEffect(() => {
    params.then(({ id }) => setId(id))
  }, [params])

  const contact = id ? getContact(id) : null

  if (!contact) {
    return (
      <main className="min-h-screen" style={{ backgroundColor: '#0F172A' }}>
        <div className="p-8 text-center">
          <p style={{ color: '#94A3B8' }}>Contact not found</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#0F172A' }}>
      {/* Header */}
      <div className="border-b p-8" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
        <Link href="/demo/outreach/contacts">
          <button className="flex items-center gap-2 px-3 py-1 rounded-lg text-sm mb-4 transition-colors hover:opacity-80" style={{ backgroundColor: '#334155', color: '#06B6D4' }}>
            <ArrowLeft className="w-4 h-4" />
            Back to Contacts
          </button>
        </Link>
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold" style={{ color: '#FFFFFF' }}>
              {contact.name}
            </h1>
            <p style={{ color: '#94A3B8' }} className="text-lg mt-1">
              {contact.role} at {contact.organization}
            </p>
          </div>
          <div
            className="px-3 py-1 rounded-lg text-sm font-semibold"
            style={{
              backgroundColor: '#F59E0B40',
              color: '#F59E0B',
            }}
          >
            Score: {contact.relationshipScore}/10
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-3 flex-wrap mt-6">
          <button
            className="px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
            style={{ backgroundColor: '#06B6D4', color: '#0F172A' }}
          >
            <Phone className="w-4 h-4" />
            Log Call
          </button>
          <button
            className="px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 border"
            style={{ borderColor: '#334155', backgroundColor: 'transparent', color: '#06B6D4' }}
          >
            <Mail className="w-4 h-4" />
            Send Email
          </button>
          <button
            className="px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 border"
            style={{ borderColor: '#334155', backgroundColor: 'transparent', color: '#06B6D4' }}
          >
            <Calendar className="w-4 h-4" />
            Schedule Meeting
          </button>
          <button
            className="px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 border"
            style={{ borderColor: '#334155', backgroundColor: 'transparent', color: '#06B6D4' }}
          >
            <Plus className="w-4 h-4" />
            Add Note
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b sticky top-0 z-20" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
        <div className="px-8 flex gap-8">
          {['overview', 'communications', 'relationship', 'tasks', 'intelligence'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="py-4 font-medium transition-colors border-b-2"
              style={{
                borderColor: activeTab === tab ? '#06B6D4' : 'transparent',
                color: activeTab === tab ? '#06B6D4' : '#94A3B8',
              }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Information */}
              <div className="border rounded-lg p-6" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
                <h3 className="text-lg font-bold mb-4" style={{ color: '#FFFFFF' }}>
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 mt-0.5" style={{ color: '#06B6D4' }} />
                    <div>
                      <p style={{ color: '#94A3B8' }} className="text-sm">
                        Email
                      </p>
                      <p style={{ color: '#FFFFFF' }}>{contact.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 mt-0.5" style={{ color: '#06B6D4' }} />
                    <div>
                      <p style={{ color: '#94A3B8' }} className="text-sm">
                        Phone
                      </p>
                      <p style={{ color: '#FFFFFF' }}>{contact.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Building2 className="w-5 h-5 mt-0.5" style={{ color: '#06B6D4' }} />
                    <div>
                      <p style={{ color: '#94A3B8' }} className="text-sm">
                        Organization
                      </p>
                      <p style={{ color: '#FFFFFF' }}>{contact.organization}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Preferred Communication */}
              <div className="border rounded-lg p-6" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
                <h3 className="text-lg font-bold mb-4" style={{ color: '#FFFFFF' }}>
                  Engagement Preferences
                </h3>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: '#0F172A' }}>
                    <p style={{ color: '#94A3B8' }} className="text-sm mb-1">
                      Preferred Communication
                    </p>
                    <p
                      className="font-semibold capitalize px-3 py-1 rounded w-fit"
                      style={{
                        backgroundColor: '#06B6D440',
                        color: '#06B6D4',
                      }}
                    >
                      {contact.preferredCommunication}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg" style={{ backgroundColor: '#0F172A' }}>
                    <p style={{ color: '#94A3B8' }} className="text-sm mb-1">
                      Last Contact Date
                    </p>
                    <p style={{ color: '#FFFFFF' }} className="font-semibold">
                      {new Date(contact.lastContactDate).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Relationship Score */}
              <div className="border rounded-lg p-6" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
                <h3 className="text-lg font-bold mb-4" style={{ color: '#FFFFFF' }}>
                  Relationship Health
                </h3>
                <div className="flex items-end gap-3 mb-4">
                  <div className="flex-1">
                    <div className="h-24 rounded-lg" style={{ backgroundColor: '#0F172A', position: 'relative' }}>
                      <div
                        style={{
                          height: `${(contact.relationshipScore / 10) * 100}%`,
                          backgroundColor: '#06B6D4',
                          borderRadius: '0.5rem',
                          position: 'absolute',
                          bottom: 0,
                          width: '100%',
                          transition: 'height 0.3s ease',
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <p
                      className="text-3xl font-bold"
                      style={{
                        color: '#06B6D4',
                      }}
                    >
                      {contact.relationshipScore}
                    </p>
                    <p style={{ color: '#94A3B8' }} className="text-xs">
                      / 10
                    </p>
                  </div>
                </div>
              </div>

              {/* Engagement Trend */}
              <div className="border rounded-lg p-6" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
                <h3 className="text-lg font-bold mb-3" style={{ color: '#FFFFFF' }}>
                  Engagement Trend
                </h3>
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5" style={{ color: contact.engagementTrend >= 0 ? '#10B981' : '#EF4444' }} />
                  <span
                    className="text-2xl font-bold"
                    style={{
                      color: contact.engagementTrend >= 0 ? '#10B981' : '#EF4444',
                    }}
                  >
                    {contact.engagementTrend > 0 ? '+' : ''}{contact.engagementTrend}
                  </span>
                </div>
                <p style={{ color: '#94A3B8' }} className="text-xs">
                  {contact.engagementTrend > 0 ? 'Positive engagement trend this month' : 'Declining engagement - needs attention'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Communications Tab */}
        {activeTab === 'communications' && (
          <div className="border rounded-lg p-6" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
            <h3 className="text-lg font-bold mb-4" style={{ color: '#FFFFFF' }}>
              Recent Communications
            </h3>
            <div className="space-y-3 text-center py-8">
              <MessageSquare className="w-12 h-12 mx-auto" style={{ color: '#475569' }} />
              <p style={{ color: '#94A3B8' }}>View communication history here</p>
            </div>
          </div>
        )}

        {/* Relationship Tab */}
        {activeTab === 'relationship' && (
          <div className="border rounded-lg p-6" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
            <h3 className="text-lg font-bold mb-4" style={{ color: '#FFFFFF' }}>
              Relationship Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg" style={{ backgroundColor: '#0F172A' }}>
                <p style={{ color: '#94A3B8' }} className="text-sm mb-1">
                  Contact Frequency
                </p>
                <p style={{ color: '#FFFFFF' }} className="text-xl font-bold">
                  2-3x Monthly
                </p>
              </div>
              <div className="p-4 rounded-lg" style={{ backgroundColor: '#0F172A' }}>
                <p style={{ color: '#94A3B8' }} className="text-sm mb-1">
                  Response Rate
                </p>
                <p style={{ color: '#FFFFFF' }} className="text-xl font-bold">
                  92%
                </p>
              </div>
              <div className="p-4 rounded-lg" style={{ backgroundColor: '#0F172A' }}>
                <p style={{ color: '#94A3B8' }} className="text-sm mb-1">
                  Satisfaction Score
                </p>
                <p style={{ color: '#FFFFFF' }} className="text-xl font-bold">
                  9.2/10
                </p>
              </div>
              <div className="p-4 rounded-lg" style={{ backgroundColor: '#0F172A' }}>
                <p style={{ color: '#94A3B8' }} className="text-sm mb-1">
                  Years in Network
                </p>
                <p style={{ color: '#FFFFFF' }} className="text-xl font-bold">
                  3.5
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tasks Tab */}
        {activeTab === 'tasks' && (
          <div className="border rounded-lg p-6" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
            <h3 className="text-lg font-bold mb-4" style={{ color: '#FFFFFF' }}>
              Contact-Related Tasks
            </h3>
            <div className="space-y-3 text-center py-8">
              <CheckSquare className="w-12 h-12 mx-auto" style={{ color: '#475569' }} />
              <p style={{ color: '#94A3B8' }}>No active tasks for this contact</p>
            </div>
          </div>
        )}

        {/* Intelligence Tab */}
        {activeTab === 'intelligence' && (
          <div className="space-y-4">
            <div className="p-4 rounded-lg border-l-4" style={{ borderColor: '#10B981', backgroundColor: '#1E293B', borderTopColor: '#334155', borderRightColor: '#334155', borderBottomColor: '#334155' }}>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: '#10B981' }} />
                <div>
                  <h4 className="font-semibold" style={{ color: '#FFFFFF' }}>
                    Strong Engagement Pattern
                  </h4>
                  <p style={{ color: '#94A3B8' }} className="text-sm mt-1">
                    Response rate has improved 18% over the past 30 days. This contact is highly engaged.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg border-l-4" style={{ borderColor: '#06B6D4', backgroundColor: '#1E293B', borderTopColor: '#334155', borderRightColor: '#334155', borderBottomColor: '#334155' }}>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: '#06B6D4' }} />
                <div>
                  <h4 className="font-semibold" style={{ color: '#FFFFFF' }}>
                    Next Recommended Action
                  </h4>
                  <p style={{ color: '#94A3B8' }} className="text-sm mt-1">
                    Schedule quarterly business review meeting within next 2 weeks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
