import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import { formatPrice, getTours } from '@/lib/tours'

export const dynamic = 'force-dynamic'

export default async function ToursPage() {
  const tours = await getTours()

  return (
    <main className="site-shell">
      <Navbar />

      <section className="section" style={{ paddingTop: '120px' }}>
        <div className="site-container">
          {tours.length > 0 ? (
            <div className="tour-grid wide">
              {tours.map((tour) => (
                <article className="tour-card detailed" key={tour.id}>
                  <img src={tour.coverImage} alt={tour.title} />
                  <div>
                    <div className="tour-meta">
                      <span>{tour.location}</span>
                      <span>{tour.duration}</span>
                    </div>
                    <h2>{tour.title}</h2>
                    <p>{tour.description}</p>
                    <div className="tour-footer">
                      <strong>{formatPrice(tour.dates[0]?.price)}</strong>
                      <a href={`/turlar/${tour.slug}`} className="button compact">
                        Detayları Gör
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h2>Henüz tur eklenmedi</h2>
              <p>
                Yakında yeni turlarımızla buradayız. Takipte kalın!
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
