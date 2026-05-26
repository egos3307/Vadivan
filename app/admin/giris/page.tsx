import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

async function login(formData: FormData) {
  'use server'

  const email = String(formData.get('email') || '').trim()
  const password = String(formData.get('password') || '').trim()
  const expectedEmail = process.env.ADMIN_EMAIL
  const expectedPassword = process.env.ADMIN_PASSWORD
  const credentialsConfigured = expectedEmail && expectedPassword
  const isAllowed = credentialsConfigured
    ? email === expectedEmail && password === expectedPassword
    : email.length > 0 && password.length > 0

  if (!isAllowed) {
    redirect('/admin/giris')
  }

  const cookieStore = await cookies()
  cookieStore.set('admin-token', 'local-admin', {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 8,
  })

  redirect('/admin/turlar')
}

export default function AdminLoginPage() {
  return (
    <main className="admin-login">
      <form action={login} className="admin-login-card">
        <p>VadiVan Gezi</p>
        <h1>Admin Giriş</h1>
        <span>
          Tur ekleme paneline erişmek için giriş yapın. Ortam değişkenleri
          tanımlı değilse geliştirme modunda herhangi bir e-posta ve şifre kabul edilir.
        </span>

        <label>
          E-posta
          <input name="email" type="email" placeholder="admin@vadivan.com" required />
        </label>

        <label>
          Şifre
          <input name="password" type="password" placeholder="Şifre" required />
        </label>

        <button type="submit" className="button primary full">
          Giriş Yap
        </button>
      </form>
    </main>
  )
}
