import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  // Bypassing admin authentication as requested by the user
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
