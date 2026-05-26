'use client'

import { useState } from 'react'
import { formatPrice } from '@/lib/tours'

export default function ReservationManager({ tours }: { tours: any[] }) {
  const [selectedTour, setSelectedTour] = useState<any>(null)
  const [selectedDate, setSelectedDate] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  async function handleAddCustomer(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!selectedDate) return

    setLoading(true)
    const formData = new FormData(e.currentTarget)
    const payload = {
      customerName: formData.get('customerName'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      personCount: Number(formData.get('personCount')),
      tourDateId: selectedDate.id
    }

    try {
      const res = await fetch('/api/admin/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const result = await res.json()
      if (res.ok && result.success) {
        alert('Müşteri başarıyla eklendi!')
        window.location.reload() // Update list
      } else {
        alert('Hata: ' + result.message)
      }
    } catch (err) {
      alert('Bir hata oluştu.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'grid', gap: '30px' }}>
      {/* Tour Selection */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {tours.map(tour => (
          <div 
            key={tour.id} 
            onClick={() => { setSelectedTour(tour); setSelectedDate(null); }}
            style={{ 
              background: '#fff', 
              padding: '20px', 
              borderRadius: '20px', 
              cursor: 'pointer',
              border: selectedTour?.id === tour.id ? '2px solid #8a4f17' : '1px solid #eee',
              boxShadow: '0 10px 20px rgba(0,0,0,0.03)'
            }}
          >
            <img src={tour.coverImage} style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '12px', marginBottom: '15px' }} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: '800' }}>{tour.title}</h3>
            <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '5px' }}>{tour.dates.length} Farklı Tarih</p>
          </div>
        ))}
      </div>

      {/* Date Selection */}
      {selectedTour && (
        <div style={{ background: '#fff', padding: '30px', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '20px' }}>{selectedTour.title} - Tarih Seçin</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {selectedTour.dates.map((date: any) => (
              <button 
                key={date.id}
                onClick={() => setSelectedDate(date)}
                style={{ 
                  padding: '12px 20px', 
                  borderRadius: '12px', 
                  border: '1px solid #eee',
                  background: selectedDate?.id === date.id ? '#8a4f17' : '#f9f9f9',
                  color: selectedDate?.id === date.id ? '#fff' : '#171717',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                {new Date(date.startDate).toLocaleDateString('tr-TR')} - {new Date(date.endDate).toLocaleDateString('tr-TR')}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Reservation Management */}
      {selectedDate && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '30px' }}>
          {/* Add Customer Form */}
          <div style={{ background: '#fff', padding: '30px', borderRadius: '24px', height: 'fit-content' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '20px' }}>Müşteri Kaydet</h3>
            <form onSubmit={handleAddCustomer} style={{ display: 'grid', gap: '15px' }}>
              <label style={{ fontSize: '0.9rem', fontWeight: '700' }}>
                Müşteri Ad Soyad
                <input name="customerName" required style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #ddd', marginTop: '5px' }} />
              </label>
              <label style={{ fontSize: '0.9rem', fontWeight: '700' }}>
                Telefon Numarası
                <input name="phone" required style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #ddd', marginTop: '5px' }} />
              </label>
              <label style={{ fontSize: '0.9rem', fontWeight: '700' }}>
                E-posta (Opsiyonel)
                <input name="email" type="email" style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #ddd', marginTop: '5px' }} />
              </label>
              <label style={{ fontSize: '0.9rem', fontWeight: '700' }}>
                Kişi Sayısı
                <input name="personCount" type="number" min="1" defaultValue="1" required style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #ddd', marginTop: '5px' }} />
              </label>
              <button disabled={loading} style={{ background: '#2a4d44', color: '#fff', border: 'none', padding: '15px', borderRadius: '12px', fontWeight: '800', cursor: 'pointer', marginTop: '10px' }}>
                {loading ? 'Kaydediliyor...' : 'Müşteriyi Kaydet'}
              </button>
            </form>
          </div>

          {/* Guest List */}
          <div style={{ background: '#fff', padding: '30px', borderRadius: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800' }}>Müşteri Listesi</h3>
              <span style={{ fontSize: '0.9rem', color: '#666' }}>{selectedDate.reservations.length} Kayıt</span>
            </div>
            {selectedDate.reservations.length > 0 ? (
              <div style={{ display: 'grid', gap: '10px' }}>
                {selectedDate.reservations.map((res: any) => (
                  <div key={res.id} style={{ padding: '15px', borderRadius: '15px', border: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: '800' }}>{res.customerName}</div>
                      <div style={{ fontSize: '0.8rem', color: '#888' }}>{res.phone} • {res.personCount} Kişi</div>
                    </div>
                    <div style={{ background: '#f3faf6', color: '#2a4d44', padding: '5px 12px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '700' }}>
                      Ödendi
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: '#888', textAlign: 'center', padding: '40px 0' }}>Bu tarih için henüz kayıtlı müşteri yok.</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
