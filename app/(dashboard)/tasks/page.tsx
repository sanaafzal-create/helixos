import { getTasks } from '@/app/actions/cases-tasks'
import Link from 'next/link'

export const metadata = {
  title: 'Tasks - HelixOS',
}

export default async function TasksPage() {
  const tasks = await getTasks()

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return '#EF4444'
      case 'medium':
        return '#F59E0B'
      case 'low':
        return '#10B981'
      default:
        return '#06B6D4'
    }
  }

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2" style={{ color: '#FFFFFF' }}>
            Tasks
          </h1>
          <p style={{ color: '#94A3B8' }}>
            Manage your case tasks and follow-ups
          </p>
        </div>
        <Link
          href="/tasks/new"
          className="px-6 py-3 rounded-lg font-semibold"
          style={{ backgroundColor: '#06B6D4', color: '#0F172A' }}
        >
          New Task
        </Link>
      </div>

      {tasks.length > 0 ? (
        <div className="space-y-3">
          {tasks.map((task: any) => (
            <div
              key={task.id}
              className="p-4 rounded-lg border flex items-center justify-between"
              style={{ backgroundColor: '#1E293B', borderColor: '#334155' }}
            >
              <div className="flex-1">
                <h3 className="font-semibold" style={{ color: '#FFFFFF' }}>
                  {task.title}
                </h3>
                <p style={{ color: '#94A3B8' }} className="text-sm mt-1">
                  {task.description || 'No description'}
                </p>
              </div>
              <div className="flex items-center gap-4 ml-4">
                <div
                  className="px-3 py-1 rounded text-sm font-semibold"
                  style={{ backgroundColor: getPriorityColor(task.priority || 'medium'), color: '#0F172A' }}
                >
                  {task.priority || 'medium'}
                </div>
                <Link
                  href={`/tasks/${task.id}`}
                  style={{ color: '#06B6D4' }}
                  className="font-semibold hover:opacity-80"
                >
                  View →
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          className="p-12 rounded-lg border text-center"
          style={{ backgroundColor: '#1E293B', borderColor: '#334155' }}
        >
          <p style={{ color: '#94A3B8' }} className="mb-4">
            No tasks yet. Create your first task to get started.
          </p>
          <Link
            href="/tasks/new"
            style={{ color: '#06B6D4' }}
            className="font-semibold hover:opacity-80"
          >
            New Task →
          </Link>
        </div>
      )}
    </div>
  )
}
