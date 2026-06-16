'use client'

import { Zap, Database, Brain, AlertCircle } from 'lucide-react'

export default function DemoAIOpsPage() {
  return (
    <div style={{ backgroundColor: '#0F172A' }} className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2" style={{ color: '#FFFFFF' }}>
          AI Operations Center
        </h1>
        <p style={{ color: '#94A3B8' }}>
          Leverage AI-powered insights for smarter case management
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-lg border" style={{ backgroundColor: '#1E293B', borderColor: '#334155' }}>
          <div className="flex items-start gap-4 mb-4">
            <Brain className="w-8 h-8" style={{ color: '#06B6D4' }} />
            <div>
              <h3 style={{ color: '#FFFFFF' }} className="text-lg font-bold">
                Predictive Analytics
              </h3>
              <p style={{ color: '#94A3B8' }} className="text-sm mt-1">
                Identify high-risk members before intervention needed
              </p>
            </div>
          </div>
          <ul style={{ color: '#94A3B8' }} className="space-y-2 text-sm">
            <li>• 47 members flagged as high-risk this week</li>
            <li>• 23 interventions recommended</li>
            <li>• 91.2% accuracy rate on predictions</li>
          </ul>
        </div>

        <div className="p-6 rounded-lg border" style={{ backgroundColor: '#1E293B', borderColor: '#334155' }}>
          <div className="flex items-start gap-4 mb-4">
            <Zap className="w-8 h-8" style={{ color: '#10B981' }} />
            <div>
              <h3 style={{ color: '#FFFFFF' }} className="text-lg font-bold">
                Smart Recommendations
              </h3>
              <p style={{ color: '#94A3B8' }} className="text-sm mt-1">
                AI-suggested actions for optimal care coordination
              </p>
            </div>
          </div>
          <ul style={{ color: '#94A3B8' }} className="space-y-2 text-sm">
            <li>• 12 provider referrals suggested</li>
            <li>• 34 member education materials recommended</li>
            <li>• 8 potential care gaps identified</li>
          </ul>
        </div>

        <div className="p-6 rounded-lg border" style={{ backgroundColor: '#1E293B', borderColor: '#334155' }}>
          <div className="flex items-start gap-4 mb-4">
            <Database className="w-8 h-8" style={{ color: '#F59E0B' }} />
            <div>
              <h3 style={{ color: '#FFFFFF' }} className="text-lg font-bold">
                Pattern Recognition
              </h3>
              <p style={{ color: '#94A3B8' }} className="text-sm mt-1">
                Discover trends and insights in your population health data
              </p>
            </div>
          </div>
          <ul style={{ color: '#94A3B8' }} className="space-y-2 text-sm">
            <li>• Top 5 comorbidities identified</li>
            <li>• Seasonal readmission patterns detected</li>
            <li>• Provider performance correlations analyzed</li>
          </ul>
        </div>

        <div className="p-6 rounded-lg border" style={{ backgroundColor: '#1E293B', borderColor: '#334155' }}>
          <div className="flex items-start gap-4 mb-4">
            <AlertCircle className="w-8 h-8" style={{ color: '#EF4444' }} />
            <div>
              <h3 style={{ color: '#FFFFFF' }} className="text-lg font-bold">
                Risk Alerts
              </h3>
              <p style={{ color: '#94A3B8' }} className="text-sm mt-1">
                Real-time notifications for critical care events
              </p>
            </div>
          </div>
          <ul style={{ color: '#94A3B8' }} className="space-y-2 text-sm">
            <li>• 3 emergency alerts this week</li>
            <li>• 19 follow-up reminders sent</li>
            <li>• 100% response rate on critical alerts</li>
          </ul>
        </div>
      </div>

      <div className="mt-8 p-6 rounded-lg border" style={{ backgroundColor: '#06B6D420', borderColor: '#06B6D4' }}>
        <p style={{ color: '#06B6D4' }} className="text-sm">
          💡 The AI Operations Center uses machine learning models trained on healthcare outcomes data to provide evidence-based recommendations and proactive care insights.
        </p>
      </div>
    </div>
  )
}
