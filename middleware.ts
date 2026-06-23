import { NextRequest, NextResponse } from 'next/server'
import { getSessionCookie } from 'better-auth/cookies'

// Routes that do not require authentication.
const PUBLIC_PATHS = ['/sign-in', '/sign-up', '/demo']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isPublic = PUBLIC_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  )
  if (isPublic) {
    return NextResponse.next()
  }

  // Optimistic check: presence of the session cookie. The full session is
  // still verified in the (dashboard) layout / server actions.
  const sessionCookie = getSessionCookie(request)
  if (!sessionCookie) {
    const signInUrl = new URL('/sign-in', request.url)
    return NextResponse.redirect(signInUrl)
  }

  return NextResponse.next()
}

export const config = {
  // Run on everything except API routes, Next internals, and static files.
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}
