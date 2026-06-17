'use client'

import { AlertTriangle, TrendingUp, Target, Zap, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { getOperationalIntelligence, getExecutiveInsights } from '@/lib/analytics-seeds'

export default function OperationalIntelligence() {
  const opIntel = getOperationalIntelligence()
  const insights = getExecutiveInsights()

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
          Operational Intelligence Dashboard
        </h1>
        <p style={{ color: '#94A3B8' }} className="text-lg mt-2">
          Strategic insights for leadership decision-making
        </p>
      </div>

      {/* Content */}
      <div className="p-8">
        {/* Bottlenecks */}
        <div className="mb-6 border rounded-lg p-6" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5" style={{ color: '#EF4444' }} />
            <h2 className="text-lg font-bold" style={{ color: '#FFFFFF' }}>
              Operational Bottlenecks
            </h2>
          </div>
          <div className="space-y-3">
            {opIntel.bottlenecks.map((bottleneck, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg border"
                style={{
                  borderColor: bottleneck.severity === 'high' ? '#EF444450' : '#F59E0B50',
                  backgroundColor: bottleneck.severity === 'high' ? '#EF444415' : '#F59E0B15',
                }}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold" style={{ color: '#FFFFFF' }}>
                    {bottleneck.area}
                  </h3>
                  <span
                    className="text-xs px-2 py-1 rounded font-medium"
                    style={{
                      backgroundColor: bottleneck.severity === 'high' ? '#EF444430' : '#F59E0B30',
                      color: bottleneck.severity === 'high' ? '#EF4444' : '#F59E0B',
                    }}
                  >
                    {bottleneck.severity} severity
                  </span>
                </div>
                <p style={{ color: '#94A3B8' }} className="text-sm">
                  {bottleneck.impact}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Capacity Forecast */}
          <div className="border rounded-lg p-6" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
            <h3 className="text-lg font-bold mb-4" style={{ color: '#FFFFFF' }}>
              Capacity Forecast
            </h3>
            <div className="space-y-3">
              {opIntel.capacityForecast.map((forecast, idx) => (
                <div key={idx} className="p-3 rounded-lg" style={{ backgroundColor: '#0F172A' }}>
                  <div className="flex items-center justify-between mb-2">
                    <span style={{ color: '#FFFFFF' }} className="font-medium">
                      {forecast.period}
                    </span>
                    <span
                      style={{ color: forecast.projected > forecast.capacity * 0.9 ? '#EF4444' : '#10B981' }}
                      className="text-sm font-semibold"
                    >
                      {forecast.projected}/{forecast.capacity}
                    </span>
                  </div>
                  <div className="h-2 rounded-lg" style={{ backgroundColor: '#334155' }}>
                    <div
                      className="h-full rounded-lg"
                      style={{
                        width: `${(forecast.projected / forecast.capacity) * 100}%`,
                        backgroundColor: forecast.projected > forecast.capacity * 0.9 ? '#EF4444' : '#06B6D4',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Market Performance */}
          <div className="border rounded-lg p-6" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
            <h3 className="text-lg font-bold mb-4" style={{ color: '#FFFFFF' }}>
              Market Performance
            </h3>
            <div className="space-y-3">
              {opIntel.marketPerformance.map((market, idx) => (
                <div key={idx} className="p-3 rounded-lg" style={{ backgroundColor: '#0F172A' }}>
                  <div className="flex items-center justify-between mb-2">
                    <span style={{ color: '#FFFFFF' }} className="font-medium">
                      {market.market}
                    </span>
                    <div className="flex items-center gap-3">
                      <span style={{ color: '#10B981' }} className="text-sm font-semibold">
                        +{market.growth}%
                      </span>
                      <span style={{ color: '#06B6D4' }} className="text-sm">
                        {market.efficiency}% eff
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Resource Allocation */}
        <div className="mb-6 border rounded-lg p-6" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
          <h3 className="text-lg font-bold mb-4" style={{ color: '#FFFFFF' }}>
            Resource Allocation
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {opIntel.resourceAllocation.map((resource, idx) => (
              <div key={idx} className="p-4 rounded-lg" style={{ backgroundColor: '#0F172A' }}>
                <p style={{ color: '#94A3B8' }} className="text-sm mb-2">
                  {resource.resource}
                </p>
                <p style={{ color: '#FFFFFF' }} className="text-xl font-bold mb-2">
                  {resource.utilized}/{resource.allocated}
                </p>
                <div className="h-2 rounded-lg" style={{ backgroundColor: '#334155' }}>
                  <div
                    className="h-full rounded-lg"
                    style={{
                      width: `${(resource.utilized / resource.allocated) * 100}%`,
                      backgroundColor: '#06B6D4',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Forecasting */}
        <div className="mb-6 border rounded-lg p-6" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5" style={{ color: '#F59E0B' }} />
            <h2 className="text-lg font-bold" style={{ color: '#FFFFFF' }}>
              Risk Forecasting
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {opIntel.riskForecasting.map((risk, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg border"
                style={{
                  borderColor: '#F59E0B50',
                  backgroundColor: '#F59E0B15',
                }}
              >
                <p style={{ color: '#FFFFFF' }} className="font-medium mb-3">
                  {risk.risk}
                </p>
                <div className="space-y-2 text-sm">
                  <div>
                    <p style={{ color: '#94A3B8' }}>Probability</p>
                    <p style={{ color: '#F59E0B' }} className="font-bold">
                      {risk.probability}%
                    </p>
                  </div>
                  <div>
                    <p style={{ color: '#94A3B8' }}>Impact</p>
                    <p style={{ color: '#EF4444' }} className="font-bold">
                      {risk.impact}%
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Opportunities */}
        <div className="border rounded-lg p-6" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5" style={{ color: '#10B981' }} />
            <h2 className="text-lg font-bold" style={{ color: '#FFFFFF' }}>
              Strategic Opportunities
            </h2>
          </div>
          <div className="space-y-3">
            {opIntel.opportunities.map((opportunity, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg border"
                style={{
                  borderColor: '#10B98150',
                  backgroundColor: '#10B98115',
                }}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold" style={{ color: '#FFFFFF' }}>
                    {opportunity.title}
                  </h3>
                  <span
                    className="text-xs px-2 py-1 rounded font-medium"
                    style={{
                      backgroundColor: '#10B98130',
                      color: '#10B981',
                    }}
                  >
                    {opportunity.potential}
                  </span>
                </div>
                <p style={{ color: '#94A3B8' }} className="text-sm">
                  Target: {opportunity.timeframe}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Executive Insights */}
        <div className="mt-6 border rounded-lg p-6" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5" style={{ color: '#06B6D4' }} />
            <h2 className="text-lg font-bold" style={{ color: '#FFFFFF' }}>
              AI-Powered Executive Insights
            </h2>
          </div>
          <div className="space-y-3">
            {insights.map(insight => (
              <div
                key={insight.id}
                className="p-4 rounded-lg border"
                style={{
                  borderColor: '#475569',
                  backgroundColor: '#0F172A',
                }}
              >
                <div className="flex items-start justify-between mb-2">
                  <p className="font-medium" style={{ color: '#FFFFFF' }}>
                    {insight.title}
                  </p>
                  <p style={{ color: '#06B6D4' }} className="text-sm font-bold">
                    {insight.impactScore} impact
                  </p>
                </div>
                <p style={{ color: '#94A3B8' }} className="text-sm mb-2">
                  {insight.action}
                </p>
                <div className="flex items-center gap-2">
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
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
