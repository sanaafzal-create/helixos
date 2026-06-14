'use client'

import { useState, useMemo } from 'react'
import { demoProviders } from '@/lib/demo-data'
import { Search, MapPin, Phone, Mail, Building2, Stethoscope, TrendingUp, Calendar } from 'lucide-react'

export default function DemoProvidersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMarket, setSelectedMarket] = useState('all')
  const [selectedProvider, setSelectedProvider] = useState<string>('1')
  const [statusFilter, setStatusFilter] = useState('all')

  const markets = ['all', 'Northeast', 'West', 'Midwest', 'South']
  const statuses = ['all', 'active', 'inactive']

  const filteredProviders = useMemo(() => {
    return demoProviders.filter((provider) => {
      const matchesSearch =
        provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.specialty.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesMarket = selectedMarket === 'all' || provider.market === selectedMarket
      const matchesStatus = statusFilter === 'all' || provider.status === statusFilter
      return matchesSearch && matchesMarket && matchesStatus
    })
  }, [searchTerm, selectedMarket, statusFilter])

  const provider = demoProviders.find((p) => p.id === selectedProvider)

  return (
    <div className="h-full" style={{ backgroundColor: '#0F172A' }}>
      <div className="flex h-full">
        {/* Main Content - List View */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="p-8 border-b" style={{ borderColor: '#334155' }}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold mb-2" style={{ color: '#FFFFFF' }}>
                  Providers
                </h1>
                <p style={{ color: '#94A3B8' }}>Manage healthcare providers and specialist relationships</p>
              </div>
              <button
                className="px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#06B6D4', color: '#0F172A' }}
              >
                Add Provider
              </button>
            </div>

            {/* Search Bar */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-5 h-5" style={{ color: '#94A3B8' }} />
                <input
                  type="text"
                  placeholder="Search providers, organizations, specialties..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border outline-none focus:ring-2"
                  style={{
                    backgroundColor: '#1E293B',
                    borderColor: '#475569',
                    color: '#FFFFFF',
                  }}
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex gap-4 flex-wrap">
              <div>
                <label style={{ color: '#94A3B8' }} className="text-sm font-medium block mb-2">
                  Market
                </label>
                <select
                  value={selectedMarket}
                  onChange={(e) => setSelectedMarket(e.target.value)}
                  className="px-4 py-2 rounded-lg border"
                  style={{
                    backgroundColor: '#1E293B',
                    borderColor: '#475569',
                    color: '#FFFFFF',
                  }}
                >
                  {markets.map((market) => (
                    <option key={market} value={market} style={{ backgroundColor: '#1E293B', color: '#FFFFFF' }}>
                      {market === 'all' ? 'All Markets' : market}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ color: '#94A3B8' }} className="text-sm font-medium block mb-2">
                  Status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 rounded-lg border"
                  style={{
                    backgroundColor: '#1E293B',
                    borderColor: '#475569',
                    color: '#FFFFFF',
                  }}
                >
                  {statuses.map((status) => (
                    <option key={status} value={status} style={{ backgroundColor: '#1E293B', color: '#FFFFFF' }}>
                      {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ color: '#94A3B8' }} className="text-sm self-end">
                {filteredProviders.length} providers found
              </div>
            </div>
          </div>

          {/* Provider List */}
          <div className="flex-1 overflow-y-auto">
            <div className="divide-y" style={{ borderColor: '#334155' }}>
              {filteredProviders.map((prov) => (
                <div
                  key={prov.id}
                  onClick={() => setSelectedProvider(prov.id)}
                  className="p-6 cursor-pointer hover:opacity-80 transition-opacity"
                  style={{
                    backgroundColor: selectedProvider === prov.id ? '#1E293B' : '#0F172A',
                    borderLeft: selectedProvider === prov.id ? '4px solid #06B6D4' : 'none',
                    paddingLeft: selectedProvider === prov.id ? '20px' : '24px',
                  }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-1" style={{ color: '#FFFFFF' }}>
                        {prov.name}
                      </h3>
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <Stethoscope className="w-4 h-4" style={{ color: '#06B6D4' }} />
                        <span style={{ color: '#94A3B8' }} className="text-sm">
                          {prov.specialty}
                        </span>
                        <span style={{ color: '#94A3B8' }} className="text-sm">•</span>
                        <Building2 className="w-4 h-4" style={{ color: '#94A3B8' }} />
                        <span style={{ color: '#94A3B8' }} className="text-sm">
                          {prov.organization}
                        </span>
                      </div>
                    </div>
                    <div
                      className="px-3 py-1 rounded text-xs font-semibold"
                      style={{
                        backgroundColor: prov.status === 'active' ? '#10B98140' : '#EF444440',
                        color: prov.status === 'active' ? '#10B981' : '#EF4444',
                      }}
                    >
                      {prov.status}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span style={{ color: '#94A3B8' }}>Cases:</span>
                      <span style={{ color: '#FFFFFF' }} className="ml-2 font-semibold">
                        {prov.relatedCases}
                      </span>
                    </div>
                    <div>
                      <span style={{ color: '#94A3B8' }}>Outreach:</span>
                      <span style={{ color: '#FFFFFF' }} className="ml-2 font-semibold">
                        {prov.outreachCount}
                      </span>
                    </div>
                    <div>
                      <span style={{ color: '#94A3B8' }}>Rating:</span>
                      <span style={{ color: '#10B981' }} className="ml-2 font-semibold">
                        {prov.performanceRating}★
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detail Panel */}
        {provider && (
          <div
            className="w-96 flex flex-col border-l overflow-hidden"
            style={{ backgroundColor: '#1E293B', borderColor: '#334155' }}
          >
            <div className="p-6 border-b" style={{ borderColor: '#334155' }}>
              <h2 className="text-2xl font-bold mb-1" style={{ color: '#FFFFFF' }}>
                {provider.name}
              </h2>
              <p style={{ color: '#94A3B8' }} className="text-sm mb-4">
                {provider.title}
              </p>
              <div className="flex items-center gap-2">
                <div
                  className="px-3 py-1 rounded text-xs font-semibold"
                  style={{
                    backgroundColor: provider.status === 'active' ? '#10B98140' : '#EF444440',
                    color: provider.status === 'active' ? '#10B981' : '#EF4444',
                  }}
                >
                  {provider.status}
                </div>
                <div
                  className="px-3 py-1 rounded text-xs font-semibold flex items-center gap-1"
                  style={{ backgroundColor: '#06B6D440', color: '#06B6D4' }}
                >
                  <TrendingUp className="w-3 h-3" />
                  {provider.performanceRating}★
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-6 p-6">
              {/* Contact Information */}
              <div>
                <h3 style={{ color: '#FFFFFF' }} className="font-semibold mb-3">
                  Contact Information
                </h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 mt-1" style={{ color: '#06B6D4' }} />
                    <div>
                      <p style={{ color: '#94A3B8' }} className="text-xs">
                        Email
                      </p>
                      <p style={{ color: '#FFFFFF' }} className="text-sm">
                        {provider.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 mt-1" style={{ color: '#06B6D4' }} />
                    <div>
                      <p style={{ color: '#94A3B8' }} className="text-xs">
                        Phone
                      </p>
                      <p style={{ color: '#FFFFFF' }} className="text-sm">
                        {provider.phone}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Organization */}
              <div>
                <h3 style={{ color: '#FFFFFF' }} className="font-semibold mb-2">
                  Organization
                </h3>
                <p style={{ color: '#FFFFFF' }} className="font-medium mb-2">
                  {provider.organization}
                </p>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5" style={{ color: '#94A3B8' }} />
                  <div>
                    <p style={{ color: '#FFFFFF' }} className="text-sm">
                      {provider.address}
                    </p>
                    <p style={{ color: '#FFFFFF' }} className="text-sm">
                      {provider.city}, {provider.state} {provider.zipCode}
                    </p>
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div>
                <h3 style={{ color: '#FFFFFF' }} className="font-semibold mb-3">
                  Performance
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: '#0F172A' }}>
                    <p style={{ color: '#94A3B8' }} className="text-xs mb-1">
                      Cases
                    </p>
                    <p style={{ color: '#06B6D4' }} className="text-lg font-bold">
                      {provider.relatedCases}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg" style={{ backgroundColor: '#0F172A' }}>
                    <p style={{ color: '#94A3B8' }} className="text-xs mb-1">
                      Outreach
                    </p>
                    <p style={{ color: '#10B981' }} className="text-lg font-bold">
                      {provider.outreachCount}
                    </p>
                  </div>
                </div>
              </div>

              {/* Specialties */}
              <div>
                <h3 style={{ color: '#FFFFFF' }} className="font-semibold mb-2">
                  Focus Areas
                </h3>
                <div className="space-y-1">
                  {provider.specialty_focus.map((item, idx) => (
                    <div
                      key={idx}
                      className="px-3 py-1 rounded text-sm"
                      style={{ backgroundColor: '#334155', color: '#FFFFFF' }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <h3 style={{ color: '#FFFFFF' }} className="font-semibold mb-2">
                  Notes
                </h3>
                <p style={{ color: '#FFFFFF' }} className="text-sm">
                  {provider.notes}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
