'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ReservationManager({ tours }: { tours: any[] }) {
  const [selectedTour, setSelectedTour] = useState<any>(null)

  return (
    <div style={{ display: 'grid', gap: '30px' }}>
      {tours.length === 0 ? (
        <div style={{ 
          background: '#fff', 
          padding: '60px', 
          borderRadius: '24px', 
          textAlign: 'center',
          boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
          border: '1px solid #eee'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🗺️</div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '10px' }}>Henüz Tur Eklenmemiş</h2>
          <p style={{ color: '#666', marginBottom: '30px' }}>Rezervasyon yönetebilmek için önce bir tur oluşturmalısınız.</p>
          <Link href="/admin/turlar" className="button primary" style={{ background: '#8a4f17', padding: '12px 30px' }}>
            Tur Oluşturmaya Git
          </Link>
        </div>
      ) : (
        <>
          {/* Tour Selection */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {tours.map(tour => (
              <div 
                key={tour.id} 
                onClick={() => setSelectedTour(tour)}
                style={{ 
                  background: '#fff', 
                  padding: '20px', 
                  borderRadius: '20px', 
                  cursor: 'pointer',
                  border: selectedTour?.id === tour.id ? '2px solid #8a4f17' : '1px solid #eee',
                  boxShadow: '0 10px 20px rgba(0,0,0,0.03)',
                  transition: 'all 0.2s'
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
              <div style={{ display: 'grid', gap: '15px', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
                {selectedTour.dates.map((date: any) => {
                  const totalOccupancy = date.reservations.reduce((acc: number, res: any) => acc + res.personCount, 0)
                  
                  return (
                    <Link 
                      key={date.id}
                      href={`/admin/rezervasyonlar/${date.id}`}
                      style={{ 
                        padding: '20px', 
                        borderRadius: '16px', 
                        border: '1px solid #eee',
                        background: '#f9f9f9',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        transition: 'all 0.2s',
                        textDecoration: 'none',
                        color: 'inherit'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.borderColor = '#8a4f17'}
                      onMouseOut={(e) => e.currentTarget.style.borderColor = '#eee'}
                    >
                      <div style={{ fontWeight: '800', fontSize: '1.1rem' }}>
                        {new Date(date.startDate).toLocaleDateString('tr-TR')} - {new Date(date.endDate).toLocaleDateString('tr-TR')}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '5px' }}>
                        <span style={{ fontSize: '0.9rem', color: '#666' }}>
                          Doluluk: <strong>{totalOccupancy} / {date.capacity}</strong>
                        </span>
                        <span style={{ 
                          padding: '4px 10px', 
                          borderRadius: '8px', 
                          background: '#fff', 
                          border: '1px solid #ddd', 
                          fontSize: '0.75rem', 
                          fontWeight: '700' 
                        }}>
                          Yönet →
                        </span>
                      </div>
                    </Link>
                  )
                })}
              </div>
              {selectedTour.dates.length === 0 && (
                <p style={{ color: '#888', textAlign: 'center', padding: '20px' }}>Bu tur için henüz tarih eklenmemiş.</p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}
