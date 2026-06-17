'use client'

import { useState, useMemo } from 'react'
import { Clock, AlertCircle, CheckCircle, Filter } from 'lucide-react'
import { getFollowUps, getContact } from '@/lib/outreach-seeds'

export default function FollowUpsPage() {
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterPriority, setFilterPriority] = useState('all')
  const followUps = getFollowUps()

  const filteredFollowUps = useMemo(() => {
    return followUps.filter(fup => {
      const matchesStatus = filterStatus === 'all' || fup.status === filterStatus
      const matchesPriority = filterPriority === 'all' || fup.priority === filterPriority
      return matchesStatus && matchesPriority
    })
  }, [followUps, filterStatus, filterPriority])

  const overdue = filteredFollowUps.filter(f => f.status === 'overdue')
  const pending = filteredFollowUps.filter(f => f.status === 'pending')
  const completed = filteredFollowUps.filter(f => f.status === 'completed')

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#0F172A' }}>
      {/* Header */}
      <div className="border-b p-8" style={{ borderColor: '#334155', backgroundColor: '#1E293B' }}>
        <div className="mb-6">
          <h1 className="text-4xl font-bold" style={{ color: '#FFFFFF' }}>
            Follow-Up Management
          </h1>
          <p style={{ color: '#94A3B8' }} className="text-lg mt-1">
            Track and manage all follow-up activities
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="p-3 rounded-lg" style={{ backgroundColor: '#0F172A' }}>
            <p style={{ color: '#94A3B8' }} className="text-sm mb-1">
              Total Follow-Ups
            </p>
            <p style={{ color: '#FFFFFF' }} className="text-2xl font-bold">
              {followUps.length}
            </p>
          </div>
          <div
            className="p-3 rounded-lg border-l-4"
            style={{ backgroundColor: '#0F172A', borderColor: '#EF4444' }}
          >
            <p style={{ color: '#94A3B8' }} className="text-sm mb-1">
              Overdue
            </p>
            <p style={{ color: '#EF4444' }} className="text-2xl font-bold">
              {overdue.length}
            </p>
          </div>
          <div
            className="p-3 rounded-lg border-l-4"
            style={{ backgroundColor: '#0F172A', borderColor: '#F59E0B' }}
          >
            <p style={{ color: '#94A3B8' }} className="text-sm mb-1">
              Pending
            </p>
            <p style={{ color: '#F59E0B' }} className="text-2xl font-bold">
              {pending.length}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-3 flex-wrap">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 pr-10 rounded-lg border text-sm appearance-none cursor-pointer"
            style={{ backgroundColor: '#0F172A', borderColor: '#475569', color: '#FFFFFF' }}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="overdue">Overdue</option>
            <option value="completed">Completed</option>
          </select>

          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-3 py-2 pr-10 rounded-lg border text-sm appearance-none cursor-pointer"
            style={{ backgroundColor: '#0F172A', borderColor: '#475569', color: '#FFFFFF' }}
          >
            <option value="all">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        {overdue.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-5 h-5" style={{ color: '#EF4444' }} />
              <h2 className="text-xl font-bold" style={{ color: '#FFFFFF' }}>
                Overdue Follow-Ups ({overdue.length})
              </h2>
            </div>
            <div className="space-y-3">
              {overdue.map(fup => (
                <div
                  key={fup.id}
                  className="p-4 rounded-lg border-l-4"
                  style={{
                    borderColor: '#EF4444',
                    backgroundColor: '#1E293B',
                    borderTopColor: '#334155',
                    borderRightColor: '#334155',
                    borderBottomColor: '#334155',
                  }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold" style={{ color: '#FFFFFF' }}>
                        {fup.description}
                      </h3>
                      <p style={{ color: '#94A3B8' }} className="text-sm mt-1">
                        {fup.action}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className="text-xs px-2 py-1 rounded"
                        style={{
                          backgroundColor: '#EF444440',
                          color: '#EF4444',
                        }}
                      >
                        {fup.priority}
                      </span>
                      <button
                        className="px-3 py-1 rounded text-sm font-medium"
                        style={{ backgroundColor: '#10B981', color: '#0F172A' }}
                      >
                        Mark Complete
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span style={{ color: '#94A3B8' }}>
                      Assigned to {fup.assignedTo}
                    </span>
                    <span style={{ color: '#EF4444' }}>
                      Was due {new Date(fup.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5" style={{ color: '#F59E0B' }} />
            <h2 className="text-xl font-bold" style={{ color: '#FFFFFF' }}>
              Pending Follow-Ups ({pending.length})
            </h2>
          </div>
          <div className="space-y-3">
            {pending.map(fup => (
              <div
                key={fup.id}
                className="p-4 rounded-lg border"
                style={{
                  borderColor: '#475569',
                  backgroundColor: '#1E293B',
                }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold" style={{ color: '#FFFFFF' }}>
                      {fup.description}
                    </h3>
                    <p style={{ color: '#94A3B8' }} className="text-sm mt-1">
                      {fup.action}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className="text-xs px-2 py-1 rounded"
                      style={{
                        backgroundColor: fup.priority === 'high' ? '#EF444440' : fup.priority === 'medium' ? '#F59E0B40' : '#10B98140',
                        color: fup.priority === 'high' ? '#EF4444' : fup.priority === 'medium' ? '#F59E0B' : '#10B981',
                      }}
                    >
                      {fup.priority}
                    </span>
                    <button
                      className="px-3 py-1 rounded text-sm font-medium"
                      style={{ backgroundColor: '#10B981', color: '#0F172A' }}
                    >
                      Complete
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span style={{ color: '#94A3B8' }}>
                    Assigned to {fup.assignedTo}
                  </span>
                  <span style={{ color: '#94A3B8' }}>
                    Due {new Date(fup.dueDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {completed.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-5 h-5" style={{ color: '#10B981' }} />
              <h2 className="text-xl font-bold" style={{ color: '#FFFFFF' }}>
                Completed Follow-Ups ({completed.length})
              </h2>
            </div>
            <div className="space-y-3">
              {completed.map(fup => (
                <div
                  key={fup.id}
                  className="p-4 rounded-lg border opacity-75"
                  style={{
                    borderColor: '#475569',
                    backgroundColor: '#1E293B',
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold line-through" style={{ color: '#94A3B8' }}>
                        {fup.description}
                      </h3>
                      <p style={{ color: '#94A3B8' }} className="text-sm mt-1">
                        Completed {fup.completedDate && new Date(fup.completedDate).toLocaleDateString()}
                      </p>
                    </div>
                    <span
                      className="text-xs px-2 py-1 rounded"
                      style={{
                        backgroundColor: '#10B98140',
                        color: '#10B981',
                      }}
                    >
                      complete
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
