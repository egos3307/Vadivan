import { notFound } from 'next/navigation'
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import { prisma } from '@/lib/prisma'
import { formatPrice } from '@/lib/tours'

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ slug: string }>
}

export default async function TourDetailPage({ params }: Props) {
  const { slug } = await params
  const tour = await prisma.tour.findUnique({
    where: { slug },
    include: {
      programs: {
        orderBy: { day: 'asc' },
      },
      dates: {
        orderBy: { startDate: 'asc' },
      },
    },
  })

  if (!tour) {
    notFound()
  }

  // Parse JSON strings back to arrays
  const highlights = JSON.parse(tour.highlights || '[]') as string[]
  const included = JSON.parse(tour.included || '[]') as string[]
  const excluded = JSON.parse(tour.excluded || '[]') as string[]
  const images = JSON.parse(tour.images || '[]') as string[]

  const lowestPrice = tour.dates[0]?.price || 0

  const reviews = [
    {
      id: 1,
      name: 'Ahmet Yılmaz',
      initials: 'AY',
      comment: 'VadiVan ile yaptığımız bu tur hayatımın en iyi deneyimlerinden biriydi. Rehberimiz Selçuk Bey\'in bilgisi ve organizasyonun kalitesi harikaydı. Kesinlikle tavsiye ederim!',
      rating: 5,
    },
    {
      id: 2,
      name: 'Selin Demir',
      initials: 'SD',
      comment: 'Akdamar Adası büyüleyiciydi. Otel seçimleri ve yemek durakları çok özenliydi. Bir yıldızı havalimanı transferindeki kısa bekleyiş nedeniyle kırdım ama genel olarak muazzam.',
      rating: 4,
    },
  ]

  return (
    <main className="site-shell">
      <Navbar />

      {/* Hero Section */}
      <section className="detail-hero" style={{ height: '75vh', position: 'relative', overflow: 'hidden' }}>
        <img src={tour.coverImage} alt={tour.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)' }} />
        <div className="site-container" style={{ position: 'absolute', bottom: '80px', left: '50%', transform: 'translateX(-50%)', color: '#fff', width: '100%' }}>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
            <span style={{ background: '#ff8c00', padding: '6px 16px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '850', letterSpacing: '0.05em' }}>POPÜLER TUR</span>
            <div style={{ color: '#FFD700', fontSize: '1.2rem' }}>★★★★★</div>
          </div>
          <h1 style={{ fontSize: 'clamp(3rem, 7vw, 5rem)', fontWeight: '900', marginBottom: '24px', lineHeight: '1.1' }}>{tour.title}</h1>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', fontSize: '1.1rem', fontWeight: '700', opacity: '0.95' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              {tour.duration}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              Maksimum {tour.maxCapacity} Kişi
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              {tour.location}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="site-container detail-layout">
          <div className="detail-main">
            {/* Highlights from Image */}
            <section className="content-block">
              <h2 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '24px', color: '#171717' }}>Tur Hakkında</h2>
              <p style={{ lineHeight: '1.85', color: '#5c5c62', fontSize: '1.1rem' }}>{tour.description}</p>
            </section>

            {/* Program Section */}
            <section className="content-block">
              <h2 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '30px', color: '#171717' }}>Tur Programı</h2>
              <div className="program-list" style={{ display: 'grid', gap: '24px' }}>
                {tour.programs.length > 0 ? (
                  tour.programs.map((program, idx) => (
                    <article className="program-item" key={program.id} style={{ border: 'none', background: '#f8f9fa', borderRadius: '20px', padding: '30px', display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
                      <span style={{ 
                        background: '#fff', 
                        minWidth: '56px', 
                        height: '56px', 
                        borderRadius: '16px', 
                        display: 'grid', 
                        placeItems: 'center', 
                        color: '#ff8c00', 
                        fontSize: '1.4rem', 
                        fontWeight: '900', 
                        boxShadow: '0 8px 20px rgba(0,0,0,0.06)' 
                      }}>
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ fontSize: '1.35rem', fontWeight: '800', marginBottom: '12px', color: '#ff8c00' }}>{program.title}</h3>
                        <p style={{ color: '#5c5c62', fontSize: '1rem', lineHeight: '1.7' }}>{program.description}</p>
                        {/* Mock Sub-points if available or placeholder */}
                        <ul style={{ marginTop: '15px', paddingLeft: '20px', color: '#666', fontSize: '0.9rem', listStyle: 'disc' }}>
                           <li>Detaylı rota keşfi</li>
                           <li>Yerel lezzet durakları</li>
                        </ul>
                      </div>
                    </article>
                  ))
                ) : (
                  <p>Program detayları yakında eklenecek.</p>
                )}
              </div>
            </section>

            {/* Included / Excluded Grid */}
            <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '48px' }}>
              <div style={{ background: '#f0f9f4', padding: '40px', borderRadius: '28px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#2a4d44', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid #2a4d44', display: 'grid', placeItems: 'center' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  Dahil Olanlar
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '16px' }}>
                  {included.map((item, i) => (
                    <li key={i} style={{ color: '#4a5568', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                       <span style={{ color: '#2a4d44', fontWeight: '900' }}>✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ background: '#fff5f5', padding: '40px', borderRadius: '28px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#c53030', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid #c53030', display: 'grid', placeItems: 'center' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  </div>
                  Dahil Olmayanlar
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '16px' }}>
                  {excluded.map((item, i) => (
                    <li key={i} style={{ color: '#4a5568', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                       <span style={{ color: '#c53030', fontWeight: '900' }}>×</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Images Grid */}
            {images.length > 0 && (
              <section style={{ marginTop: '64px' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '32px' }}>Görüntüler</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gridTemplateRows: 'repeat(2, 250px)', gap: '20px' }}>
                  <img src={images[0]} style={{ gridRow: 'span 2', width: '100%', height: '100%', objectFit: 'cover', borderRadius: '32px' }} />
                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px' }}>
                     <img src={images[1] || images[0]} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '32px' }} />
                     <img src={images[2] || images[0]} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '32px' }} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '20px' }}>
                     <img src={images[3] || images[0]} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '32px' }} />
                     <img src={images[4] || images[0]} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '32px' }} />
                  </div>
                </div>
              </section>
            )}

            {/* Guest Reviews Section */}
            <section style={{ marginTop: '80px', paddingBottom: '40px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: '900' }}>Misafir Yorumları</h2>
                <a href="#" style={{ color: '#8a4f17', fontWeight: '750', fontSize: '0.9rem' }}>Tümünü Gör →</a>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                {reviews.map((review) => (
                  <div key={review.id} style={{ background: '#fff', border: '1px solid #edf2f7', padding: '32px', borderRadius: '28px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                      <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#f7fafc', display: 'grid', placeItems: 'center', fontWeight: '900', color: '#8a4f17', fontSize: '1.1rem' }}>
                        {review.initials}
                      </div>
                      <div>
                        <h4 style={{ fontWeight: '800', fontSize: '1.1rem' }}>{review.name}</h4>
                        <div style={{ color: '#FFD700', fontSize: '0.8rem' }}>{'★'.repeat(review.rating)}</div>
                      </div>
                    </div>
                    <p style={{ color: '#5c5c62', lineHeight: '1.7', fontStyle: 'italic', fontSize: '0.95rem' }}>"{review.comment}"</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar Booking Card */}
          <aside className="booking-card" style={{ padding: '40px', borderRadius: '32px', boxShadow: '0 40px 80px rgba(0,0,0,0.08)', border: '1px solid #f1f1f1' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <p style={{ color: '#718096', fontSize: '0.95rem', fontWeight: '600' }}>Kişi Başı</p>
              <span style={{ background: '#f0f9f4', color: '#2a4d44', padding: '6px 14px', borderRadius: '10px', fontSize: '0.8rem', fontWeight: '850' }}>Erken Rezervasyon</span>
            </div>
            <strong style={{ fontSize: '2.8rem', color: '#1a202c', letterSpacing: '-0.02em' }}>{formatPrice(lowestPrice)}</strong>

            <form style={{ marginTop: '36px', display: 'grid', gap: '24px' }}>
              <label style={{ fontSize: '0.9rem', fontWeight: '800', color: '#4a5568' }}>
                Tur Tarihi Seçin
                <select style={{ background: '#f7fafc', border: '1px solid #e2e8f0', height: '56px', borderRadius: '16px', marginTop: '10px', padding: '0 20px', fontWeight: '700' }}>
                  {tour.dates.length > 0 ? tour.dates.map(d => (
                    <option key={d.id}>{new Date(d.startDate).toLocaleDateString('tr-TR')} - {new Date(d.endDate).toLocaleDateString('tr-TR')}</option>
                  )) : <option>Müsait tarih yok</option>}
                </select>
              </label>
              
              <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '800', color: '#4a5568' }}>Yetişkin <input type="number" defaultValue={1} min={1} style={{ background: '#f7fafc', border: '1px solid #e2e8f0', borderRadius: '16px', height: '52px', marginTop: '8px' }} /></label>
                <label style={{ fontSize: '0.85rem', fontWeight: '800', color: '#4a5568' }}>Çocuk <input type="number" defaultValue={0} min={0} style={{ background: '#f7fafc', border: '1px solid #e2e8f0', borderRadius: '16px', height: '52px', marginTop: '8px' }} /></label>
              </div>

              <div style={{ padding: '24px 0', borderTop: '2px dashed #edf2f7', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                <span style={{ fontWeight: '800', color: '#4a5568' }}>Toplam Tutar</span>
                <span style={{ fontSize: '1.5rem', fontWeight: '900', color: '#1a202c' }}>{formatPrice(lowestPrice)}</span>
              </div>
              <p style={{ fontSize: '0.78rem', color: '#718096', textAlign: 'center', marginTop: '-15px' }}>Fiyatlara tüm vergiler dahildir. Ücretsiz iptal imkanı.</p>

              <a href={`/rezervasyon?tur=${tour.slug}`} className="button full" style={{ background: '#8a4f17', color: '#fff', borderRadius: '20px', padding: '20px', fontSize: '1.1rem', fontWeight: '850', boxShadow: '0 10px 25px rgba(138, 79, 23, 0.25)', textAlign: 'center' }}>Rezervasyonu Tamamla</a>
            </form>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: '24px', color: '#718096', fontSize: '0.85rem', fontWeight: '700' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              Güvenli Ödeme Altyapısı
            </div>

            <div style={{ textAlign: 'center', marginTop: '30px', background: '#fffaf0', padding: '20px', borderRadius: '20px', border: '1px solid #feebc8' }}>
              <p style={{ fontSize: '0.85rem', color: '#7b341e', fontWeight: '700' }}>Bir sorunuz mu var? <br /> <strong style={{ fontSize: '1.1rem', color: '#c05621' }}>+90 (432) 215 00 65</strong></p>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </main>
  )
}
