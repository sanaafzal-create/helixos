'use client'

import { useState, useMemo } from 'react'
import { Search, Filter, AlertCircle, CheckCircle, Info, TrendingUp, X } from 'lucide-react'
import Link from 'next/link'
import { getAllAIInsights } from '@/lib/ai-ops-seeds'

export default function AIInsightsPage() {
  const allInsights = getAllAIInsights()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all')
  const [selectedPriority, setSelectedPriority] = useState<string>('all')

  const filteredInsights = useMemo(() => {
    return allInsights.filter(insight => {
      const matchesSearch = insight.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           insight.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesType = selectedType === 'all' || insight.type === selectedType
      const matchesSeverity = selectedSeverity === 'all' || insight.severity === selectedSeverity
      const matchesPriority = selectedPriority === 'all' || (
        selectedPriority === 'critical' ? insight.priority < 2 :
        selectedPriority === 'high' ? insight.priority < 4 :
        selectedPriority === 'medium' ? insight.priority < 6 :
        true
      )
      return matchesSearch && matchesType && matchesSeverity && matchesPriority
    })
  }, [searchQuery, selectedType, selectedSeverity, selectedPriority])

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#0F172A' }}>
      {/* Header */}
      <div className="border-b p-8" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
        <div>
          <h1 className="text-4xl font-bold mb-2" style={{ color: '#FFFFFF' }}>
            AI Insights Workspace
          </h1>
          <p style={{ color: '#94A3B8' }} className="text-lg">
            Centralized intelligence hub with {allInsights.length} active insights
          </p>
        </div>
      </div>

      <div className="p-8">
        {/* Filters */}
        <div className="mb-6 p-4 rounded-lg border" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
          <div className="flex items-center gap-3 mb-4">
            <Filter className="w-5 h-5" style={{ color: '#94A3B8' }} />
            <span style={{ color: '#FFFFFF' }} className="font-medium">
              Filter & Search
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label style={{ color: '#94A3B8' }} className="text-xs font-medium block mb-2">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: '#94A3B8' }} />
                <input
                  type="text"
                  placeholder="Search insights..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border text-sm"
                  style={{ backgroundColor: '#0F172A', borderColor: '#475569', color: '#FFFFFF' }}
                />
              </div>
            </div>

            <div>
              <label style={{ color: '#94A3B8' }} className="text-xs font-medium block mb-2">
                Category
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border text-sm"
                style={{ backgroundColor: '#0F172A', borderColor: '#475569', color: '#FFFFFF' }}
              >
                <option value="all">All Categories</option>
                <option value="case">Case Intelligence</option>
                <option value="provider">Provider Intelligence</option>
                <option value="member">Member Intelligence</option>
                <option value="outreach">Outreach Intelligence</option>
                <option value="operational">Operational Intelligence</option>
              </select>
            </div>

            <div>
              <label style={{ color: '#94A3B8' }} className="text-xs font-medium block mb-2">
                Severity
              </label>
              <select
                value={selectedSeverity}
                onChange={(e) => setSelectedSeverity(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border text-sm"
                style={{ backgroundColor: '#0F172A', borderColor: '#475569', color: '#FFFFFF' }}
              >
                <option value="all">All Severities</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            <div>
              <label style={{ color: '#94A3B8' }} className="text-xs font-medium block mb-2">
                Priority
              </label>
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border text-sm"
                style={{ backgroundColor: '#0F172A', borderColor: '#475569', color: '#FFFFFF' }}
              >
                <option value="all">All Priorities</option>
                <option value="critical">Critical/High</option>
                <option value="high">High/Medium</option>
                <option value="medium">Medium & Below</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results count */}
        <p style={{ color: '#94A3B8' }} className="text-sm mb-4">
          Showing {filteredInsights.length} of {allInsights.length} insights
        </p>

        {/* Insights List */}
        <div className="space-y-3">
          {filteredInsights.map(insight => (
            <div
              key={insight.id}
              className="p-4 rounded-lg border transition-all hover:shadow-lg"
              style={{
                borderColor: '#334155',
                backgroundColor: '#1E293B',
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span
                      className="text-xs px-2 py-1 rounded-full font-medium"
                      style={{
                        backgroundColor: insight.severity === 'critical' ? '#EF444440' : insight.severity === 'high' ? '#F59E0B40' : insight.severity === 'medium' ? '#06B6D440' : '#10B98140',
                        color: insight.severity === 'critical' ? '#EF4444' : insight.severity === 'high' ? '#F59E0B' : insight.severity === 'medium' ? '#06B6D4' : '#10B981',
                      }}
                    >
                      {insight.severity}
                    </span>
                    <span
                      className="text-xs px-2 py-1 rounded-full"
                      style={{ backgroundColor: '#334155', color: '#94A3B8' }}
                    >
                      {insight.category}
                    </span>
                    <span
                      className="text-xs px-2 py-1 rounded-full"
                      style={{ backgroundColor: '#06B6D415', color: '#06B6D4' }}
                    >
                      {(insight.confidence * 100).toFixed(0)}% confidence
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg mb-1" style={{ color: '#FFFFFF' }}>
                    {insight.title}
                  </h3>
                  <p style={{ color: '#94A3B8' }} className="text-sm mb-3">
                    {insight.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <p style={{ color: '#94A3B8' }} className="text-xs font-medium">
                        Business Impact
                      </p>
                      <p style={{ color: '#FFFFFF' }} className="text-sm">
                        {insight.businessImpact}
                      </p>
                    </div>
                    <div>
                      <p style={{ color: '#94A3B8' }} className="text-xs font-medium">
                        Recommended Action
                      </p>
                      <p style={{ color: '#FFFFFF' }} className="text-sm">
                        {insight.recommendedAction}
                      </p>
                    </div>
                  </div>

                  {insight.relatedRecords.length > 0 && (
                    <div className="mb-3">
                      <p style={{ color: '#94A3B8' }} className="text-xs font-medium mb-2">
                        Related Records
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {insight.relatedRecords.map((record, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-2 py-1 rounded"
                            style={{ backgroundColor: '#0F172A', color: '#06B6D4', border: '1px solid #475569' }}
                          >
                            {record.type}: {record.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 flex-shrink-0 ml-4">
                  <button
                    className="px-3 py-2 rounded-lg text-sm transition-colors"
                    style={{ backgroundColor: '#06B6D415', color: '#06B6D4' }}
                  >
                    Details
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs" style={{ color: '#94A3B8' }}>
                <span>Priority: {insight.priority}/10</span>
                <span>Created: {insight.createdAt.toLocaleDateString()}</span>
                <span>{insight.tags.join(', ')}</span>
              </div>
            </div>
          ))}
        </div>

        {filteredInsights.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 mx-auto mb-3" style={{ color: '#475569' }} />
            <p style={{ color: '#94A3B8' }} className="text-lg">
              No insights found matching your filters
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
