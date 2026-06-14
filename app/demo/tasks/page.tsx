'use client'

import { demoTasks } from '@/lib/demo-data'
import { CheckSquare, AlertCircle, Clock } from 'lucide-react'
import { useState } from 'react'

export default function DemoTasksPage() {
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredTasks = statusFilter === 'all' ? demoTasks : demoTasks.filter((t) => t.status === statusFilter)

  return (
    <div style={{ backgroundColor: '#0F172A' }} className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2" style={{ color: '#FFFFFF' }}>
          Tasks
        </h1>
        <p style={{ color: '#94A3B8' }}>
          Track and manage care coordination activities
        </p>
      </div>

      <div className="mb-6 flex gap-4">
        {['all', 'pending', 'completed'].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className="px-6 py-2 rounded-lg font-semibold transition-all"
            style={{
              backgroundColor: statusFilter === status ? '#06B6D4' : '#1E293B',
              color: statusFilter === status ? '#0F172A' : '#94A3B8',
              borderColor: '#334155',
            }}
          >
            {status === 'all' ? 'All Tasks' : status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid gap-4">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className="p-6 rounded-lg border hover:opacity-80 transition-opacity cursor-pointer"
            style={{
              backgroundColor: '#1E293B',
              borderColor: '#334155',
              borderLeft: `4px solid ${
                task.status === 'pending'
                  ? task.priority === 'high'
                    ? '#EF4444'
                    : '#F59E0B'
                  : '#10B981'
              }`,
            }}
          >
            <div className="flex items-start gap-4">
              <div className="pt-1">
                {task.status === 'pending' ? (
                  <Circle className="w-5 h-5" style={{ color: '#06B6D4' }} />
                ) : (
                  <CheckCircle className="w-5 h-5" style={{ color: '#10B981' }} />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold flex-1" style={{ color: '#FFFFFF' }}>
                    {task.title}
                  </h3>
                  <div className="flex gap-2">
                    <span
                      className="px-2 py-1 rounded text-xs font-semibold"
                      style={{
                        backgroundColor:
                          task.status === 'pending'
                            ? task.priority === 'high'
                              ? '#EF444440'
                              : '#F59E0B40'
                            : '#10B98140',
                        color:
                          task.status === 'pending'
                            ? task.priority === 'high'
                              ? '#EF4444'
                              : '#F59E0B'
                            : '#10B981',
                      }}
                    >
                      {task.status}
                    </span>
                  </div>
                </div>
                <p style={{ color: '#94A3B8' }} className="text-sm mb-3">
                  {task.description}
                </p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div>
                    <span style={{ color: '#94A3B8' }}>Member:</span>
                    <span style={{ color: '#FFFFFF' }} className="ml-2">
                      {task.member}
                    </span>
                  </div>
                  <div>
                    <span style={{ color: '#94A3B8' }}>Case:</span>
                    <span style={{ color: '#FFFFFF' }} className="ml-2">
                      {task.caseId}
                    </span>
                  </div>
                  <div>
                    <span style={{ color: '#94A3B8' }}>Assigned:</span>
                    <span style={{ color: '#FFFFFF' }} className="ml-2">
                      {task.assignedTo}
                    </span>
                  </div>
                  <div>
                    <span style={{ color: '#94A3B8' }}>Due:</span>
                    <span style={{ color: '#FFFFFF' }} className="ml-2">
                      {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function CheckCircle({ className, style }: { className: string; style: any }) {
  return (
    <svg className={className} style={style} fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
  )
}

function Circle({ className, style }: { className: string; style: any }) {
  return (
    <svg className={className} style={style} fill="currentColor" viewBox="0 0 20 20">
      <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}
