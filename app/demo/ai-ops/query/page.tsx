'use client'

import { useState } from 'react'
import { Search, Send, CommandIcon, Sparkles } from 'lucide-react'
import { getAllAIInsights } from '@/lib/ai-ops-seeds'

const suggestedQueries = [
  'Show all high-risk cases',
  'Which providers have not been contacted recently?',
  'Which authorizations expire this month?',
  'Show members missing required documents',
  'Identify stalled cases',
  'What is the current team capacity status?',
  'Show high-performing providers',
  'List all critical alerts',
]

export default function AIQueryCenterPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any | null>(null)
  const allInsights = getAllAIInsights()

  const handleQuery = (q: string) => {
    setQuery(q)
    // Simulate query execution
    const lowerQuery = q.toLowerCase()
    
    let queryResults = {
      query: q,
      executedAt: new Date(),
      resultCount: 0,
      insights: [] as any[],
    }

    if (lowerQuery.includes('high-risk')) {
      queryResults.insights = allInsights.filter(i => i.severity === 'high' || i.severity === 'critical')
    } else if (lowerQuery.includes('provider') && lowerQuery.includes('not been contacted')) {
      queryResults.insights = allInsights.filter(i => i.type === 'provider' && i.description.toLowerCase().includes('inactivity'))
    } else if (lowerQuery.includes('authorization') && lowerQuery.includes('expire')) {
      queryResults.insights = allInsights.filter(i => i.description.toLowerCase().includes('expir'))
    } else if (lowerQuery.includes('missing') && lowerQuery.includes('document')) {
      queryResults.insights = allInsights.filter(i => i.description.toLowerCase().includes('missing'))
    } else if (lowerQuery.includes('stalled')) {
      queryResults.insights = allInsights.filter(i => i.title.toLowerCase().includes('stalled'))
    } else if (lowerQuery.includes('capacity')) {
      queryResults.insights = allInsights.filter(i => i.description.toLowerCase().includes('capacity'))
    } else if (lowerQuery.includes('high-performing')) {
      queryResults.insights = allInsights.filter(i => i.description.toLowerCase().includes('high-performing') || i.description.toLowerCase().includes('exceptional'))
    } else if (lowerQuery.includes('critical')) {
      queryResults.insights = allInsights.filter(i => i.severity === 'critical')
    } else {
      queryResults.insights = allInsights.slice(0, 5)
    }

    queryResults.resultCount = queryResults.insights.length
    setResults(queryResults)
  }

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#0F172A' }}>
      {/* Header */}
      <div className="border-b p-8" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
        <div>
          <h1 className="text-4xl font-bold mb-2" style={{ color: '#FFFFFF' }}>
            AI Query Center
          </h1>
          <p style={{ color: '#94A3B8' }} className="text-lg">
            Natural language search for intelligent insights and recommendations
          </p>
        </div>
      </div>

      <div className="p-8">
        {/* Query Input */}
        <div className="mb-8 max-w-3xl mx-auto">
          <div className="p-6 rounded-lg border" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
            <div className="flex items-center gap-3 mb-4">
              <CommandIcon className="w-5 h-5" style={{ color: '#06B6D4' }} />
              <span style={{ color: '#FFFFFF' }} className="font-medium">
                What would you like to know?
              </span>
            </div>

            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: '#94A3B8' }} />
                <input
                  type="text"
                  placeholder="Ask about cases, providers, members, team performance..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleQuery(query)}
                  className="w-full pl-12 pr-4 py-3 rounded-lg border text-base"
                  style={{ backgroundColor: '#0F172A', borderColor: '#475569', color: '#FFFFFF' }}
                />
              </div>
              <button
                onClick={() => handleQuery(query)}
                disabled={!query}
                className="px-4 py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
                style={{ backgroundColor: '#06B6D4', color: '#0F172A' }}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Suggested Queries */}
          {!results && (
            <div className="mt-6">
              <p style={{ color: '#94A3B8' }} className="text-sm font-medium mb-3">
                Try asking:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {suggestedQueries.map((sq, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuery(sq)}
                    className="p-3 rounded-lg border text-left text-sm transition-colors hover:border-blue-400"
                    style={{
                      borderColor: '#334155',
                      backgroundColor: '#1E293B',
                      color: '#94A3B8',
                    }}
                  >
                    <Sparkles className="w-3 h-3 inline mr-2" style={{ color: '#06B6D4' }} />
                    {sq}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        {results && (
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 p-4 rounded-lg border" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
              <div className="flex items-start justify-between">
                <div>
                  <p style={{ color: '#94A3B8' }} className="text-sm">
                    Query Results
                  </p>
                  <p style={{ color: '#FFFFFF' }} className="text-lg font-semibold mt-1">
                    &quot;{results.query}&quot;
                  </p>
                </div>
                <div className="text-right">
                  <p style={{ color: '#94A3B8' }} className="text-sm">
                    Results Found
                  </p>
                  <p className="text-2xl font-bold" style={{ color: '#06B6D4' }}>
                    {results.resultCount}
                  </p>
                </div>
              </div>
            </div>

            {/* Results List */}
            {results.insights.length > 0 ? (
              <div className="space-y-3">
                {results.insights.map((insight: any) => (
                  <div
                    key={insight.id}
                    className="p-4 rounded-lg border"
                    style={{
                      borderColor: '#334155',
                      backgroundColor: '#1E293B',
                    }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className="text-xs px-2 py-1 rounded-full font-medium"
                            style={{
                              backgroundColor: insight.severity === 'critical' ? '#EF444440' : insight.severity === 'high' ? '#F59E0B40' : '#10B98140',
                              color: insight.severity === 'critical' ? '#EF4444' : insight.severity === 'high' ? '#F59E0B' : '#10B981',
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
                        </div>
                        <h3 className="font-semibold mb-1" style={{ color: '#FFFFFF' }}>
                          {insight.title}
                        </h3>
                        <p style={{ color: '#94A3B8' }} className="text-sm mb-2">
                          {insight.description}
                        </p>
                        <p style={{ color: '#06B6D4' }} className="text-sm font-medium">
                          Action: {insight.recommendedAction}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 p-6 rounded-lg border" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
                <p style={{ color: '#94A3B8' }} className="text-lg">
                  No results found. Try a different query.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  )
}
