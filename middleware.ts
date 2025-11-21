import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Allow login page to be accessed without middleware interference
  if (request.nextUrl.pathname === '/admin/login') {
    return NextResponse.next()
  }

  // For other admin pages, let the layout handle auth
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
