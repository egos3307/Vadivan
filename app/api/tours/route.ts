import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createSlug } from '@/lib/tours'

export async function GET() {
  const tours = await prisma.tour.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      dates: {
        orderBy: { price: 'asc' },
        take: 1,
      },
      programs: {
        orderBy: { day: 'asc' },
      },
    },
  })

  return NextResponse.json({ success: true, tours })
}

export async function POST(req: Request) {
  const body = await req.json()
  const title = String(body.title || '').trim()
  const description = String(body.description || '').trim()
  const location = String(body.location || '').trim()
  const duration = String(body.duration || '').trim()
  const coverImage = String(body.coverImage || '').trim()

  if (!title || !description || !location || !duration || !coverImage) {
    return NextResponse.json(
      { success: false, message: 'Zorunlu tur alanları eksik.' },
      { status: 400 },
    )
  }

  const baseSlug = createSlug(title)
  const existing = await prisma.tour.findUnique({ where: { slug: baseSlug } })
  const slug = existing ? `${baseSlug}-${Date.now().toString(36)}` : baseSlug

  const tour = await prisma.tour.create({
    data: {
      title,
      slug,
      description,
      location,
      duration,
      coverImage,
    },
  })

  return NextResponse.json({ success: true, tour }, { status: 201 })
}
