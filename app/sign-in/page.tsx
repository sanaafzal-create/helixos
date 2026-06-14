import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { AuthForm } from '@/components/auth-form'
import Link from 'next/link'

export const metadata = {
  title: 'Sign In - HelixOS',
}

export default async function SignInPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (session?.user) redirect('/dashboard')

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4" style={{ backgroundColor: '#0F172A' }}>
      <div className="w-full max-w-md space-y-6">
        {/* Demo Button */}
        <Link href="/demo">
          <button
            className="w-full py-4 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            style={{ backgroundColor: '#10B981', color: '#0F172A' }}
          >
            <span>🚀</span> Launch Demo Workspace
          </button>
        </Link>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px" style={{ backgroundColor: '#334155' }} />
          <span style={{ color: '#94A3B8' }} className="text-sm">or</span>
          <div className="flex-1 h-px" style={{ backgroundColor: '#334155' }} />
        </div>

        {/* Auth Form */}
        <AuthForm mode="sign-in" />
      </div>
    </main>
  )
}

