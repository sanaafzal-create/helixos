'use client'

import { useState, useMemo } from 'react'
import { Search, Eye, Phone, Mail, Target, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { getContacts } from '@/lib/outreach-seeds'

export default function OutreachContactsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('score')
  const contacts = getContacts()

  const filteredContacts = useMemo(() => {
    let filtered = contacts.filter(c =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.organization.toLowerCase().includes(searchQuery.toLowerCase())
    )

    if (sortBy === 'score') {
      filtered.sort((a, b) => b.relationshipScore - a.relationshipScore)
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortBy === 'recent') {
      filtered.sort((a, b) => new Date(b.lastContactDate).getTime() - new Date(a.lastContactDate).getTime())
    }

    return filtered
  }, [contacts, searchQuery, sortBy])

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#0F172A' }}>
      {/* Header */}
      <div className="border-b p-8" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
        <div className="mb-6">
          <h1 className="text-4xl font-bold" style={{ color: '#FFFFFF' }}>
            Contacts
          </h1>
          <p style={{ color: '#94A3B8' }} className="text-lg mt-1">
            Manage provider and key contact relationships
          </p>
        </div>

        {/* Search and Sort */}
        <div className="flex gap-3 flex-wrap">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: '#94A3B8' }} />
              <input
                type="text"
                placeholder="Search contacts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border text-sm"
                style={{ backgroundColor: '#0F172A', borderColor: '#475569', color: '#FFFFFF' }}
              />
            </div>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 rounded-lg border text-sm"
            style={{ backgroundColor: '#0F172A', borderColor: '#475569', color: '#FFFFFF' }}
          >
            <option value="score">Sort by Relationship Score</option>
            <option value="name">Sort by Name</option>
            <option value="recent">Sort by Recent Activity</option>
          </select>
        </div>

        <p style={{ color: '#94A3B8' }} className="text-sm mt-4">
          Showing {filteredContacts.length} of {contacts.length} contacts
        </p>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredContacts.map(contact => (
            <Link key={contact.id} href={`/demo/outreach/contact/${contact.id}`}>
              <div
                className="p-4 rounded-lg border transition-all hover:shadow-lg cursor-pointer h-full"
                style={{
                  borderColor: '#334155',
                  backgroundColor: '#1E293B',
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold" style={{ color: '#FFFFFF' }}>
                      {contact.name}
                    </h3>
                    <p style={{ color: '#94A3B8' }} className="text-sm">
                      {contact.role}
                    </p>
                  </div>
                  <div
                    className="flex items-center gap-1 px-2 py-1 rounded text-sm flex-shrink-0"
                    style={{
                      backgroundColor: '#F59E0B40',
                      color: '#F59E0B',
                    }}
                  >
                    <Target className="w-3 h-3" />
                    {contact.relationshipScore}
                  </div>
                </div>

                <div style={{ color: '#94A3B8' }} className="text-sm space-y-1 mb-4">
                  <p>{contact.organization}</p>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3 h-3" />
                    <span className="truncate">{contact.email}</span>
                  </div>
                </div>

                <div className="border-t pt-3" style={{ borderColor: '#334155' }}>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span style={{ color: '#94A3B8' }}>Engagement Trend</span>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" style={{ color: contact.engagementTrend >= 0 ? '#10B981' : '#EF4444' }} />
                      <span style={{ color: contact.engagementTrend >= 0 ? '#10B981' : '#EF4444' }}>
                        {contact.engagementTrend > 0 ? '+' : ''}{contact.engagementTrend}
                      </span>
                    </div>
                  </div>
                  <p style={{ color: '#94A3B8' }} className="text-xs">
                    Last contact: {new Date(contact.lastContactDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredContacts.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 mx-auto mb-3" style={{ color: '#475569' }} />
            <p style={{ color: '#94A3B8' }} className="text-lg">
              No contacts found
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
