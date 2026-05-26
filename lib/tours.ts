import { prisma } from '@/lib/prisma'

export function createSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function formatPrice(price?: number) {
  if (!price) {
    return 'Fiyat sorunuz'
  }

  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    maximumFractionDigits: 0,
  }).format(price)
}

export async function getTours(limit?: number) {
  try {
    return await prisma.tour.findMany({
      take: limit,
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
  } catch (error) {
    console.error('Tour list could not be loaded:', error)
    return []
  }
}
