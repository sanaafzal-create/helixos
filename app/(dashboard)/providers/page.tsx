'use client'

import { useState, useMemo } from 'react'
import { Search, ChevronRight, MapPin, Phone, Mail, Building2, Stethoscope, TrendingUp, Calendar, MessageSquare, AlertCircle } from 'lucide-react'
const mockProviders = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    title: 'MD, Family Medicine',
    specialty: 'Family Medicine',
    organization: 'Metro Health Clinic',
    email: 'sjohnson@metrohealthclinic.com',
    phone: '(555) 123-4567',
    city: 'New York',
    state: 'NY',
    address: '123 Medical Center Dr',
    zipCode: '10001',
    market: 'Northeast',
    status: 'active',
    relatedCases: 12,
    outreachCount: 24,
    lastContact: '2024-01-15',
    performanceRating: 4.8,
    notes: 'Excellent patient outcomes. Responsive to care coordination.',
    contacts: [
      { type: 'Email', value: 'sjohnson@metrohealthclinic.com' },
      { type: 'Phone', value: '(555) 123-4567' },
      { type: 'Office', value: '(555) 123-4500' },
    ],
    outreachHistory: [
      { date: '2024-01-15', type: 'Email', description: 'Patient referral discussion', result: 'Positive' },
      { date: '2024-01-10', type: 'Phone', description: 'Care coordination meeting', result: 'Positive' },
      { date: '2024-01-05', type: 'In-Person', description: 'Grand rounds presentation', result: 'Engaged' },
      { date: '2023-12-28', type: 'Email', description: 'Holiday outreach', result: 'Acknowledged' },
    ],
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    title: 'MD, Cardiology',
    specialty: 'Cardiology',
    organization: 'Cardiac Associates',
    email: 'mchen@cardiacassociates.com',
    phone: '(555) 234-5678',
    city: 'Boston',
    state: 'MA',
    address: '456 Heart Ave',
    zipCode: '02108',
    market: 'Northeast',
    status: 'active',
    relatedCases: 8,
    outreachCount: 16,
    lastContact: '2024-01-14',
    performanceRating: 4.6,
    notes: 'Specializes in complex cardiac cases.',
    contacts: [
      { type: 'Email', value: 'mchen@cardiacassociates.com' },
      { type: 'Phone', value: '(555) 234-5678' },
      { type: 'Office', value: '(555) 234-5600' },
    ],
    outreachHistory: [
      { date: '2024-01-14', type: 'Phone', description: 'Case consultation', result: 'Positive' },
      { date: '2024-01-08', type: 'Email', description: 'Research collaboration inquiry', result: 'Interested' },
      { date: '2024-01-02', type: 'In-Person', description: 'Hospital partnership meeting', result: 'Engaged' },
    ],
  },
  {
    id: '3',
    name: 'Dr. Jennifer Martinez',
    title: 'MD, Internal Medicine',
    specialty: 'Internal Medicine',
    organization: 'Sunset Medical Group',
    email: 'jmartinez@sunsetmedical.com',
    phone: '(555) 345-6789',
    city: 'Los Angeles',
    state: 'CA',
    address: '789 Wellness Blvd',
    zipCode: '90001',
    market: 'West',
    status: 'active',
    relatedCases: 15,
    outreachCount: 31,
    lastContact: '2024-01-16',
    performanceRating: 4.9,
    notes: 'Top performer. Very engaged with care coordination initiatives.',
    contacts: [
      { type: 'Email', value: 'jmartinez@sunsetmedical.com' },
      { type: 'Phone', value: '(555) 345-6789' },
      { type: 'Office', value: '(555) 345-6700' },
    ],
    outreachHistory: [
      { date: '2024-01-16', type: 'Email', description: 'Quarterly performance review', result: 'Positive' },
      { date: '2024-01-12', type: 'Phone', description: 'New program enrollment', result: 'Enrolled' },
      { date: '2024-01-07', type: 'In-Person', description: 'Regional provider summit', result: 'Active Participant' },
      { date: '2023-12-29', type: 'Email', description: 'Annual partnership renewal', result: 'Renewed' },
    ],
  },
  {
    id: '4',
    name: 'Dr. Robert Williams',
    title: 'MD, Orthopedic Surgery',
    specialty: 'Orthopedics',
    organization: 'Bone & Joint Center',
    email: 'rwilliams@boneandjoint.com',
    phone: '(555) 456-7890',
    city: 'Chicago',
    state: 'IL',
    address: '321 Sports Medicine Ln',
    zipCode: '60601',
    market: 'Midwest',
    status: 'inactive',
    relatedCases: 5,
    outreachCount: 8,
    lastContact: '2023-11-20',
    performanceRating: 4.2,
    notes: 'Limited engagement. May need re-engagement strategy.',
    contacts: [
      { type: 'Email', value: 'rwilliams@boneandjoint.com' },
      { type: 'Phone', value: '(555) 456-7890' },
    ],
    outreachHistory: [
      { date: '2023-11-20', type: 'Email', description: 'Outreach attempt', result: 'No Response' },
      { date: '2023-10-15', type: 'Phone', description: 'Check-in call', result: 'Declined' },
    ],
  },
]

