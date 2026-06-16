'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { Search, Clock, AlertCircle, MessageSquare, CheckCircle2, Upload, Plus, Phone, Mail, MapPin, Stethoscope, Star, TrendingUp, Lock, Eye, Calendar, User, Tag, FileText, Contact, Activity, ClipboardList, Zap } from 'lucide-react'
import Link from 'next/link'
import { getProviderById } from '@/lib/provider-seeds'

const providerDetailData = {
  contacts: [
    { name: 'Dr. Sarah Johnson', title: 'Physician', email: 'sjohnson@metro.com', phone: '(555) 123-4567', role: 'Primary', lastInteraction: '2024-01-16' },
    { name: 'Jane Smith', title: 'Office Manager', email: 'jsmith@metro.com', phone: '(555) 123-4568', role: 'Scheduling', lastInteraction: '2024-01-14' },
    { name: 'Mike Davis', title: 'Clinical Coordinator', email: 'mdavis@metro.com', phone: '(555) 123-4569', role: 'Cases', lastInteraction: '2024-01-16' },
  ],
  outreachHistory: [
    { date: '2024-01-16', type: 'email', description: 'Sent follow-up on case referral for case CASE-2856', outcome: 'Completed', contact: 'Dr. Sarah Johnson' },
    { date: '2024-01-15', type: 'call', description: 'Phone call regarding new case assignment', outcome: 'Accepted', contact: 'Jane Smith' },
    { date: '2024-01-14', type: 'meeting', description: 'Quarterly provider review meeting', outcome: 'Successful', contact: 'Dr. Sarah Johnson' },
    { date: '2024-01-12', type: 'email', description: 'Shared updated care guidelines', outcome: 'Completed', contact: 'Mike Davis' },
    { date: '2024-01-10', type: 'call', description: 'Discussed patient outcomes', outcome: 'Completed', contact: 'Dr. Sarah Johnson' },
  ],
  relatedCases: [
    { id: 'CASE-2856', member: 'Marcus Williams', status: 'active', priority: 'high', manager: 'Sarah Chen', lastActivity: '2024-01-16' },
    { id: 'CASE-2847', member: 'Jennifer Lee', status: 'active', priority: 'medium', manager: 'Rachel Thompson', lastActivity: '2024-01-15' },
    { id: 'CASE-2834', member: 'Robert Johnson', status: 'closed', priority: 'medium', manager: 'James Wilson', lastActivity: '2024-01-10' },
    { id: 'CASE-2821', member: 'Patricia Brown', status: 'active', priority: 'high', manager: 'Sarah Chen', lastActivity: '2024-01-14' },
    { id: 'CASE-2809', member: 'David Garcia', status: 'pending', priority: 'low', manager: 'Rachel Thompson', lastActivity: '2024-01-16' },
  ],
  notes: [
    { id: 'n1', type: 'general', content: 'Excellent provider with strong patient outcomes. Highly responsive to case requests. Prefers email communication for non-urgent matters.', author: 'Sarah Chen', date: '2024-01-15', restricted: false },
    { id: 'n2', type: 'general', content: 'Recently expanded services to include telemedicine consultations. Can now handle remote follow-ups.', author: 'Rachel Thompson', date: '2024-01-14', restricted: false },
    { id: 'n3', type: 'restricted', content: 'Billing dispute resolved. Provider is now back in good standing with all insurance networks.', author: 'James Wilson', date: '2024-01-12', restricted: true },
  ],
  tasks: [
    { id: 'task_1', title: 'Schedule quarterly business review', dueDate: '2024-02-15', priority: 'high', assignee: 'Sarah Chen', status: 'open' },
    { id: 'task_2', title: 'Review updated service agreements', dueDate: '2024-02-01', priority: 'medium', assignee: 'Rachel Thompson', status: 'open' },
    { id: 'task_3', title: 'Verify credentialing documents', dueDate: '2024-02-28', priority: 'medium', assignee: 'James Wilson', status: 'open' },
  ],
  aiInsights: [
    { type: 'health', title: 'Relationship Health Score', value: '92/100', trend: 'up', description: 'Strong and improving. High case volume, excellent outcomes, responsive communication.' },
    { type: 'engagement', title: 'Engagement Trend', value: 'High', trend: 'up', description: '18 interactions in last 30 days. Above average engagement for provider network.' },
    { type: 'opportunity', title: 'Growth Opportunity', value: 'Expand Services', description: 'Provider indicated capacity to take 15-20% more cases. Recommend targeted referral increase.' },
    { type: 'risk', title: 'Risk Indicator', value: 'None', trend: 'stable', description: 'No quality concerns, billing issues, or compliance gaps detected.' },
  ],
}

