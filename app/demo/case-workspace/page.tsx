'use client'

import { useState } from 'react'
import { Search, Clock, AlertCircle, MessageSquare, CheckCircle2, Upload, Plus, MoreHorizontal, Lock, Eye, Calendar, User, Tag, FileText } from 'lucide-react'
import Link from 'next/link'

const caseData = {
  id: 'CASE-2856',
  title: 'Type 2 Diabetes Management - Patient Education & Monitoring',
  status: 'active',
  priority: 'high',
  owner: 'Sarah Chen',
  created: '2024-01-10',
  updated: '2024-01-16T14:30:00',
  member: {
    id: 'MEM-5234',
    name: 'Marcus Williams',
    age: 52,
    dob: '1971-08-15',
    phone: '(555) 912-3456',
    email: 'marcus.w@email.com',
    address: '456 Oak Street, New York, NY 10002',
    riskLevel: 'high',
    conditions: ['Type 2 Diabetes', 'Hypertension', 'Obesity'],
  },
  provider: {
    id: 'PROV-1023',
    name: 'Dr. Sarah Johnson',
    specialty: 'Family Medicine',
    organization: 'Metro Health Clinic',
    email: 'sjohnson@metrohealthclinic.com',
    phone: '(555) 123-4567',
  },
  summary: 'Marcus is a 52-year-old with newly diagnosed Type 2 Diabetes. Working with Dr. Johnson to establish care coordination, improve glycemic control, and address comorbidities. Primary focus on education, lifestyle intervention, and medication adherence.',
  tags: ['Diabetes', 'High-Risk', 'Care Coordination', 'Active'],
  relatedAuthorizations: [
    { id: 'AUTH-001', type: 'Diabetes Management', status: 'approved', expires: '2024-07-10' },
    { id: 'AUTH-002', type: 'Nutritionist Consult', status: 'approved', expires: '2024-02-15' },
  ],
  timeline: [
    { id: '1', type: 'note', date: '2024-01-16T14:30:00', author: 'Sarah Chen', content: 'Patient completed initial intake. Baseline A1C is 8.2%. Discussed medication options and lifestyle changes.', restricted: false },
    { id: '2', type: 'call', date: '2024-01-15T10:15:00', author: 'Dr. Johnson', content: 'Phone consultation with patient. Prescribed Metformin 500mg BID. Referred to nutritionist.', restricted: true },
    { id: '3', type: 'task_completed', date: '2024-01-14T16:45:00', author: 'Marcus Williams', content: 'Completed diabetes education module - Understanding Blood Sugar', duration: '45 mins' },
    { id: '4', type: 'document', date: '2024-01-14T09:20:00', author: 'Sarah Chen', content: 'Lab Results - Comprehensive Metabolic Panel', fileName: 'CMP_2024_01.pdf' },
    { id: '5', type: 'status', date: '2024-01-12T11:00:00', author: 'System', content: 'Case status changed from pending to active', oldStatus: 'pending', newStatus: 'active' },
    { id: '6', type: 'note', date: '2024-01-10T13:30:00', author: 'Rachel Thompson', content: 'Case created - Initial assessment scheduled for Jan 15', restricted: false },
  ],
  openTasks: [
    { id: 't1', title: 'Schedule nutritionist appointment', dueDate: '2024-01-18', priority: 'high', assignee: 'Sarah Chen', status: 'open' },
    { id: 't2', title: 'Review medication adherence', dueDate: '2024-01-25', priority: 'medium', assignee: 'Dr. Johnson', status: 'open' },
    { id: 't3', title: 'Prepare case summary for Q1 report', dueDate: '2024-01-31', priority: 'medium', assignee: 'Sarah Chen', status: 'open' },
  ],
  completedTasks: [
    { id: 't4', title: 'Obtain baseline A1C test', completedDate: '2024-01-16', completedBy: 'Sarah Chen' },
    { id: 't5', title: 'Create treatment plan', completedDate: '2024-01-15', completedBy: 'Dr. Johnson' },
  ],
  documents: [
    { id: 'd1', name: 'Initial Assessment Form', uploadedDate: '2024-01-10', uploadedBy: 'Sarah Chen', category: 'Assessment', restricted: false },
    { id: 'd2', name: 'Lab Results - A1C & Glucose', uploadedDate: '2024-01-14', uploadedBy: 'Dr. Johnson', category: 'Lab Results', restricted: false },
    { id: 'd3', name: 'Medication History - Restricted', uploadedDate: '2024-01-15', uploadedBy: 'Dr. Johnson', category: 'Medical', restricted: true },
  ],
  aiInsights: [
    { type: 'summary', content: 'Marcus shows significant diabetes markers. Recent patient education engagement is positive. Recommend increasing monitoring frequency.' },
    { type: 'alert', content: 'Missing: Physical exam documentation. Schedule within 30 days per care guidelines.' },
    { type: 'suggestion', content: 'Suggested next action: Coordinate follow-up appointment with Dr. Johnson for medication review.' },
    { type: 'duplicate_check', content: 'No duplicate cases detected. Previous related case closed in 2023.' },
  ],
}

