import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const apiKey = req.headers.get('x-api-key')

    if (apiKey !== process.env.WHATSAPP_WEBHOOK_SECRET) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await req.json()

    const reservation = await prisma.reservation.create({
      data: {
        customerName: body.name,
        phone: body.phone,
        email: body.email,
        personCount: body.personCount || 1,
        source: 'WHATSAPP',
        tourDateId: body.tourDateId,
      },
    })

    return NextResponse.json({
      success: true,
      reservation,
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    )
  }
}
