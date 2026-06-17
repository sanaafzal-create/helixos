'use client'

export interface AIInsight {
  id: string
  type: 'case' | 'provider' | 'member' | 'outreach' | 'operational'
  category: string
  title: string
  description: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  confidence: number
  businessImpact: string
  recommendedAction: string
  relatedRecords: Array<{
    type: string
    id: string
    name: string
  }>
  priority: number
  createdAt: Date
  dismissed: boolean
  tags: string[]
}

export interface PredictiveMetric {
  label: string
  value: number
  trend: 'up' | 'down' | 'stable'
  forecastedValue: number
  timeframe: string
}

export interface AIActivityFeed {
  id: string
  type: 'insight' | 'alert' | 'classification' | 'detection'
  title: string
  timestamp: Date
  impact: 'high' | 'medium' | 'low'
  details: string
}

// AI Insights Database
const caseInsights: AIInsight[] = [
  {
    id: 'insight_001',
    type: 'case',
    category: 'Case Intelligence',
    title: 'Stalled Case Detected',
    description: 'Case HX-2847 has not been updated in 28 days. Last activity was on May 20, 2024.',
    severity: 'high',
    confidence: 0.94,
    businessImpact: 'Case may be at risk of service delay',
    recommendedAction: 'Contact assigned case manager to update status and next steps',
    relatedRecords: [
      { type: 'case', id: 'HX-2847', name: 'Case HX-2847' },
      { type: 'member', id: 'mem_045', name: 'Patricia Johnson' },
    ],
    priority: 1,
    createdAt: new Date('2024-06-17'),
    dismissed: false,
    tags: ['stalled', 'urgent', 'update-needed'],
  },
  {
    id: 'insight_002',
    type: 'case',
    category: 'Case Intelligence',
    title: 'Missing Documentation',
    description: 'Case HX-1923 is missing required authorization documentation from Blue Cross. Authorization cannot be processed without these files.',
    severity: 'critical',
    confidence: 1.0,
    businessImpact: 'Authorization blocked - service delivery at risk',
    recommendedAction: 'Request missing documentation from provider. Update authorization status.',
    relatedRecords: [
      { type: 'case', id: 'HX-1923', name: 'Case HX-1923' },
      { type: 'provider', id: 'prov_012', name: 'Blue Cross' },
    ],
    priority: 0,
    createdAt: new Date('2024-06-17'),
    dismissed: false,
    tags: ['critical', 'documentation', 'blocking'],
  },
  {
    id: 'insight_003',
    type: 'case',
    category: 'Case Intelligence',
    title: 'Potential Duplicate Case',
    description: 'Case HX-3001 appears to be a duplicate of Case HX-2998. Both cases involve the same member (James Smith) with identical service requests.',
    severity: 'medium',
    confidence: 0.87,
    businessImpact: 'Duplicate efforts and billing discrepancies',
    recommendedAction: 'Review both cases and consolidate if appropriate. Close duplicate.',
    relatedRecords: [
      { type: 'case', id: 'HX-3001', name: 'Case HX-3001' },
      { type: 'case', id: 'HX-2998', name: 'Case HX-2998' },
      { type: 'member', id: 'mem_032', name: 'James Smith' },
    ],
    priority: 2,
    createdAt: new Date('2024-06-16'),
    dismissed: false,
    tags: ['duplicate', 'member-duplicate', 'consolidation'],
  },
  {
    id: 'insight_004',
    type: 'case',
    category: 'Case Intelligence',
    title: 'Authorization Expiration Alert',
    description: 'Case HX-2654 authorization expires in 9 days (June 26, 2024). Renewal process should begin immediately.',
    severity: 'high',
    confidence: 0.99,
    businessImpact: 'Service interruption risk if renewal is delayed',
    recommendedAction: 'Initiate renewal process with insurer. Schedule follow-up with member.',
    relatedRecords: [
      { type: 'case', id: 'HX-2654', name: 'Case HX-2654' },
      { type: 'member', id: 'mem_056', name: 'Michael Chen' },
    ],
    priority: 1,
    createdAt: new Date('2024-06-17'),
    dismissed: false,
    tags: ['expiration', 'renewal', 'time-sensitive'],
  },
  {
    id: 'insight_005',
    type: 'case',
    category: 'Case Intelligence',
    title: 'Case Completion Prediction',
    description: 'Based on current progress, Case HX-2156 is predicted to complete on July 2, 2024 (78% confidence). Current trajectory suggests 3-week timeline.',
    severity: 'low',
    confidence: 0.78,
    businessImpact: 'Helps with resource planning and forecasting',
    recommendedAction: 'Update stakeholders on expected completion date',
    relatedRecords: [{ type: 'case', id: 'HX-2156', name: 'Case HX-2156' }],
    priority: 4,
    createdAt: new Date('2024-06-17'),
    dismissed: false,
    tags: ['prediction', 'analytics', 'planning'],
  },
]

