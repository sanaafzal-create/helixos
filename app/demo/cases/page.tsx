'use client'

import { demoCases, demoMembers } from '@/lib/demo-data'
import { ClipboardList, Calendar, Zap, User, Building2, MapPin } from 'lucide-react'
import { useState } from 'react'

export default function DemoCasesPage() {
  const [selectedCaseId, setSelectedCaseId] = useState('#2856')
  const selectedCase = demoCases.find((c) => c.id === selectedCaseId)
  const member = demoMembers.find((m) => m.id === selectedCase?.memberId)

  return (
    <div className="h-full" style={{ backgroundColor: '#0F172A' }}>
      <div className="flex h-full">
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="p-8 border-b" style={{ borderColor: '#334155' }}>
            <h1 className="text-4xl font-bold mb-2" style={{ color: '#FFFFFF' }}>
              Cases
            </h1>
            <p style={{ color: '#94A3B8' }}>
              Manage member care cases and clinical interventions
            </p>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="divide-y" style={{ borderColor: '#334155' }}>
              {demoCases.map((caseItem) => (
                <div
                  key={caseItem.id}
                  onClick={() => setSelectedCaseId(caseItem.id)}
                  className="p-6 cursor-pointer hover:opacity-80 transition-opacity"
                  style={{
                    backgroundColor: selectedCaseId === caseItem.id ? '#1E293B' : '#0F172A',
                    borderLeft: selectedCaseId === caseItem.id ? '4px solid #06B6D4' : 'none',
                    paddingLeft: selectedCaseId === caseItem.id ? '20px' : '24px',
                  }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-1" style={{ color: '#FFFFFF' }}>
                        {caseItem.id} • {caseItem.member}
                      </h3>
                      <p style={{ color: '#94A3B8' }} className="text-sm mb-2">
                        {caseItem.caseType}
                      </p>
                    </div>
                    <div
                      className="px-3 py-1 rounded text-xs font-semibold"
                      style={{
                        backgroundColor: caseItem.status === 'active' ? '#06B6D440' : '#10B98140',
                        color: caseItem.status === 'active' ? '#06B6D4' : '#10B981',
                      }}
                    >
                      {caseItem.status}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span style={{ color: '#94A3B8' }}>Provider: {caseItem.provider}</span>
                    <span style={{ color: '#94A3B8' }}>Assigned: {caseItem.assignedTo}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {selectedCase && member && (
          <div
            className="w-96 flex flex-col border-l overflow-hidden"
            style={{ backgroundColor: '#1E293B', borderColor: '#334155' }}
          >
            <div className="p-6 border-b" style={{ borderColor: '#334155' }}>
              <h2 className="text-2xl font-bold mb-1" style={{ color: '#FFFFFF' }}>
                {selectedCase.id}
              </h2>
              <p style={{ color: '#94A3B8' }} className="text-sm mb-4">
                {selectedCase.caseType}
              </p>
              <div className="flex gap-2">
                <div
                  className="px-3 py-1 rounded text-xs font-semibold"
                  style={{
                    backgroundColor: selectedCase.status === 'active' ? '#06B6D440' : '#10B98140',
                    color: selectedCase.status === 'active' ? '#06B6D4' : '#10B981',
                  }}
                >
                  {selectedCase.status}
                </div>
                <div
                  className="px-3 py-1 rounded text-xs font-semibold"
                  style={{
                    backgroundColor: selectedCase.priority === 'High' ? '#EF444440' : '#F59E0B40',
                    color: selectedCase.priority === 'High' ? '#EF4444' : '#F59E0B',
                  }}
                >
                  {selectedCase.priority} Priority
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-6 p-6">
              <div>
                <h3 style={{ color: '#FFFFFF' }} className="font-semibold mb-2">
                  Member
                </h3>
                <p style={{ color: '#FFFFFF' }} className="font-medium">
                  {member.firstName} {member.lastName}
                </p>
                <p style={{ color: '#94A3B8' }} className="text-sm">
                  ID: {member.memberId}
                </p>
              </div>

              <div>
                <h3 style={{ color: '#FFFFFF' }} className="font-semibold mb-2">
                  Provider
                </h3>
                <p style={{ color: '#FFFFFF' }} className="font-medium">
                  {selectedCase.provider}
                </p>
              </div>

              <div>
                <h3 style={{ color: '#FFFFFF' }} className="font-semibold mb-2">
                  Description
                </h3>
                <p style={{ color: '#FFFFFF' }} className="text-sm">
                  {selectedCase.description}
                </p>
              </div>

              <div>
                <h3 style={{ color: '#FFFFFF' }} className="font-semibold mb-3">
                  Timeline
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span style={{ color: '#94A3B8' }}>Created:</span>
                    <span style={{ color: '#FFFFFF' }}>
                      {new Date(selectedCase.createdDate).toLocaleDateString()}
                    </span>
                  </div>
                  {selectedCase.status === 'closed' && (
                    <div className="flex justify-between">
                      <span style={{ color: '#94A3B8' }}>Closed:</span>
                      <span style={{ color: '#FFFFFF' }}>
                        {new Date(selectedCase.closedDate || '').toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 style={{ color: '#FFFFFF' }} className="font-semibold mb-2">
                  Next Step
                </h3>
                <p style={{ color: '#FFFFFF' }} className="text-sm">
                  {selectedCase.nextStep}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
