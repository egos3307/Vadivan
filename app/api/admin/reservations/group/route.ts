import { prisma } from '@/lib/database'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const data = await req.json()
    
    const tourDateId = String(data.tourDateId || '')
    const notes = String(data.notes || '').trim()
    const persons = Array.isArray(data.persons) ? data.persons : []

    if (!tourDateId || persons.length === 0) {
      return NextResponse.json({ message: 'Lütfen tur tarihini ve en az bir kişiyi belirtin.' }, { status: 400 })
    }

    // Lead person for reservation summary
    const leadPerson = persons[0]

    // Defensive mapping to handle schema synchronization issues
    const personsData = persons.map((p: any) => {
      const personObj: any = {
        fullName: String(p.fullName || '').trim(),
        phone: String(p.phone || '').trim(),
        tcNo: String(p.tcNo || '').trim(),
        roomType: p.roomType || 'DOUBLE',
        city: String(p.city || '').trim(),
        deposit: Number(p.deposit || 0),
        remainingDebt: Number(p.remainingDebt || 0),
        notes: String(p.notes || '').trim(),
        // Explicitly adding legacy fields to satisfy old client versions if they persist in cache
        gender: 'MALE',
        firstName: '',
        lastName: ''
      }
      return personObj
    })

    const reservation = await prisma.reservation.create({
      data: {
        customerName: String(leadPerson.fullName || '').trim(),
        phone: String(leadPerson.phone || '').trim(),
        personCount: persons.length,
        tourDateId,
        notes,
        paymentStatus: 'PENDING',
        source: 'PANEL',
        persons: {
          create: personsData
        }
      },
    })

    revalidatePath('/admin/rezervasyonlar')
    revalidatePath(`/admin/rezervasyonlar/${tourDateId}`)

    return NextResponse.json({ message: 'Grup rezervasyonu başarıyla kaydedildi.', success: true, reservation })
  } catch (error: any) {
    console.error('CRITICAL: Group Reservation API Error:', error)
    
    // Attempt to provide a cleaner error message if it's a Prisma schema mismatch
    let errorMessage = 'Beklenmedik bir sunucu hatası oluştu.'
    if (error.message && error.message.includes('Unknown argument')) {
      errorMessage = 'Sistem senkronizasyon hatası: ' + error.message.split('\n').pop()
    } else if (error.message) {
      errorMessage = 'Hata: ' + error.message
    }

    return NextResponse.json({ message: errorMessage }, { status: 500 })
  }
}
