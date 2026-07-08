import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { LandingPage } from '@/components/landing-page'

export const metadata = {
  title: 'HelixOS — AI-Powered Operations Platform',
  description:
    'HelixOS unifies case management, CRM, tasks, reporting, and secure records into one privacy-first workspace, with an AI copilot that surfaces the next best action.',
}

export default async function HomePage() {
  const session = await auth.api.getSession({ headers: await headers() })

  // Authenticated users go straight to their workspace
  if (session?.user) {
    redirect('/dashboard')
  }

  // Everyone else sees the marketing homepage
  return <LandingPage />
}
