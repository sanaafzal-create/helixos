import { getCases } from '@/app/actions/cases-tasks'
import Link from 'next/link'

export const metadata = {
  title: 'Cases - HelixOS',
}

export default async function CasesPage() {
  const cases = await getCases()

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return '#10B981'
      case 'in-progress':
        return '#F59E0B'
      case 'closed':
        return '#94A3B8'
      default:
        return '#06B6D4'
    }
  }

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2" style={{ color: '#FFFFFF' }}>
            Cases
          </h1>
          <p style={{ color: '#94A3B8' }}>
            Track and manage member cases
          </p>
        </div>
        <Link
          href="/cases/new"
          className="px-6 py-3 rounded-lg font-semibold"
          style={{ backgroundColor: '#06B6D4', color: '#0F172A' }}
        >
          New Case
        </Link>
      </div>

      {cases.length > 0 ? (
        <div className="grid gap-4">
          {cases.map((caseItem: any) => (
            <div
              key={caseItem.id}
              className="p-6 rounded-lg border"
              style={{ backgroundColor: '#1E293B', borderColor: '#334155' }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold" style={{ color: '#FFFFFF' }}>
                    Case #{caseItem.id.slice(0, 8)}
                  </h3>
                  <p style={{ color: '#94A3B8' }} className="text-sm mt-1">
                    {caseItem.description || 'No description'}
                  </p>
                </div>
                <div
                  className="px-3 py-1 rounded text-sm font-semibold"
                  style={{ backgroundColor: getStatusColor(caseItem.status), color: '#0F172A' }}
                >
                  {caseItem.status}
                </div>
              </div>
              <div className="flex items-center justify-between text-sm" style={{ color: '#94A3B8' }}>
                <span>{new Date(caseItem.createdAt).toLocaleDateString()}</span>
                <Link
                  href={`/cases/${caseItem.id}`}
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
            No cases yet. Create your first case to get started.
          </p>
          <Link
            href="/cases/new"
            style={{ color: '#06B6D4' }}
            className="font-semibold hover:opacity-80"
          >
            New Case →
          </Link>
        </div>
      )}
    </div>
  )
}
