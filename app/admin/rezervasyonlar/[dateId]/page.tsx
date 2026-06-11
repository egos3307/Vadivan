import { prisma } from '@/lib/database'
import { notFound } from 'next/navigation'
import ReservationDetailView from './ReservationDetailView'

export const dynamic = 'force-dynamic'

export default async function ReservationDetailPage({ params }: { params: { dateId: string } }) {
  const { dateId } = await params

  const tourDate = await prisma.tourDate.findUnique({
    where: { id: dateId },
    include: {
      tour: {
        include: {
          programs: {
            orderBy: { day: 'asc' }
          }
        }
      },
      reservations: {
        orderBy: { createdAt: 'desc' },
        include: {
          persons: true
        }
      }
    }
  })

  if (!tourDate) {
    notFound()
  }

  return (
    <div className="admin-content">
      <ReservationDetailView tourDate={tourDate} />
    </div>
  )
}
