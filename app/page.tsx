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
      name: 'Ahmet Yılmaz',
      comment: 'VadiVan Gezi ile gittiğimiz Van-Mardin turu hayatımın en unutulmaz deneyimiydi. Organizasyon kusursuzdu.',
      rating: 5,
      avatar: 'https://i.pravatar.cc/150?u=ahmet',
    },
    {
      id: 2,
      name: 'Selin Demir',
      comment: 'Rehberimiz bölgeye o kadar hakimdi ki, her taşın hikayesini dinlemek büyüleyiciydi. Kesinlikle tavsiye ederim.',
      rating: 5,
      avatar: 'https://i.pravatar.cc/150?u=selin',
    },
    {
      id: 3,
      name: 'Mehmet Can',
      comment: 'Konaklama yerleri çok kaliteli ve temizdi. Yemekler ise tam bir şölendi. Emeği geçen herkese teşekkürler.',
      rating: 4,
      avatar: 'https://i.pravatar.cc/150?u=mehmet',
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
        <div className="site-container newsletter-box">
          <div className="newsletter-content">
            <h2>Özel Fırsatları Kaçırmayın</h2>
            <p style={{ color: '#666' }}>E-bültenimize abone olun, sezonun en yeni turlarından ve size özel indirimlerden ilk siz haberdar olun.</p>
          </div>
          <form className="newsletter-form">
            <input type="email" placeholder="E-posta adresiniz" required style={{ padding: '0 15px' }} />
            <button type="submit">Kaydol</button>
          </form>
        </div>

        <div className="site-container" style={{ marginTop: '40px' }}>
           <div className="support-box">
              <h3>Destek Hattı</h3>
              <p style={{ color: '#666', marginBottom: '15px' }}>Size en uygun turu seçmek için uzmanlarımızla görüşün.</p>
              <span className="support-number">0850 000 00 00</span>
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
              <div key={review.id} className="review-card">
                <div className="review-header">
                  <img src={review.avatar} alt={review.name} className="review-avatar" />
                  <div>
                    <div className="review-name">{review.name}</div>
                    <div className="review-rating">
                      {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                    </div>
                  </div>
                </div>
                <p style={{ color: '#555', fontStyle: 'italic' }}>"{review.comment}"</p>
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
