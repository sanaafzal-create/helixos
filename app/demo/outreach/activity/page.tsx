'use client'

import { useState, useMemo } from 'react'
import { Phone, Mail, Calendar, MessageSquare, Filter } from 'lucide-react'
import { getCommunicationRecords } from '@/lib/outreach-seeds'

export default function ActivityTimelinePage() {
  const [filterType, setFilterType] = useState('all')
  const communications = getCommunicationRecords()

  const filteredCommunications = useMemo(() => {
    let filtered = communications
    if (filterType !== 'all') {
      filtered = filtered.filter(c => c.type === filterType)
    }
    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }, [communications, filterType])

  const getIcon = (type: string) => {
    switch (type) {
      case 'call':
        return Phone
      case 'email':
        return Mail
      case 'meeting':
        return Calendar
      case 'sms':
        return MessageSquare
      default:
        return MessageSquare
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'call':
        return '#06B6D4'
      case 'email':
        return '#F59E0B'
      case 'meeting':
        return '#10B981'
      case 'sms':
        return '#8B5CF6'
      default:
        return '#06B6D4'
    }
  }

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#0F172A' }}>
      {/* Header */}
      <div className="border-b p-8" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
        <div className="mb-6">
          <h1 className="text-4xl font-bold" style={{ color: '#FFFFFF' }}>
            Activity Timeline
          </h1>
          <p style={{ color: '#94A3B8' }} className="text-lg mt-1">
            Unified view of all communication activities
          </p>
        </div>

        {/* Filter */}
        <div className="flex gap-3 flex-wrap">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 rounded-lg border text-sm"
            style={{ backgroundColor: '#0F172A', borderColor: '#475569', color: '#FFFFFF' }}
          >
            <option value="all">All Activities</option>
            <option value="call">Calls</option>
            <option value="email">Emails</option>
            <option value="meeting">Meetings</option>
            <option value="sms">SMS Messages</option>
          </select>

          <p style={{ color: '#94A3B8' }} className="text-sm self-center ml-auto">
            Showing {filteredCommunications.length} activities
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="relative">
          {/* Timeline line */}
          <div
            className="absolute left-8 top-0 bottom-0 w-0.5"
            style={{ backgroundColor: '#334155' }}
          />

          {/* Timeline items */}
          <div className="space-y-6">
            {filteredCommunications.map((comm, idx) => {
              const Icon = getIcon(comm.type)
              const color = getTypeColor(comm.type)

              return (
                <div key={comm.id} className="relative pl-24">
                  {/* Timeline dot */}
                  <div
                    className="absolute left-0 top-2 w-16 h-16 rounded-full flex items-center justify-center border-4"
                    style={{
                      backgroundColor: '#1E293B',
                      borderColor: '#0F172A',
                    }}
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: `${color}20`,
                      }}
                    >
                      <Icon className="w-6 h-6" style={{ color }} />
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    className="p-4 rounded-lg border"
                    style={{
                      borderColor: '#334155',
                      backgroundColor: '#1E293B',
                    }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-lg" style={{ color: '#FFFFFF' }}>
                          {comm.subject}
                        </h3>
                        <p style={{ color: '#94A3B8' }} className="text-sm">
                          {new Date(comm.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className="text-xs px-3 py-1 rounded-full font-semibold capitalize"
                          style={{
                            backgroundColor: `${color}40`,
                            color: color,
                          }}
                        >
                          {comm.type}
                        </span>
                        <span
                          className="text-xs px-3 py-1 rounded-full font-semibold capitalize"
                          style={{
                            backgroundColor: comm.direction === 'outbound' ? '#06B6D440' : '#8B5CF640',
                            color: comm.direction === 'outbound' ? '#06B6D4' : '#8B5CF6',
                          }}
                        >
                          {comm.direction}
                        </span>
                      </div>
                    </div>

                    <p style={{ color: '#FFFFFF' }} className="mb-3">
                      {comm.summary}
                    </p>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      {comm.duration && (
                        <div>
                          <p style={{ color: '#94A3B8' }}>Duration</p>
                          <p style={{ color: '#FFFFFF' }} className="font-semibold">
                            {comm.duration} minutes
                          </p>
                        </div>
                      )}
                      <div>
                        <p style={{ color: '#94A3B8' }}>Outcome</p>
                        <p
                          className="font-semibold capitalize"
                          style={{
                            color: comm.outcome === 'positive' ? '#10B981' : comm.outcome === 'negative' ? '#EF4444' : '#94A3B8',
                          }}
                        >
                          {comm.outcome}
                        </p>
                      </div>
                    </div>

                    {comm.nextSteps && (
                      <div className="mt-3 p-3 rounded-lg" style={{ backgroundColor: '#0F172A' }}>
                        <p style={{ color: '#94A3B8' }} className="text-xs mb-1">
                          Next Steps
                        </p>
                        <p style={{ color: '#FFFFFF' }} className="text-sm">
                          {comm.nextSteps}
                        </p>
                      </div>
                    )}

                    {comm.tags.length > 0 && (
                      <div className="mt-3 flex gap-2 flex-wrap">
                        {comm.tags.map(tag => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-1 rounded"
                            style={{
                              backgroundColor: '#334155',
                              color: '#94A3B8',
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {filteredCommunications.length === 0 && (
            <div className="text-center py-12">
              <MessageSquare className="w-12 h-12 mx-auto mb-3" style={{ color: '#475569' }} />
              <p style={{ color: '#94A3B8' }} className="text-lg">
                No activities found
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
