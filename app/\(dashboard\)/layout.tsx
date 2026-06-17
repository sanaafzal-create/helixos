import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  // Skip auth check during build when DATABASE_URL is not set
  if (process.env.DATABASE_URL) {
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session?.user) redirect('/sign-in')
  }

  return (
    <div className="flex h-screen" style={{ backgroundColor: '#0F172A' }}>
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
