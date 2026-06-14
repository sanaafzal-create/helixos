import { getProviders } from '@/app/actions/providers-members'
import Link from 'next/link'

export const metadata = {
  title: 'Providers - HelixOS',
}

export default async function ProvidersPage() {
  const providers = await getProviders()

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2" style={{ color: '#FFFFFF' }}>
            Providers
          </h1>
          <p style={{ color: '#94A3B8' }}>
            Manage healthcare providers and specialists
          </p>
        </div>
        <Link
          href="/providers/new"
          className="px-6 py-3 rounded-lg font-semibold"
          style={{ backgroundColor: '#06B6D4', color: '#0F172A' }}
        >
          Add Provider
        </Link>
      </div>

      {providers.length > 0 ? (
        <div className="overflow-x-auto border rounded-lg" style={{ borderColor: '#334155' }}>
          <table className="w-full">
            <thead style={{ backgroundColor: '#1E293B', borderBottomColor: '#334155' }} className="border-b">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#94A3B8' }}>
                  Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#94A3B8' }}>
                  Title
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#94A3B8' }}>
                  Email
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#94A3B8' }}>
                  Organization
                </th>
              </tr>
            </thead>
            <tbody>
              {providers.map((provider: any) => (
                <tr
                  key={provider.id}
                  className="border-b hover:opacity-80 cursor-pointer"
                  style={{ backgroundColor: '#1E293B', borderBottomColor: '#334155' }}
                >
                  <td className="px-6 py-4" style={{ color: '#FFFFFF' }}>
                    {provider.name}
                  </td>
                  <td className="px-6 py-4" style={{ color: '#94A3B8' }}>
                    {provider.title || '-'}
                  </td>
                  <td className="px-6 py-4" style={{ color: '#94A3B8' }}>
                    {provider.email || '-'}
                  </td>
                  <td className="px-6 py-4" style={{ color: '#94A3B8' }}>
                    {provider.organization || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div
          className="p-12 rounded-lg border text-center"
          style={{ backgroundColor: '#1E293B', borderColor: '#334155' }}
        >
          <p style={{ color: '#94A3B8' }} className="mb-4">
            No providers yet. Create your first provider to get started.
          </p>
          <Link
            href="/providers/new"
            style={{ color: '#06B6D4' }}
            className="font-semibold hover:opacity-80"
          >
            Add Provider →
          </Link>
        </div>
      )}
    </div>
  )
}
