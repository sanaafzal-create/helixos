'use client'

import { Lightbulb, AlertTriangle, TrendingUp, Clock, Target, Zap, ArrowRight, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function AICopilotPage() {
  const recommendations = [
    {
      id: 1,
      type: 'engagement-alert',
      priority: 'high',
      title: 'Urgent: Provider Inactivity',
      message: 'Dr. Patricia Lee at Dermatology Experts has not been contacted in 32 days. Engagement is declining.',
      action: 'Schedule Call',
      insight: 'Last contact: Jan 5 • Engagement trend: -2',
    },
    {
      id: 2,
      type: 'opportunity',
      priority: 'high',
      title: 'Authorization Expiration Alert',
      message: 'Network authorization for Advanced Orthopedics Center expires in 14 days. Schedule outreach to renew.',
      action: 'Schedule Outreach',
      insight: 'Provider: David Kumar • Renewal date: Jan 31',
    },
    {
      id: 3,
      type: 'positive-trend',
      priority: 'medium',
      title: 'Excellent Engagement Growth',
      message: 'Contact engagement with James Wilson (Gastroenterology) increased 18% over the last month. Consider expansion discussion.',
      action: 'Schedule Meeting',
      insight: 'Response rate: 92% • Relationship score: 8.7/10',
    },
    {
      id: 4,
      type: 'communication-gap',
      priority: 'medium',
      title: 'Communication Channel Mismatch',
      message: 'Robert Thompson prefers phone contact but has received 3 emails in a row. Switch to phone outreach.',
      action: 'Schedule Call',
      insight: 'Preferred method: Phone • Last contact type: Email',
    },
    {
      id: 5,
      type: 'risk-alert',
      priority: 'high',
      title: 'At-Risk Relationship',
      message: 'Dermatology Experts (Patricia Lee) shows declining engagement and no follow-ups logged. Risk of network loss.',
      action: 'Intervention Required',
      insight: 'Relationship score: 5.6/10 • Trend: -2',
    },
    {
      id: 6,
      type: 'opportunity',
      priority: 'medium',
      title: 'Suggested Follow-Up Topics',
      message: 'Based on recent interactions with Metro Health Clinic, recommend discussing Q1 partnership metrics and case volume forecasts.',
      action: 'Draft Email',
      insight: 'Last discussion: Jan 16 • Case volume: 12',
    },
    {
      id: 7,
      type: 'positive-trend',
      priority: 'low',
      title: 'High-Performing Partnership',
      message: 'Cardiac Associates continues to exceed performance benchmarks with 4.9/5.0 score and 8 active cases.',
      action: 'Schedule Check-in',
      insight: 'Performance: 4.9/5.0 • Cases: 8 • Status: Excellent',
    },
    {
      id: 8,
      type: 'campaign-insight',
      priority: 'medium',
      title: 'Campaign Performance Insight',
      message: 'Q1 Provider Engagement campaign has 72% response rate (target: 65%). Consider scaling successful channels.',
      action: 'Review Results',
      insight: 'Reached: 128/145 • Engagement: 65% • Conversion: 38%',
    },
  ]

  const getIcon = (type: string) => {
    switch (type) {
      case 'engagement-alert':
        return AlertTriangle
      case 'opportunity':
        return Zap
      case 'positive-trend':
        return TrendingUp
      case 'communication-gap':
        return Clock
      case 'risk-alert':
        return AlertTriangle
      case 'campaign-insight':
        return Target
      default:
        return Lightbulb
    }
  }

  const getBgColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return '#EF444415'
      case 'medium':
        return '#F59E0B15'
      case 'low':
        return '#10B98115'
      default:
        return '#06B6D415'
    }
  }

  const getBorderColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return '#EF4444'
      case 'medium':
        return '#F59E0B'
      case 'low':
        return '#10B981'
      default:
        return '#06B6D4'
    }
  }

  const getTextColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return '#EF4444'
      case 'medium':
        return '#F59E0B'
      case 'low':
        return '#10B981'
      default:
        return '#06B6D4'
    }
  }

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#0F172A' }}>
      {/* Header */}
      <div className="border-b p-8" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
        <Link href="/demo/outreach">
          <button className="flex items-center gap-2 px-3 py-1 rounded-lg text-sm mb-4 transition-colors hover:opacity-80" style={{ backgroundColor: '#334155', color: '#06B6D4' }}>
            <ArrowLeft className="w-4 h-4" />
            Back to Outreach
          </button>
        </Link>
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold flex items-center gap-3" style={{ color: '#FFFFFF' }}>
              <div
                className="p-2 rounded-lg"
                style={{
                  background: 'linear-gradient(135deg, #06B6D4 0%, #8B5CF6 100%)',
                }}
              >
                <Lightbulb className="w-6 h-6" style={{ color: '#FFFFFF' }} />
              </div>
              AI Outreach Copilot
            </h1>
            <p style={{ color: '#94A3B8' }} className="text-lg mt-2">
              Intelligent insights and actionable recommendations for relationship management
            </p>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="p-3 rounded-lg" style={{ backgroundColor: '#0F172A' }}>
            <p style={{ color: '#94A3B8' }} className="text-sm mb-1">
              Total Insights
            </p>
            <p style={{ color: '#FFFFFF' }} className="text-2xl font-bold">
              {recommendations.length}
            </p>
          </div>
          <div
            className="p-3 rounded-lg border-l-4"
            style={{
              backgroundColor: '#0F172A',
              borderColor: '#EF4444',
            }}
          >
            <p style={{ color: '#94A3B8' }} className="text-sm mb-1">
              High Priority
            </p>
            <p style={{ color: '#EF4444' }} className="text-2xl font-bold">
              {recommendations.filter(r => r.priority === 'high').length}
            </p>
          </div>
          <div
            className="p-3 rounded-lg border-l-4"
            style={{
              backgroundColor: '#0F172A',
              borderColor: '#F59E0B',
            }}
          >
            <p style={{ color: '#94A3B8' }} className="text-sm mb-1">
              Medium Priority
            </p>
            <p style={{ color: '#F59E0B' }} className="text-2xl font-bold">
              {recommendations.filter(r => r.priority === 'medium').length}
            </p>
          </div>
          <div
            className="p-3 rounded-lg border-l-4"
            style={{
              backgroundColor: '#0F172A',
              borderColor: '#10B981',
            }}
          >
            <p style={{ color: '#94A3B8' }} className="text-sm mb-1">
              Action Items
            </p>
            <p style={{ color: '#10B981' }} className="text-2xl font-bold">
              8
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="space-y-4">
          {recommendations.map(rec => {
            const Icon = getIcon(rec.type)
            return (
              <div
                key={rec.id}
                className="p-4 rounded-lg border-l-4 transition-all hover:shadow-lg"
                style={{
                  backgroundColor: getBgColor(rec.priority),
                  borderTopColor: '#334155',
                  borderRightColor: '#334155',
                  borderBottomColor: '#334155',
                  borderLeftColor: getBorderColor(rec.priority),
                }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: `${getTextColor(rec.priority)}20`,
                    }}
                  >
                    <Icon className="w-6 h-6" style={{ color: getTextColor(rec.priority) }} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <h3 className="font-semibold text-lg" style={{ color: '#FFFFFF' }}>
                        {rec.title}
                      </h3>
                      <span
                        className="text-xs px-2 py-1 rounded capitalize flex-shrink-0"
                        style={{
                          backgroundColor: `${getTextColor(rec.priority)}40`,
                          color: getTextColor(rec.priority),
                        }}
                      >
                        {rec.priority}
                      </span>
                    </div>

                    <p style={{ color: '#94A3B8' }} className="text-sm mb-3">
                      {rec.message}
                    </p>

                    <div className="flex items-center justify-between">
                      <p style={{ color: '#64748B' }} className="text-xs">
                        {rec.insight}
                      </p>

                      <button
                        className="px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 flex-shrink-0"
                        style={{
                          backgroundColor: getTextColor(rec.priority),
                          color: '#0F172A',
                        }}
                      >
                        {rec.action}
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* AI Insights Panel */}
        <div className="mt-8 p-6 rounded-lg border" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: '#FFFFFF' }}>
            <Lightbulb className="w-5 h-5" style={{ color: '#06B6D4' }} />
            AI Insights Summary
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 rounded-lg" style={{ backgroundColor: '#0F172A' }}>
              <p style={{ color: '#94A3B8' }} className="text-sm mb-2">
                Relationship Health Overview
              </p>
              <p style={{ color: '#FFFFFF' }}>
                4 high-performing partners, 2 at-risk relationships requiring intervention, and 2 growth opportunities identified.
              </p>
            </div>

            <div className="p-3 rounded-lg" style={{ backgroundColor: '#0F172A' }}>
              <p style={{ color: '#94A3B8' }} className="text-sm mb-2">
                Recommended Actions
              </p>
              <p style={{ color: '#FFFFFF' }}>
                Focus on re-engagement of declining contacts this week. Prioritize authorization renewals by January 31.
              </p>
            </div>

            <div className="p-3 rounded-lg" style={{ backgroundColor: '#0F172A' }}>
              <p style={{ color: '#94A3B8' }} className="text-sm mb-2">
                Campaign Performance
              </p>
              <p style={{ color: '#FFFFFF' }}>
                Q1 campaign performing above targets. Consider expanding email channel which shows 72% response rate.
              </p>
            </div>

            <div className="p-3 rounded-lg" style={{ backgroundColor: '#0F172A' }}>
              <p style={{ color: '#94A3B8' }} className="text-sm mb-2">
                Next Week Forecast
              </p>
              <p style={{ color: '#FFFFFF' }}>
                7 follow-ups due, 2 authorizations expiring soon, and 3 strategic meetings recommended.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