const providerInsights: AIInsight[] = [
  {
    id: 'insight_006',
    type: 'provider',
    category: 'Provider Intelligence',
    title: 'Provider Engagement Drop',
    description: 'Engagement with Blue Cross has declined 31% this month compared to May. Referral volume has decreased from 24 to 18 cases.',
    severity: 'high',
    confidence: 0.96,
    businessImpact: 'Potential loss of revenue and market share',
    recommendedAction: 'Schedule relationship review call with Blue Cross leadership. Identify issues.',
    relatedRecords: [{ type: 'provider', id: 'prov_001', name: 'Blue Cross' }],
    priority: 1,
    createdAt: new Date('2024-06-15'),
    dismissed: false,
    tags: ['engagement-drop', 'relationship', 'revenue-risk'],
  },
  {
    id: 'insight_007',
    type: 'provider',
    category: 'Provider Intelligence',
    title: 'High-Performing Provider Opportunity',
    description: 'Aetna has demonstrated exceptional performance with 94% case resolution rate. Opportunity to expand partnership and increase referral volume.',
    severity: 'low',
    confidence: 0.91,
    businessImpact: 'Revenue growth opportunity - estimated $150k potential',
    recommendedAction: 'Schedule expansion meeting with Aetna. Discuss volume commitments.',
    relatedRecords: [{ type: 'provider', id: 'prov_015', name: 'Aetna' }],
    priority: 3,
    createdAt: new Date('2024-06-16'),
    dismissed: false,
    tags: ['opportunity', 'high-performer', 'growth'],
  },
  {
    id: 'insight_008',
    type: 'provider',
    category: 'Provider Intelligence',
    title: 'Inactivity Alert',
    description: 'United Healthcare has not submitted any referrals in 45 days. No communication recorded since May 2024.',
    severity: 'medium',
    confidence: 0.88,
    businessImpact: 'Relationship may be at risk',
    recommendedAction: 'Send outreach email. Schedule check-in call within 48 hours.',
    relatedRecords: [{ type: 'provider', id: 'prov_008', name: 'United Healthcare' }],
    priority: 2,
    createdAt: new Date('2024-06-17'),
    dismissed: false,
    tags: ['inactivity', 'outreach', 'relationship-risk'],
  },
  {
    id: 'insight_009',
    type: 'provider',
    category: 'Provider Intelligence',
    title: 'Market Coverage Gap',
    description: 'California market shows 23% coverage gap with only 2 active providers. Opportunity to recruit 1-2 new providers.',
    severity: 'medium',
    confidence: 0.83,
    businessImpact: 'Competitive disadvantage in growing market',
    recommendedAction: 'Initiate provider recruitment for CA market.',
    relatedRecords: [
      { type: 'provider', id: 'prov_003', name: 'Cigna' },
      { type: 'provider', id: 'prov_018', name: 'Oscar Health' },
    ],
    priority: 2,
    createdAt: new Date('2024-06-14'),
    dismissed: false,
    tags: ['market-gap', 'expansion', 'recruitment'],
  },
]