export default function ProvidersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMarket, setSelectedMarket] = useState('all')
  const [selectedProvider, setSelectedProvider] = useState<string | null>('1')
  const [statusFilter, setStatusFilter] = useState('all')

  const markets = ['all', 'Northeast', 'West', 'Midwest', 'South']
  const statuses = ['all', 'active', 'inactive']

  const filteredProviders = useMemo(() => {
    return mockProviders.filter((provider) => {
      const matchesSearch =
        provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.specialty.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesMarket = selectedMarket === 'all' || provider.market === selectedMarket
      const matchesStatus = statusFilter === 'all' || provider.status === statusFilter
      return matchesSearch && matchesMarket && matchesStatus
    })
  }, [searchTerm, selectedMarket, statusFilter])

  const provider = mockProviders.find((p) => p.id === selectedProvider)

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
                  onFocus={(e) => (e.target.style.borderColor = '#06B6D4')}
                  onBlur={(e) => (e.target.style.borderColor = '#475569')}
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex gap-4 flex-wrap">
              {/* Market Filter */}
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

              {/* Status Filter */}
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
                  className="p-6 cursor-pointer hover:opacity-80 transition-opacity border-b"
                  style={{
                    backgroundColor: selectedProvider === prov.id ? '#1E293B' : '#0F172A',
                    borderBottomColor: '#334155',
                    borderLeft: selectedProvider === prov.id ? '4px solid #06B6D4' : 'none',
                    paddingLeft: selectedProvider === prov.id ? '20px' : '24px',
                  }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-1" style={{ color: '#FFFFFF' }}>
                        {prov.name}
                      </h3>
                      <div className="flex items-center gap-2 mb-2">
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
                    <div className="text-right">
                      <div
                        className="px-3 py-1 rounded text-xs font-semibold inline-block"
                        style={{
                          backgroundColor: prov.status === 'active' ? '#10B98140' : '#EF444440',
                          color: prov.status === 'active' ? '#10B981' : '#EF4444',
                        }}
                      >
                        {prov.status}
                      </div>
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
            {/* Header */}
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

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto">
              {/* Contact Information */}
              <div className="p-6 border-b" style={{ borderColor: '#334155' }}>
                <h3 style={{ color: '#FFFFFF' }} className="font-semibold mb-4">
                  Contact Information
                </h3>
                <div className="space-y-3">
                  {provider.contacts.map((contact, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      {contact.type === 'Email' && <Mail className="w-4 h-4 mt-1" style={{ color: '#06B6D4' }} />}
                      {contact.type === 'Phone' && <Phone className="w-4 h-4 mt-1" style={{ color: '#06B6D4' }} />}
                      {contact.type === 'Office' && <Building2 className="w-4 h-4 mt-1" style={{ color: '#06B6D4' }} />}
                      <div>
                        <p style={{ color: '#94A3B8' }} className="text-xs">
                          {contact.type}
                        </p>
                        <p style={{ color: '#FFFFFF' }} className="text-sm">
                          {contact.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Organization */}
              <div className="p-6 border-b" style={{ borderColor: '#334155' }}>
                <h3 style={{ color: '#FFFFFF' }} className="font-semibold mb-3">
                  Organization
                </h3>
                <p style={{ color: '#FFFFFF' }} className="font-medium">
                  {provider.organization}
                </p>
                <div className="flex items-start gap-2 mt-2">
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
              <div className="p-6 border-b" style={{ borderColor: '#334155' }}>
                <h3 style={{ color: '#FFFFFF' }} className="font-semibold mb-4">
                  Performance Metrics
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: '#0F172A' }}
                  >
                    <p style={{ color: '#94A3B8' }} className="text-xs mb-1">
                      Related Cases
                    </p>
                    <p style={{ color: '#06B6D4' }} className="text-xl font-bold">
                      {provider.relatedCases}
                    </p>
                  </div>
                  <div
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: '#0F172A' }}
                  >
                    <p style={{ color: '#94A3B8' }} className="text-xs mb-1">
                      Outreach Count
                    </p>
                    <p style={{ color: '#10B981' }} className="text-xl font-bold">
                      {provider.outreachCount}
                    </p>
                  </div>
                </div>
              </div>

              {/* Outreach History Timeline */}
              <div className="p-6 border-b" style={{ borderColor: '#334155' }}>
                <h3 style={{ color: '#FFFFFF' }} className="font-semibold mb-4 flex items-center gap-2">
                  <Calendar className="w-4 h-4" style={{ color: '#06B6D4' }} />
                  Outreach History
                </h3>
                <div className="space-y-4">
                  {provider.outreachHistory.map((activity, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: '#06B6D4' }}
                        ></div>
                        {idx < provider.outreachHistory.length - 1 && (
                          <div
                            className="w-0.5 h-12 my-1"
                            style={{ backgroundColor: '#475569' }}
                          ></div>
                        )}
                      </div>
                      <div className="flex-1 pb-2">
                        <div className="flex items-center gap-2 mb-1">
                          <p style={{ color: '#94A3B8' }} className="text-xs">
                            {new Date(activity.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </p>
                          <span
                            className="px-2 py-0.5 rounded text-xs font-medium"
                            style={{
                              backgroundColor: '#06B6D440',
                              color: '#06B6D4',
                            }}
                          >
                            {activity.type}
                          </span>
                        </div>
                        <p style={{ color: '#FFFFFF' }} className="text-sm font-medium">
                          {activity.description}
                        </p>
                        <p style={{ color: '#94A3B8' }} className="text-xs mt-1">
                          Result: {activity.result}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div className="p-6">
                <h3 style={{ color: '#FFFFFF' }} className="font-semibold mb-3 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" style={{ color: '#06B6D4' }} />
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
