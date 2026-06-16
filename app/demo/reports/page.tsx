'use client'

import { demoReports } from '@/lib/demo-data'
import { TrendingUp, Users, ClipboardList, Heart } from 'lucide-react'

export default function DemoReportsPage() {
  return (
    <div style={{ backgroundColor: '#0F172A' }} className="p-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2" style={{ color: '#FFFFFF' }}>
          Reports
        </h1>
        <p style={{ color: '#94A3B8' }}>
          View key metrics and program performance
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-6 rounded-lg border" style={{ backgroundColor: '#1E293B', borderColor: '#334155' }}>
          <div className="flex items-center justify-between mb-2">
            <p style={{ color: '#94A3B8' }} className="text-sm font-semibold">
              Total Members
            </p>
            <Users className="w-5 h-5" style={{ color: '#06B6D4' }} />
          </div>
          <p style={{ color: '#FFFFFF' }} className="text-2xl font-bold">
            {demoReports.summary.totalMembers.toLocaleString()}
          </p>
        </div>

        <div className="p-6 rounded-lg border" style={{ backgroundColor: '#1E293B', borderColor: '#334155' }}>
          <div className="flex items-center justify-between mb-2">
            <p style={{ color: '#94A3B8' }} className="text-sm font-semibold">
              Active Cases
            </p>
            <ClipboardList className="w-5 h-5" style={{ color: '#10B981' }} />
          </div>
          <p style={{ color: '#FFFFFF' }} className="text-2xl font-bold">
            {demoReports.summary.activeCases}
          </p>
        </div>

        <div className="p-6 rounded-lg border" style={{ backgroundColor: '#1E293B', borderColor: '#334155' }}>
          <div className="flex items-center justify-between mb-2">
            <p style={{ color: '#94A3B8' }} className="text-sm font-semibold">
              Engagement
            </p>
            <TrendingUp className="w-5 h-5" style={{ color: '#F59E0B' }} />
          </div>
          <p style={{ color: '#FFFFFF' }} className="text-2xl font-bold">
            {demoReports.summary.avgEngagementScore}%
          </p>
        </div>

        <div className="p-6 rounded-lg border" style={{ backgroundColor: '#1E293B', borderColor: '#334155' }}>
          <div className="flex items-center justify-between mb-2">
            <p style={{ color: '#94A3B8' }} className="text-sm font-semibold">
              Cost Savings
            </p>
            <Heart className="w-5 h-5" style={{ color: '#EF4444' }} />
          </div>
          <p style={{ color: '#FFFFFF' }} className="text-2xl font-bold">
            {demoReports.summary.costSavings}
          </p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-6 rounded-lg border" style={{ backgroundColor: '#1E293B', borderColor: '#334155' }}>
          <h3 style={{ color: '#94A3B8' }} className="text-sm font-semibold mb-4">
            Completed Cases
          </h3>
          <p style={{ color: '#FFFFFF' }} className="text-3xl font-bold">
            {demoReports.summary.completedCases}
          </p>
          <p style={{ color: '#10B981' }} className="text-sm mt-2">
            +12 this month
          </p>
        </div>

        <div className="p-6 rounded-lg border" style={{ backgroundColor: '#1E293B', borderColor: '#334155' }}>
          <h3 style={{ color: '#94A3B8' }} className="text-sm font-semibold mb-4">
            Readmission Rate
          </h3>
          <p style={{ color: '#FFFFFF' }} className="text-3xl font-bold">
            {demoReports.summary.readmissionRate}%
          </p>
          <p style={{ color: '#10B981' }} className="text-sm mt-2">
            ↓ 2.1% vs last quarter
          </p>
        </div>

        <div className="p-6 rounded-lg border" style={{ backgroundColor: '#1E293B', borderColor: '#334155' }}>
          <h3 style={{ color: '#94A3B8' }} className="text-sm font-semibold mb-4">
            Program ROI
          </h3>
          <p style={{ color: '#FFFFFF' }} className="text-3xl font-bold">
            3.2x
          </p>
          <p style={{ color: '#10B981' }} className="text-sm mt-2">
            Cost to benefit ratio
          </p>
        </div>
      </div>

      {/* Trends */}
      <div className="p-6 rounded-lg border" style={{ backgroundColor: '#1E293B', borderColor: '#334155' }}>
        <h3 style={{ color: '#FFFFFF' }} className="text-xl font-bold mb-6">
          7-Month Trend
        </h3>
        <div className="space-y-4">
          {demoReports.trends.map((trend) => (
            <div key={trend.month} className="space-y-2">
              <div className="flex justify-between items-center mb-1">
                <span style={{ color: '#FFFFFF' }} className="font-semibold">
                  {trend.month}
                </span>
                <span style={{ color: '#94A3B8' }} className="text-sm">
                  {trend.cases} cases • {trend.outreach} outreach • {trend.engagement}% engagement
                </span>
              </div>
              <div className="flex gap-1">
                <div className="flex-1 bg-gray-700 rounded h-2 overflow-hidden">
                  <div
                    style={{
                      width: `${(trend.cases / 50) * 100}%`,
                      backgroundColor: '#06B6D4',
                      height: '100%',
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-6 rounded-lg border" style={{ backgroundColor: '#1E293B', borderColor: '#334155' }}>
          <h3 style={{ color: '#FFFFFF' }} className="text-lg font-bold mb-4">
            Program Highlights
          </h3>
          <ul style={{ color: '#94A3B8' }} className="space-y-3 text-sm">
            <li className="flex gap-2">
              <span style={{ color: '#10B981' }}>✓</span>
              <span>87.3% member engagement rate</span>
            </li>
            <li className="flex gap-2">
              <span style={{ color: '#10B981' }}>✓</span>
              <span>8.2% readmission reduction</span>
            </li>
            <li className="flex gap-2">
              <span style={{ color: '#10B981' }}>✓</span>
              <span>$2.4M annual cost savings</span>
            </li>
            <li className="flex gap-2">
              <span style={{ color: '#10B981' }}>✓</span>
              <span>156 successfully closed cases</span>
            </li>
          </ul>
        </div>

        <div className="p-6 rounded-lg border" style={{ backgroundColor: '#1E293B', borderColor: '#334155' }}>
          <h3 style={{ color: '#FFFFFF' }} className="text-lg font-bold mb-4">
            Next Steps
          </h3>
          <ul style={{ color: '#94A3B8' }} className="space-y-3 text-sm">
            <li className="flex gap-2">
              <span style={{ color: '#06B6D4' }}>→</span>
              <span>Expand provider network by 15%</span>
            </li>
            <li className="flex gap-2">
              <span style={{ color: '#06B6D4' }}>→</span>
              <span>Target 2,000 member enrollment</span>
            </li>
            <li className="flex gap-2">
              <span style={{ color: '#06B6D4' }}>→</span>
              <span>Implement predictive analytics</span>
            </li>
            <li className="flex gap-2">
              <span style={{ color: '#06B6D4' }}>→</span>
              <span>Launch behavioral health pilot</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
