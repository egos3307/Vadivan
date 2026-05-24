import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const isAdminRoute = req.nextUrl.pathname.startsWith('/admin')

  if (isAdminRoute) {
    const token = req.cookies.get('admin-token')

    if (!token) {
      return NextResponse.redirect(new URL('/admin/giris', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
