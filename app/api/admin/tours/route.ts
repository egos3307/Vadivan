import { prisma } from '@/lib/prisma'
import { createSlug } from '@/lib/tours'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const data = await req.json()
    
    const title = String(data.title || '').trim()
    const description = String(data.description || '').trim()
    const location = String(data.location || '').trim()
    const duration = String(data.duration || '').trim()
    const coverImage = String(data.coverImage || '').trim()
    const maxCapacity = Number(data.maxCapacity || 12)
    
    const highlights = Array.isArray(data.highlights) ? data.highlights : []
    const included = Array.isArray(data.included) ? data.included : []
    const excluded = Array.isArray(data.excluded) ? data.excluded : []
    const images = Array.isArray(data.images) ? data.images : []

    const programTitle = String(data.programTitle || '').trim()
    const programDescription = String(data.programDescription || '').trim()
    
    const inputDates = Array.isArray(data.dates) ? data.dates : []

    if (!title || !description || !location || !duration || !coverImage) {
      return NextResponse.json({ message: 'Lütfen zorunlu alanları doldurun.' }, { status: 400 })
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
        maxCapacity,
        highlights: JSON.stringify(highlights),
        included: JSON.stringify(included),
        excluded: JSON.stringify(excluded),
        images: JSON.stringify(images),
        programs:
          programTitle || programDescription
            ? {
                create: {
                  day: 1,
                  title: programTitle || 'Tur Programı',
                  description: programDescription || description,
                },
              }
            : undefined,
        dates: {
          create: inputDates.map((d: any) => ({
            startDate: new Date(d.startDate),
            endDate: new Date(d.endDate),
            capacity: Number(d.capacity || maxCapacity),
            price: Number(d.price || 0),
          }))
        }
      },
    })

    revalidatePath('/')
    revalidatePath('/turlar')
    revalidatePath('/admin/turlar')

    return NextResponse.json({ message: 'Tur başarıyla eklendi.', success: true, tour })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ message: 'Beklenmedik bir hata oluştu.' }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ message: 'ID gerekli.' }, { status: 400 })
    }

    await prisma.tour.delete({
      where: { id }
    })

    revalidatePath('/')
    revalidatePath('/turlar')
    revalidatePath('/admin/turlar')

    return NextResponse.json({ message: 'Tur başarıyla silindi.', success: true })
  } catch (error) {
    console.error('Delete Error:', error)
    return NextResponse.json({ message: 'Silme işlemi başarısız oldu.' }, { status: 500 })
  }
}
