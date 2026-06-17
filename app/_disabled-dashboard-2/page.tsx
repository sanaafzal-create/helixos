import { getCasesForUser, getTasksForUser, getFollowUpsForUser, getMembersCount, getProvidersCount } from '@/app/actions/dashboard'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

export const metadata = {
  title: 'Dashboard - HelixOS',
}

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  const [cases, tasks, followUps] = await Promise.all([
    getCasesForUser(),
    getTasksForUser(),
    getFollowUpsForUser(),
  ])

  return (
    <div className="p-8 space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-4xl font-bold mb-2" style={{ color: '#FFFFFF' }}>
          Welcome, {session?.user?.name}
        </h1>
        <p style={{ color: '#94A3B8' }}>
          Here's an overview of your case management system
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="p-6 rounded-lg border" style={{ backgroundColor: '#1E293B', borderColor: '#334155' }}>
          <h3 className="text-sm font-semibold mb-2" style={{ color: '#94A3B8' }}>
            Active Cases
          </h3>
          <p className="text-3xl font-bold" style={{ color: '#10B981' }}>
            {cases.length}
          </p>
        </div>
        <div className="p-6 rounded-lg border" style={{ backgroundColor: '#1E293B', borderColor: '#334155' }}>
          <h3 className="text-sm font-semibold mb-2" style={{ color: '#94A3B8' }}>
            Pending Tasks
          </h3>
          <p className="text-3xl font-bold" style={{ color: '#06B6D4' }}>
            {tasks.length}
          </p>
        </div>
        <div className="p-6 rounded-lg border" style={{ backgroundColor: '#1E293B', borderColor: '#334155' }}>
          <h3 className="text-sm font-semibold mb-2" style={{ color: '#94A3B8' }}>
            Upcoming Follow-ups
          </h3>
          <p className="text-3xl font-bold" style={{ color: '#F59E0B' }}>
            {followUps.length}
          </p>
        </div>
        <div className="p-6 rounded-lg border" style={{ backgroundColor: '#1E293B', borderColor: '#334155' }}>
          <h3 className="text-sm font-semibold mb-2" style={{ color: '#94A3B8' }}>
            System Status
          </h3>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#10B981' }}></div>
            <span className="text-sm" style={{ color: '#10B981' }}>
              Operational
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Cases */}
        <div className="lg:col-span-2 p-6 rounded-lg border" style={{ backgroundColor: '#1E293B', borderColor: '#334155' }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold" style={{ color: '#FFFFFF' }}>
              Active Cases
            </h2>
            <a href="/cases" style={{ color: '#06B6D4' }} className="text-sm font-semibold hover:opacity-80">
              View All →
            </a>
          </div>
          {cases.length > 0 ? (
            <div className="space-y-3">
              {cases.slice(0, 5).map((caseItem: any) => (
                <div
                  key={caseItem.id}
                  className="p-3 rounded border"
                  style={{ backgroundColor: '#0F172A', borderColor: '#334155' }}
                >
                  <p style={{ color: '#FFFFFF' }} className="font-medium text-sm">
                    Case #{caseItem.id.slice(0, 8)}
                  </p>
                  <p style={{ color: '#94A3B8' }} className="text-xs">
                    {caseItem.status} • {new Date(caseItem.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: '#94A3B8' }}>No active cases yet. Create your first case to get started.</p>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Follow-ups */}
          <div className="p-6 rounded-lg border" style={{ backgroundColor: '#1E293B', borderColor: '#334155' }}>
            <h2 className="text-xl font-bold mb-4" style={{ color: '#FFFFFF' }}>
              Follow-ups
            </h2>
            {followUps.length > 0 ? (
              <div className="space-y-2 text-sm">
                {followUps.slice(0, 3).map((followUp: any) => (
                  <div key={followUp.id} style={{ color: '#94A3B8' }}>
                    <p>{new Date(followUp.scheduledDate).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: '#94A3B8' }} className="text-sm">
                No follow-ups scheduled.
              </p>
            )}
          </div>

          {/* Recent Activity */}
          <div className="p-6 rounded-lg border" style={{ backgroundColor: '#1E293B', borderColor: '#334155' }}>
            <h2 className="text-xl font-bold mb-4" style={{ color: '#FFFFFF' }}>
              Quick Actions
            </h2>
            <div className="space-y-2">
              <a
                href="/cases/new"
                className="block px-4 py-2 rounded text-center text-sm font-medium"
                style={{ backgroundColor: '#06B6D4', color: '#0F172A' }}
              >
                New Case
              </a>
              <a
                href="/members/new"
                className="block px-4 py-2 rounded text-center text-sm font-medium border"
                style={{ backgroundColor: '#0F172A', borderColor: '#334155', color: '#06B6D4' }}
              >
                Add Member
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
