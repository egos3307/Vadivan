import LoginForm from './LoginForm'

export default function AdminLoginPage() {
  return (
    <main className="admin-login" style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: '#f8f9fa'
    }}>
      <LoginForm />
    </main>
  )
}
