'use client'

import { demoMembers, demoCases } from '@/lib/demo-data'
import { Users, AlertCircle, Calendar, Heart } from 'lucide-react'
import { useState } from 'react'

export default function DemoMembersPage() {
  const [selectedMemberId, setSelectedMemberId] = useState('1')
  const selectedMember = demoMembers.find((m) => m.id === selectedMemberId)
  const memberCases = demoCases.filter((c) => c.memberId === selectedMemberId)

  const getRiskColor = (risk: string) => {
    if (risk === 'High') return '#EF4444'
    if (risk === 'Medium') return '#F59E0B'
    return '#10B981'
  }

  return (
    <div className="h-full" style={{ backgroundColor: '#0F172A' }}>
      <div className="flex h-full">
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="p-8 border-b" style={{ borderColor: '#334155' }}>
            <h1 className="text-4xl font-bold mb-2" style={{ color: '#FFFFFF' }}>
              Members
            </h1>
            <p style={{ color: '#94A3B8' }}>
              Manage member records and care engagement
            </p>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="divide-y" style={{ borderColor: '#334155' }}>
              {demoMembers.map((member) => (
                <div
                  key={member.id}
                  onClick={() => setSelectedMemberId(member.id)}
                  className="p-6 cursor-pointer hover:opacity-80 transition-opacity"
                  style={{
                    backgroundColor: selectedMemberId === member.id ? '#1E293B' : '#0F172A',
                    borderLeft: selectedMemberId === member.id ? '4px solid #06B6D4' : 'none',
                    paddingLeft: selectedMemberId === member.id ? '20px' : '24px',
                  }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-1" style={{ color: '#FFFFFF' }}>
                        {member.firstName} {member.lastName}
                      </h3>
                      <p style={{ color: '#94A3B8' }} className="text-sm mb-2">
                        {member.memberId} • {member.groupNumber}
                      </p>
                    </div>
                    <div
                      className="px-3 py-1 rounded text-xs font-semibold"
                      style={{
                        backgroundColor: `${getRiskColor(member.riskScore)}40`,
                        color: getRiskColor(member.riskScore),
                      }}
                    >
                      {member.riskScore} Risk
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Heart className="w-4 h-4" style={{ color: '#10B981' }} />
                    <span style={{ color: '#94A3B8' }}>
                      {member.conditions.length} conditions • {member.activeCases} active cases
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {selectedMember && (
          <div
            className="w-96 flex flex-col border-l overflow-hidden"
            style={{ backgroundColor: '#1E293B', borderColor: '#334155' }}
          >
            <div className="p-6 border-b" style={{ borderColor: '#334155' }}>
              <h2 className="text-2xl font-bold mb-1" style={{ color: '#FFFFFF' }}>
                {selectedMember.firstName} {selectedMember.lastName}
              </h2>
              <p style={{ color: '#94A3B8' }} className="text-sm mb-4">
                Age: {new Date().getFullYear() - new Date(selectedMember.dateOfBirth).getFullYear()}
              </p>
              <div
                className="px-3 py-1 rounded text-xs font-semibold inline-block"
                style={{
                  backgroundColor: `${getRiskColor(selectedMember.riskScore)}40`,
                  color: getRiskColor(selectedMember.riskScore),
                }}
              >
                {selectedMember.riskScore} Risk
              </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-6 p-6">
              <div>
                <h3 style={{ color: '#FFFFFF' }} className="font-semibold mb-2">
                  Contact Information
                </h3>
                <div className="space-y-1 text-sm">
                  <p style={{ color: '#94A3B8' }}>Email</p>
                  <p style={{ color: '#FFFFFF' }}>{selectedMember.email}</p>
                  <p style={{ color: '#94A3B8' }} className="mt-3">
                    Phone
                  </p>
                  <p style={{ color: '#FFFFFF' }}>{selectedMember.phone}</p>
                </div>
              </div>

              <div>
                <h3 style={{ color: '#FFFFFF' }} className="font-semibold mb-2">
                  Identification
                </h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span style={{ color: '#94A3B8' }}>Member ID:</span>
                    <span style={{ color: '#FFFFFF' }}>{selectedMember.memberId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: '#94A3B8' }}>Group:</span>
                    <span style={{ color: '#FFFFFF' }}>{selectedMember.groupNumber}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 style={{ color: '#FFFFFF' }} className="font-semibold mb-3">
                  Active Conditions
                </h3>
                <div className="space-y-2">
                  {selectedMember.conditions.map((condition, idx) => (
                    <div
                      key={idx}
                      className="px-3 py-2 rounded text-sm"
                      style={{ backgroundColor: '#334155', color: '#FFFFFF' }}
                    >
                      {condition}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 style={{ color: '#FFFFFF' }} className="font-semibold mb-3">
                  Active Cases
                </h3>
                <div className="space-y-2">
                  {memberCases.map((caseItem) => (
                    <div
                      key={caseItem.id}
                      className="p-3 rounded text-sm"
                      style={{ backgroundColor: '#334155', borderLeft: `3px solid #06B6D4` }}
                    >
                      <p style={{ color: '#FFFFFF' }} className="font-semibold">
                        {caseItem.id}
                      </p>
                      <p style={{ color: '#94A3B8' }} className="text-xs">
                        {caseItem.caseType}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-sm">
                <div className="flex justify-between mb-2">
                  <span style={{ color: '#94A3B8' }}>Enrolled:</span>
                  <span style={{ color: '#FFFFFF' }}>
                    {new Date(selectedMember.enrollmentDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: '#94A3B8' }}>Last Contact:</span>
                  <span style={{ color: '#FFFFFF' }}>
                    {new Date(selectedMember.lastContact).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
