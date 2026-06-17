'use client'

import { useState } from 'react'
import { TrendingUp, TrendingDown, Activity, Users, Building2, Phone, CheckSquare, Brain, AlertCircle, BarChart3, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import Link from 'next/link'
import { getKPIData, getCaseAnalytics, getExecutiveInsights } from '@/lib/analytics-seeds'

export default function ExecutiveDashboard() {
  const kpis = getKPIData()
  const caseAnalytics = getCaseAnalytics()
  const insights = getExecutiveInsights()

  const kpiCards = [
    { label: 'Active Cases', value: kpis.activeCases, icon: Activity, change: '+12%', trend: 'up' },
    { label: 'Closed Cases', value: kpis.closedCases, icon: CheckSquare, change: '+8%', trend: 'up' },
    { label: 'Resolution Rate', value: `${kpis.caseResolutionRate}%`, icon: TrendingUp, change: '-2%', trend: 'down' },
    { label: 'Active Providers', value: kpis.activeProviders, icon: Building2, change: '+4%', trend: 'up' },
    { label: 'Active Members', value: kpis.activeMembers, icon: Users, change: '+6%', trend: 'up' },
    { label: 'Outreach Success', value: `${kpis.outreachSuccessRate}%`, icon: Phone, change: '+3%', trend: 'up' },
    { label: 'Team Productivity', value: `${kpis.teamProductivityScore}%`, icon: BarChart3, change: '+5%', trend: 'up' },
    { label: 'AI Insights', value: kpis.aiInsightsGenerated, icon: Brain, change: '+18%', trend: 'up' },
    { label: 'High Risk Cases', value: kpis.highRiskCases, icon: AlertCircle, change: '+2', trend: 'down', alert: true },
    { label: 'Open Tasks', value: kpis.openTasks, icon: CheckSquare, change: '-8%', trend: 'down' },
  ]

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#0F172A' }}>
      {/* Header */}
      <div className="border-b p-8" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
        <h1 className="text-4xl font-bold" style={{ color: '#FFFFFF' }}>
          Executive Dashboard
        </h1>
        <p style={{ color: '#94A3B8' }} className="text-lg mt-2">
          Organization-wide performance and strategic metrics
        </p>
      </div>

      {/* Content */}
      <div className="p-8">
        {/* KPI Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {kpiCards.map((card, idx) => {
            const Icon = card.icon
            const isAlert = card.alert
            return (
              <div
                key={idx}
                className="p-4 rounded-lg border"
                style={{
                  borderColor: isAlert ? '#EF444450' : '#334155',
                  backgroundColor: isAlert ? '#EF444415' : '#1E293B',
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <Icon className="w-5 h-5" style={{ color: isAlert ? '#EF4444' : '#06B6D4' }} />
                  <div className="flex items-center gap-1">
                    {card.trend === 'up' ? (
                      <ArrowUpRight className="w-4 h-4" style={{ color: '#10B981' }} />
                    ) : (
                      <ArrowDownRight className="w-4 h-4" style={{ color: '#EF4444' }} />
                    )}
                    <span style={{ color: card.trend === 'up' ? '#10B981' : '#EF4444' }} className="text-xs font-medium">
                      {card.change}
                    </span>
                  </div>
                </div>
                <p style={{ color: '#94A3B8' }} className="text-xs font-medium">
                  {card.label}
                </p>
                <p className="text-2xl font-bold mt-2" style={{ color: '#FFFFFF' }}>
                  {card.value}
                </p>
              </div>
            )
          })}
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Case Trends */}
          <div className="lg:col-span-2 border rounded-lg p-6" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold" style={{ color: '#FFFFFF' }}>
                Case Volume & Resolution Trends
              </h3>
              <Link href="/demo/reports/analytics?view=cases">
                <button
                  className="text-xs px-2 py-1 rounded-lg transition-colors"
                  style={{ backgroundColor: '#06B6D415', color: '#06B6D4' }}
                >
                  Detailed View
                </button>
              </Link>
            </div>

            <div className="space-y-3">
              {caseAnalytics.volumeTrends.map((trend, idx) => (
                <div key={idx} className="flex items-end gap-3">
                  <div className="w-12">
                    <p style={{ color: '#94A3B8' }} className="text-xs font-medium mb-2">
                      {trend.month}
                    </p>
                    <div
                      className="rounded-lg"
                      style={{
                        height: `${(trend.cases / 400) * 100}px`,
                        backgroundColor: '#06B6D4',
                        minHeight: '20px',
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span style={{ color: '#FFFFFF' }} className="text-sm font-semibold">
                        {trend.cases} cases
                      </span>
                      <span style={{ color: '#10B981' }} className="text-xs">
                        {trend.resolved} resolved
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Metrics */}
          <div className="border rounded-lg p-6" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
            <h3 className="text-lg font-bold mb-4" style={{ color: '#FFFFFF' }}>
              Key Metrics
            </h3>
            <div className="space-y-3">
              <div className="p-3 rounded-lg" style={{ backgroundColor: '#0F172A' }}>
                <p style={{ color: '#94A3B8' }} className="text-xs mb-1">
                  Avg Resolution Time
                </p>
                <p className="text-2xl font-bold" style={{ color: '#06B6D4' }}>
                  {caseAnalytics.resolutionTime}
                </p>
                <p style={{ color: '#94A3B8' }} className="text-xs">
                  days
                </p>
              </div>
              <div className="p-3 rounded-lg" style={{ backgroundColor: '#0F172A' }}>
                <p style={{ color: '#94A3B8' }} className="text-xs mb-1">
                  Open Cases
                </p>
                <p className="text-2xl font-bold" style={{ color: '#FFFFFF' }}>
                  {caseAnalytics.openVsClosed.open}
                </p>
              </div>
              <div className="p-3 rounded-lg" style={{ backgroundColor: '#0F172A' }}>
                <p style={{ color: '#94A3B8' }} className="text-xs mb-1">
                  High Risk Cases
                </p>
                <p className="text-2xl font-bold" style={{ color: '#EF4444' }}>
                  {kpis.highRiskCases}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Executive Insights */}
        <div className="mt-6 border rounded-lg p-6" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold" style={{ color: '#FFFFFF' }}>
              Executive Insights
            </h3>
            <Link href="/demo/reports/intelligence">
              <button
                className="text-xs px-2 py-1 rounded-lg transition-colors"
                style={{ backgroundColor: '#06B6D415', color: '#06B6D4' }}
              >
                View All
              </button>
            </Link>
          </div>

          <div className="space-y-3">
            {insights.slice(0, 3).map(insight => (
              <div
                key={insight.id}
                className="p-3 rounded-lg border"
                style={{
                  borderColor: '#475569',
                  backgroundColor: '#0F172A',
                }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <p className="font-medium text-sm" style={{ color: '#FFFFFF' }}>
                      {insight.title}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span
                        className="text-xs px-2 py-0.5 rounded"
                        style={{
                          backgroundColor: insight.category === 'opportunity' ? '#10B98130' : insight.category === 'risk' ? '#EF444430' : '#06B6D430',
                          color: insight.category === 'opportunity' ? '#10B981' : insight.category === 'risk' ? '#EF4444' : '#06B6D4',
                        }}
                      >
                        {insight.category}
                      </span>
                      <span
                        className="text-xs px-2 py-0.5 rounded"
                        style={{ backgroundColor: '#64748B30', color: '#94A3B8' }}
                      >
                        {(insight.confidence * 100).toFixed(0)}% confidence
                      </span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p style={{ color: '#06B6D4' }} className="text-lg font-bold">
                      {insight.impactScore}
                    </p>
                    <p style={{ color: '#94A3B8' }} className="text-xs">
                      impact
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Links */}
        <div className="mt-8 flex gap-3 flex-wrap">
          <Link href="/demo/reports/analytics">
            <button
              className="px-4 py-2 rounded-lg font-medium transition-colors"
              style={{ backgroundColor: '#06B6D4', color: '#0F172A' }}
            >
              View Analytics
            </button>
          </Link>
          <Link href="/demo/reports/builder">
            <button
              className="px-4 py-2 rounded-lg font-medium transition-colors border"
              style={{ borderColor: '#334155', backgroundColor: 'transparent', color: '#06B6D4' }}
            >
              Build Custom Report
            </button>
          </Link>
          <Link href="/demo/reports/intelligence">
            <button
              className="px-4 py-2 rounded-lg font-medium transition-colors border"
              style={{ borderColor: '#334155', backgroundColor: 'transparent', color: '#06B6D4' }}
            >
              Operational Intelligence
            </button>
          </Link>
        </div>
      </div>
    </main>
  )
}
