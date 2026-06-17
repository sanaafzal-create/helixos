'use client'

import { useState, useMemo } from 'react'
import { Search, Grid3x3, List, Filter, ChevronDown, AlertCircle, CheckCircle, Clock, Eye, MessageSquare } from 'lucide-react'
import Link from 'next/link'
import { getMembers } from '@/lib/member-seeds'

export default function MembersPage() {
  const [viewMode, setViewMode] = useState<'table' | 'card'>('table')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterRisk, setFilterRisk] = useState('all')
  const [filterCity, setFilterCity] = useState('')
  const [selectedMembers, setSelectedMembers] = useState<Set<string>>(new Set())

  const members = getMembers()

  const filteredMembers = useMemo(() => {
    let filtered = members.filter(m => {
      const matchesSearch =
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.memberId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.city.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesStatus = filterStatus === 'all' || m.status === filterStatus
      const matchesRisk = filterRisk === 'all' || m.riskLevel === filterRisk
      const matchesCity = !filterCity || m.city === filterCity

      return matchesSearch && matchesStatus && matchesRisk && matchesCity
    })

    if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortBy === 'risk') {
      const riskOrder = { high: 0, medium: 1, low: 2 }
      filtered.sort((a, b) => riskOrder[a.riskLevel as keyof typeof riskOrder] - riskOrder[b.riskLevel as keyof typeof riskOrder])
    } else if (sortBy === 'cases') {
      filtered.sort((a, b) => b.activeCases - a.activeCases)
    } else if (sortBy === 'recent') {
      filtered.sort((a, b) => new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime())
    }

    return filtered
  }, [members, searchQuery, sortBy, filterStatus, filterRisk, filterCity])

  const cities = Array.from(new Set(members.map(m => m.city))).sort()

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedMembers(new Set(filteredMembers.map(m => m.id)))
    } else {
      setSelectedMembers(new Set())
    }
  }

  const toggleMember = (id: string) => {
    const newSelected = new Set(selectedMembers)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedMembers(newSelected)
  }

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#0F172A' }}>
      {/* Header */}
      <div className="sticky top-0 z-40 border-b p-6" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: '#FFFFFF' }}>
              Members
            </h1>
            <p style={{ color: '#94A3B8' }} className="text-sm mt-1">
              Manage member records and case assignments
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('table')}
              className="p-2 rounded-lg transition-colors"
              style={{
                backgroundColor: viewMode === 'table' ? '#06B6D415' : 'transparent',
                color: viewMode === 'table' ? '#06B6D4' : '#94A3B8',
              }}
            >
              <List className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('card')}
              className="p-2 rounded-lg transition-colors"
              style={{
                backgroundColor: viewMode === 'card' ? '#06B6D415' : 'transparent',
                color: viewMode === 'card' ? '#06B6D4' : '#94A3B8',
              }}
            >
              <Grid3x3 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex gap-3 flex-wrap mb-4">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: '#94A3B8' }} />
              <input
                type="text"
                placeholder="Search members by name or ID..."
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
            className="px-3 py-2 pr-10 rounded-lg border text-sm appearance-none cursor-pointer"
            style={{ backgroundColor: '#0F172A', borderColor: '#475569', color: '#FFFFFF' }}
          >
            <option value="name">Sort by Name</option>
            <option value="risk">Sort by Risk Level</option>
            <option value="cases">Sort by Active Cases</option>
            <option value="recent">Sort by Recent Activity</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 pr-10 rounded-lg border text-sm appearance-none cursor-pointer"
            style={{ backgroundColor: '#0F172A', borderColor: '#475569', color: '#FFFFFF' }}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <select
            value={filterRisk}
            onChange={(e) => setFilterRisk(e.target.value)}
            className="px-3 py-2 pr-10 rounded-lg border text-sm appearance-none cursor-pointer"
            style={{ backgroundColor: '#0F172A', borderColor: '#475569', color: '#FFFFFF' }}
          >
            <option value="all">All Risk Levels</option>
            <option value="high">High Risk</option>
            <option value="medium">Medium Risk</option>
            <option value="low">Low Risk</option>
          </select>

          <select
            value={filterCity}
            onChange={(e) => setFilterCity(e.target.value)}
            className="px-3 py-2 pr-10 rounded-lg border text-sm appearance-none cursor-pointer"
            style={{ backgroundColor: '#0F172A', borderColor: '#475569', color: '#FFFFFF' }}
          >
            <option value="">All Markets</option>
            {cities.map(c => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Bulk actions and results count */}
        <div className="flex items-center justify-between">
          <p style={{ color: '#94A3B8' }} className="text-sm">
            Showing {filteredMembers.length} of {members.length} members
            {selectedMembers.size > 0 && ` • ${selectedMembers.size} selected`}
          </p>
          {selectedMembers.size > 0 && (
            <div className="flex gap-2">
              <button
                className="px-3 py-1 rounded-lg text-sm transition-colors"
                style={{ backgroundColor: '#06B6D415', color: '#06B6D4' }}
              >
                Assign Case Manager
              </button>
              <button
                className="px-3 py-1 rounded-lg text-sm transition-colors"
                style={{ backgroundColor: '#EF444415', color: '#EF4444' }}
              >
                Bulk Action
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {viewMode === 'table' ? (
          // TABLE VIEW
          <div className="border rounded-lg overflow-hidden" style={{ borderColor: '#334155' }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottomColor: '#334155', backgroundColor: '#1E293B' }}>
                  <th className="px-6 py-4 text-left">
                    <input
                      type="checkbox"
                      checked={selectedMembers.size === filteredMembers.length && filteredMembers.length > 0}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="rounded"
                      style={{
                        accentColor: '#06B6D4',
                      }}
                    />
                  </th>
                  <th className="px-6 py-4 text-left font-semibold" style={{ color: '#94A3B8' }}>
                    Member
                  </th>
                  <th className="px-6 py-4 text-left font-semibold" style={{ color: '#94A3B8' }}>
                    ID
                  </th>
                  <th className="px-6 py-4 text-left font-semibold" style={{ color: '#94A3B8' }}>
                    Status
                  </th>
                  <th className="px-6 py-4 text-left font-semibold" style={{ color: '#94A3B8' }}>
                    Risk
                  </th>
                  <th className="px-6 py-4 text-left font-semibold" style={{ color: '#94A3B8' }}>
                    Case Manager
                  </th>
                  <th className="px-6 py-4 text-center font-semibold" style={{ color: '#94A3B8' }}>
                    Cases
                  </th>
                  <th className="px-6 py-4 text-left font-semibold" style={{ color: '#94A3B8' }}>
                    Market
                  </th>
                  <th className="px-6 py-4 text-left font-semibold" style={{ color: '#94A3B8' }}>
                    Last Activity
                  </th>
                  <th className="px-6 py-4 text-center font-semibold" style={{ color: '#94A3B8' }}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map((member, idx) => (
                  <tr
                    key={member.id}
                    style={{
                      borderBottomColor: '#334155',
                      backgroundColor: idx % 2 === 0 ? 'transparent' : '#1E293B40',
                    }}
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedMembers.has(member.id)}
                        onChange={() => toggleMember(member.id)}
                        className="rounded"
                        style={{
                          accentColor: '#06B6D4',
                        }}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium" style={{ color: '#FFFFFF' }}>
                          {member.name}
                        </p>
                        <p style={{ color: '#94A3B8' }} className="text-xs">
                          {member.email}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4" style={{ color: '#FFFFFF' }}>
                      {member.memberId}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="text-xs px-2 py-1 rounded-full flex items-center gap-1 w-fit"
                        style={{
                          backgroundColor: member.status === 'active' ? '#06B6D415' : '#64748B15',
                          color: member.status === 'active' ? '#06B6D4' : '#94A3B8',
                        }}
                      >
                        {member.status === 'active' ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                        {member.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="text-xs px-2 py-1 rounded-full flex items-center gap-1 w-fit"
                        style={{
                          backgroundColor: member.riskLevel === 'high' ? '#EF444415' : member.riskLevel === 'medium' ? '#F59E0B15' : '#10B98115',
                          color: member.riskLevel === 'high' ? '#EF4444' : member.riskLevel === 'medium' ? '#F59E0B' : '#10B981',
                        }}
                      >
                        {member.riskLevel === 'high' && <AlertCircle className="w-3 h-3" />}
                        {member.riskLevel}
                      </span>
                    </td>
                    <td className="px-6 py-4" style={{ color: '#FFFFFF' }}>
                      {member.assignedCaseManager}
                    </td>
                    <td className="px-6 py-4 text-center" style={{ color: '#FFFFFF' }}>
                      <span className="font-semibold">{member.activeCases}</span>
                    </td>
                    <td className="px-6 py-4" style={{ color: '#FFFFFF' }}>
                      {member.city}
                    </td>
                    <td className="px-6 py-4 text-sm" style={{ color: '#94A3B8' }}>
                      {new Date(member.lastActivity).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Link href={`/demo/member/${member.id}`}>
                        <button
                          className="p-2 rounded-lg transition-colors hover:opacity-80"
                          style={{ backgroundColor: '#06B6D415', color: '#06B6D4' }}
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          // CARD VIEW
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMembers.map(member => (
              <Link key={member.id} href={`/demo/member/${member.id}`}>
                <div
                  className="p-4 rounded-lg border transition-all hover:shadow-lg cursor-pointer group"
                  style={{
                    borderColor: '#334155',
                    backgroundColor: '#1E293B',
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold" style={{ color: '#FFFFFF' }}>
                        {member.name}
                      </h3>
                      <p style={{ color: '#94A3B8' }} className="text-xs">
                        {member.memberId}
                      </p>
                    </div>
                    <span
                      className="text-xs px-2 py-1 rounded-full flex-shrink-0"
                      style={{
                        backgroundColor: member.riskLevel === 'high' ? '#EF444415' : member.riskLevel === 'medium' ? '#F59E0B15' : '#10B98115',
                        color: member.riskLevel === 'high' ? '#EF4444' : member.riskLevel === 'medium' ? '#F59E0B' : '#10B981',
                      }}
                    >
                      {member.riskLevel}
                    </span>
                  </div>

                  <div style={{ color: '#94A3B8' }} className="text-sm space-y-1 mb-4">
                    <div>{member.assignedCaseManager}</div>
                    <div>{member.city}</div>
                  </div>

                  <div className="border-t grid grid-cols-3 gap-2 pt-3" style={{ borderColor: '#334155' }}>
                    <div className="text-center">
                      <p style={{ color: '#94A3B8' }} className="text-xs">
                        Cases
                      </p>
                      <p className="font-bold text-lg" style={{ color: '#06B6D4' }}>
                        {member.activeCases}
                      </p>
                    </div>
                    <div className="text-center">
                      <p style={{ color: '#94A3B8' }} className="text-xs">
                        Auths
                      </p>
                      <p className="font-bold text-lg" style={{ color: '#10B981' }}>
                        {member.activeAuthorizations}
                      </p>
                    </div>
                    <div className="text-center">
                      <p style={{ color: '#94A3B8' }} className="text-xs">
                        Services
                      </p>
                      <p className="text-xs" style={{ color: '#FFFFFF' }}>
                        {member.activeServices.length}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t" style={{ borderColor: '#334155' }}>
                    <p style={{ color: '#94A3B8' }} className="text-xs">
                      Status:{' '}
                      <span style={{ color: member.status === 'active' ? '#06B6D4' : '#94A3B8' }}>
                        {member.status === 'active' ? '🟢 Active' : '⚪ Inactive'}
                      </span>
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {filteredMembers.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 mx-auto mb-3" style={{ color: '#475569' }} />
            <p style={{ color: '#94A3B8' }} className="text-lg">
              No members found
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
