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
        {/* Auth Form */}
        <AuthForm mode="sign-in" />

        {/* Demo Button */}
        <Link href="/demo">
          <button
            className="w-full py-3 px-6 rounded-lg font-semibold hover:opacity-80 transition-opacity border"
            style={{ backgroundColor: 'transparent', borderColor: '#475569', color: '#06B6D4' }}
          >
            Try Demo Workspace
          </button>
        </Link>
      </div>
    </main>
  )
}

