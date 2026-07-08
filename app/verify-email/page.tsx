'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { Suspense, useState } from 'react'
import { Mail, ArrowLeft, RotateCw } from 'lucide-react'
import { Logo } from '@/components/logo'

function VerifyEmailContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const email = searchParams.get('email') || 'your email'
  const [isResending, setIsResending] = useState(false)
  const [resendSuccess, setResendSuccess] = useState(false)

  const handleResendEmail = async () => {
    setIsResending(true)
    // In a real implementation, this would call an API endpoint to resend the verification email
    setTimeout(() => {
      setIsResending(false)
      setResendSuccess(true)
      setTimeout(() => setResendSuccess(false), 3000)
    }, 1000)
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#0F172A' }}>
      <div className="w-full max-w-md rounded-lg p-8 border" style={{ backgroundColor: '#1E293B', borderColor: '#334155' }}>
        <div className="flex justify-center mb-8">
          <Logo variant="full" size="md" />
        </div>
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-full" style={{ backgroundColor: '#06B6D440' }}>
            <Mail className="w-8 h-8" style={{ color: '#06B6D4' }} />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center mb-2" style={{ color: '#FFFFFF' }}>
          Check your inbox
        </h1>

        <p className="text-center mb-6" style={{ color: '#94A3B8' }}>
          We&apos;ve sent a verification link to:
        </p>

        <p className="text-center font-semibold mb-6" style={{ color: '#06B6D4' }}>
          {email}
        </p>

        <div className="bg-slate-900 p-4 rounded-lg mb-6" style={{ backgroundColor: '#0F172A' }}>
          <p style={{ color: '#94A3B8' }} className="text-sm leading-relaxed">
            Please verify your account by clicking the link in the email. This confirms that you own the email address and helps us keep your account secure.
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <p style={{ color: '#94A3B8' }} className="text-sm">
            Didn&apos;t receive the email? Check your spam folder or try resending it below.
          </p>

          <button
            onClick={handleResendEmail}
            disabled={isResending}
            className="w-full py-2 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-opacity hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: '#06B6D4', color: '#0F172A' }}
          >
            <RotateCw className="w-4 h-4" />
            {isResending ? 'Sending...' : 'Resend verification email'}
          </button>

          {resendSuccess && (
            <p className="text-sm text-center p-3 rounded-lg" style={{ backgroundColor: '#10B98140', color: '#10B981' }}>
              ✓ Verification email sent successfully
            </p>
          )}
        </div>

        <button
          onClick={() => router.push('/sign-in')}
          className="w-full py-2 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-opacity hover:opacity-80 border"
          style={{ backgroundColor: '#1E293B', borderColor: '#475569', color: '#FFFFFF' }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to sign in
        </button>

        <p style={{ color: '#94A3B8' }} className="text-xs text-center mt-6">
          This verification link will expire in 24 hours.
        </p>
      </div>
    </main>
  )
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#0F172A' }} />
      }
    >
      <VerifyEmailContent />
    </Suspense>
  )
}
