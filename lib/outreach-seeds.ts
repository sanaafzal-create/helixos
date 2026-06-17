// Comprehensive outreach operations seed data
import { getMembers } from './member-seeds'
import { getProviders } from './provider-seeds'

export interface Contact {
  id: string
  name: string
  email: string
  phone: string
  role: string
  organization: string
  relationshipScore: number
  lastContactDate: string
  preferredCommunication: 'email' | 'phone' | 'sms' | 'meeting'
  engagementTrend: number // -5 to +5
}

export interface CommunicationRecord {
  id: string
  type: 'call' | 'email' | 'sms' | 'meeting'
  direction: 'inbound' | 'outbound'
  contactId: string
  providerId?: string
  memberId?: string
  caseId?: string
  date: string
  duration?: number // in minutes
  subject: string
  summary: string
  outcome: 'positive' | 'neutral' | 'negative' | 'pending'
  nextSteps?: string
  tags: string[]
}

export interface FollowUp {
  id: string
  contactId: string
  communicationId: string
  dueDate: string
  completedDate?: string
  status: 'pending' | 'overdue' | 'completed'
  priority: 'high' | 'medium' | 'low'
  description: string
  assignedTo: string
  action: string
}

export interface Campaign {
  id: string
  name: string
  description: string
  startDate: string
  endDate?: string
  status: 'active' | 'completed' | 'paused'
  targetAudience: {
    type: 'provider' | 'member' | 'contact'
    count: number
  }
  metrics: {
    contactsReached: number
    responseRate: number
    engagementRate: number
    conversionRate: number
  }
}

const contacts: Contact[] = [
  {
    id: 'con_001',
    name: 'Dr. Sarah Johnson',
    email: 'sjohnson@metrohealthclinic.com',
    phone: '(555) 123-4567',
    role: 'Practice Manager',
    organization: 'Metro Health Clinic',
    relationshipScore: 8.5,
    lastContactDate: '2024-01-16',
    preferredCommunication: 'email',
    engagementTrend: 2,
  },
  {
    id: 'con_002',
    name: 'Michael Chen',
    email: 'mchen@cardiacassociates.com',
    phone: '(555) 234-5678',
    role: 'Medical Director',
    organization: 'Cardiac Associates',
    relationshipScore: 9.2,
    lastContactDate: '2024-01-15',
    preferredCommunication: 'phone',
    engagementTrend: 3,
  },
  {
    id: 'con_003',
    name: 'Jennifer Martinez',
    email: 'jmartinez@sunsetmedical.com',
    phone: '(555) 345-6789',
    role: 'Operations Director',
    organization: 'Sunset Medical Group',
    relationshipScore: 7.8,
    lastContactDate: '2024-01-14',
    preferredCommunication: 'email',
    engagementTrend: 1,
  },
  {
    id: 'con_004',
    name: 'David Kumar',
    email: 'dkumar@advancedortho.com',
    phone: '(555) 456-7890',
    role: 'Billing Manager',
    organization: 'Advanced Orthopedics Center',
    relationshipScore: 6.9,
    lastContactDate: '2024-01-10',
    preferredCommunication: 'sms',
    engagementTrend: -1,
  },
  {
    id: 'con_005',
    name: 'Lisa Anderson',
    email: 'landerson@neurologyplus.com',
    phone: '(555) 567-8901',
    role: 'Clinical Coordinator',
    organization: 'Neurology Plus',
    relationshipScore: 8.1,
    lastContactDate: '2024-01-12',
    preferredCommunication: 'email',
    engagementTrend: 4,
  },
  {
    id: 'con_006',
    name: 'Robert Thompson',
    email: 'rthompson@pulmonarysolutions.com',
    phone: '(555) 678-9012',
    role: 'Practice Administrator',
    organization: 'Pulmonary Solutions',
    relationshipScore: 7.4,
    lastContactDate: '2024-01-08',
    preferredCommunication: 'phone',
    engagementTrend: 0,
  },
  {
    id: 'con_007',
    name: 'Patricia Lee',
    email: 'plee@dermatologyexperts.com',
    phone: '(555) 789-0123',
    role: 'Medical Assistant',
    organization: 'Dermatology Experts',
    relationshipScore: 5.6,
    lastContactDate: '2024-01-05',
    preferredCommunication: 'sms',
    engagementTrend: -2,
  },
  {
    id: 'con_008',
    name: 'James Wilson',
    email: 'jwilson@gastroenterologycare.com',
    phone: '(555) 890-1234',
    role: 'Office Manager',
    organization: 'Gastroenterology Care Center',
    relationshipScore: 8.7,
    lastContactDate: '2024-01-17',
    preferredCommunication: 'email',
    engagementTrend: 5,
  },
]

