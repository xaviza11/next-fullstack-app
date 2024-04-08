import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import jwtVerifier from './app/api/utils/jwtVerifier';

export function middleware(request: NextRequest) {
  const cookie = request.cookies.get("token")
  if (cookie === undefined) return NextResponse.redirect(new URL('/pages/login', request.url))
}

export const config = {
  matcher: ['/pages/dashboard/:path*', '/pages/flightRoutes/:path*']
}