import { getMembers } from '@/app/actions/providers-members'
import Link from 'next/link'

export const metadata = {
  title: 'Members - HelixOS',
}

export default async function MembersPage() {
  const members = await getMembers()

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2" style={{ color: '#FFFFFF' }}>
            Members
          </h1>
          <p style={{ color: '#94A3B8' }}>
            Manage member information and cases
          </p>
        </div>
        <Link
          href="/members/new"
          className="px-6 py-3 rounded-lg font-semibold"
          style={{ backgroundColor: '#06B6D4', color: '#0F172A' }}
        >
          Add Member
        </Link>
      </div>

      {members.length > 0 ? (
        <div className="overflow-x-auto border rounded-lg" style={{ borderColor: '#334155' }}>
          <table className="w-full">
            <thead style={{ backgroundColor: '#1E293B', borderBottomColor: '#334155' }} className="border-b">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#94A3B8' }}>
                  Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#94A3B8' }}>
                  Email
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#94A3B8' }}>
                  Phone
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#94A3B8' }}>
                  Member ID
                </th>
              </tr>
            </thead>
            <tbody>
              {members.map((member: any) => (
                <tr
                  key={member.id}
                  className="border-b hover:opacity-80 cursor-pointer"
                  style={{ backgroundColor: '#1E293B', borderBottomColor: '#334155' }}
                >
                  <td className="px-6 py-4" style={{ color: '#FFFFFF' }}>
                    {member.firstName} {member.lastName}
                  </td>
                  <td className="px-6 py-4" style={{ color: '#94A3B8' }}>
                    {member.email || '-'}
                  </td>
                  <td className="px-6 py-4" style={{ color: '#94A3B8' }}>
                    {member.phone || '-'}
                  </td>
                  <td className="px-6 py-4" style={{ color: '#94A3B8' }}>
                    {member.memberId || '-'}
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
            No members yet. Create your first member to get started.
          </p>
          <Link
            href="/members/new"
            style={{ color: '#06B6D4' }}
            className="font-semibold hover:opacity-80"
          >
            Add Member →
          </Link>
        </div>
      )}
    </div>
  )
}
