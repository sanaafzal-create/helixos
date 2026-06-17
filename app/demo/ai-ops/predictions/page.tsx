'use client'

import { TrendingUp, TrendingDown, Clock, AlertCircle } from 'lucide-react'
import { getAIPredictions } from '@/lib/ai-ops-seeds'

export default function PredictiveAnalyticsPage() {
  const predictions = getAIPredictions()

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#0F172A' }}>
      {/* Header */}
      <div className="border-b p-8" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
        <div>
          <h1 className="text-4xl font-bold mb-2" style={{ color: '#FFFFFF' }}>
            Predictive Analytics
          </h1>
          <p style={{ color: '#94A3B8' }} className="text-lg">
            AI-powered forecasts for operational planning and risk mitigation
          </p>
        </div>
      </div>

      <div className="p-8">
        {/* Forecast Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {predictions.map((metric, idx) => (
            <div
              key={idx}
              className="p-6 rounded-lg border"
              style={{
                borderColor: '#334155',
                backgroundColor: '#1E293B',
              }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p style={{ color: '#94A3B8' }} className="text-sm font-medium">
                    {metric.label}
                  </p>
                  <p className="text-3xl font-bold mt-2" style={{ color: '#FFFFFF' }}>
                    {metric.value}{metric.label.includes('Rate') || metric.label.includes('Score') ? '%' : metric.label.includes('Capacity') ? '%' : metric.label.includes('days') ? ' days' : ''}
                  </p>
                </div>
                <div
                  className="p-3 rounded-lg"
                  style={{
                    backgroundColor: metric.trend === 'down' ? '#EF444415' : metric.trend === 'up' ? '#F59E0B15' : '#10B98115',
                  }}
                >
                  {metric.trend === 'down' && (
                    <TrendingDown className="w-6 h-6" style={{ color: '#EF4444' }} />
                  )}
                  {metric.trend === 'up' && (
                    <TrendingUp className="w-6 h-6" style={{ color: '#F59E0B' }} />
                  )}
                  {metric.trend === 'stable' && (
                    <Clock className="w-6 h-6" style={{ color: '#10B981' }} />
                  )}
                </div>
              </div>

              {/* Trend Indicator */}
              <div className="mb-4 p-3 rounded-lg" style={{ backgroundColor: '#0F172A' }}>
                <div className="flex items-center justify-between mb-2">
                  <p style={{ color: '#94A3B8' }} className="text-sm">
                    Trend
                  </p>
                  <span
                    className="text-xs font-semibold px-2 py-1 rounded"
                    style={{
                      backgroundColor: metric.trend === 'down' ? '#EF444440' : metric.trend === 'up' ? '#F59E0B40' : '#10B98140',
                      color: metric.trend === 'down' ? '#EF4444' : metric.trend === 'up' ? '#F59E0B' : '#10B981',
                    }}
                  >
                    {metric.trend === 'down' ? 'Declining' : metric.trend === 'up' ? 'Increasing' : 'Stable'}
                  </span>
                </div>
                <p style={{ color: '#FFFFFF' }} className="text-sm">
                  {metric.trend === 'down' 
                    ? `Metric is trending downward. Projected ${metric.trend === 'down' ? 'decrease' : 'increase'} requires attention.`
                    : metric.trend === 'up'
                    ? `Metric is trending upward. Current trajectory exceeds safe thresholds.`
                    : `Metric is stable. Continue monitoring for changes.`}
                </p>
              </div>

              {/* Forecast */}
              <div className="mb-4 p-3 rounded-lg" style={{ backgroundColor: '#0F172A' }}>
                <p style={{ color: '#94A3B8' }} className="text-sm font-medium mb-2">
                  30-Day Forecast
                </p>
                <div className="flex items-end justify-between">
                  <div>
                    <p style={{ color: '#94A3B8' }} className="text-xs">
                      Current
                    </p>
                    <p className="text-2xl font-bold" style={{ color: '#06B6D4' }}>
                      {metric.value}{metric.label.includes('Rate') || metric.label.includes('Score') ? '%' : metric.label.includes('Capacity') ? '%' : metric.label.includes('days') ? '' : ''}
                    </p>
                  </div>
                  <div className="text-right">
                    <p style={{ color: '#94A3B8' }} className="text-xs">
                      Forecasted
                    </p>
                    <p
                      className="text-2xl font-bold"
                      style={{
                        color: metric.trend === 'down' ? '#EF4444' : metric.trend === 'up' ? '#F59E0B' : '#10B981',
                      }}
                    >
                      {metric.forecastedValue}{metric.label.includes('Rate') || metric.label.includes('Score') ? '%' : metric.label.includes('Capacity') ? '%' : metric.label.includes('days') ? '' : ''}
                    </p>
                  </div>
                </div>
              </div>

              {/* Risk Assessment */}
              {(metric.trend === 'down' || metric.trend === 'up') && (
                <div className="p-3 rounded-lg border" style={{ borderColor: metric.trend === 'down' ? '#EF4444' : '#F59E0B', backgroundColor: metric.trend === 'down' ? '#EF444415' : '#F59E0B15' }}>
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: metric.trend === 'down' ? '#EF4444' : '#F59E0B' }} />
                    <p
                      className="text-xs"
                      style={{
                        color: metric.trend === 'down' ? '#EF4444' : '#F59E0B',
                      }}
                    >
                      {metric.trend === 'down'
                        ? `Declining trend requires intervention. ${metric.label} expected to reach ${metric.forecastedValue}% in ${metric.timeframe}.`
                        : `Increasing metric approaching critical threshold. ${metric.label} projected to exceed safe limits in ${metric.timeframe}.`}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Analytics Summary */}
        <div className="p-6 rounded-lg border" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
          <h2 className="text-xl font-bold mb-4" style={{ color: '#FFFFFF' }}>
            Trend Summary
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 rounded-lg" style={{ backgroundColor: '#0F172A' }}>
              <p style={{ color: '#94A3B8' }} className="text-sm font-medium mb-2">
                Declining Metrics
              </p>
              <p className="text-3xl font-bold" style={{ color: '#EF4444' }}>
                {predictions.filter(p => p.trend === 'down').length}
              </p>
              <p style={{ color: '#94A3B8' }} className="text-xs mt-2">
                Metrics require immediate attention
              </p>
            </div>

            <div className="p-4 rounded-lg" style={{ backgroundColor: '#0F172A' }}>
              <p style={{ color: '#94A3B8' }} className="text-sm font-medium mb-2">
                Increasing Metrics
              </p>
              <p className="text-3xl font-bold" style={{ color: '#F59E0B' }}>
                {predictions.filter(p => p.trend === 'up').length}
              </p>
              <p style={{ color: '#94A3B8' }} className="text-xs mt-2">
                Metrics exceeding safe thresholds
              </p>
            </div>

            <div className="p-4 rounded-lg" style={{ backgroundColor: '#0F172A' }}>
              <p style={{ color: '#94A3B8' }} className="text-sm font-medium mb-2">
                Stable Metrics
              </p>
              <p className="text-3xl font-bold" style={{ color: '#10B981' }}>
                {predictions.filter(p => p.trend === 'stable').length}
              </p>
              <p style={{ color: '#94A3B8' }} className="text-xs mt-2">
                Metrics performing within expected ranges
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-lg border" style={{ borderColor: '#06B6D4', backgroundColor: '#06B6D415' }}>
            <p style={{ color: '#06B6D4' }} className="text-sm">
              <strong>Recommendation:</strong> Implement corrective actions for declining metrics. Review capacity planning for increasing metrics. Continue monitoring stable metrics for changes.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
