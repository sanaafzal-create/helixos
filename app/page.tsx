import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export const metadata = {
  title: 'Dashboard - HelixOS',
}

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  // Skip auth check during build when DATABASE_URL is not set
  if (process.env.DATABASE_URL) {
    const session = await auth.api.getSession({ headers: await headers() })
    
    // Redirect to sign-in if not authenticated
    if (!session?.user) {
      redirect('/sign-in')
    }
    
    // Redirect to dashboard
    redirect('/dashboard')
  }
  
  // During build, redirect to demo
  return redirect('/demo')
}
