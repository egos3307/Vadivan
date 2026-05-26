import { prisma } from '@/lib/prisma'
import { formatPrice } from '@/lib/tours'
import TourForm from './TourForm'
import DeleteTourButton from './DeleteTourButton'

export const dynamic = 'force-dynamic'

export default async function AdminToursPage() {
  const tours = await prisma.tour.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      dates: {
        orderBy: { price: 'asc' },
        take: 1,
      },
    },
  })

  return (
    <div className="admin-content">
      <div className="admin-heading">
        <div>
          <p>Tur Yönetimi</p>
          <h1>Turlar</h1>
        </div>
      </div>

      <section className="admin-card">
        <h2 style={{ color: '#8a4f17' }}>Yeni Tur Ekle (Şablon)</h2>
        <TourForm />
      </section>

      <section className="admin-card">
        <h2>Eklenen Turlar</h2>
        {tours.length > 0 ? (
          <div className="admin-table">
            <div className="admin-table-head">
              <span>Tur</span>
              <span>Konum</span>
              <span>Süre</span>
              <span>Fiyat</span>
              <span className="text-right">İşlemler</span>
            </div>
            {tours.map((tour) => (
              <div key={tour.id} className="admin-table-row group">
                <div className="flex items-center">
                  <span className="font-bold">{tour.title}</span>
                </div>
                <div className="flex items-center text-zinc-500">
                  <span>{tour.location}</span>
                </div>
                <div className="flex items-center text-zinc-500">
                  <span>{tour.duration}</span>
                </div>
                <div className="flex items-center font-bold text-[#8a4f17]">
                  <span>{formatPrice(tour.dates[0]?.price)}</span>
                </div>
                <div className="flex justify-end items-center gap-2">
                  <a 
                    href={`/turlar/${tour.slug}`} 
                    className="p-2 hover:bg-zinc-100 rounded-lg transition-colors"
                    title="Görüntüle"
                  >
                    👁️
                  </a>
                  <DeleteTourButton tourId={tour.id} tourTitle={tour.title} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="admin-empty">Henüz tur eklenmedi.</p>
        )}
      </section>
    </div>
  )
}
