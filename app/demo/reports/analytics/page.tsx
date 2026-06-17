'use client'

import { useState } from 'react'
import { Search, Filter, Download, X, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { getCaseAnalytics, getProviderAnalytics, getMemberAnalytics, getOutreachAnalytics, getTeamPerformance } from '@/lib/analytics-seeds'

export default function AnalyticsWorkspace() {
  const [activeView, setActiveView] = useState('cases')
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({
    market: 'all',
    dateRange: '6months',
    status: 'all',
  })

  const caseAnalytics = getCaseAnalytics()
  const providerAnalytics = getProviderAnalytics()
  const memberAnalytics = getMemberAnalytics()
  const outreachAnalytics = getOutreachAnalytics()
  const teamPerformance = getTeamPerformance()

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#0F172A' }}>
      {/* Header */}
      <div className="border-b p-8" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
        <Link href="/demo/reports">
          <button className="flex items-center gap-2 px-3 py-1 rounded-lg text-sm mb-4 transition-colors hover:opacity-80" style={{ backgroundColor: '#334155', color: '#06B6D4' }}>
            <ArrowLeft className="w-4 h-4" />
            Back to Reports
          </button>
        </Link>
        <h1 className="text-4xl font-bold" style={{ color: '#FFFFFF' }}>
          Analytics Workspace
        </h1>
        <p style={{ color: '#94A3B8' }} className="text-lg mt-2">
          Deep dive analytics with multi-dimensional filtering
        </p>
      </div>

      {/* Content */}
      <div className="p-8">
        {/* View Selector */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {[
            { id: 'cases', label: 'Case Analytics' },
            { id: 'providers', label: 'Provider Analytics' },
            { id: 'members', label: 'Member Analytics' },
            { id: 'outreach', label: 'Outreach Analytics' },
            { id: 'team', label: 'Team Performance' },
          ].map(view => (
            <button
              key={view.id}
              onClick={() => setActiveView(view.id)}
              className="px-4 py-2 rounded-lg font-medium transition-colors"
              style={{
                backgroundColor: activeView === view.id ? '#06B6D4' : '#1E293B',
                color: activeView === view.id ? '#0F172A' : '#94A3B8',
                border: activeView === view.id ? 'none' : '1px solid #334155',
              }}
            >
              {view.label}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-6 flex-wrap">
          <div className="relative flex-1 min-w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: '#94A3B8' }} />
            <input
              type="text"
              placeholder="Search analytics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border text-sm"
              style={{ backgroundColor: '#0F172A', borderColor: '#475569', color: '#FFFFFF' }}
            />
          </div>

          <select
            value={filters.market}
            onChange={(e) => setFilters({ ...filters, market: e.target.value })}
            className="px-3 py-2 pr-10 rounded-lg border text-sm appearance-none cursor-pointer"
            style={{ backgroundColor: '#0F172A', borderColor: '#475569', color: '#FFFFFF' }}
          >
            <option value="all">All Markets</option>
            <option value="market-a">Market A</option>
            <option value="market-b">Market B</option>
            <option value="market-c">Market C</option>
            <option value="market-d">Market D</option>
          </select>

          <select
            value={filters.dateRange}
            onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
            className="px-3 py-2 pr-10 rounded-lg border text-sm appearance-none cursor-pointer"
            style={{ backgroundColor: '#0F172A', borderColor: '#475569', color: '#FFFFFF' }}
          >
            <option value="1month">Last Month</option>
            <option value="3months">Last 3 Months</option>
            <option value="6months">Last 6 Months</option>
            <option value="1year">Last Year</option>
          </select>

          <button
            className="px-3 py-2 rounded-lg transition-colors flex items-center gap-2"
            style={{ backgroundColor: '#06B6D415', color: '#06B6D4' }}
          >
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>

        {/* Analytics Content */}
        {activeView === 'cases' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="border rounded-lg p-6" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
                <h3 className="text-lg font-bold mb-4" style={{ color: '#FFFFFF' }}>
                  Case Volume by Market
                </h3>
                <div className="space-y-2">
                  {caseAnalytics.caseDistribution.map((dist, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span style={{ color: '#94A3B8' }}>{dist.market}</span>
                      <div className="flex-1 mx-3 h-2 rounded-lg" style={{ backgroundColor: '#334155' }}>
                        <div
                          className="h-full rounded-lg"
                          style={{
                            width: `${(dist.count / 110) * 100}%`,
                            backgroundColor: '#06B6D4',
                          }}
                        />
                      </div>
                      <span style={{ color: '#FFFFFF' }} className="font-semibold">
                        {dist.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border rounded-lg p-6" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
                <h3 className="text-lg font-bold mb-4" style={{ color: '#FFFFFF' }}>
                  Case Aging Analysis
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: '#0F172A' }}>
                    <p style={{ color: '#94A3B8' }} className="text-xs">
                      Less Than 30d
                    </p>
                    <p style={{ color: '#10B981' }} className="text-2xl font-bold">
                      {caseAnalytics.caseAging.lessThan30}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg" style={{ backgroundColor: '#0F172A' }}>
                    <p style={{ color: '#94A3B8' }} className="text-xs">
                      30-60 Days
                    </p>
                    <p style={{ color: '#F59E0B' }} className="text-2xl font-bold">
                      {caseAnalytics.caseAging.days30to60}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg" style={{ backgroundColor: '#0F172A' }}>
                    <p style={{ color: '#94A3B8' }} className="text-xs">
                      60-90 Days
                    </p>
                    <p style={{ color: '#F59E0B' }} className="text-2xl font-bold">
                      {caseAnalytics.caseAging.days60to90}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg" style={{ backgroundColor: '#0F172A' }}>
                    <p style={{ color: '#94A3B8' }} className="text-xs">
                      Over 90 Days
                    </p>
                    <p style={{ color: '#EF4444' }} className="text-2xl font-bold">
                      {caseAnalytics.caseAging.over90}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeView === 'providers' && (
          <div className="space-y-6">
            <div className="border rounded-lg p-6" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
              <h3 className="text-lg font-bold mb-4" style={{ color: '#FFFFFF' }}>
                Top Performing Providers
              </h3>
              <div className="space-y-3">
                {providerAnalytics.topProviders.map((provider, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: '#0F172A' }}>
                    <div>
                      <p style={{ color: '#FFFFFF' }} className="font-medium">
                        {idx + 1}. {provider.name}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-32 h-2 rounded-lg" style={{ backgroundColor: '#334155' }}>
                        <div
                          className="h-full rounded-lg"
                          style={{
                            width: `${(provider.score / 100) * 100}%`,
                            backgroundColor: '#06B6D4',
                          }}
                        />
                      </div>
                      <span style={{ color: '#06B6D4' }} className="font-bold">
                        {provider.score}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeView === 'members' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="border rounded-lg p-6" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
                <h3 className="text-lg font-bold mb-4" style={{ color: '#FFFFFF' }}>
                  Risk Distribution
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span style={{ color: '#EF4444' }} className="font-medium">
                      High Risk
                    </span>
                    <span style={{ color: '#FFFFFF' }} className="font-bold">
                      {memberAnalytics.riskDistribution.high}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span style={{ color: '#F59E0B' }} className="font-medium">
                      Medium Risk
                    </span>
                    <span style={{ color: '#FFFFFF' }} className="font-bold">
                      {memberAnalytics.riskDistribution.medium}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span style={{ color: '#10B981' }} className="font-medium">
                      Low Risk
                    </span>
                    <span style={{ color: '#FFFFFF' }} className="font-bold">
                      {memberAnalytics.riskDistribution.low}
                    </span>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-6" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
                <h3 className="text-lg font-bold mb-4" style={{ color: '#FFFFFF' }}>
                  Service Utilization
                </h3>
                <div className="space-y-2">
                  {memberAnalytics.serviceUtilization.map((service, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <span style={{ color: '#94A3B8' }} className="text-sm min-w-32">
                        {service.service}
                      </span>
                      <div className="flex-1 h-2 rounded-lg" style={{ backgroundColor: '#334155' }}>
                        <div
                          className="h-full rounded-lg"
                          style={{
                            width: `${service.utilization}%`,
                            backgroundColor: '#06B6D4',
                          }}
                        />
                      </div>
                      <span style={{ color: '#FFFFFF' }} className="text-sm font-semibold">
                        {service.utilization}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeView === 'outreach' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg border" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
                <p style={{ color: '#94A3B8' }} className="text-xs mb-2">
                  Calls Completed
                </p>
                <p style={{ color: '#06B6D4' }} className="text-2xl font-bold">
                  {outreachAnalytics.callsCompleted}
                </p>
              </div>
              <div className="p-4 rounded-lg border" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
                <p style={{ color: '#94A3B8' }} className="text-xs mb-2">
                  Emails Sent
                </p>
                <p style={{ color: '#06B6D4' }} className="text-2xl font-bold">
                  {outreachAnalytics.emailsSent}
                </p>
              </div>
              <div className="p-4 rounded-lg border" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
                <p style={{ color: '#94A3B8' }} className="text-xs mb-2">
                  Meetings
                </p>
                <p style={{ color: '#06B6D4' }} className="text-2xl font-bold">
                  {outreachAnalytics.meetingsScheduled}
                </p>
              </div>
              <div className="p-4 rounded-lg border" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
                <p style={{ color: '#94A3B8' }} className="text-xs mb-2">
                  Response Rate
                </p>
                <p style={{ color: '#10B981' }} className="text-2xl font-bold">
                  {outreachAnalytics.responseRates}%
                </p>
              </div>
            </div>
          </div>
        )}

        {activeView === 'team' && (
          <div className="space-y-6">
            <div className="border rounded-lg p-6" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
              <h3 className="text-lg font-bold mb-4" style={{ color: '#FFFFFF' }}>
                Workload Distribution
              </h3>
              <div className="space-y-3">
                {teamPerformance.workloadDistribution.map((manager, idx) => (
                  <div key={idx} className="p-3 rounded-lg" style={{ backgroundColor: '#0F172A' }}>
                    <div className="flex items-center justify-between mb-2">
                      <span style={{ color: '#FFFFFF' }} className="font-medium">
                        {manager.manager}
                      </span>
                      <span style={{ color: '#94A3B8' }} className="text-sm">
                        {manager.cases} cases, {manager.tasks} tasks
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
