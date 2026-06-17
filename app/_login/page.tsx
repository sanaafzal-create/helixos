import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { AuthForm } from '@/components/auth-form'

export const metadata = {
  title: 'Sign In - HelixOS',
}

export default async function LoginPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (session?.user) redirect('/dashboard')

  return <AuthForm mode="sign-in" />
}