const communicationRecords: CommunicationRecord[] = [
  {
    id: 'comm_001',
    type: 'call',
    direction: 'outbound',
    contactId: 'con_001',
    providerId: 'prov_001',
    date: '2024-01-16',
    duration: 12,
    subject: 'Authorization review discussion',
    summary: 'Discussed recent authorizations and upcoming procedures. Dr. Johnson confirmed next month referrals.',
    outcome: 'positive',
    nextSteps: 'Send authorization summary via email',
    tags: ['authorization', 'provider-relations', 'follow-up-needed'],
  },
  {
    id: 'comm_002',
    type: 'email',
    direction: 'inbound',
    contactId: 'con_002',
    providerId: 'prov_002',
    date: '2024-01-15',
    subject: 'Member referral status',
    summary: 'Inquiry about referral process for new cardiology members. Asked for expedited processing.',
    outcome: 'neutral',
    nextSteps: 'Provide referral timeline documentation',
    tags: ['referral', 'provider-inquiry', 'escalation'],
  },
  {
    id: 'comm_003',
    type: 'meeting',
    direction: 'outbound',
    contactId: 'con_003',
    providerId: 'prov_003',
    date: '2024-01-14',
    duration: 45,
    subject: 'Quarterly business review',
    summary: 'Reviewed relationship metrics, case volumes, and compliance. Discussed strategic partnership opportunities.',
    outcome: 'positive',
    nextSteps: 'Schedule follow-up meeting for Q2',
    tags: ['quarterly-review', 'strategic-discussion', 'high-priority'],
  },
  {
    id: 'comm_004',
    type: 'email',
    direction: 'outbound',
    contactId: 'con_004',
    providerId: 'prov_004',
    date: '2024-01-10',
    subject: 'Outstanding billing issues',
    summary: 'Addressed 3 outstanding invoices from December. Requested payment within 10 days.',
    outcome: 'pending',
    nextSteps: 'Follow up if payment not received by January 20',
    tags: ['billing', 'collections', 'urgent'],
  },
  {
    id: 'comm_005',
    type: 'sms',
    direction: 'outbound',
    contactId: 'con_005',
    providerId: 'prov_005',
    date: '2024-01-12',
    subject: 'Upcoming training reminder',
    summary: 'Reminded about new authorization requirements training session on January 25.',
    outcome: 'positive',
    tags: ['training', 'compliance', 'reminder'],
  },
  {
    id: 'comm_006',
    type: 'call',
    direction: 'inbound',
    contactId: 'con_006',
    providerId: 'prov_006',
    date: '2024-01-08',
    duration: 8,
    subject: 'Network status inquiry',
    summary: 'Asked about current network status and reimbursement rates. Confirmed continued participation.',
    outcome: 'neutral',
    tags: ['network-status', 'provider-inquiry'],
  },
  {
    id: 'comm_007',
    type: 'email',
    direction: 'outbound',
    contactId: 'con_007',
    providerId: 'prov_007',
    date: '2024-01-05',
    subject: 'Reactivation request follow-up',
    summary: 'Third contact attempt regarding network reactivation. No previous response.',
    outcome: 'pending',
    nextSteps: 'Consider escalation if no response by January 20',
    tags: ['reactivation', 'at-risk', 'high-priority'],
  },
  {
    id: 'comm_008',
    type: 'meeting',
    direction: 'outbound',
    contactId: 'con_008',
    providerId: 'prov_008',
    date: '2024-01-17',
    duration: 60,
    subject: 'Strategic partnership expansion',
    summary: 'Discussed expanding services into three new specialty areas. Excellent engagement and enthusiasm.',
    outcome: 'positive',
    nextSteps: 'Prepare proposal for new service offerings',
    tags: ['expansion', 'high-value-partner', 'strategic'],
  },
]

