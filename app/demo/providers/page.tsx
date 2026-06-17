'use client'

import { useState, useMemo } from 'react'
import { Search, Grid3x3, List, Filter, ChevronDown, Star, MapPin, Stethoscope, Eye, MessageSquare } from 'lucide-react'
import Link from 'next/link'
import { getProviders } from '@/lib/provider-seeds'

export default function ProvidersPage() {
  const [viewMode, setViewMode] = useState<'table' | 'card'>('table')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [filterSpecialty, setFilterSpecialty] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterCity, setFilterCity] = useState('')

  const providers = getProviders()

  const filteredProviders = useMemo(() => {
    let filtered = providers.filter(p => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.city.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesSpecialty = !filterSpecialty || p.specialty === filterSpecialty
      const matchesStatus = filterStatus === 'all' || p.status === filterStatus
      const matchesCity = !filterCity || p.city === filterCity

      return matchesSearch && matchesSpecialty && matchesStatus && matchesCity
    })

    if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => b.performanceScore - a.performanceScore)
    } else if (sortBy === 'cases') {
      filtered.sort((a, b) => b.activeCases - a.activeCases)
    }

    return filtered
  }, [providers, searchQuery, sortBy, filterSpecialty, filterStatus, filterCity])

  const specialties = Array.from(new Set(providers.map(p => p.specialty))).sort()
  const cities = Array.from(new Set(providers.map(p => p.city))).sort()

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#0F172A' }}>
      {/* Header */}
      <div className="sticky top-0 z-40 border-b p-6" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: '#FFFFFF' }}>
              Providers
            </h1>
            <p style={{ color: '#94A3B8' }} className="text-sm mt-1">
              Manage your provider network and relationships
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
        <div className="flex gap-3 flex-wrap">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: '#94A3B8' }} />
              <input
                type="text"
                placeholder="Search providers..."
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
            <option value="rating">Sort by Rating</option>
            <option value="cases">Sort by Cases</option>
          </select>

          <select
            value={filterSpecialty}
            onChange={(e) => setFilterSpecialty(e.target.value)}
            className="px-3 py-2 pr-10 rounded-lg border text-sm appearance-none cursor-pointer"
            style={{ backgroundColor: '#0F172A', borderColor: '#475569', color: '#FFFFFF' }}
          >
            <option value="">All Specialties</option>
            {specialties.map(s => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
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
        </div>

        {/* Results count */}
        <p style={{ color: '#94A3B8' }} className="text-sm mt-4">
          Showing {filteredProviders.length} of {providers.length} providers
        </p>
      </div>

      {/* Content */}
      <div className="p-6">
        {viewMode === 'table' ? (
          // TABLE VIEW
          <div className="border rounded-lg overflow-hidden" style={{ borderColor: '#334155' }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottomColor: '#334155', backgroundColor: '#1E293B' }}>
                  <th className="px-6 py-4 text-left font-semibold" style={{ color: '#94A3B8' }}>
                    Provider
                  </th>
                  <th className="px-6 py-4 text-left font-semibold" style={{ color: '#94A3B8' }}>
                    Specialty
                  </th>
                  <th className="px-6 py-4 text-left font-semibold" style={{ color: '#94A3B8' }}>
                    Organization
                  </th>
                  <th className="px-6 py-4 text-left font-semibold" style={{ color: '#94A3B8' }}>
                    Market
                  </th>
                  <th className="px-6 py-4 text-left font-semibold" style={{ color: '#94A3B8' }}>
                    Status
                  </th>
                  <th className="px-6 py-4 text-center font-semibold" style={{ color: '#94A3B8' }}>
                    Cases
                  </th>
                  <th className="px-6 py-4 text-center font-semibold" style={{ color: '#94A3B8' }}>
                    Rating
                  </th>
                  <th className="px-6 py-4 text-center font-semibold" style={{ color: '#94A3B8' }}>
                    Last Interaction
                  </th>
                  <th className="px-6 py-4 text-center font-semibold" style={{ color: '#94A3B8' }}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProviders.map((provider, idx) => (
                  <tr
                    key={provider.id}
                    style={{
                      borderBottomColor: '#334155',
                      backgroundColor: idx % 2 === 0 ? 'transparent' : '#1E293B40',
                    }}
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium" style={{ color: '#FFFFFF' }}>
                          {provider.name}
                        </p>
                        <p style={{ color: '#94A3B8' }} className="text-xs">
                          {provider.primaryContact}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Stethoscope className="w-4 h-4" style={{ color: '#06B6D4' }} />
                        <span style={{ color: '#FFFFFF' }}>{provider.specialty}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4" style={{ color: '#FFFFFF' }}>
                      {provider.organization}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1" style={{ color: '#94A3B8' }}>
                        <MapPin className="w-4 h-4" />
                        {provider.city}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="text-xs px-2 py-1 rounded-full"
                        style={{
                          backgroundColor: provider.status === 'active' ? '#06B6D415' : '#64748B15',
                          color: provider.status === 'active' ? '#06B6D4' : '#94A3B8',
                        }}
                      >
                        {provider.status === 'active' ? '🟢 Active' : '⚪ Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center" style={{ color: '#FFFFFF' }}>
                      <span className="font-semibold">{provider.activeCases}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-1" style={{ color: '#F59E0B' }}>
                        <Star className="w-4 h-4 fill-current" />
                        <span style={{ color: '#FFFFFF' }}>{provider.performanceScore}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center text-sm" style={{ color: '#94A3B8' }}>
                      {new Date(provider.lastInteraction).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Link href={`/demo/provider/${provider.id}`}>
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
            {filteredProviders.map(provider => (
              <Link key={provider.id} href={`/demo/provider/${provider.id}`}>
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
                        {provider.name}
                      </h3>
                      <p style={{ color: '#94A3B8' }} className="text-sm">
                        {provider.specialty}
                      </p>
                    </div>
                    <span
                      className="text-xs px-2 py-1 rounded-full flex-shrink-0"
                      style={{
                        backgroundColor: provider.status === 'active' ? '#06B6D415' : '#64748B15',
                        color: provider.status === 'active' ? '#06B6D4' : '#94A3B8',
                      }}
                    >
                      {provider.status === 'active' ? '🟢' : '⚪'}
                    </span>
                  </div>

                  <div style={{ color: '#94A3B8' }} className="text-sm space-y-2 mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {provider.city}
                    </div>
                    <div>{provider.organization}</div>
                  </div>

                  <div className="border-t grid grid-cols-3 gap-2 pt-3" style={{ borderColor: '#334155' }}>
                    <div className="text-center">
                      <p style={{ color: '#94A3B8' }} className="text-xs">
                        Cases
                      </p>
                      <p className="font-bold text-lg" style={{ color: '#06B6D4' }}>
                        {provider.activeCases}
                      </p>
                    </div>
                    <div className="text-center">
                      <p style={{ color: '#94A3B8' }} className="text-xs">
                        Rating
                      </p>
                      <p className="font-bold text-lg" style={{ color: '#F59E0B' }}>
                        {provider.performanceScore}
                      </p>
                    </div>
                    <div className="text-center">
                      <p style={{ color: '#94A3B8' }} className="text-xs">
                        Last Active
                      </p>
                      <p className="text-xs" style={{ color: '#FFFFFF' }}>
                        {new Date(provider.lastInteraction).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {filteredProviders.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 mx-auto mb-3" style={{ color: '#475569' }} />
            <p style={{ color: '#94A3B8' }} className="text-lg">
              No providers found
            </p>
          </div>
        )}
      </div>
    </main>
  )
}

