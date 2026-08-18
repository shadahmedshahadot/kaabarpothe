import type { Package } from '@/data/packages'
import type { PackageDto } from './packageApi'
import { safeImage } from '@/lib/safe-image'

export const adaptPackage = (dto: PackageDto): Package =>
  ({
    id: dto.id,
    slug: dto.slug,
    name: dto.name,
    type: dto.type.toLowerCase() as Package['type'],
    tier: dto.tier.toLowerCase() as Package['tier'],
    shortDescription: dto.shortDescription,
    description: dto.description,
    duration: dto.duration,
    departureDate: dto.departureDate,
    returnDate: dto.returnDate,
    price: dto.price,
    discount: dto.discount,
    status: dto.status.toLowerCase() as Package['status'],
    availability: dto.availability.toLowerCase() as Package['availability'],
    seatsLeft: dto.seatsLeft,
    rating: dto.rating,
    reviewsCount: dto.reviewsCount,
    bookingsCount: dto.bookingsCount,
    featured: dto.featured,
    meals: dto.meals,
    transport: dto.transport,
    ziyarah: dto.ziyarah,
    visa: dto.visa,
    included: dto.included,
    excluded: dto.excluded,
    itinerary: (dto.itinerary ?? []).map(d => ({
      day: d.day,
      title: d.title,
      description: d.description,
      activities: d.activities,
    })),
    gallery: (() => {
      const cover = safeImage(dto.cover, dto.id)
      const items = (dto.gallery ?? []).map((g, i) => safeImage(g, `${dto.id}-g${i}`))
      return items.length ? items : [cover]
    })(),
    cover: safeImage(dto.cover, dto.id),
    faqs: (dto.faqs ?? []).map(f => ({ q: f.question, a: f.answer })),
    highlights: dto.highlights,
    groupSize: dto.groupSize,
  }) as Package