const followUps: FollowUp[] = [
  {
    id: 'fup_001',
    contactId: 'con_001',
    communicationId: 'comm_001',
    dueDate: '2024-01-18',
    status: 'pending',
    priority: 'high',
    description: 'Send authorization summary email to Dr. Johnson',
    assignedTo: 'Sarah Miller',
    action: 'Send email with authorization details',
  },
  {
    id: 'fup_002',
    contactId: 'con_002',
    communicationId: 'comm_002',
    dueDate: '2024-01-18',
    status: 'pending',
    priority: 'medium',
    description: 'Provide referral timeline documentation',
    assignedTo: 'James Chen',
    action: 'Send referral process guide',
  },
  {
    id: 'fup_003',
    contactId: 'con_003',
    communicationId: 'comm_003',
    dueDate: '2024-02-15',
    status: 'pending',
    priority: 'medium',
    description: 'Schedule Q2 quarterly business review',
    assignedTo: 'Amanda Torres',
    action: 'Send calendar invite for Q2 review meeting',
  },
  {
    id: 'fup_004',
    contactId: 'con_004',
    communicationId: 'comm_004',
    dueDate: '2024-01-20',
    status: 'overdue',
    priority: 'high',
    description: 'Follow up on outstanding invoices',
    assignedTo: 'Michael Brooks',
    action: 'Call to confirm payment receipt',
  },
  {
    id: 'fup_005',
    contactId: 'con_007',
    communicationId: 'comm_007',
    dueDate: '2024-01-20',
    status: 'overdue',
    priority: 'high',
    description: 'Escalate reactivation request',
    assignedTo: 'Rachel Green',
    action: 'Escalate to network manager',
  },
  {
    id: 'fup_006',
    contactId: 'con_008',
    communicationId: 'comm_008',
    dueDate: '2024-01-22',
    status: 'pending',
    priority: 'high',
    description: 'Prepare service expansion proposal',
    assignedTo: 'Amanda Torres',
    action: 'Create proposal document and pricing',
  },
]

const campaigns: Campaign[] = [
  {
    id: 'camp_001',
    name: 'Q1 Provider Engagement Initiative',
    description: 'Quarterly outreach to strengthen provider relationships and increase case volume.',
    startDate: '2024-01-01',
    endDate: '2024-03-31',
    status: 'active',
    targetAudience: {
      type: 'provider',
      count: 145,
    },
    metrics: {
      contactsReached: 128,
      responseRate: 0.72,
      engagementRate: 0.65,
      conversionRate: 0.38,
    },
  },
  {
    id: 'camp_002',
    name: 'Authorization Process Optimization',
    description: 'Education campaign on new authorization requirements and streamlined process.',
    startDate: '2024-01-10',
    status: 'active',
    targetAudience: {
      type: 'provider',
      count: 89,
    },
    metrics: {
      contactsReached: 78,
      responseRate: 0.68,
      engagementRate: 0.55,
      conversionRate: 0.42,
    },
  },
  {
    id: 'camp_003',
    name: 'Q4 Member Outreach Program',
    description: 'Comprehensive member engagement campaign for care coordination enrollment.',
    startDate: '2023-10-01',
    endDate: '2023-12-31',
    status: 'completed',
    targetAudience: {
      type: 'member',
      count: 2500,
    },
    metrics: {
      contactsReached: 1847,
      responseRate: 0.58,
      engagementRate: 0.42,
      conversionRate: 0.31,
    },
  },
  {
    id: 'camp_004',
    name: 'High-Risk Member Intervention',
    description: 'Targeted outreach to high-risk members for intensive case management enrollment.',
    startDate: '2024-01-08',
    status: 'active',
    targetAudience: {
      type: 'member',
      count: 312,
    },
    metrics: {
      contactsReached: 245,
      responseRate: 0.75,
      engagementRate: 0.68,
      conversionRate: 0.51,
    },
  },
]

export function getContacts(): Contact[] {
  return contacts
}

export function getContact(id: string): Contact | undefined {
  return contacts.find(c => c.id === id)
}

export function getCommunicationRecords(): CommunicationRecord[] {
  return communicationRecords
}

export function getFollowUps(): FollowUp[] {
  return followUps
}

export function getCampaigns(): Campaign[] {
  return campaigns
}

export function getOutreachMetrics() {
  const thisWeekStart = new Date()
  thisWeekStart.setDate(thisWeekStart.getDate() - thisWeekStart.getDay())

  const calls = communicationRecords.filter(r => r.type === 'call')
  const emails = communicationRecords.filter(r => r.type === 'email')
  const meetings = communicationRecords.filter(r => r.type === 'meeting')
  const sms = communicationRecords.filter(r => r.type === 'sms')

  const overdue = followUps.filter(f => f.status === 'overdue')
  const pending = followUps.filter(f => f.status === 'pending')
  const completed = followUps.filter(f => f.status === 'completed')

  const positiveOutcomes = communicationRecords.filter(r => r.outcome === 'positive')
  const responseRate = communicationRecords.length > 0
    ? ((positiveOutcomes.length / communicationRecords.length) * 100).toFixed(1)
    : '0'

  return {
    activitiesThisWeek: calls.length + emails.length + meetings.length + sms.length,
    callsCompleted: calls.length,
    emailsSent: emails.length,
    meetingsScheduled: meetings.length,
    smsMessages: sms.length,
    followUpsDue: pending.length,
    overdueTasks: overdue.length,
    responseRate: parseFloat(responseRate),
    totalCampaigns: campaigns.filter(c => c.status === 'active').length,
  }
}