const memberInsights: AIInsight[] = [
  {
    id: 'insight_010',
    type: 'member',
    category: 'Member Intelligence',
    title: 'Missing Required Documents',
    description: 'Member HX-M-5623 (Sarah Williams) is missing 3 required documents: insurance card, authorization form, and medical history.',
    severity: 'high',
    confidence: 0.99,
    businessImpact: 'Case processing delayed - service delivery at risk',
    recommendedAction: 'Send document request to member. Follow up in 48 hours.',
    relatedRecords: [{ type: 'member', id: 'mem_078', name: 'Sarah Williams' }],
    priority: 1,
    createdAt: new Date('2024-06-17'),
    dismissed: false,
    tags: ['documentation', 'blocking', 'member-action'],
  },
  {
    id: 'insight_011',
    type: 'member',
    category: 'Member Intelligence',
    title: 'Authorization Expires Soon',
    description: 'Member HX-M-3456 (David Martinez) has 4 authorizations expiring within 14 days. Renewal must begin immediately.',
    severity: 'critical',
    confidence: 0.99,
    businessImpact: 'Service interruption imminent if renewals not processed',
    recommendedAction: 'Batch process all 4 renewal requests immediately. Notify member of upcoming changes.',
    relatedRecords: [{ type: 'member', id: 'mem_089', name: 'David Martinez' }],
    priority: 0,
    createdAt: new Date('2024-06-17'),
    dismissed: false,
    tags: ['critical', 'expiration', 'renewal-needed'],
  },
  {
    id: 'insight_012',
    type: 'member',
    category: 'Member Intelligence',
    title: 'High-Risk Member Alert',
    description: 'Member HX-M-7823 (Jennifer Lee) shows high-risk indicators: 3 active cases, 2 pending authorizations, and no contact for 12 days.',
    severity: 'high',
    confidence: 0.92,
    businessImpact: 'Requires intensive care coordination',
    recommendedAction: 'Assign dedicated case manager. Schedule comprehensive care review.',
    relatedRecords: [{ type: 'member', id: 'mem_124', name: 'Jennifer Lee' }],
    priority: 1,
    createdAt: new Date('2024-06-16'),
    dismissed: false,
    tags: ['high-risk', 'care-coordination', 'intensive-management'],
  },
  {
    id: 'insight_013',
    type: 'member',
    category: 'Member Intelligence',
    title: 'Service Gap Detected',
    description: 'Member HX-M-4501 shows potential gap in mental health services. Current member profile indicates need not being met.',
    severity: 'medium',
    confidence: 0.76,
    businessImpact: 'Member health outcomes at risk',
    recommendedAction: 'Review member record. Schedule outreach to discuss service options.',
    relatedRecords: [{ type: 'member', id: 'mem_102', name: 'Robert Thompson' }],
    priority: 2,
    createdAt: new Date('2024-06-15'),
    dismissed: false,
    tags: ['service-gap', 'mental-health', 'outcomes'],
  },
]

