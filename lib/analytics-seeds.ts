export interface KPIData {
  activeCases: number
  closedCases: number
  caseResolutionRate: number
  activeProviders: number
  activeMembers: number
  outreachSuccessRate: number
  teamProductivityScore: number
  aiInsightsGenerated: number
  highRiskCases: number
  openTasks: number
}

export interface CaseAnalytics {
  volumeTrends: { month: string; cases: number; resolved: number }[]
  resolutionTime: number
  openVsClosed: { open: number; closed: number }
  caseAging: { lessThan30: number; days30to60: number; days60to90: number; over90: number }
  highRiskTrends: { month: string; high: number; medium: number; low: number }[]
  caseDistribution: { market: string; count: number }[]
}

export interface ProviderAnalytics {
  performance: { name: string; rating: number; casesManaged: number; completionRate: number }[]
  activity: { name: string; lastActive: string; engagementScore: number }[]
  referralVolume: { provider: string; count: number }[]
  engagementTrends: { month: string; activeProviders: number; engagement: number }[]
  marketCoverage: { market: string; providers: number; coverage: number }[]
  topProviders: { rank: number; name: string; score: number }[]
}

export interface MemberAnalytics {
  memberGrowth: { month: string; active: number; inactive: number; new: number }[]
  activeVsInactive: { active: number; inactive: number }
  serviceUtilization: { service: string; utilization: number }[]
  authorizationStatus: { month: string; approved: number; pending: number; denied: number }[]
  geographicDistribution: { market: string; members: number }[]
  riskDistribution: { high: number; medium: number; low: number }
}

export interface OutreachAnalytics {
  callsCompleted: number
  emailsSent: number
  meetingsScheduled: number
  responseRates: number
  followUpCompletion: number
  campaignPerformance: { campaign: string; reach: number; conversion: number }[]
  conversionFunnels: { stage: string; count: number }[]
  trendChart: { month: string; calls: number; emails: number; meetings: number }[]
}

export interface TeamPerformance {
  workloadDistribution: { manager: string; cases: number; tasks: number }[]
  casesPerManager: number
  taskCompletionRate: number
  productivityMetrics: { metric: string; value: number }[]
  slaPerformance: { metric: string; target: number; actual: number }[]
  teamUtilization: { team: string; utilization: number }[]
}

export interface AIPerformance {
  insightsGenerated: number
  actionsTaken: number
  duplicatesPreventend: number
  timeSaved: number
  riskAlertsTriggered: number
  adoptionMetrics: { metric: string; value: number }[]
}

export interface OperationalIntelligence {
  bottlenecks: { area: string; severity: string; impact: string }[]
  capacityForecast: { period: string; projected: number; capacity: number }[]
  marketPerformance: { market: string; growth: number; efficiency: number }[]
  resourceAllocation: { resource: string; allocated: number; utilized: number }[]
  riskForecasting: { risk: string; probability: number; impact: number }[]
  opportunities: { title: string; potential: string; timeframe: string }[]
}

export interface ExecutiveInsight {
  id: string
  title: string
  impactScore: number
  confidence: number
  action: string
  category: 'performance' | 'risk' | 'opportunity' | 'trend'
  timestamp: Date
}

export function getKPIData(): KPIData {
  return {
    activeCases: 342,
    closedCases: 1847,
    caseResolutionRate: 87.3,
    activeProviders: 128,
    activeMembers: 2456,
    outreachSuccessRate: 76.4,
    teamProductivityScore: 82.1,
    aiInsightsGenerated: 324,
    highRiskCases: 23,
    openTasks: 156,
  }
}

export function getCaseAnalytics(): CaseAnalytics {
  return {
    volumeTrends: [
      { month: 'Jan', cases: 245, resolved: 198 },
      { month: 'Feb', cases: 287, resolved: 241 },
      { month: 'Mar', cases: 312, resolved: 276 },
      { month: 'Apr', cases: 298, resolved: 261 },
      { month: 'May', cases: 334, resolved: 295 },
      { month: 'Jun', cases: 356, resolved: 312 },
    ],
    resolutionTime: 18,
    openVsClosed: { open: 342, closed: 1847 },
    caseAging: { lessThan30: 156, days30to60: 98, days60to90: 54, over90: 34 },
    highRiskTrends: [
      { month: 'Jan', high: 12, medium: 45, low: 188 },
      { month: 'Feb', high: 14, medium: 52, low: 221 },
      { month: 'Mar', high: 18, medium: 58, low: 236 },
      { month: 'Apr', high: 16, medium: 55, low: 227 },
      { month: 'May', high: 22, medium: 68, low: 244 },
      { month: 'Jun', high: 23, medium: 71, low: 262 },
    ],
    caseDistribution: [
      { market: 'Market A', count: 89 },
      { market: 'Market B', count: 74 },
      { market: 'Market C', count: 102 },
      { market: 'Market D', count: 77 },
    ],
  }
}

