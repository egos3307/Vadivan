import { prisma } from '@/lib/prisma'
import ReservationManager from './ReservationManager'

export const dynamic = 'force-dynamic'

export default async function ReservationsPage() {
  const tours = await prisma.tour.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      dates: {
        orderBy: { startDate: 'asc' },
        include: {
          reservations: {
            orderBy: { createdAt: 'desc' }
          }
        }
      }
    }
  })

  return (
    <div className="admin-content" style={{ flex: 1 }}>
      <div className="admin-heading" style={{ marginBottom: '40px' }}>
        <p style={{ color: '#888', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.8rem', fontWeight: '800' }}>Yönetim</p>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#171717' }}>Rezervasyonlar</h1>
      </div>

      <ReservationManager tours={tours} />
    </div>
  )
}
