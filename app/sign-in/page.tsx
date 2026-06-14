import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { AuthForm } from '@/components/auth-form'
import Image from 'next/image'

export const metadata = {
  title: 'Sign In - HelixOS',
}

export default async function SignInPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (session?.user) redirect('/')

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2" style={{ backgroundColor: '#0F172A' }}>
      {/* Left Column - Hero Image */}
      <div className="hidden md:flex items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, #06B6D4 0%, transparent 50%), radial-gradient(circle at 80% 80%, #10B981 0%, transparent 50%)',
        }}></div>
        <Image
          src="/auth-hero.png"
          alt="HelixOS - Case Management System"
          width={500}
          height={600}
          className="relative z-10 object-cover rounded-lg"
          priority
        />
      </div>

      {/* Right Column - Form */}
      <div className="flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold mb-2" style={{ color: '#FFFFFF' }}>
                Welcome back
              </h1>
              <p style={{ color: '#94A3B8' }}>
                Sign in to your HelixOS account to manage cases and members
              </p>
            </div>
            <AuthForm mode="sign-in" />
            <p className="text-center text-sm" style={{ color: '#94A3B8' }}>
              Don&apos;t have an account?{' '}
              <a href="/sign-up" className="font-semibold hover:opacity-80 transition-opacity" style={{ color: '#06B6D4' }}>
                Create one
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
