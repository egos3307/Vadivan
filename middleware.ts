import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  
  // Login sayfasına her zaman izin ver
  if (path === '/admin/giris') {
    return NextResponse.next()
  }

  // Admin token kontrolü
  const adminToken = req.cookies.get('admin-token')

  if (!adminToken || adminToken.value !== 'local-admin') {
    // Giriş yapılmamışsa giriş sayfasına yönlendir
    const loginUrl = new URL('/admin/giris', req.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
}