export default function CaseWorkspace() {
  const [selectedTab, setSelectedTab] = useState('overview')
  const [showNoteInput, setShowNoteInput] = useState(false)
  const [newNote, setNewNote] = useState('')
  const [restrictedNote, setRestrictedNote] = useState(false)
  const [showStatusModal, setShowStatusModal] = useState(false)
  const [showAssignModal, setShowAssignModal] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [caseStatus, setCaseStatus] = useState(caseData.status)
  const [caseOwner, setCaseOwner] = useState(caseData.owner)

  return (
    <div className="h-screen flex overflow-hidden" style={{ backgroundColor: '#0F172A' }}>
      {/* LEFT PANEL - CASE NAVIGATOR */}
      <div className="w-64 border-r flex flex-col overflow-hidden" style={{ borderColor: '#334155', backgroundColor: '#0F172A' }}>
        <div className="p-4 border-b" style={{ borderColor: '#334155' }}>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4" style={{ color: '#94A3B8' }} />
            <input
              type="text"
              placeholder="Search cases..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border text-sm"
              style={{ backgroundColor: '#1E293B', borderColor: '#475569', color: '#FFFFFF' }}
            />
          </div>
        </div>

        <div className="p-4 space-y-2 flex-1 overflow-y-auto">
          <div style={{ color: '#94A3B8' }} className="text-xs font-semibold uppercase px-2 py-1">Active Cases</div>
          {[
            { id: 'CASE-2856', name: 'Marcus Williams - Diabetes', active: true },
            { id: 'CASE-2851', name: 'Emily Chen - Hypertension', active: false },
            { id: 'CASE-2847', name: 'James Martinez - Post-Op' , active: false },
            { id: 'CASE-2834', name: 'Sarah Johnson - Cardiac Care', active: false },
          ].map((c) => (
            <button
              key={c.id}
              className="w-full text-left px-3 py-2 rounded-lg text-sm transition-colors"
              style={{
                backgroundColor: c.active ? '#06B6D450' : 'transparent',
                color: c.active ? '#06B6D4' : '#94A3B8',
                borderLeft: c.active ? '3px solid #06B6D4' : 'none',
                paddingLeft: c.active ? '12px' : '16px',
              }}
            >
              {c.name}
            </button>
          ))}

          <div style={{ color: '#94A3B8' }} className="text-xs font-semibold uppercase px-2 py-3 pt-6">High Priority</div>
          {[
            { id: 'CASE-2856', name: 'Marcus Williams - Diabetes' },
            { id: 'CASE-2834', name: 'Sarah Johnson - Cardiac Care' },
          ].map((c) => (
            <button key={c.id} className="w-full text-left px-3 py-2 rounded-lg text-sm" style={{ color: '#EF4444' }}>
              <div className="flex items-center gap-2">
                <AlertCircle className="w-3 h-3" />
                <span className="truncate">{c.name}</span>
              </div>
            </button>
          ))}

          <div style={{ color: '#94A3B8' }} className="text-xs font-semibold uppercase px-2 py-3 pt-6">Recently Viewed</div>
          {[
            { id: 'CASE-2847', name: 'James Martinez' },
            { id: 'CASE-2851', name: 'Emily Chen' },
          ].map((c) => (
            <button key={c.id} className="w-full text-left px-3 py-2 rounded-lg text-sm hover:opacity-80" style={{ color: '#94A3B8' }}>
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* CENTER PANEL - MAIN WORKSPACE */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* CASE HEADER */}
        <div className="border-b p-6" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span style={{ color: '#94A3B8' }} className="text-sm font-mono">
                  {caseData.id}
                </span>
                <span
                  className="px-2 py-1 rounded text-xs font-semibold"
                  style={{ backgroundColor: '#10B98140', color: '#10B981' }}
                >
                  {caseData.status}
                </span>
                <span
                  className="px-2 py-1 rounded text-xs font-semibold"
                  style={{ backgroundColor: '#EF444440', color: '#EF4444' }}
                >
                  {caseData.priority}
                </span>
              </div>
              <h1 className="text-2xl font-bold mb-1" style={{ color: '#FFFFFF' }}>
                {caseData.title}
              </h1>
              <div className="flex items-center gap-4 text-sm" style={{ color: '#94A3B8' }}>
                <span>Created {caseData.created}</span>
                <span>Updated {new Date(caseData.updated).toLocaleDateString()}</span>
              </div>
            </div>
            <button className="p-2 hover:opacity-80" style={{ color: '#94A3B8' }}>
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>

          {/* QUICK ACTIONS */}
          <div className="flex gap-2 flex-wrap">
            <button onClick={() => setShowStatusModal(true)} className="px-3 py-2 rounded-lg text-sm font-medium border hover:opacity-80" style={{ borderColor: '#475569', color: '#06B6D4' }}>
              Change Status
            </button>
            <button onClick={() => setShowAssignModal(true)} className="px-3 py-2 rounded-lg text-sm font-medium border hover:opacity-80" style={{ borderColor: '#475569', color: '#06B6D4' }}>
              Assign Owner
            </button>
            <button onClick={() => setShowUploadModal(true)} className="px-3 py-2 rounded-lg text-sm font-medium border hover:opacity-80" style={{ borderColor: '#475569', color: '#06B6D4' }}>
              <Upload className="w-4 h-4 inline mr-1" /> Upload Document
            </button>
            <button onClick={() => setShowTaskModal(true)} className="px-3 py-2 rounded-lg text-sm font-medium border hover:opacity-80" style={{ borderColor: '#475569', color: '#06B6D4' }}>
              <Plus className="w-4 h-4 inline mr-1" /> Create Task
            </button>
          </div>
        </div>

        {/* CONTENT TABS */}
        <div className="border-b flex" style={{ borderColor: '#334155' }}>
          {['overview', 'timeline', 'notes', 'tasks', 'documents'].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className="px-4 py-3 text-sm font-medium border-b-2 transition-colors"
              style={{
                color: selectedTab === tab ? '#06B6D4' : '#94A3B8',
                borderBottomColor: selectedTab === tab ? '#06B6D4' : 'transparent',
              }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="flex-1 overflow-y-auto p-6">
          {selectedTab === 'overview' && (
            <div className="space-y-6">
              {/* Case Summary */}
              <div className="rounded-lg p-4" style={{ backgroundColor: '#1E293B', borderLeft: '4px solid #06B6D4' }}>
                <h3 className="font-semibold mb-2" style={{ color: '#FFFFFF' }}>Case Summary</h3>
                <p style={{ color: '#CBD5E1' }}>{caseData.summary}</p>
              </div>

              {/* Member Information */}
              <div className="rounded-lg p-4" style={{ backgroundColor: '#1E293B' }}>
                <h3 className="font-semibold mb-4 flex items-center gap-2" style={{ color: '#FFFFFF' }}>
                  <User className="w-4 h-4" style={{ color: '#06B6D4' }} /> Member Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p style={{ color: '#94A3B8' }} className="text-sm">Name</p>
                    <p className="font-semibold" style={{ color: '#FFFFFF' }}>{caseData.member.name}</p>
                  </div>
                  <div>
                    <p style={{ color: '#94A3B8' }} className="text-sm">Age</p>
                    <p className="font-semibold" style={{ color: '#FFFFFF' }}>{caseData.member.age} years old</p>
                  </div>
                  <div>
                    <p style={{ color: '#94A3B8' }} className="text-sm">Risk Level</p>
                    <p className="font-semibold" style={{ color: '#EF4444' }}>{caseData.member.riskLevel}</p>
                  </div>
                  <div>
                    <p style={{ color: '#94A3B8' }} className="text-sm">Phone</p>
                    <p className="font-semibold" style={{ color: '#FFFFFF' }}>{caseData.member.phone}</p>
                  </div>
                </div>
              </div>

              {/* Provider Information */}
              <div className="rounded-lg p-4" style={{ backgroundColor: '#1E293B' }}>
                <h3 className="font-semibold mb-4" style={{ color: '#FFFFFF' }}>Provider Information</h3>
                <div className="space-y-2">
                  <p className="font-semibold" style={{ color: '#FFFFFF' }}>{caseData.provider.name}</p>
                  <p style={{ color: '#94A3B8' }}>{caseData.provider.specialty} • {caseData.provider.organization}</p>
                  <p style={{ color: '#94A3B8' }}>{caseData.provider.email}</p>
                </div>
              </div>

              {/* Tags */}
              <div className="rounded-lg p-4" style={{ backgroundColor: '#1E293B' }}>
                <h3 className="font-semibold mb-3 flex items-center gap-2" style={{ color: '#FFFFFF' }}>
                  <Tag className="w-4 h-4" style={{ color: '#06B6D4' }} /> Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {caseData.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: '#06B6D430', color: '#06B6D4' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'timeline' && (
            <div className="space-y-4">
              {caseData.timeline.map((event, idx) => (
                <div key={event.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: event.restricted ? '#EF4444' : '#06B6D4' }}
                    />
                    {idx < caseData.timeline.length - 1 && (
                      <div className="w-0.5 h-12 my-1" style={{ backgroundColor: '#334155' }} />
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-semibold" style={{ color: '#FFFFFF' }}>
                        {event.type === 'note' && 'Note'}
                        {event.type === 'call' && 'Call'}
                        {event.type === 'task_completed' && 'Task Completed'}
                        {event.type === 'document' && 'Document'}
                        {event.type === 'status' && 'Status Change'}
                      </p>
                      {event.restricted && (
                        <Lock className="w-3 h-3" style={{ color: '#EF4444' }} />
                      )}
                      <span style={{ color: '#94A3B8' }} className="text-xs ml-auto">
                        {new Date(event.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p style={{ color: '#94A3B8' }} className="text-xs mb-2">{event.author}</p>
                    <p style={{ color: '#FFFFFF' }} className="text-sm">{event.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {selectedTab === 'notes' && (
            <div className="space-y-4">
              {!showNoteInput ? (
                <button
                  onClick={() => setShowNoteInput(true)}
                  className="w-full p-4 rounded-lg border-2 border-dashed text-left hover:opacity-80"
                  style={{ borderColor: '#334155', color: '#94A3B8' }}
                >
                  <Plus className="w-4 h-4 inline mr-2" /> Add Note
                </button>
              ) : (
                <div className="p-4 rounded-lg" style={{ backgroundColor: '#1E293B' }}>
                  <textarea
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Write your note here..."
                    className="w-full p-3 rounded-lg border resize-none"
                    rows={4}
                    style={{ backgroundColor: '#0F172A', borderColor: '#475569', color: '#FFFFFF' }}
                  />
                  <div className="flex items-center gap-2 mt-3">
                    <label className="flex items-center gap-2 text-sm" style={{ color: '#94A3B8' }}>
                      <input type="checkbox" checked={restrictedNote} onChange={(e) => setRestrictedNote(e.target.checked)} />
                      Restricted (Only visible to authorized users)
                    </label>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button className="px-4 py-2 rounded-lg font-medium" style={{ backgroundColor: '#06B6D4', color: '#0F172A' }}>
                      Save Note
                    </button>
                    <button onClick={() => setShowNoteInput(false)} className="px-4 py-2 rounded-lg border" style={{ borderColor: '#475569', color: '#94A3B8' }}>
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Existing Notes */}
              <div className="space-y-3">
                {caseData.timeline.filter(e => e.type === 'note').map((note) => (
                  <div key={note.id} className="p-4 rounded-lg" style={{ backgroundColor: note.restricted ? '#EF444415' : '#1E293B' }}>
                    <div className="flex items-start gap-2 mb-2">
                      <p className="font-semibold" style={{ color: '#FFFFFF' }}>{note.author}</p>
                      {note.restricted && (
                        <Lock className="w-3 h-3 mt-1" style={{ color: '#EF4444' }} />
                      )}
                      <span style={{ color: '#94A3B8' }} className="text-xs ml-auto">{new Date(note.date).toLocaleDateString()}</span>
                    </div>
                    <p style={{ color: '#CBD5E1' }}>{note.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'tasks' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3" style={{ color: '#FFFFFF' }}>Open Tasks</h3>
                <div className="space-y-2">
                  {caseData.openTasks.map((task) => (
                    <div key={task.id} className="p-4 rounded-lg border-l-4 flex items-start justify-between" style={{ backgroundColor: '#1E293B', borderColor: '#06B6D4' }}>
                      <div className="flex-1">
                        <p className="font-semibold" style={{ color: '#FFFFFF' }}>{task.title}</p>
                        <div className="flex gap-2 text-xs mt-1">
                          <span style={{ color: '#94A3B8' }}>Due: {task.dueDate}</span>
                          <span style={{ color: task.priority === 'high' ? '#EF4444' : '#94A3B8' }}>Priority: {task.priority}</span>
                          <span style={{ color: '#94A3B8' }}>Assigned to: {task.assignee}</span>
                        </div>
                      </div>
                      <input type="checkbox" className="mt-1" />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3" style={{ color: '#FFFFFF' }}>Completed Tasks</h3>
                <div className="space-y-2">
                  {caseData.completedTasks.map((task) => (
                    <div key={task.id} className="p-4 rounded-lg flex items-start gap-2 opacity-60" style={{ backgroundColor: '#1E293B' }}>
                      <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#10B981' }} />
                      <div className="flex-1">
                        <p style={{ color: '#FFFFFF' }}>{task.title}</p>
                        <p style={{ color: '#94A3B8' }} className="text-xs">Completed {task.completedDate} by {task.completedBy}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'documents' && (
            <div className="space-y-3">
              {caseData.documents.map((doc) => (
                <div key={doc.id} className="p-4 rounded-lg flex items-center justify-between" style={{ backgroundColor: doc.restricted ? '#EF444415' : '#1E293B' }}>
                  <div className="flex items-center gap-3 flex-1">
                    <FileText className="w-5 h-5" style={{ color: '#06B6D4' }} />
                    <div className="flex-1">
                      <p className="font-semibold" style={{ color: '#FFFFFF' }}>{doc.name}</p>
                      <p style={{ color: '#94A3B8' }} className="text-xs">
                        {doc.category} • Uploaded {doc.uploadedDate} by {doc.uploadedBy}
                      </p>
                    </div>
                  </div>
                  {doc.restricted && (
                    <Lock className="w-4 h-4" style={{ color: '#EF4444' }} />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* RIGHT PANEL - AI ASSISTANT */}
      <div className="w-96 border-l flex flex-col" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
        {/* AI Assistant Header */}
        <div className="p-4 border-b" style={{ borderColor: '#334155' }}>
          <h3 className="font-semibold flex items-center gap-2" style={{ color: '#FFFFFF' }}>
            <MessageSquare className="w-4 h-4" style={{ color: '#06B6D4' }} /> AI Copilot
          </h3>
        </div>

        {/* AI Insights */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {caseData.aiInsights.map((insight, idx) => (
            <div key={idx} className="p-3 rounded-lg text-sm" style={{ backgroundColor: '#0F172A' }}>
              <div className="flex items-start gap-2">
                {insight.type === 'alert' && <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#EF4444' }} />}
                {insight.type === 'summary' && <Eye className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#06B6D4' }} />}
                {insight.type === 'suggestion' && <Plus className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#10B981' }} />}
                {insight.type === 'duplicate_check' && <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#06B6D4' }} />}
                <p style={{ color: '#CBD5E1' }}>{insight.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Activity Feed */}
        <div className="border-t p-4" style={{ borderColor: '#334155' }}>
          <h3 className="font-semibold mb-3 text-sm" style={{ color: '#FFFFFF' }}>Recent Activity</h3>
          <div className="space-y-2 text-xs" style={{ color: '#94A3B8' }}>
            <p>14:30 • Sarah Chen added a note</p>
            <p>10:15 • Dr. Johnson completed call</p>
            <p>09:20 • Document uploaded</p>
            <p>Yesterday • Case opened by Rachel Thompson</p>
          </div>
        </div>
      </div>

      {/* MODALS */}
      {/* Change Status Modal */}
      {showStatusModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-lg p-6 max-w-md w-full mx-4" style={{ backgroundColor: '#1E293B', borderColor: '#334155', border: '1px solid' }}>
            <h2 className="text-xl font-bold mb-4" style={{ color: '#FFFFFF' }}>Change Case Status</h2>
            <div className="space-y-2 mb-6">
              {['pending', 'active', 'on-hold', 'closed'].map((status) => (
                <button
                  key={status}
                  onClick={() => {
                    setCaseStatus(status)
                    setShowStatusModal(false)
                  }}
                  className="w-full text-left px-4 py-3 rounded-lg border transition-all"
                  style={{
                    borderColor: caseStatus === status ? '#06B6D4' : '#475569',
                    backgroundColor: caseStatus === status ? '#06B6D415' : '#0F172A',
                    color: caseStatus === status ? '#06B6D4' : '#FFFFFF',
                  }}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
            <button onClick={() => setShowStatusModal(false)} className="w-full px-4 py-2 rounded-lg border text-sm font-medium" style={{ borderColor: '#475569', color: '#94A3B8' }}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Assign Owner Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-lg p-6 max-w-md w-full mx-4" style={{ backgroundColor: '#1E293B', borderColor: '#334155', border: '1px solid' }}>
            <h2 className="text-xl font-bold mb-4" style={{ color: '#FFFFFF' }}>Assign Owner</h2>
            <div className="space-y-2 mb-6">
              {['Sarah Chen', 'Dr. Sarah Johnson', 'Rachel Thompson', 'James Wilson', 'Lisa Anderson'].map((person) => (
                <button
                  key={person}
                  onClick={() => {
                    setCaseOwner(person)
                    setShowAssignModal(false)
                  }}
                  className="w-full text-left px-4 py-3 rounded-lg border transition-all flex items-center gap-3"
                  style={{
                    borderColor: caseOwner === person ? '#06B6D4' : '#475569',
                    backgroundColor: caseOwner === person ? '#06B6D415' : '#0F172A',
                    color: caseOwner === person ? '#06B6D4' : '#FFFFFF',
                  }}
                >
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ backgroundColor: '#06B6D4', color: '#0F172A' }}>
                    {person.split(' ')[0][0]}
                  </div>
                  <div>
                    <p className="font-medium">{person}</p>
                    <p style={{ color: '#94A3B8' }} className="text-xs">{person.includes('Dr.') ? 'Physician' : 'Care Coordinator'}</p>
                  </div>
                </button>
              ))}
            </div>
            <button onClick={() => setShowAssignModal(false)} className="w-full px-4 py-2 rounded-lg border text-sm font-medium" style={{ borderColor: '#475569', color: '#94A3B8' }}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Upload Document Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-lg p-6 max-w-md w-full mx-4" style={{ backgroundColor: '#1E293B', borderColor: '#334155', border: '1px solid' }}>
            <h2 className="text-xl font-bold mb-4" style={{ color: '#FFFFFF' }}>Upload Document</h2>
            <div className="border-2 border-dashed rounded-lg p-8 text-center mb-4" style={{ borderColor: '#475569' }}>
              <Upload className="w-8 h-8 mx-auto mb-2" style={{ color: '#06B6D4' }} />
              <p style={{ color: '#FFFFFF' }} className="font-medium mb-1">Drag & drop or click to upload</p>
              <p style={{ color: '#94A3B8' }} className="text-sm">PDF, Images, or Documents</p>
            </div>
            <div className="space-y-2 mb-6">
              <label style={{ color: '#94A3B8' }} className="text-sm font-medium block">Category</label>
              <select className="w-full px-3 py-2 rounded-lg border" style={{ backgroundColor: '#0F172A', borderColor: '#475569', color: '#FFFFFF' }}>
                <option>Assessment</option>
                <option>Lab Results</option>
                <option>Medical Records</option>
                <option>Other</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowUploadModal(false)} className="flex-1 px-4 py-2 rounded-lg border text-sm font-medium" style={{ borderColor: '#475569', color: '#94A3B8' }}>
                Cancel
              </button>
              <button onClick={() => setShowUploadModal(false)} className="flex-1 px-4 py-2 rounded-lg text-sm font-medium" style={{ backgroundColor: '#06B6D4', color: '#0F172A' }}>
                Upload
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Task Modal */}
      {showTaskModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-lg p-6 max-w-md w-full mx-4" style={{ backgroundColor: '#1E293B', borderColor: '#334155', border: '1px solid' }}>
            <h2 className="text-xl font-bold mb-4" style={{ color: '#FFFFFF' }}>Create New Task</h2>
            <div className="space-y-4 mb-6">
              <div>
                <label style={{ color: '#94A3B8' }} className="text-sm font-medium block mb-2">Task Title</label>
                <input type="text" placeholder="Enter task title" className="w-full px-3 py-2 rounded-lg border" style={{ backgroundColor: '#0F172A', borderColor: '#475569', color: '#FFFFFF' }} />
              </div>
              <div>
                <label style={{ color: '#94A3B8' }} className="text-sm font-medium block mb-2">Due Date</label>
                <input type="date" className="w-full px-3 py-2 rounded-lg border" style={{ backgroundColor: '#0F172A', borderColor: '#475569', color: '#FFFFFF' }} />
              </div>
              <div>
                <label style={{ color: '#94A3B8' }} className="text-sm font-medium block mb-2">Priority</label>
                <select className="w-full px-3 py-2 rounded-lg border" style={{ backgroundColor: '#0F172A', borderColor: '#475569', color: '#FFFFFF' }}>
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>
              <div>
                <label style={{ color: '#94A3B8' }} className="text-sm font-medium block mb-2">Assign To</label>
                <select className="w-full px-3 py-2 rounded-lg border" style={{ backgroundColor: '#0F172A', borderColor: '#475569', color: '#FFFFFF' }}>
                  <option>Sarah Chen</option>
                  <option>Dr. Sarah Johnson</option>
                  <option>Rachel Thompson</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowTaskModal(false)} className="flex-1 px-4 py-2 rounded-lg border text-sm font-medium" style={{ borderColor: '#475569', color: '#94A3B8' }}>
                Cancel
              </button>
              <button onClick={() => setShowTaskModal(false)} className="flex-1 px-4 py-2 rounded-lg text-sm font-medium" style={{ backgroundColor: '#06B6D4', color: '#0F172A' }}>
                Create Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
