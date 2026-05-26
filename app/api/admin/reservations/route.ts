import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const data = await req.json()
    
    const customerName = String(data.customerName || '').trim()
    const phone = String(data.phone || '').trim()
    const email = String(data.email || '').trim()
    const personCount = Number(data.personCount || 1)
    const tourDateId = String(data.tourDateId || '')

    if (!customerName || !phone || !tourDateId) {
      return NextResponse.json({ message: 'Lütfen zorunlu alanları doldurun.' }, { status: 400 })
    }

    const reservation = await prisma.reservation.create({
      data: {
        customerName,
        phone,
        email: email || null,
        personCount,
        tourDateId,
        paymentStatus: 'PAID', // Panelden eklenenleri ödendi sayabiliriz
        source: 'PANEL'
      },
    })

    revalidatePath('/admin/rezervasyonlar')

    return NextResponse.json({ message: 'Müşteri başarıyla kaydedildi.', success: true, reservation })
  } catch (error) {
    console.error('Reservation API Error:', error)
    return NextResponse.json({ message: 'Beklenmedik bir hata oluştu.' }, { status: 500 })
  }
}
