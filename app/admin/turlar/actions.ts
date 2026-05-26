'use server'

import { prisma } from '@/lib/prisma'
import { createSlug } from '@/lib/tours'
import { revalidatePath } from 'next/cache'

export async function createTourAction(prevState: any, formData: FormData) {
  try {
    const title = String(formData.get('title') || '').trim()
    const description = String(formData.get('description') || '').trim()
    const location = String(formData.get('location') || '').trim()
    const duration = String(formData.get('duration') || '').trim()
    const coverImage = String(formData.get('coverImage') || '').trim()
    const maxCapacity = Number(formData.get('maxCapacity') || 12)
    
    const highlights = String(formData.get('highlights') || '').split(',').map(s => s.trim()).filter(Boolean)
    const included = String(formData.get('included') || '').split(',').map(s => s.trim()).filter(Boolean)
    const excluded = String(formData.get('excluded') || '').split(',').map(s => s.trim()).filter(Boolean)
    const images = String(formData.get('images') || '').split(',').map(s => s.trim()).filter(Boolean)

    const programTitle = String(formData.get('programTitle') || '').trim()
    const programDescription = String(formData.get('programDescription') || '').trim()
    
    const startDate = String(formData.get('startDate') || '')
    const endDate = String(formData.get('endDate') || '')
    const price = Number(formData.get('price') || 0)

    if (!title || !description || !location || !duration || !coverImage) {
      return { message: 'Lütfen zorunlu alanları doldurun.', success: false }
    }

    const baseSlug = createSlug(title)
    const existing = await prisma.tour.findUnique({ where: { slug: baseSlug } })
    const slug = existing ? `${baseSlug}-${Date.now().toString(36)}` : baseSlug

    await prisma.tour.create({
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
        dates:
          startDate && endDate && price > 0
            ? {
                create: {
                  startDate: new Date(startDate),
                  endDate: new Date(endDate),
                  capacity: maxCapacity,
                  price,
                },
              }
            : undefined,
      },
    })

    revalidatePath('/')
    revalidatePath('/turlar')
    revalidatePath('/admin/turlar')

    return { message: 'Tur başarıyla eklendi.', success: true }
  } catch (error) {
    console.error('Action error:', error)
    return { message: 'Beklenmedik bir hata oluştu.', success: false }
  }
}

export async function deleteTourAction(tourId: string) {
  console.log('Attempting to delete tour:', tourId)
  try {
    const deleted = await prisma.tour.delete({
      where: { id: tourId }
    })
    console.log('Successfully deleted tour:', deleted.id)

    revalidatePath('/')
    revalidatePath('/turlar')
    revalidatePath('/admin/turlar')

    return { success: true, message: 'Tur başarıyla silindi.' }
  } catch (error) {
    console.error('Delete tour error details:', error)
    return { success: false, message: 'Tur silinirken bir hata oluştu: ' + (error instanceof Error ? error.message : 'Bilinmeyen hata') }
  }
}
