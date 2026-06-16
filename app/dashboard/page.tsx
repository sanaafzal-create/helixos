import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export const metadata = {
  title: 'Dashboard - HelixOS',
}

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) redirect('/sign-in')

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0F172A' }}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2" style={{ color: '#FFFFFF' }}>
            Welcome, {session.user.name}
          </h1>
          <p style={{ color: '#94A3B8' }}>Manage your cases, members, and providers</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* KPI Cards */}
          <div className="p-6 rounded-lg border" style={{ backgroundColor: '#1E293B', borderColor: '#334155' }}>
            <h3 className="text-sm font-semibold mb-1" style={{ color: '#94A3B8' }}>
              Active Cases
            </h3>
            <p className="text-3xl font-bold" style={{ color: '#FFFFFF' }}>
              0
            </p>
          </div>
          <div className="p-6 rounded-lg border" style={{ backgroundColor: '#1E293B', borderColor: '#334155' }}>
            <h3 className="text-sm font-semibold mb-1" style={{ color: '#94A3B8' }}>
              Pending Tasks
            </h3>
            <p className="text-3xl font-bold" style={{ color: '#FFFFFF' }}>
              0
            </p>
          </div>
          <div className="p-6 rounded-lg border" style={{ backgroundColor: '#1E293B', borderColor: '#334155' }}>
            <h3 className="text-sm font-semibold mb-1" style={{ color: '#94A3B8' }}>
              Members
            </h3>
            <p className="text-3xl font-bold" style={{ color: '#FFFFFF' }}>
              0
            </p>
          </div>
          <div className="p-6 rounded-lg border" style={{ backgroundColor: '#1E293B', borderColor: '#334155' }}>
            <h3 className="text-sm font-semibold mb-1" style={{ color: '#94A3B8' }}>
              Providers
            </h3>
            <p className="text-3xl font-bold" style={{ color: '#FFFFFF' }}>
              0
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content area */}
          <div className="lg:col-span-2">
            <div className="p-6 rounded-lg border" style={{ backgroundColor: '#1E293B', borderColor: '#334155' }}>
              <h2 className="text-xl font-bold mb-4" style={{ color: '#FFFFFF' }}>
                Active Cases
              </h2>
              <p style={{ color: '#94A3B8' }}>
                No cases yet. Create your first case to get started.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="p-6 rounded-lg border" style={{ backgroundColor: '#1E293B', borderColor: '#334155' }}>
              <h2 className="text-xl font-bold mb-4" style={{ color: '#FFFFFF' }}>
                Upcoming Follow-ups
              </h2>
              <p className="text-sm" style={{ color: '#94A3B8' }}>
                No follow-ups scheduled.
              </p>
            </div>
            <div className="p-6 rounded-lg border" style={{ backgroundColor: '#1E293B', borderColor: '#334155' }}>
              <h2 className="text-xl font-bold mb-4" style={{ color: '#FFFFFF' }}>
                Recent Activity
              </h2>
              <p className="text-sm" style={{ color: '#94A3B8' }}>
                No recent activity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
