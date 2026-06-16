import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export const metadata = {
  title: 'Dashboard - HelixOS',
}

export default async function HomePage() {
  const session = await auth.api.getSession({ headers: await headers() })
  
  // Redirect to sign-in if not authenticated
  if (!session?.user) {
    redirect('/sign-in')
  }
  
  // Redirect to dashboard
  redirect('/dashboard')
}