export function getProviderAnalytics(): ProviderAnalytics {
  return {
    performance: [
      { name: 'Dr. Sarah Chen', rating: 9.2, casesManaged: 67, completionRate: 94 },
      { name: 'Dr. James Wilson', rating: 8.9, casesManaged: 54, completionRate: 91 },
      { name: 'Dr. Lisa Anderson', rating: 8.7, casesManaged: 48, completionRate: 89 },
      { name: 'Dr. Michael Brown', rating: 8.4, casesManaged: 41, completionRate: 86 },
      { name: 'Dr. Emma Davis', rating: 8.1, casesManaged: 35, completionRate: 83 },
    ],
    activity: [
      { name: 'Riverside Medical', lastActive: '2024-06-15', engagementScore: 92 },
      { name: 'Metro Health Center', lastActive: '2024-06-14', engagementScore: 88 },
      { name: 'Community Hospital', lastActive: '2024-06-13', engagementScore: 81 },
    ],
    referralVolume: [
      { provider: 'Dr. Sarah Chen', count: 45 },
      { provider: 'Dr. James Wilson', count: 38 },
      { provider: 'Dr. Lisa Anderson', count: 32 },
      { provider: 'Dr. Michael Brown', count: 28 },
    ],
    engagementTrends: [
      { month: 'Jan', activeProviders: 98, engagement: 71 },
      { month: 'Feb', activeProviders: 105, engagement: 74 },
      { month: 'Mar', activeProviders: 112, engagement: 76 },
      { month: 'Apr', activeProviders: 118, engagement: 78 },
      { month: 'May', activeProviders: 124, engagement: 80 },
      { month: 'Jun', activeProviders: 128, engagement: 82 },
    ],
    marketCoverage: [
      { market: 'Market A', providers: 32, coverage: 95 },
      { market: 'Market B', providers: 28, coverage: 87 },
      { market: 'Market C', providers: 38, coverage: 92 },
      { market: 'Market D', providers: 30, coverage: 89 },
    ],
    topProviders: [
      { rank: 1, name: 'Dr. Sarah Chen', score: 94 },
      { rank: 2, name: 'Dr. James Wilson', score: 91 },
      { rank: 3, name: 'Dr. Lisa Anderson', score: 89 },
      { rank: 4, name: 'Dr. Michael Brown', score: 86 },
      { rank: 5, name: 'Dr. Emma Davis', score: 83 },
    ],
  }
}

export function getMemberAnalytics(): MemberAnalytics {
  return {
    memberGrowth: [
      { month: 'Jan', active: 1856, inactive: 234, new: 87 },
      { month: 'Feb', active: 1923, inactive: 251, new: 94 },
      { month: 'Mar', active: 2012, inactive: 268, new: 102 },
      { month: 'Apr', active: 2098, inactive: 287, new: 98 },
      { month: 'May', active: 2234, inactive: 302, new: 112 },
      { month: 'Jun', active: 2356, inactive: 318, new: 128 },
    ],
    activeVsInactive: { active: 2356, inactive: 318 },
    serviceUtilization: [
      { service: 'Case Management', utilization: 92 },
      { service: 'Care Coordination', utilization: 87 },
      { service: 'Disease Management', utilization: 78 },
      { service: 'Mental Health', utilization: 64 },
      { service: 'Remote Monitoring', utilization: 56 },
    ],
    authorizationStatus: [
      { month: 'Jan', approved: 156, pending: 28, denied: 4 },
      { month: 'Feb', approved: 172, pending: 31, denied: 5 },
      { month: 'Mar', approved: 195, pending: 35, denied: 6 },
      { month: 'Apr', approved: 187, pending: 32, denied: 5 },
      { month: 'May', approved: 218, pending: 38, denied: 7 },
      { month: 'Jun', approved: 234, pending: 41, denied: 8 },
    ],
    geographicDistribution: [
      { market: 'Market A', members: 587 },
      { market: 'Market B', members: 542 },
      { market: 'Market C', members: 623 },
      { market: 'Market D', members: 604 },
    ],
    riskDistribution: { high: 82, medium: 312, low: 1962 },
  }
}

export function getOutreachAnalytics(): OutreachAnalytics {
  return {
    callsCompleted: 1247,
    emailsSent: 2856,
    meetingsScheduled: 342,
    responseRates: 76.4,
    followUpCompletion: 82.1,
    campaignPerformance: [
      { campaign: 'Q2 Outreach Initiative', reach: 1200, conversion: 34 },
      { campaign: 'Member Engagement', reach: 980, conversion: 28 },
      { campaign: 'Provider Collaboration', reach: 450, conversion: 18 },
    ],
    conversionFunnels: [
      { stage: 'Initial Contact', count: 2156 },
      { stage: 'Engagement', count: 1645 },
      { stage: 'Conversion', count: 892 },
      { stage: 'Retention', count: 756 },
    ],
    trendChart: [
      { month: 'Jan', calls: 156, emails: 234, meetings: 45 },
      { month: 'Feb', calls: 189, emails: 267, meetings: 52 },
      { month: 'Mar', calls: 212, emails: 298, meetings: 61 },
      { month: 'Apr', calls: 198, emails: 289, meetings: 57 },
      { month: 'May', calls: 234, emails: 325, meetings: 68 },
      { month: 'Jun', calls: 258, emails: 343, meetings: 59 },
    ],
  }
}

