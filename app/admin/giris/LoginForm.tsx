'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    
    const formData = new FormData(e.currentTarget)
    const password = formData.get('password')
    
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      })
      
      const result = await res.json()
      
      if (res.ok && result.success) {
        router.push('/admin/turlar')
        router.refresh()
      } else {
        setError(result.message || 'Giriş başarısız oldu.')
      }
    } catch (err: any) {
      setError('Bağlantı hatası oluştu. Lütfen sayfayı yenileyip tekrar deneyin.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="admin-login-card" style={{
      background: 'white',
      padding: '2.5rem',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      width: '100%',
      maxWidth: '400px'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <p style={{ color: '#8a4f17', fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '0.5rem' }}>VadiVan Gezi</p>
        <h1 style={{ fontSize: '1.5rem', color: '#333', marginBottom: '0.5rem' }}>Yönetim Paneli</h1>
        <p style={{ color: '#666', fontSize: '0.9rem' }}>Lütfen erişim şifresini girin.</p>
      </div>

      {error && (
        <div style={{ 
          background: '#fef2f2', 
          color: '#dc2626', 
          padding: '10px', 
          borderRadius: '6px', 
          marginBottom: '1.5rem',
          fontSize: '0.85rem',
          textAlign: 'center',
          border: '1px solid #fee2e2'
        }}>
          {error}
        </div>
      )}

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#444' }}>
          Şifre
          <input 
            name="password" 
            type="password" 
            placeholder="Şifreyi girin" 
            required 
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '6px',
              border: '1px solid #ddd',
              marginTop: '0.4rem',
              fontSize: '1rem'
            }}
          />
        </label>
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="button primary full"
        style={{
          width: '100%',
          padding: '0.75rem',
          background: '#8a4f17',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          fontSize: '1rem',
          fontWeight: '600',
          cursor: 'pointer',
          opacity: loading ? 0.7 : 1
        }}
      >
        {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
      </button>
    </form>
  )
}
