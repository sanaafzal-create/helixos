'use client'

import { useState } from 'react'
import { Plus, Trash2, Download, Save, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function ReportBuilder() {
  const [reportName, setReportName] = useState('Custom Performance Report')
  const [selectedMetrics, setSelectedMetrics] = useState(['activeCases', 'caseResolution', 'teamProductivity'])
  const [selectedFilters, setSelectedFilters] = useState(['market', 'dateRange'])
  const [exportFormat, setExportFormat] = useState('pdf')

  const availableMetrics = [
    { id: 'activeCases', label: 'Active Cases' },
    { id: 'closedCases', label: 'Closed Cases' },
    { id: 'caseResolution', label: 'Case Resolution Rate' },
    { id: 'providerPerformance', label: 'Provider Performance' },
    { id: 'memberEngagement', label: 'Member Engagement' },
    { id: 'outreachMetrics', label: 'Outreach Metrics' },
    { id: 'teamProductivity', label: 'Team Productivity' },
    { id: 'aiInsights', label: 'AI Insights' },
    { id: 'riskAnalysis', label: 'Risk Analysis' },
    { id: 'forecast', label: 'Forecasting' },
  ]

  const availableFilters = [
    { id: 'market', label: 'Market' },
    { id: 'dateRange', label: 'Date Range' },
    { id: 'team', label: 'Team' },
    { id: 'status', label: 'Status' },
    { id: 'provider', label: 'Provider' },
  ]

  const toggleMetric = (id: string) => {
    setSelectedMetrics(prev =>
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    )
  }

  const toggleFilter = (id: string) => {
    setSelectedFilters(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    )
  }

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
          Report Builder
        </h1>
        <p style={{ color: '#94A3B8' }} className="text-lg mt-2">
          Create custom reports tailored to your needs
        </p>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Configuration Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Report Name */}
            <div className="border rounded-lg p-6" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
              <h3 className="text-lg font-bold mb-4" style={{ color: '#FFFFFF' }}>
                Report Details
              </h3>
              <div>
                <label style={{ color: '#94A3B8' }} className="text-sm font-medium block mb-2">
                  Report Name
                </label>
                <input
                  type="text"
                  value={reportName}
                  onChange={(e) => setReportName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border text-sm"
                  style={{ backgroundColor: '#0F172A', borderColor: '#475569', color: '#FFFFFF' }}
                />
              </div>
            </div>

            {/* Metrics Selection */}
            <div className="border rounded-lg p-6" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
              <h3 className="text-lg font-bold mb-4" style={{ color: '#FFFFFF' }}>
                Select Metrics ({selectedMetrics.length})
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {availableMetrics.map(metric => (
                  <button
                    key={metric.id}
                    onClick={() => toggleMetric(metric.id)}
                    className="p-3 rounded-lg border text-left transition-colors"
                    style={{
                      borderColor: selectedMetrics.includes(metric.id) ? '#06B6D4' : '#334155',
                      backgroundColor: selectedMetrics.includes(metric.id) ? '#06B6D415' : '#0F172A',
                      color: selectedMetrics.includes(metric.id) ? '#06B6D4' : '#94A3B8',
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded border"
                        style={{
                          borderColor: selectedMetrics.includes(metric.id) ? '#06B6D4' : '#334155',
                          backgroundColor: selectedMetrics.includes(metric.id) ? '#06B6D4' : 'transparent',
                        }}
                      />
                      <span className="text-sm font-medium">{metric.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Filters Selection */}
            <div className="border rounded-lg p-6" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
              <h3 className="text-lg font-bold mb-4" style={{ color: '#FFFFFF' }}>
                Enable Filters ({selectedFilters.length})
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {availableFilters.map(filter => (
                  <button
                    key={filter.id}
                    onClick={() => toggleFilter(filter.id)}
                    className="p-3 rounded-lg border text-left transition-colors"
                    style={{
                      borderColor: selectedFilters.includes(filter.id) ? '#06B6D4' : '#334155',
                      backgroundColor: selectedFilters.includes(filter.id) ? '#06B6D415' : '#0F172A',
                      color: selectedFilters.includes(filter.id) ? '#06B6D4' : '#94A3B8',
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded border"
                        style={{
                          borderColor: selectedFilters.includes(filter.id) ? '#06B6D4' : '#334155',
                          backgroundColor: selectedFilters.includes(filter.id) ? '#06B6D4' : 'transparent',
                        }}
                      />
                      <span className="text-sm font-medium">{filter.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Preview & Export Panel */}
          <div className="space-y-6">
            {/* Preview */}
            <div className="border rounded-lg p-6" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
              <h3 className="text-lg font-bold mb-4" style={{ color: '#FFFFFF' }}>
                Report Preview
              </h3>
              <div className="p-4 rounded-lg space-y-3" style={{ backgroundColor: '#0F172A' }}>
                <div>
                  <p style={{ color: '#94A3B8' }} className="text-xs mb-1">
                    Report Name
                  </p>
                  <p style={{ color: '#FFFFFF' }} className="font-semibold">
                    {reportName}
                  </p>
                </div>
                <div className="border-t" style={{ borderColor: '#334155' }}>
                  <p style={{ color: '#94A3B8' }} className="text-xs mt-3 mb-2">
                    Metrics
                  </p>
                  <div className="space-y-1">
                    {selectedMetrics.map(metricId => {
                      const metric = availableMetrics.find(m => m.id === metricId)
                      return (
                        <p key={metricId} style={{ color: '#FFFFFF' }} className="text-sm">
                          • {metric?.label}
                        </p>
                      )
                    })}
                  </div>
                </div>
                <div className="border-t" style={{ borderColor: '#334155' }}>
                  <p style={{ color: '#94A3B8' }} className="text-xs mt-3 mb-2">
                    Filters
                  </p>
                  <div className="space-y-1">
                    {selectedFilters.map(filterId => {
                      const filter = availableFilters.find(f => f.id === filterId)
                      return (
                        <p key={filterId} style={{ color: '#FFFFFF' }} className="text-sm">
                          • {filter?.label}
                        </p>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Export Options */}
            <div className="border rounded-lg p-6" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
              <h3 className="text-lg font-bold mb-4" style={{ color: '#FFFFFF' }}>
                Export Format
              </h3>
              <div className="space-y-2">
                {['pdf', 'excel', 'csv'].map(format => (
                  <button
                    key={format}
                    onClick={() => setExportFormat(format)}
                    className="w-full p-2 rounded-lg text-left transition-colors text-sm"
                    style={{
                      backgroundColor: exportFormat === format ? '#06B6D415' : '#0F172A',
                      borderColor: exportFormat === format ? '#06B6D4' : '#334155',
                      border: '1px solid',
                      color: exportFormat === format ? '#06B6D4' : '#94A3B8',
                    }}
                  >
                    {format.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Schedule */}
            <div className="border rounded-lg p-6" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
              <h3 className="text-lg font-bold mb-4" style={{ color: '#FFFFFF' }}>
                Delivery
              </h3>
              <div className="space-y-3">
                <label className="flex items-center gap-2" style={{ color: '#94A3B8' }}>
                  <input type="checkbox" defaultChecked style={{ accentColor: '#06B6D4' }} />
                  <span className="text-sm">Email Report Quarterly</span>
                </label>
                <label className="flex items-center gap-2" style={{ color: '#94A3B8' }}>
                  <input type="checkbox" style={{ accentColor: '#06B6D4' }} />
                  <span className="text-sm">Save as Template</span>
                </label>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button
                className="w-full px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                style={{ backgroundColor: '#06B6D4', color: '#0F172A' }}
              >
                <Save className="w-4 h-4" />
                Save Report
              </button>
              <button
                className="w-full px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 border"
                style={{ borderColor: '#334155', backgroundColor: 'transparent', color: '#06B6D4' }}
              >
                <Download className="w-4 h-4" />
                Export Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
