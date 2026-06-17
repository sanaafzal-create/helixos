'use client'

import { useState, useEffect } from 'react'
import { getMemberById } from '@/lib/member-seeds'
import { AlertCircle, CheckCircle, Clock, MapPin, Mail, Phone, Plus, Lock, FileText, Calendar, Users, Brain, MoreHorizontal } from 'lucide-react'

export default function MemberWorkspacePage({ params }: { params: Promise<{ id: string }> }) {
  const [activeTab, setActiveTab] = useState('overview')
  const [showAddNote, setShowAddNote] = useState(false)
  const [showAddTask, setShowAddTask] = useState(false)
  const [id, setId] = useState<string | null>(null)

  useEffect(() => {
    params.then(({ id }) => setId(id))
  }, [params])

  const member = id ? getMemberById(id) : null

  if (!member) {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0F172A' }}>
        <div className="text-center">
          <p style={{ color: '#94A3B8' }}>Member not found</p>
        </div>
      </main>
    )
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'cases', label: 'Cases', badge: member.activeCases },
    { id: 'authorizations', label: 'Authorizations', badge: member.activeAuthorizations },
    { id: 'documents', label: 'Documents' },
    { id: 'timeline', label: 'Activity' },
    { id: 'notes', label: 'Notes' },
    { id: 'tasks', label: 'Tasks' },
    { id: 'ai', label: 'AI Insights' },
  ]

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#0F172A' }}>
      {/* Header */}
      <div className="border-b p-6" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <div
                className="w-16 h-16 rounded-lg flex items-center justify-center text-2xl font-bold"
                style={{ backgroundColor: '#06B6D415', color: '#06B6D4' }}
              >
                {member.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-3xl font-bold" style={{ color: '#FFFFFF' }}>
                  {member.name}
                </h1>
                <p style={{ color: '#94A3B8' }} className="text-sm">
                  {member.memberId} • Enrolled {new Date(member.enrollmentDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <span
                className="text-xs px-3 py-1 rounded-full flex items-center gap-1"
                style={{
                  backgroundColor: member.status === 'active' ? '#06B6D415' : '#64748B15',
                  color: member.status === 'active' ? '#06B6D4' : '#94A3B8',
                }}
              >
                {member.status === 'active' ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                {member.status}
              </span>
              <span
                className="text-xs px-3 py-1 rounded-full flex items-center gap-1"
                style={{
                  backgroundColor: member.riskLevel === 'high' ? '#EF444415' : member.riskLevel === 'medium' ? '#F59E0B15' : '#10B98115',
                  color: member.riskLevel === 'high' ? '#EF4444' : member.riskLevel === 'medium' ? '#F59E0B' : '#10B981',
                }}
              >
                {member.riskLevel === 'high' && <AlertCircle className="w-3 h-3" />}
                {member.riskLevel} Risk
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="p-2 rounded-lg hover:opacity-80" style={{ backgroundColor: '#06B6D415', color: '#06B6D4' }}>
              <Plus className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-lg hover:opacity-80" style={{ backgroundColor: '#334155', color: '#94A3B8' }}>
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="p-3 rounded-lg" style={{ backgroundColor: '#0F172A' }}>
            <p style={{ color: '#94A3B8' }} className="text-xs mb-1">
              Case Manager
            </p>
            <p style={{ color: '#FFFFFF' }} className="font-semibold">
              {member.assignedCaseManager}
            </p>
          </div>
          <div className="p-3 rounded-lg" style={{ backgroundColor: '#0F172A' }}>
            <p style={{ color: '#94A3B8' }} className="text-xs mb-1">
              Active Cases
            </p>
            <p style={{ color: '#06B6D4' }} className="font-semibold text-lg">
              {member.activeCases}
            </p>
          </div>
          <div className="p-3 rounded-lg" style={{ backgroundColor: '#0F172A' }}>
            <p style={{ color: '#94A3B8' }} className="text-xs mb-1">
              Authorizations
            </p>
            <p style={{ color: '#10B981' }} className="font-semibold text-lg">
              {member.activeAuthorizations}
            </p>
          </div>
          <div className="p-3 rounded-lg" style={{ backgroundColor: '#0F172A' }}>
            <p style={{ color: '#94A3B8' }} className="text-xs mb-1">
              Services
            </p>
            <p style={{ color: '#F59E0B' }} className="font-semibold text-lg">
              {member.activeServices.length}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b sticky top-0 z-30" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
        <div className="px-6 flex gap-1 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="px-4 py-3 text-sm font-medium transition-colors flex items-center gap-2 border-b-2"
              style={{
                borderColor: activeTab === tab.id ? '#06B6D4' : 'transparent',
                color: activeTab === tab.id ? '#06B6D4' : '#94A3B8',
              }}
            >
              {tab.label}
              {tab.badge !== undefined && (
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: '#06B6D415', color: '#06B6D4' }}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 space-y-6">
              {/* Contact Information */}
              <div className="border rounded-lg p-6" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
                <h2 className="text-lg font-semibold mb-4" style={{ color: '#FFFFFF' }}>
                  Contact Information
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p style={{ color: '#94A3B8' }} className="text-sm mb-1">
                      Email
                    </p>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" style={{ color: '#06B6D4' }} />
                      <p style={{ color: '#FFFFFF' }}>{member.email}</p>
                    </div>
                  </div>
                  <div>
                    <p style={{ color: '#94A3B8' }} className="text-sm mb-1">
                      Phone
                    </p>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" style={{ color: '#06B6D4' }} />
                      <p style={{ color: '#FFFFFF' }}>{member.phone}</p>
                    </div>
                  </div>
                  <div>
                    <p style={{ color: '#94A3B8' }} className="text-sm mb-1">
                      Location
                    </p>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" style={{ color: '#06B6D4' }} />
                      <p style={{ color: '#FFFFFF' }}>{member.city}</p>
                    </div>
                  </div>
                  <div>
                    <p style={{ color: '#94A3B8' }} className="text-sm mb-1">
                      Preferred Contact
                    </p>
                    <p style={{ color: '#FFFFFF' }}>{member.preferredCommunication}</p>
                  </div>
                </div>
              </div>

              {/* Active Services */}
              <div className="border rounded-lg p-6" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
                <h2 className="text-lg font-semibold mb-4" style={{ color: '#FFFFFF' }}>
                  Active Services
                </h2>
                {member.activeServices.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {member.activeServices.map((service, idx) => (
                      <span key={idx} className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: '#06B6D415', color: '#06B6D4' }}>
                        {service}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p style={{ color: '#94A3B8' }}>No active services</p>
                )}
              </div>

              {/* Related Providers */}
              <div className="border rounded-lg p-6" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
                <h2 className="text-lg font-semibold mb-4" style={{ color: '#FFFFFF' }}>
                  Related Providers
                </h2>
                {member.relatedProviders.length > 0 ? (
                  <div className="space-y-2">
                    {member.relatedProviders.map((provider, idx) => (
                      <div key={idx} className="p-3 rounded-lg" style={{ backgroundColor: '#0F172A' }}>
                        <p style={{ color: '#FFFFFF' }}>{provider}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ color: '#94A3B8' }}>No related providers</p>
                )}
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-4">
              {/* Assigned Team */}
              <div className="border rounded-lg p-6" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
                <h3 className="font-semibold mb-4" style={{ color: '#FFFFFF' }}>
                  Assigned Team
                </h3>
                <div className="space-y-3">
                  <div>
                    <p style={{ color: '#94A3B8' }} className="text-xs mb-1">
                      Case Manager
                    </p>
                    <p style={{ color: '#FFFFFF' }} className="font-medium">
                      {member.assignedCaseManager}
                    </p>
                  </div>
                </div>
              </div>

              {/* Member Details */}
              <div className="border rounded-lg p-6" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
                <h3 className="font-semibold mb-4" style={{ color: '#FFFFFF' }}>
                  Details
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p style={{ color: '#94A3B8' }} className="mb-1">
                      Date of Birth
                    </p>
                    <p style={{ color: '#FFFFFF' }}>{member.dateOfBirth}</p>
                  </div>
                  <div>
                    <p style={{ color: '#94A3B8' }} className="mb-1">
                      Last Activity
                    </p>
                    <p style={{ color: '#FFFFFF' }}>
                      {new Date(member.lastActivity).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CASES TAB */}
        {activeTab === 'cases' && (
          <div className="border rounded-lg p-6" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
            <h2 className="text-lg font-semibold mb-4" style={{ color: '#FFFFFF' }}>
              Related Cases
            </h2>
            <div className="space-y-3">
              {member.activeCases > 0 ? (
                Array.from({ length: member.activeCases }, (_, i) => (
                  <div key={i} className="p-4 rounded-lg border" style={{ borderColor: '#334155', backgroundColor: '#0F172A' }}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold" style={{ color: '#FFFFFF' }}>
                          Case {i + 1}
                        </p>
                        <p style={{ color: '#94A3B8' }} className="text-sm">
                          Open
                        </p>
                      </div>
                      <CheckCircle className="w-5 h-5" style={{ color: '#10B981' }} />
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ color: '#94A3B8' }}>No active cases</p>
              )}
            </div>
          </div>
        )}

        {/* AUTHORIZATIONS TAB */}
        {activeTab === 'authorizations' && (
          <div className="border rounded-lg p-6" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
            <h2 className="text-lg font-semibold mb-4" style={{ color: '#FFFFFF' }}>
              Active Authorizations
            </h2>
            <div className="space-y-3">
              {member.activeAuthorizations > 0 ? (
                Array.from({ length: member.activeAuthorizations }, (_, i) => (
                  <div key={i} className="p-4 rounded-lg border flex items-center justify-between" style={{ borderColor: '#334155', backgroundColor: '#0F172A' }}>
                    <div>
                      <p className="font-semibold" style={{ color: '#FFFFFF' }}>
                        Authorization {i + 1}
                      </p>
                      <p style={{ color: '#94A3B8' }} className="text-sm">
                        Approved • Expires {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                      </p>
                    </div>
                    <CheckCircle className="w-5 h-5" style={{ color: '#10B981' }} />
                  </div>
                ))
              ) : (
                <p style={{ color: '#94A3B8' }}>No active authorizations</p>
              )}
            </div>
          </div>
        )}

        {/* DOCUMENTS TAB */}
        {activeTab === 'documents' && (
          <div className="border rounded-lg p-6" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
            <h2 className="text-lg font-semibold mb-4" style={{ color: '#FFFFFF' }}>
              Documents
            </h2>
            <div className="text-center py-12">
              <FileText className="w-12 h-12 mx-auto mb-3" style={{ color: '#475569' }} />
              <p style={{ color: '#94A3B8' }}>No documents uploaded</p>
              <button className="mt-4 px-4 py-2 rounded-lg text-sm" style={{ backgroundColor: '#06B6D415', color: '#06B6D4' }}>
                Upload Document
              </button>
            </div>
          </div>
        )}

        {/* ACTIVITY TIMELINE TAB */}
        {activeTab === 'timeline' && (
          <div className="border rounded-lg p-6" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
            <h2 className="text-lg font-semibold mb-6" style={{ color: '#FFFFFF' }}>
              Activity Timeline
            </h2>
            <div className="space-y-4">
              {[
                { type: 'Note', date: 'Today', message: 'Follow-up scheduled' },
                { type: 'Call', date: '2 days ago', message: 'Outreach call completed' },
                { type: 'Case Update', date: '1 week ago', message: 'Case status changed to active' },
              ].map((activity, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="relative">
                    <div className="w-3 h-3 rounded-full mt-2" style={{ backgroundColor: '#06B6D4' }} />
                    {idx < 2 && (
                      <div
                        className="absolute left-1/2 w-0.5 h-12 -translate-x-1/2 top-5"
                        style={{ backgroundColor: '#334155' }}
                      />
                    )}
                  </div>
                  <div className="pb-4">
                    <p style={{ color: '#FFFFFF' }} className="font-medium">
                      {activity.type}
                    </p>
                    <p style={{ color: '#94A3B8' }} className="text-sm">
                      {activity.message} • {activity.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* NOTES TAB */}
        {activeTab === 'notes' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold" style={{ color: '#FFFFFF' }}>
                Notes
              </h2>
              <button
                onClick={() => setShowAddNote(!showAddNote)}
                className="px-3 py-1 rounded-lg text-sm flex items-center gap-1"
                style={{ backgroundColor: '#06B6D415', color: '#06B6D4' }}
              >
                <Plus className="w-4 h-4" />
                Add Note
              </button>
            </div>

            {showAddNote && (
              <div className="border rounded-lg p-4" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
                <textarea
                  placeholder="Add a note..."
                  className="w-full p-3 rounded-lg border text-sm"
                  style={{ backgroundColor: '#0F172A', borderColor: '#475569', color: '#FFFFFF' }}
                  rows={3}
                />
                <div className="flex gap-2 mt-3">
                  <button className="px-3 py-1 rounded-lg text-sm" style={{ backgroundColor: '#06B6D4', color: '#0F172A' }}>
                    Save
                  </button>
                  <button
                    className="px-3 py-1 rounded-lg text-sm"
                    style={{ backgroundColor: '#334155', color: '#94A3B8' }}
                    onClick={() => setShowAddNote(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-3">
              <div className="border rounded-lg p-4" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
                <p style={{ color: '#FFFFFF' }}>General note about member's care plan</p>
                <p style={{ color: '#94A3B8' }} className="text-xs mt-2">
                  Added 2 days ago by Sarah Mitchell
                </p>
              </div>
              <div className="border rounded-lg p-4 flex items-start gap-3" style={{ borderColor: '#EF4444', backgroundColor: '#1E293B' }}>
                <Lock className="w-4 h-4 mt-1" style={{ color: '#EF4444' }} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p style={{ color: '#FFFFFF' }} className="font-medium">
                      Restricted Note
                    </p>
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: '#EF444415', color: '#EF4444' }}>
                      Permission required
                    </span>
                  </div>
                  <p style={{ color: '#94A3B8' }} className="text-sm">
                    Sensitive member information
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TASKS TAB */}
        {activeTab === 'tasks' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold" style={{ color: '#FFFFFF' }}>
                Tasks
              </h2>
              <button
                onClick={() => setShowAddTask(!showAddTask)}
                className="px-3 py-1 rounded-lg text-sm flex items-center gap-1"
                style={{ backgroundColor: '#06B6D415', color: '#06B6D4' }}
              >
                <Plus className="w-4 h-4" />
                Add Task
              </button>
            </div>

            {showAddTask && (
              <div className="border rounded-lg p-4" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
                <input
                  type="text"
                  placeholder="Task title..."
                  className="w-full p-3 rounded-lg border text-sm mb-2"
                  style={{ backgroundColor: '#0F172A', borderColor: '#475569', color: '#FFFFFF' }}
                />
                <select
                  className="w-full p-3 rounded-lg border text-sm"
                  style={{ backgroundColor: '#0F172A', borderColor: '#475569', color: '#FFFFFF' }}
                >
                  <option>Priority</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
                <div className="flex gap-2 mt-3">
                  <button className="px-3 py-1 rounded-lg text-sm" style={{ backgroundColor: '#06B6D4', color: '#0F172A' }}>
                    Create
                  </button>
                  <button
                    className="px-3 py-1 rounded-lg text-sm"
                    style={{ backgroundColor: '#334155', color: '#94A3B8' }}
                    onClick={() => setShowAddTask(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {[
                { title: 'Call member to schedule appointment', priority: 'High', due: 'Tomorrow' },
                { title: 'Upload authorization documents', priority: 'Medium', due: '3 days' },
                { title: 'Review case notes and update status', priority: 'Low', due: '1 week' },
              ].map((task, idx) => (
                <div key={idx} className="p-4 rounded-lg border flex items-center justify-between" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
                  <div className="flex items-center gap-3">
                    <input type="checkbox" style={{ accentColor: '#06B6D4' }} />
                    <div>
                      <p style={{ color: '#FFFFFF' }}>{task.title}</p>
                      <p style={{ color: '#94A3B8' }} className="text-xs">
                        Due: {task.due}
                      </p>
                    </div>
                  </div>
                  <span
                    className="text-xs px-2 py-1 rounded-full"
                    style={{
                      backgroundColor: task.priority === 'High' ? '#EF444415' : task.priority === 'Medium' ? '#F59E0B15' : '#10B98115',
                      color: task.priority === 'High' ? '#EF4444' : task.priority === 'Medium' ? '#F59E0B' : '#10B981',
                    }}
                  >
                    {task.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AI INSIGHTS TAB */}
        {activeTab === 'ai' && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold" style={{ color: '#FFFFFF' }}>
              AI Insights
            </h2>

            <div className="border rounded-lg p-4" style={{ borderColor: '#06B6D4', backgroundColor: '#06B6D415' }}>
              <div className="flex items-start gap-3">
                <Brain className="w-5 h-5 mt-1" style={{ color: '#06B6D4' }} />
                <div className="flex-1">
                  <p style={{ color: '#FFFFFF' }} className="font-medium mb-1">
                    Missing Information Alert
                  </p>
                  <p style={{ color: '#94A3B8' }} className="text-sm">
                    Member profile is 85% complete. Missing: Secondary contact information.
                  </p>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4" style={{ borderColor: '#F59E0B', backgroundColor: '#F59E0B15' }}>
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 mt-1" style={{ color: '#F59E0B' }} />
                <div className="flex-1">
                  <p style={{ color: '#FFFFFF' }} className="font-medium mb-1">
                    Authorization Expiring Soon
                  </p>
                  <p style={{ color: '#94A3B8' }} className="text-sm">
                    2 of 5 active authorizations expire within 30 days.
                  </p>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4" style={{ borderColor: '#10B981', backgroundColor: '#10B98115' }}>
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 mt-1" style={{ color: '#10B981' }} />
                <div className="flex-1">
                  <p style={{ color: '#FFFFFF' }} className="font-medium mb-1">
                    Recommended Follow-up
                  </p>
                  <p style={{ color: '#94A3B8' }} className="text-sm">
                    No contact for 3 days. Consider scheduling outreach call.
                  </p>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4" style={{ borderColor: '#EF4444', backgroundColor: '#EF444415' }}>
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 mt-1" style={{ color: '#EF4444' }} />
                <div className="flex-1">
                  <p style={{ color: '#FFFFFF' }} className="font-medium mb-1">
                    Risk Indicator
                  </p>
                  <p style={{ color: '#94A3B8' }} className="text-sm">
                    Member categorized as high-risk. Ensure weekly check-ins are scheduled.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
