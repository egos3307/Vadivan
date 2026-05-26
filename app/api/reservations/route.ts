import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { 
      tourDateId, 
      personCount, 
      customerName, 
      phone, 
      email, 
      persons, 
      totalPrice 
    } = body

    const reservation = await prisma.reservation.create({
      data: {
        tourDateId,
        personCount,
        customerName,
        phone,
        email,
        totalPrice,
        source: 'WEBSITE',
        persons: {
          create: persons.map((p: any) => ({
            gender: p.gender,
            firstName: p.firstName,
            lastName: p.lastName,
            phone: p.phone,
            email: p.email,
            birthDate: p.birthDate,
            departurePoint: p.departurePoint,
            tcNo: p.tcNo,
            isNotTcCitizen: p.isNotTcCitizen,
            roomNumber: 1, // Defaulting to room 1 for now
          }))
        }
      }
    })

    // Update capacity
    await prisma.tourDate.update({
      where: { id: tourDateId },
      data: {
        capacity: {
          decrement: personCount
        }
      }
    })

    return NextResponse.json({
      success: true,
      reservationId: reservation.id
    })
  } catch (error) {
    console.error('Reservation Error:', error)
    return NextResponse.json({ error: 'Failed to create reservation' }, { status: 500 })
  }
}