const outreachInsights: AIInsight[] = [
  {
    id: 'insight_014',
    type: 'outreach',
    category: 'Outreach Intelligence',
    title: 'Communication Gap',
    description: 'Provider "Blue Cross" has received no outreach communication in 32 days. Response rate has dropped 18% compared to average.',
    severity: 'medium',
    confidence: 0.89,
    businessImpact: 'Relationship engagement declining',
    recommendedAction: 'Schedule provider relationship call. Discuss partnership status.',
    relatedRecords: [{ type: 'provider', id: 'prov_001', name: 'Blue Cross' }],
    priority: 2,
    createdAt: new Date('2024-06-17'),
    dismissed: false,
    tags: ['communication-gap', 'provider-relations', 'outreach'],
  },
  {
    id: 'insight_015',
    type: 'outreach',
    category: 'Outreach Intelligence',
    title: 'Follow-Up Effectiveness Analysis',
    description: 'Email follow-ups show 28% response rate vs. 45% for phone calls. Phone outreach is 1.6x more effective.',
    severity: 'low',
    confidence: 0.94,
    businessImpact: 'Operational efficiency improvement opportunity',
    recommendedAction: 'Shift 30% of email campaigns to phone calls. Update outreach strategy.',
    relatedRecords: [],
    priority: 3,
    createdAt: new Date('2024-06-16'),
    dismissed: false,
    tags: ['analytics', 'optimization', 'strategy'],
  },
  {
    id: 'insight_016',
    type: 'outreach',
    category: 'Outreach Intelligence',
    title: 'Campaign Performance Alert',
    description: 'June provider engagement campaign is underperforming. Current engagement rate is 18% vs. 24% goal. Gap: 6 percentage points.',
    severity: 'medium',
    confidence: 0.91,
    businessImpact: 'Campaign may miss quarterly targets',
    recommendedAction: 'Review campaign messaging. Adjust target audience or call strategy.',
    relatedRecords: [],
    priority: 2,
    createdAt: new Date('2024-06-17'),
    dismissed: false,
    tags: ['campaign', 'performance', 'underperforming'],
  },
]

const operationalInsights: AIInsight[] = [
  {
    id: 'insight_017',
    type: 'operational',
    category: 'Operational Intelligence',
    title: 'Team Capacity Alert',
    description: 'Team A is operating at 94% capacity with 8 open cases per person. Recommend workload rebalancing or staffing addition.',
    severity: 'high',
    confidence: 0.88,
    businessImpact: 'Team burnout risk - quality and delivery at risk',
    recommendedAction: 'Redistribute 3 cases to Team B. Consider temporary staffing.',
    relatedRecords: [],
    priority: 1,
    createdAt: new Date('2024-06-17'),
    dismissed: false,
    tags: ['workload', 'capacity', 'staffing'],
  },
  {
    id: 'insight_018',
    type: 'operational',
    category: 'Operational Intelligence',
    title: 'Process Bottleneck Detected',
    description: 'Case processing time increased 24% this month. Average time: 8.2 days vs. 6.6 days last month. Bottleneck: Authorization delays.',
    severity: 'high',
    confidence: 0.93,
    businessImpact: 'Member satisfaction declining - service delays increasing',
    recommendedAction: 'Investigate authorization process. Increase provider contact frequency.',
    relatedRecords: [],
    priority: 1,
    createdAt: new Date('2024-06-16'),
    dismissed: false,
    tags: ['process', 'bottleneck', 'efficiency'],
  },
  {
    id: 'insight_019',
    type: 'operational',
    category: 'Operational Intelligence',
    title: 'Performance Trend Analysis',
    description: 'Case completion rate trending downward: June 87%, May 91%, April 94%. Rate of decline: 3-4% per month.',
    severity: 'high',
    confidence: 0.87,
    businessImpact: 'Concerning trend requires immediate investigation',
    recommendedAction: 'Conduct team performance review. Identify root causes. Implement corrective action.',
    relatedRecords: [],
    priority: 1,
    createdAt: new Date('2024-06-14'),
    dismissed: false,
    tags: ['trend', 'performance', 'declining'],
  },
  {
    id: 'insight_020',
    type: 'operational',
    category: 'Operational Intelligence',
    title: 'Staffing Recommendation',
    description: 'Based on growth trajectory, recommend adding 2 full-time staff members by Q3. Projected workload will exceed current capacity by 18%.',
    severity: 'medium',
    confidence: 0.82,
    businessImpact: 'Proactive staffing needed to maintain service quality',
    recommendedAction: 'Begin recruitment process. Prepare Q3 hiring plan.',
    relatedRecords: [],
    priority: 3,
    createdAt: new Date('2024-06-15'),
    dismissed: false,
    tags: ['staffing', 'planning', 'growth'],
  },
]