export function getTeamPerformance(): TeamPerformance {
  return {
    workloadDistribution: [
      { manager: 'Manager A', cases: 45, tasks: 62 },
      { manager: 'Manager B', cases: 38, tasks: 54 },
      { manager: 'Manager C', cases: 52, tasks: 71 },
      { manager: 'Manager D', cases: 41, tasks: 58 },
      { manager: 'Manager E', cases: 48, tasks: 67 },
    ],
    casesPerManager: 44.8,
    taskCompletionRate: 84.3,
    productivityMetrics: [
      { metric: 'Cases Closed This Month', value: 87 },
      { metric: 'Avg Resolution Time', value: 18 },
      { metric: 'Quality Score', value: 89 },
      { metric: 'Satisfaction Score', value: 8.7 },
    ],
    slaPerformance: [
      { metric: 'Response Time', target: 24, actual: 18 },
      { metric: 'Resolution Time', target: 30, actual: 18 },
      { metric: 'First Contact Resolution', target: 75, actual: 82 },
    ],
    teamUtilization: [
      { team: 'Team A', utilization: 94 },
      { team: 'Team B', utilization: 87 },
      { team: 'Team C', utilization: 91 },
      { team: 'Team D', utilization: 85 },
    ],
  }
}

export function getAIPerformance(): AIPerformance {
  return {
    insightsGenerated: 324,
    actionsTaken: 287,
    duplicatesPreventend: 45,
    timeSaved: 842,
    riskAlertsTriggered: 23,
    adoptionMetrics: [
      { metric: 'Users Using AI Features', value: 89 },
      { metric: 'Insights Acted Upon', value: 88 },
      { metric: 'Query Accuracy', value: 92 },
      { metric: 'Recommendation Relevance', value: 85 },
    ],
  }
}

export function getOperationalIntelligence(): OperationalIntelligence {
  return {
    bottlenecks: [
      { area: 'Authorization Approvals', severity: 'high', impact: 'Delays case progression by 2-3 days' },
      { area: 'Provider Response Time', severity: 'medium', impact: 'Affects 15% of referrals' },
      { area: 'Document Processing', severity: 'medium', impact: 'Manual processing adds 4 hours per case' },
    ],
    capacityForecast: [
      { period: 'Q3 2024', projected: 412, capacity: 450 },
      { period: 'Q4 2024', projected: 478, capacity: 450 },
      { period: 'Q1 2025', projected: 534, capacity: 450 },
      { period: 'Q2 2025', projected: 612, capacity: 450 },
    ],
    marketPerformance: [
      { market: 'Market A', growth: 12.4, efficiency: 87 },
      { market: 'Market B', growth: 9.2, efficiency: 82 },
      { market: 'Market C', growth: 14.8, efficiency: 91 },
      { market: 'Market D', growth: 11.3, efficiency: 85 },
    ],
    resourceAllocation: [
      { resource: 'Case Managers', allocated: 24, utilized: 22 },
      { resource: 'Care Coordinators', allocated: 18, utilized: 16 },
      { resource: 'Outreach Specialists', allocated: 12, utilized: 11 },
    ],
    riskForecasting: [
      { risk: 'Case Resolution Delays', probability: 65, impact: 78 },
      { risk: 'Provider Engagement Drop', probability: 42, impact: 65 },
      { risk: 'Member Churn', probability: 28, impact: 72 },
    ],
    opportunities: [
      { title: 'Expand Market C Operations', potential: 'High', timeframe: 'Q3 2024' },
      { title: 'Implement Automated Scheduling', potential: 'High', timeframe: 'Q4 2024' },
      { title: 'Launch Telehealth Initiative', potential: 'Medium', timeframe: 'Q4 2024' },
    ],
  }
}

export function getExecutiveInsights(): ExecutiveInsight[] {
  return [
    {
      id: '1',
      title: 'Case resolution time increased by 11% this quarter',
      impactScore: 78,
      confidence: 94,
      action: 'Review authorization approval process for bottlenecks',
      category: 'trend',
      timestamp: new Date('2024-06-15'),
    },
    {
      id: '2',
      title: 'Provider engagement improved 18% in Market C',
      impactScore: 85,
      confidence: 91,
      action: 'Replicate Market C engagement strategies in other markets',
      category: 'opportunity',
      timestamp: new Date('2024-06-14'),
    },
    {
      id: '3',
      title: 'Follow-up completion rates declining in Market A',
      impactScore: 72,
      confidence: 87,
      action: 'Investigate resource allocation issues in Market A team',
      category: 'risk',
      timestamp: new Date('2024-06-13'),
    },
    {
      id: '4',
      title: 'Projected case volume increase of 22% next month',
      impactScore: 88,
      confidence: 82,
      action: 'Plan for hiring or resource reallocation before Q3',
      category: 'trend',
      timestamp: new Date('2024-06-12'),
    },
    {
      id: '5',
      title: 'AI insights adoption reached 89% across teams',
      impactScore: 82,
      confidence: 96,
      action: 'Continue AI training for remaining 11% adoption',
      category: 'performance',
      timestamp: new Date('2024-06-11'),
    },
  ]
}