export default function ProviderWorkspace() {
  const params = useParams()
  const providerId = params.id as string
  
  const provider = getProviderById(providerId)
  const [selectedTab, setSelectedTab] = useState('overview')
  const [showNoteInput, setShowNoteInput] = useState(false)
  const [newNote, setNewNote] = useState('')
  const [restrictedNote, setRestrictedNote] = useState(false)
  const [showContactModal, setShowContactModal] = useState(false)
  const [showOutreachModal, setShowOutreachModal] = useState(false)
  const [showTaskModal, setShowTaskModal] = useState(false)

  if (!provider) {
    return (
      <main className="min-h-screen" style={{ backgroundColor: '#0F172A' }}>
        <div className="flex items-center justify-center h-screen">
          <p style={{ color: '#94A3B8' }}>Provider not found</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#0F172A' }}>
      {/* Header */}
      <div className="border-b p-6" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2" style={{ color: '#FFFFFF' }}>
              {provider.name}
            </h1>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2" style={{ color: '#94A3B8' }}>
                <Stethoscope className="w-4 h-4" style={{ color: '#06B6D4' }} />
                {provider.specialty}
              </div>
              <div className="flex items-center gap-2" style={{ color: '#94A3B8' }}>
                {provider.organization}
              </div>
              <div className="flex items-center gap-2" style={{ color: '#94A3B8' }}>
                <MapPin className="w-4 h-4" />
                {provider.city}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div
              className="px-3 py-1 rounded-full text-sm font-semibold"
              style={{
                backgroundColor: provider.status === 'active' ? '#06B6D415' : '#64748B15',
                color: provider.status === 'active' ? '#06B6D4' : '#94A3B8',
              }}
            >
              {provider.status === 'active' ? '🟢 Active' : '⚪ Inactive'}
            </div>
            <div className="flex items-center gap-1 px-3 py-1 rounded-full" style={{ backgroundColor: '#F59E0B15', color: '#F59E0B' }}>
              <Star className="w-4 h-4 fill-current" />
              <span>{provider.performanceScore}</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setShowContactModal(true)}
            className="px-3 py-2 rounded-lg text-sm font-medium border hover:opacity-80"
            style={{ borderColor: '#475569', color: '#06B6D4' }}
          >
            <Contact className="w-4 h-4 inline mr-1" /> Add Contact
          </button>
          <button
            onClick={() => setShowOutreachModal(true)}
            className="px-3 py-2 rounded-lg text-sm font-medium border hover:opacity-80"
            style={{ borderColor: '#475569', color: '#06B6D4' }}
          >
            <Phone className="w-4 h-4 inline mr-1" /> Log Outreach
          </button>
          <button
            onClick={() => setShowNoteInput(true)}
            className="px-3 py-2 rounded-lg text-sm font-medium border hover:opacity-80"
            style={{ borderColor: '#475569', color: '#06B6D4' }}
          >
            <MessageSquare className="w-4 h-4 inline mr-1" /> Add Note
          </button>
          <button
            onClick={() => setShowTaskModal(true)}
            className="px-3 py-2 rounded-lg text-sm font-medium border hover:opacity-80"
            style={{ borderColor: '#475569', color: '#06B6D4' }}
          >
            <Plus className="w-4 h-4 inline mr-1" /> Create Task
          </button>
          <button
            className="px-3 py-2 rounded-lg text-sm font-medium border hover:opacity-80"
            style={{ borderColor: '#475569', color: '#06B6D4' }}
          >
            <Eye className="w-4 h-4 inline mr-1" /> View Cases
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-0 z-40 border-b flex gap-8 px-6" style={{ borderColor: '#334155', backgroundColor: '#1E293B80' }}>
        {['overview', 'contacts', 'outreach', 'cases', 'notes', 'tasks', 'ai'].map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className="px-2 py-4 border-b-2 text-sm font-medium transition-colors capitalize"
            style={{
              borderColor: selectedTab === tab ? '#06B6D4' : 'transparent',
              color: selectedTab === tab ? '#06B6D4' : '#94A3B8',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* OVERVIEW TAB */}
        {selectedTab === 'overview' && (
          <div className="grid grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="col-span-2 space-y-6">
              {/* Provider Summary */}
              <div className="border rounded-lg p-6" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
                <h2 className="text-xl font-bold mb-4" style={{ color: '#FFFFFF' }}>
                  Provider Summary
                </h2>
                <p style={{ color: '#FFFFFF' }}>
                  {provider.name} is a highly respected {provider.specialty} provider with expertise across {provider.serviceAreas.join(', ')}. Known for responsive communication and excellent patient outcomes. Currently managing {provider.activeCases} active cases with a performance score of {provider.performanceScore}/5.0.
                </p>
              </div>

              {/* Contact Information */}
              <div className="border rounded-lg p-6" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
                <h2 className="text-xl font-bold mb-4" style={{ color: '#FFFFFF' }}>
                  Contact Information
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 mt-0.5" style={{ color: '#06B6D4' }} />
                    <div>
                      <p style={{ color: '#94A3B8' }} className="text-sm">
                        Email
                      </p>
                      <p style={{ color: '#FFFFFF' }}>{provider.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 mt-0.5" style={{ color: '#06B6D4' }} />
                    <div>
                      <p style={{ color: '#94A3B8' }} className="text-sm">
                        Phone
                      </p>
                      <p style={{ color: '#FFFFFF' }}>{provider.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 mt-0.5" style={{ color: '#06B6D4' }} />
                    <div>
                      <p style={{ color: '#94A3B8' }} className="text-sm">
                        Address
                      </p>
                      <p style={{ color: '#FFFFFF' }}>{provider.city}, {provider.serviceAreas[0]}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Areas */}
              <div className="border rounded-lg p-6" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
                <h2 className="text-xl font-bold mb-4" style={{ color: '#FFFFFF' }}>
                  Service Areas
                </h2>
                <div className="flex flex-wrap gap-2">
                  {provider.serviceAreas.map((area) => (
                    <span
                      key={area}
                      className="px-3 py-1 rounded-full text-sm"
                      style={{ backgroundColor: '#06B6D415', color: '#06B6D4' }}
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Metrics */}
            <div className="space-y-4">
              <div className="border rounded-lg p-4" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
                <p style={{ color: '#94A3B8' }} className="text-sm mb-2">
                  Active Cases
                </p>
                <p className="text-3xl font-bold" style={{ color: '#06B6D4' }}>
                  {provider.activeCases}
                </p>
              </div>

              <div className="border rounded-lg p-4" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
                <p style={{ color: '#94A3B8' }} className="text-sm mb-2">
                  Performance Rating
                </p>
                <div className="flex items-center gap-2">
                  <Star className="w-6 h-6 fill-current" style={{ color: '#F59E0B' }} />
                  <span className="text-3xl font-bold" style={{ color: '#F59E0B' }}>
                    {provider.performanceScore}
                  </span>
                </div>
              </div>

              <div className="border rounded-lg p-4" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
                <p style={{ color: '#94A3B8' }} className="text-sm mb-2">
                  Last Interaction
                </p>
                <p className="text-lg font-semibold" style={{ color: '#FFFFFF' }}>
                  {new Date(provider.lastInteraction).toLocaleDateString()}
                </p>
              </div>

              <div className="border rounded-lg p-4" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
                <p style={{ color: '#94A3B8' }} className="text-sm mb-2">
                  Preferred Contact
                </p>
                <p className="text-lg font-semibold" style={{ color: '#FFFFFF' }}>
                  {provider.preferredContact}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* CONTACTS TAB */}
        {selectedTab === 'contacts' && (
          <div className="space-y-4">
            {providerDetailData.contacts.map((contact) => (
              <div key={contact.email} className="border rounded-lg p-4" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg" style={{ color: '#FFFFFF' }}>
                      {contact.name}
                    </h3>
                    <p style={{ color: '#94A3B8' }} className="text-sm">
                      {contact.title}
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded text-sm" style={{ backgroundColor: '#06B6D415', color: '#06B6D4' }}>
                    {contact.role}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" style={{ color: '#06B6D4' }} />
                    <span style={{ color: '#FFFFFF' }}>{contact.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" style={{ color: '#06B6D4' }} />
                    <span style={{ color: '#FFFFFF' }}>{contact.phone}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* OUTREACH HISTORY TAB */}
        {selectedTab === 'outreach' && (
          <div className="border rounded-lg overflow-hidden" style={{ borderColor: '#334155' }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ backgroundColor: '#1E293B', borderBottomColor: '#334155' }}>
                  <th className="px-6 py-4 text-left font-semibold" style={{ color: '#94A3B8' }}>
                    Date
                  </th>
                  <th className="px-6 py-4 text-left font-semibold" style={{ color: '#94A3B8' }}>
                    Type
                  </th>
                  <th className="px-6 py-4 text-left font-semibold" style={{ color: '#94A3B8' }}>
                    Description
                  </th>
                  <th className="px-6 py-4 text-left font-semibold" style={{ color: '#94A3B8' }}>
                    Contact
                  </th>
                  <th className="px-6 py-4 text-left font-semibold" style={{ color: '#94A3B8' }}>
                    Outcome
                  </th>
                </tr>
              </thead>
              <tbody>
                {providerDetailData.outreachHistory.map((item, idx) => (
                  <tr
                    key={idx}
                    style={{
                      backgroundColor: idx % 2 === 0 ? 'transparent' : '#1E293B40',
                      borderBottomColor: '#334155',
                    }}
                  >
                    <td className="px-6 py-4" style={{ color: '#FFFFFF' }}>
                      {new Date(item.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: '#06B6D415', color: '#06B6D4' }}>
                        {item.type}
                      </span>
                    </td>
                    <td className="px-6 py-4" style={{ color: '#FFFFFF' }}>
                      {item.description}
                    </td>
                    <td className="px-6 py-4" style={{ color: '#94A3B8' }}>
                      {item.contact}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: '#10B98115', color: '#10B981' }}>
                        {item.outcome}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* RELATED CASES TAB */}
        {selectedTab === 'cases' && (
          <div className="border rounded-lg overflow-hidden" style={{ borderColor: '#334155' }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ backgroundColor: '#1E293B', borderBottomColor: '#334155' }}>
                  <th className="px-6 py-4 text-left font-semibold" style={{ color: '#94A3B8' }}>
                    Case ID
                  </th>
                  <th className="px-6 py-4 text-left font-semibold" style={{ color: '#94A3B8' }}>
                    Member
                  </th>
                  <th className="px-6 py-4 text-left font-semibold" style={{ color: '#94A3B8' }}>
                    Status
                  </th>
                  <th className="px-6 py-4 text-left font-semibold" style={{ color: '#94A3B8' }}>
                    Priority
                  </th>
                  <th className="px-6 py-4 text-left font-semibold" style={{ color: '#94A3B8' }}>
                    Manager
                  </th>
                  <th className="px-6 py-4 text-left font-semibold" style={{ color: '#94A3B8' }}>
                    Last Activity
                  </th>
                </tr>
              </thead>
              <tbody>
                {providerDetailData.relatedCases.map((caseItem, idx) => (
                  <tr
                    key={caseItem.id}
                    style={{
                      backgroundColor: idx % 2 === 0 ? 'transparent' : '#1E293B40',
                      borderBottomColor: '#334155',
                    }}
                  >
                    <td className="px-6 py-4">
                      <Link href={`/demo/case-workspace`}>
                        <span style={{ color: '#06B6D4' }} className="hover:underline">
                          {caseItem.id}
                        </span>
                      </Link>
                    </td>
                    <td className="px-6 py-4" style={{ color: '#FFFFFF' }}>
                      {caseItem.member}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="px-2 py-1 rounded text-xs"
                        style={{
                          backgroundColor: caseItem.status === 'active' ? '#06B6D415' : caseItem.status === 'closed' ? '#64748B15' : '#F59E0B15',
                          color: caseItem.status === 'active' ? '#06B6D4' : caseItem.status === 'closed' ? '#94A3B8' : '#F59E0B',
                        }}
                      >
                        {caseItem.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="px-2 py-1 rounded text-xs"
                        style={{
                          backgroundColor: caseItem.priority === 'high' ? '#EF444415' : caseItem.priority === 'medium' ? '#F59E0B15' : '#10B98115',
                          color: caseItem.priority === 'high' ? '#EF4444' : caseItem.priority === 'medium' ? '#F59E0B' : '#10B981',
                        }}
                      >
                        {caseItem.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4" style={{ color: '#FFFFFF' }}>
                      {caseItem.manager}
                    </td>
                    <td className="px-6 py-4" style={{ color: '#94A3B8' }}>
                      {new Date(caseItem.lastActivity).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* NOTES TAB */}
        {selectedTab === 'notes' && (
          <div className="space-y-4">
            {showNoteInput && (
              <div className="border rounded-lg p-4" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Add a note..."
                  className="w-full px-4 py-3 rounded-lg border mb-3 text-sm"
                  rows={4}
                  style={{ backgroundColor: '#0F172A', borderColor: '#475569', color: '#FFFFFF' }}
                />
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={restrictedNote}
                      onChange={(e) => setRestrictedNote(e.target.checked)}
                      className="w-4 h-4"
                    />
                    <span style={{ color: '#94A3B8' }} className="text-sm">
                      Mark as Restricted
                    </span>
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowNoteInput(false)}
                      className="px-4 py-2 rounded-lg border text-sm"
                      style={{ borderColor: '#475569', color: '#94A3B8' }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        setShowNoteInput(false)
                        setNewNote('')
                      }}
                      className="px-4 py-2 rounded-lg text-sm"
                      style={{ backgroundColor: '#06B6D4', color: '#0F172A' }}
                    >
                      Add Note
                    </button>
                  </div>
                </div>
              </div>
            )}

            {providerDetailData.notes.map((note) => (
              <div
                key={note.id}
                className="border rounded-lg p-4"
                style={{
                  borderColor: note.restricted ? '#EF4444' : '#334155',
                  backgroundColor: '#1E293B',
                }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold" style={{ color: '#FFFFFF' }}>
                      {note.author}
                    </p>
                    <p style={{ color: '#94A3B8' }} className="text-sm">
                      {new Date(note.date).toLocaleDateString()}
                    </p>
                  </div>
                  {note.restricted && (
                    <Lock className="w-4 h-4" style={{ color: '#EF4444' }} />
                  )}
                </div>
                <p style={{ color: '#FFFFFF' }}>{note.content}</p>
              </div>
            ))}
          </div>
        )}

        {/* TASKS TAB */}
        {selectedTab === 'tasks' && (
          <div className="space-y-4">
            {providerDetailData.tasks.map((task) => (
              <div key={task.id} className="border rounded-lg p-4" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold" style={{ color: '#FFFFFF' }}>
                      {task.title}
                    </h3>
                    <p style={{ color: '#94A3B8' }} className="text-sm">
                      Assigned to {task.assignee}
                    </p>
                  </div>
                  <span
                    className="px-2 py-1 rounded text-xs"
                    style={{
                      backgroundColor: task.priority === 'high' ? '#EF444415' : '#F59E0B15',
                      color: task.priority === 'high' ? '#EF4444' : '#F59E0B',
                    }}
                  >
                    {task.priority}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" style={{ color: '#06B6D4' }} />
                    <span style={{ color: '#FFFFFF' }}>
                      {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                  <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: '#06B6D415', color: '#06B6D4' }}>
                    {task.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* AI INSIGHTS TAB */}
        {selectedTab === 'ai' && (
          <div className="grid grid-cols-2 gap-6">
            {providerDetailData.aiInsights.map((insight, idx) => (
              <div key={idx} className="border rounded-lg p-6" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className="p-2 rounded-lg"
                    style={{
                      backgroundColor: insight.type === 'health' ? '#06B6D415' : insight.type === 'opportunity' ? '#F59E0B15' : insight.type === 'risk' ? '#EF444415' : '#10B98115',
                    }}
                  >
                    <Zap
                      className="w-5 h-5"
                      style={{
                        color: insight.type === 'health' ? '#06B6D4' : insight.type === 'opportunity' ? '#F59E0B' : insight.type === 'risk' ? '#EF4444' : '#10B981',
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold" style={{ color: '#FFFFFF' }}>
                      {insight.title}
                    </h3>
                    <p
                      className="text-lg font-bold"
                      style={{
                        color: insight.type === 'health' ? '#06B6D4' : insight.type === 'opportunity' ? '#F59E0B' : insight.type === 'risk' ? '#EF4444' : '#10B981',
                      }}
                    >
                      {insight.value}
                    </p>
                  </div>
                </div>
                <p style={{ color: '#94A3B8' }} className="text-sm">
                  {insight.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODALS */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-lg p-6 max-w-md w-full mx-4" style={{ backgroundColor: '#1E293B', borderColor: '#334155', border: '1px solid' }}>
            <h2 className="text-xl font-bold mb-4" style={{ color: '#FFFFFF' }}>
              Add New Contact
            </h2>
            <div className="space-y-4 mb-6">
              <input
                type="text"
                placeholder="Name"
                className="w-full px-4 py-2 rounded-lg border text-sm"
                style={{ backgroundColor: '#0F172A', borderColor: '#475569', color: '#FFFFFF' }}
              />
              <input
                type="text"
                placeholder="Title"
                className="w-full px-4 py-2 rounded-lg border text-sm"
                style={{ backgroundColor: '#0F172A', borderColor: '#475569', color: '#FFFFFF' }}
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 rounded-lg border text-sm"
                style={{ backgroundColor: '#0F172A', borderColor: '#475569', color: '#FFFFFF' }}
              />
              <input
                type="tel"
                placeholder="Phone"
                className="w-full px-4 py-2 rounded-lg border text-sm"
                style={{ backgroundColor: '#0F172A', borderColor: '#475569', color: '#FFFFFF' }}
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowContactModal(false)}
                className="flex-1 px-4 py-2 rounded-lg border text-sm font-medium"
                style={{ borderColor: '#475569', color: '#94A3B8' }}
              >
                Cancel
              </button>
              <button
                onClick={() => setShowContactModal(false)}
                className="flex-1 px-4 py-2 rounded-lg text-sm font-medium"
                style={{ backgroundColor: '#06B6D4', color: '#0F172A' }}
              >
                Add Contact
              </button>
            </div>
          </div>
        </div>
      )}

      {showOutreachModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-lg p-6 max-w-md w-full mx-4" style={{ backgroundColor: '#1E293B', borderColor: '#334155', border: '1px solid' }}>
            <h2 className="text-xl font-bold mb-4" style={{ color: '#FFFFFF' }}>
              Log Outreach Activity
            </h2>
            <div className="space-y-4 mb-6">
              <select
                className="w-full px-4 py-2 rounded-lg border text-sm"
                style={{ backgroundColor: '#0F172A', borderColor: '#475569', color: '#FFFFFF' }}
              >
                <option>Email</option>
                <option>Call</option>
                <option>Meeting</option>
                <option>Follow-up</option>
              </select>
              <textarea
                placeholder="Description"
                rows={3}
                className="w-full px-4 py-2 rounded-lg border text-sm"
                style={{ backgroundColor: '#0F172A', borderColor: '#475569', color: '#FFFFFF' }}
              />
              <input
                type="date"
                className="w-full px-4 py-2 rounded-lg border text-sm"
                style={{ backgroundColor: '#0F172A', borderColor: '#475569', color: '#FFFFFF' }}
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowOutreachModal(false)}
                className="flex-1 px-4 py-2 rounded-lg border text-sm font-medium"
                style={{ borderColor: '#475569', color: '#94A3B8' }}
              >
                Cancel
              </button>
              <button
                onClick={() => setShowOutreachModal(false)}
                className="flex-1 px-4 py-2 rounded-lg text-sm font-medium"
                style={{ backgroundColor: '#06B6D4', color: '#0F172A' }}
              >
                Log Activity
              </button>
            </div>
          </div>
        </div>
      )}

      {showTaskModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-lg p-6 max-w-md w-full mx-4" style={{ backgroundColor: '#1E293B', borderColor: '#334155', border: '1px solid' }}>
            <h2 className="text-xl font-bold mb-4" style={{ color: '#FFFFFF' }}>
              Create New Task
            </h2>
            <div className="space-y-4 mb-6">
              <input
                type="text"
                placeholder="Task Title"
                className="w-full px-4 py-2 rounded-lg border text-sm"
                style={{ backgroundColor: '#0F172A', borderColor: '#475569', color: '#FFFFFF' }}
              />
              <select
                className="w-full px-4 py-2 rounded-lg border text-sm"
                style={{ backgroundColor: '#0F172A', borderColor: '#475569', color: '#FFFFFF' }}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
              <input
                type="date"
                className="w-full px-4 py-2 rounded-lg border text-sm"
                style={{ backgroundColor: '#0F172A', borderColor: '#475569', color: '#FFFFFF' }}
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowTaskModal(false)}
                className="flex-1 px-4 py-2 rounded-lg border text-sm font-medium"
                style={{ borderColor: '#475569', color: '#94A3B8' }}
              >
                Cancel
              </button>
              <button
                onClick={() => setShowTaskModal(false)}
                className="flex-1 px-4 py-2 rounded-lg text-sm font-medium"
                style={{ backgroundColor: '#06B6D4', color: '#0F172A' }}
              >
                Create Task
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