export function getAllAIInsights(): AIInsight[] {
  return [
    ...caseInsights,
    ...providerInsights,
    ...memberInsights,
    ...outreachInsights,
    ...operationalInsights,
  ].sort((a, b) => a.priority - b.priority)
}

export function getInsightsByType(type: AIInsight['type']): AIInsight[] {
  return getAllAIInsights().filter(i => i.type === type)
}

export function getCriticalInsights(): AIInsight[] {
  return getAllAIInsights().filter(i => i.severity === 'critical' && !i.dismissed)
}

export function getAIPredictions(): PredictiveMetric[] {
  return [
    {
      label: 'Case Completion Rate',
      value: 87,
      trend: 'down',
      forecastedValue: 81,
      timeframe: '30 days',
    },
    {
      label: 'Member Satisfaction Score',
      value: 7.8,
      trend: 'down',
      forecastedValue: 7.4,
      timeframe: '30 days',
    },
    {
      label: 'Authorization Success Rate',
      value: 92,
      trend: 'stable',
      forecastedValue: 92,
      timeframe: '30 days',
    },
    {
      label: 'Team Capacity (Team A)',
      value: 94,
      trend: 'up',
      forecastedValue: 98,
      timeframe: '14 days',
    },
    {
      label: 'Provider Engagement Score',
      value: 76,
      trend: 'down',
      forecastedValue: 71,
      timeframe: '30 days',
    },
    {
      label: 'Average Case Duration (days)',
      value: 8.2,
      trend: 'up',
      forecastedValue: 8.9,
      timeframe: '30 days',
    },
  ]
}

export function getActivityFeed(): AIActivityFeed[] {
  return [
    {
      id: 'feed_001',
      type: 'alert',
      title: 'Critical: Authorization Documentation Missing',
      timestamp: new Date('2024-06-17T14:32:00'),
      impact: 'high',
      details: 'Case HX-1923 blocked - Blue Cross documents required',
    },
    {
      id: 'feed_002',
      type: 'insight',
      title: 'Provider Engagement Declined',
      timestamp: new Date('2024-06-17T13:15:00'),
      impact: 'high',
      details: 'Blue Cross referrals down 31% - Relationship review recommended',
    },
    {
      id: 'feed_003',
      type: 'detection',
      title: 'Duplicate Case Detected',
      timestamp: new Date('2024-06-17T12:48:00'),
      impact: 'medium',
      details: 'Cases HX-3001 and HX-2998 appear to be duplicates',
    },
    {
      id: 'feed_004',
      type: 'classification',
      title: 'Case Auto-Classified',
      timestamp: new Date('2024-06-17T11:22:00'),
      impact: 'low',
      details: 'Case HX-3045 classified as "High Priority" based on member profile',
    },
    {
      id: 'feed_005',
      type: 'alert',
      title: 'Team A Capacity Alert',
      timestamp: new Date('2024-06-17T10:15:00'),
      impact: 'high',
      details: 'Team A at 94% capacity - 8 cases per person',
    },
    {
      id: 'feed_006',
      type: 'insight',
      title: 'Process Bottleneck: Authorization Delays',
      timestamp: new Date('2024-06-16T15:42:00'),
      impact: 'high',
      details: 'Case processing time up 24% - Authorization delays identified',
    },
    {
      id: 'feed_007',
      type: 'insight',
      title: 'High-Performer Opportunity',
      timestamp: new Date('2024-06-16T14:20:00'),
      impact: 'medium',
      details: 'Aetna showing exceptional 94% resolution rate - expansion opportunity',
    },
    {
      id: 'feed_008',
      type: 'detection',
      title: 'Service Gap Identified',
      timestamp: new Date('2024-06-16T09:55:00'),
      impact: 'medium',
      details: 'Member HX-M-4501 missing mental health services',
    },
  ]
}
