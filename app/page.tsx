import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/home/Hero'
import TourCard from '@/components/tour/TourCard'
import { getTours } from '@/lib/tours'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const tours = await getTours(6)

  const reviews = [
    {
      id: 1,
      name: 'F*** Y***',
      comment: 'Hakkari deneyimini Vadivan Tur ile yaşadık 👍 Tur ile bir bölgeyi gezmek istediğinizde rehber çok önemlidir. Vadivan rehberleri çok donanımlı, çok samimi ve sıcak insanlar🙏 Ömer beye ve canım Hüseyin beye çok teşekkürler🙏💐❤️',
      rating: 5,
      link: 'https://maps.app.goo.gl/8YVptqxz8ptL6BRN6',
    },
    {
      id: 2,
      name: 'C*** C***',
      comment: 'Vadivan Turizm ile Hakkari turuna katıldım ve tek kelimeyle muhteşemdi. Uzun zamandır bu kadar keyifli, eğlenceli ve enerjik bir tura katılmamıştım. Hüseyin Beyin güler yüzü ve enerjisi, Ömer Beyin bilgisi ve donanımı bizi bambaşka bir seviyeye taşıdı. Emeği geçen tüm ekibe çok teşekkür ediyorum.',
      rating: 5,
      link: 'https://maps.app.goo.gl/kBcxAaM2tnQeZzVG6',
    },
    {
      id: 3,
      name: 'M***',
      comment: 'Enver beye çok teşekkür ediyorum güleryüzü sayesinde çok konforlu bir gezi yaşadık',
      rating: 5,
      link: 'https://maps.app.goo.gl/cvib1dW9ps78pqgz8',
    },
  ]

  return (
    <main className="site-shell">
      <Navbar />
      
      <Hero />

      <section className="section">
        <div className="site-container">
          <div className="category-list">
            <button className="category-btn active">Tümü</button>
            <button className="category-btn">Kültür Turları</button>
            <button className="category-btn">Doğa Turları</button>
            <button className="category-btn">Doğu Anadolu Turları</button>
            <button className="category-btn">Fotoğraf Turları</button>
          </div>

          <div className="section-heading">
            <p className="eyebrow">Popüler Rotalar</p>
            <h2>Gezginlerimizin Favori Keşifleri</h2>
          </div>

          {tours.length > 0 ? (
            <div className="tour-grid">
              {tours.map((tour) => (
                <TourCard 
                  key={tour.id}
                  id={tour.id}
                  slug={tour.slug}
                  title={tour.title}
                  description={tour.description}
                  coverImage={tour.coverImage}
                  location={tour.location}
                  duration={tour.duration}
                  price={tour.dates[0]?.price}
                  rating={4.9}
                  badge="Popüler"
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h3>Henüz yayınlanan tur yok</h3>
              <p>Admin panelinden ilk tur eklendiğinde bu alan otomatik olarak güncellenecek.</p>
            </div>
          )}
        </div>
      </section>

      <section className="section muted">
        <div className="site-container">
          <div className="section-heading" style={{ textAlign: 'center', marginBottom: '40px' }}>
            <p className="eyebrow">Bizi Takip Edin</p>
            <h2 style={{ 
              marginBottom: '16px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '12px',
              fontSize: '2.5rem',
              margin: '0 auto'
            }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#8a4f17' }}>
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              @vadivangezi
            </h2>
            <p style={{ color: '#666', maxWidth: '600px', margin: '0 auto 24px' }}>
              En yeni turlarımızdan haberdar olmak ve Doğu'nun gizli kalmış güzelliklerini keşfetmek için bizi takip edin.
            </p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
            gap: '20px',
            marginTop: '40px'
          }}>
            {[
              'DZaE0xAMTwj',
              'DWcF71ZjN4f',
              'DZFPeX9Mtzg',
              'DZU3pS1sCIC'
            ].map((id) => (
              <div key={id} style={{ 
                borderRadius: '16px', 
                overflow: 'hidden', 
                background: '#fff', 
                aspectRatio: '9/16',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                border: '1px solid rgba(0,0,0,0.05)',
                position: 'relative'
              }}>
                <iframe
                  src={`https://www.instagram.com/reel/${id}/embed/`}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  scrolling="no"
                  allowTransparency={true}
                  style={{ 
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: 'calc(100% + 2px)',
                    border: 'none'
                  }}
                ></iframe>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="site-container">
          <div className="section-heading">
            <p className="eyebrow">Müşteri Yorumları</p>
            <h2>Gezginlerimizin Deneyimleri</h2>
          </div>
          <div className="reviews-grid">
            {reviews.map((review) => (
              <div key={review.id} className="review-card" style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="review-header" style={{ marginBottom: '10px' }}>
                  <div>
                    <div className="review-name" style={{ fontSize: '1.1rem' }}>{review.name}</div>
                    <div className="review-rating">
                      {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                    </div>
                  </div>
                </div>
                <p style={{ color: '#555', fontStyle: 'italic', flex: 1 }}>"{review.comment}"</p>
                <a 
                  href={review.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="button compact" 
                  style={{ marginTop: '20px', background: '#f6f4ef', color: '#8a4f17', border: '1px solid #8a4f17' }}
                >
                  Yoruma Git
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section muted">
        <div className="site-container split align-center">
          <div>
            <p className="eyebrow">Neden VadiVan?</p>
            <h2>Sınırları Aşan Bir Tatil Deneyimi</h2>
            <p className="section-copy">
              On yılı aşkın tecrübemizle, sadece bir tur değil, unutulmaz bir hikaye vadediyoruz. 
              Yerel bağlarımız sayesinde sizi turistlerin bilmediği gizli cennetlerle buluşturuyoruz.
            </p>
            <div className="stats">
              <div>
                <strong>10k+</strong>
                <span>Mutlu Gezgin</span>
              </div>
              <div>
                <strong>150+</strong>
                <span>Benzersiz Rota</span>
              </div>
            </div>
          </div>
          <div className="feature-list">
            <div>
              <strong>Küratörlü Deneyimler</strong>
              <span>Her rota, konaklamadan yemeğe kadar titizlikle planlanır.</span>
            </div>
            <div>
              <strong>Yerel Uzmanlık</strong>
              <span>Bölgeyi evi gibi bilen rehberlerle derinlemesine keşif.</span>
            </div>
            <div>
              <strong>7/24 Destek</strong>
              <span>Yolculuğunuzun her anında yanınızda olan ekibimiz.</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
