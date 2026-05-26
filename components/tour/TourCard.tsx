import { formatPrice } from '@/lib/tours'

interface Props {
  id: string | number
  slug: string
  title: string
  description: string
  coverImage: string
  location: string
  duration: string
  price: number
  rating?: number
  badge?: string
  difficulty?: string
}

export default function TourCard({
  slug,
  title,
  description,
  coverImage,
  location,
  duration,
  price,
  rating = 4.9,
  badge = 'Popüler',
  difficulty = 'Orta Zorluk'
}: Props) {
  return (
    <article className="tour-card">
      <div className="tour-card-badge">{badge}</div>
      <div className="tour-card-rating">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#FFD700">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
        {rating}
      </div>
      <img src={coverImage} alt={title} />
      <div>
        <h3 style={{ marginTop: '15px' }}>{title}</h3>
        <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '10px' }}>
          {description.length > 100
            ? description.substring(0, 100) + '...'
            : description}
        </p>

        <div className="tour-info-grid">
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            {duration}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"></path>
                <circle cx="12" cy="10" r="3"></circle>
             </svg>
             {difficulty}
          </div>
        </div>

        <div className="tour-price-box">
          <div>
            <span className="price-label">Başlayan fiyatlarla</span>
            <span className="price-value">{formatPrice(price)}</span>
          </div>
          <a href={`/turlar/${slug}`} className="arrow-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>
      </div>
    </article>
  )
}
