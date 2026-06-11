import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(req: Request) {
  try {
    const { password } = await req.json()
    const expectedPassword = 'vadi-van-7248'

    if (password !== expectedPassword) {
      return NextResponse.json({ success: false, message: 'Hatalı şifre.' }, { status: 401 })
    }

    const cookieStore = await cookies()
    cookieStore.set('admin-token', 'local-admin', {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 8, // 8 saat
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Login API Error:', error)
    return NextResponse.json({ success: false, message: 'Sunucu hatası.' }, { status: 500 })
  }
}
