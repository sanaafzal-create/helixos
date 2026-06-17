'use client'

import { useState } from 'react'
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Clock, Zap, Brain, BarChart3, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { getAllAIInsights, getCriticalInsights, getAIPredictions, getActivityFeed } from '@/lib/ai-ops-seeds'

export default function AIOpsPage() {
  const allInsights = getAllAIInsights()
  const criticalInsights = getCriticalInsights()
  const predictions = getAIPredictions()
  const activityFeed = getActivityFeed()

  const caseInsights = allInsights.filter(i => i.type === 'case')
  const providerInsights = allInsights.filter(i => i.type === 'provider')
  const memberInsights = allInsights.filter(i => i.type === 'member')
  const operationalInsights = allInsights.filter(i => i.type === 'operational')

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#0F172A' }}>
      {/* Header */}
      <div className="border-b p-8" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-4xl font-bold" style={{ color: '#FFFFFF' }}>
              AI Operations Center
            </h1>
            <p style={{ color: '#94A3B8' }} className="text-lg mt-2">
              Proactive intelligence for smarter decisions
            </p>
          </div>
          <Brain className="w-12 h-12" style={{ color: '#06B6D4' }} />
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        {/* Critical Alerts Bar */}
        {criticalInsights.length > 0 && (
          <div className="mb-8 p-4 rounded-lg border" style={{ borderColor: '#EF4444', backgroundColor: '#EF444415' }}>
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 mt-0.5" style={{ color: '#EF4444' }} />
                <div>
                  <h3 className="font-bold mb-1" style={{ color: '#EF4444' }}>
                    {criticalInsights.length} Critical Alert{criticalInsights.length !== 1 ? 's' : ''}
                  </h3>
                  <p style={{ color: '#94A3B8' }} className="text-sm">
                    {criticalInsights[0]?.title}
                  </p>
                </div>
              </div>
              <Link href="/demo/ai-ops/insights">
                <button
                  className="text-sm font-medium px-3 py-1 rounded-lg transition-colors flex-shrink-0"
                  style={{ backgroundColor: '#EF4444', color: '#FFFFFF' }}
                >
                  Review
                </button>
              </Link>
            </div>
          </div>
        )}

        {/* Key Insights Grid */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4" style={{ color: '#FFFFFF' }}>
            Insight Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Case Intelligence', count: caseInsights.length, color: '#06B6D4', icon: '📋' },
              { label: 'Provider Intelligence', count: providerInsights.length, color: '#10B981', icon: '🏥' },
              { label: 'Member Intelligence', count: memberInsights.length, color: '#F59E0B', icon: '👤' },
              { label: 'Operational', count: operationalInsights.length, color: '#8B5CF6', icon: '⚙️' },
            ].map((cat, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg border cursor-pointer transition-all hover:shadow-lg"
                style={{
                  borderColor: '#334155',
                  backgroundColor: '#1E293B',
                }}
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="text-2xl">{cat.icon}</span>
                  <span className="text-xl font-bold" style={{ color: cat.color }}>
                    {cat.count}
                  </span>
                </div>
                <p style={{ color: '#FFFFFF' }} className="text-sm font-medium">
                  {cat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Top Insights */}
          <div className="lg:col-span-2 border rounded-lg p-6" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold" style={{ color: '#FFFFFF' }}>
                Top Insights
              </h3>
              <Link href="/demo/ai-ops/insights">
                <button
                  className="text-xs px-2 py-1 rounded-lg transition-colors"
                  style={{ backgroundColor: '#06B6D415', color: '#06B6D4' }}
                >
                  View All
                </button>
              </Link>
            </div>

            <div className="space-y-3">
              {allInsights.slice(0, 5).map(insight => (
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
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="text-xs px-2 py-0.5 rounded font-medium"
                          style={{
                            backgroundColor: insight.severity === 'critical' ? '#EF444440' : insight.severity === 'high' ? '#F59E0B40' : '#10B98140',
                            color: insight.severity === 'critical' ? '#EF4444' : insight.severity === 'high' ? '#F59E0B' : '#10B981',
                          }}
                        >
                          {insight.severity}
                        </span>
                        <span
                          className="text-xs px-2 py-0.5 rounded"
                          style={{ backgroundColor: '#06B6D415', color: '#06B6D4' }}
                        >
                          {(insight.confidence * 100).toFixed(0)}% confidence
                        </span>
                      </div>
                      <p className="font-medium" style={{ color: '#FFFFFF' }}>
                        {insight.title}
                      </p>
                      <p style={{ color: '#94A3B8' }} className="text-sm mt-1">
                        {insight.description.substring(0, 80)}...
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0" style={{ color: '#06B6D4' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Predictive Metrics */}
          <div className="border rounded-lg p-6" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
            <h3 className="text-lg font-bold mb-4" style={{ color: '#FFFFFF' }}>
              Forecasts
            </h3>
            <div className="space-y-3">
              {predictions.slice(0, 4).map((metric, idx) => (
                <div key={idx} className="p-3 rounded-lg" style={{ backgroundColor: '#0F172A' }}>
                  <div className="flex items-start justify-between mb-2">
                    <p style={{ color: '#94A3B8' }} className="text-xs font-medium">
                      {metric.label}
                    </p>
                    {metric.trend === 'down' ? (
                      <TrendingDown className="w-4 h-4" style={{ color: '#EF4444' }} />
                    ) : metric.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4" style={{ color: '#F59E0B' }} />
                    ) : (
                      <Clock className="w-4 h-4" style={{ color: '#10B981' }} />
                    )}
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-2xl font-bold" style={{ color: '#FFFFFF' }}>
                        {metric.value}{metric.label.includes('Rate') ? '%' : ''}
                      </p>
                      <p style={{ color: '#94A3B8' }} className="text-xs mt-1">
                        Forecast: {metric.forecastedValue}{metric.label.includes('Rate') ? '%' : ''}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="border rounded-lg p-6" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
          <h3 className="text-lg font-bold mb-4" style={{ color: '#FFFFFF' }}>
            AI Activity Feed
          </h3>
          <div className="space-y-3">
            {activityFeed.slice(0, 6).map((item, idx) => (
              <div
                key={item.id}
                className="flex items-start gap-3 p-3 rounded-lg"
                style={{
                  backgroundColor: '#0F172A',
                  borderLeft: `3px solid ${
                    item.impact === 'high'
                      ? '#EF4444'
                      : item.impact === 'medium'
                        ? '#F59E0B'
                        : '#10B981'
                  }`,
                }}
              >
                <div>
                  {item.type === 'alert' && <AlertTriangle className="w-4 h-4" style={{ color: '#EF4444' }} />}
                  {item.type === 'insight' && <Brain className="w-4 h-4" style={{ color: '#06B6D4' }} />}
                  {item.type === 'detection' && <CheckCircle className="w-4 h-4" style={{ color: '#10B981' }} />}
                  {item.type === 'classification' && <Zap className="w-4 h-4" style={{ color: '#F59E0B' }} />}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm" style={{ color: '#FFFFFF' }}>
                    {item.title}
                  </p>
                  <p style={{ color: '#94A3B8' }} className="text-xs mt-1">
                    {item.details}
                  </p>
                  <p style={{ color: '#94A3B8' }} className="text-xs mt-1">
                    {item.timestamp.toLocaleDateString()} {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-3 flex-wrap">
          <Link href="/demo/ai-ops/insights">
            <button
              className="px-4 py-2 rounded-lg font-medium transition-colors"
              style={{ backgroundColor: '#06B6D4', color: '#0F172A' }}
            >
              View All Insights
            </button>
          </Link>
          <Link href="/demo/ai-ops/query">
            <button
              className="px-4 py-2 rounded-lg font-medium transition-colors border"
              style={{ borderColor: '#334155', backgroundColor: 'transparent', color: '#06B6D4' }}
            >
              AI Query Center
            </button>
          </Link>
          <Link href="/demo/ai-ops/predictions">
            <button
              className="px-4 py-2 rounded-lg font-medium transition-colors border"
              style={{ borderColor: '#334155', backgroundColor: 'transparent', color: '#06B6D4' }}
            >
              Predictive Analytics
            </button>
          </Link>
        </div>
      </div>
    </main>
  )
}
