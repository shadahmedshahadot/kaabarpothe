import { create } from 'zustand'

export interface Package {
  id: number
  name: string
  type: 'hajj' | 'umrah'
  price: number
  duration: number
  groupSize: string
  location: string
  rating: number
  reviews: number
  highlights: string[]
  description: string
  image: string
  hotelStars: number
  mealsPlan: string
  visaIncluded: boolean
  guideIncluded: boolean
}

interface PackageStore {
  packages: Package[]
  filteredPackages: Package[]
  filters: {
    priceRange: [number, number]
    duration: string
    rating: number
    sortBy: 'price' | 'rating' | 'popular'
  }
  setFilters: (filters: Partial<PackageStore['filters']>) => void
  resetFilters: () => void
}

const mockPackages: Package[] = [
  {
    id: 1,
    name: 'Comfort Umrah',
    type: 'umrah',
    price: 1299,
    duration: 7,
    groupSize: '10-20',
    location: 'Makkah & Madinah',
    rating: 4.9,
    reviews: 342,
    highlights: ['4-star Hotels', 'Visa Assistance', 'Meals Included'],
    description: 'Experience a comfortable Umrah with excellent accommodations near Haram.',
    image: 'bg-gradient-to-br from-primary/20 to-secondary/20',
    hotelStars: 4,
    mealsPlan: 'Breakfast & Dinner',
    visaIncluded: true,
    guideIncluded: true,
  },
  {
    id: 2,
    name: 'Premium Hajj',
    type: 'hajj',
    price: 4999,
    duration: 12,
    groupSize: '30-50',
    location: 'Makkah, Madinah & Arafat',
    rating: 4.8,
    reviews: 189,
    highlights: ['5-star Hotels', 'Scholar Guide', 'Full Package'],
    description: 'Complete Hajj experience with premium accommodations and expert guidance.',
    image: 'bg-gradient-to-br from-accent/20 to-primary/20',
    hotelStars: 5,
    mealsPlan: 'All Meals',
    visaIncluded: true,
    guideIncluded: true,
  },
  {
    id: 3,
    name: 'Budget Umrah',
    type: 'umrah',
    price: 899,
    duration: 5,
    groupSize: '20-30',
    location: 'Makkah & Madinah',
    rating: 4.7,
    reviews: 256,
    highlights: ['3-star Hotels', 'Group Transport', 'Basic Meals'],
    description: 'Affordable Umrah package without compromising on quality services.',
    image: 'bg-gradient-to-br from-secondary/20 to-accent/20',
    hotelStars: 3,
    mealsPlan: 'Breakfast Only',
    visaIncluded: false,
    guideIncluded: false,
  },
  {
    id: 4,
    name: 'Luxury Umrah',
    type: 'umrah',
    price: 2499,
    duration: 10,
    groupSize: '5-10',
    location: 'Makkah & Madinah',
    rating: 5.0,
    reviews: 98,
    highlights: ['5-star Hotels', 'VIP Lounge', 'Personal Guide'],
    description: 'Ultimate luxury Umrah experience with personalized service and exclusive amenities.',
    image: 'bg-gradient-to-br from-primary/20 to-accent/20',
    hotelStars: 5,
    mealsPlan: 'All Meals Premium',
    visaIncluded: true,
    guideIncluded: true,
  },
  {
    id: 5,
    name: 'Economy Hajj',
    type: 'hajj',
    price: 2999,
    duration: 10,
    groupSize: '40-60',
    location: 'Makkah, Madinah & Arafat',
    rating: 4.6,
    reviews: 234,
    highlights: ['3-star Hotels', 'Group Guide', 'Basic Meals'],
    description: 'Value-for-money Hajj package for budget-conscious pilgrims.',
    image: 'bg-gradient-to-br from-secondary/20 to-primary/20',
    hotelStars: 3,
    mealsPlan: 'Breakfast & Dinner',
    visaIncluded: true,
    guideIncluded: false,
  },
  {
    id: 6,
    name: 'Family Umrah',
    type: 'umrah',
    price: 1799,
    duration: 8,
    groupSize: '15-25',
    location: 'Makkah & Madinah',
    rating: 4.8,
    reviews: 167,
    highlights: ['Family Rooms', 'Kids Activities', 'All Meals'],
    description: 'Perfect for families with children, featuring special amenities and activities.',
    image: 'bg-gradient-to-br from-accent/20 to-secondary/20',
    hotelStars: 4,
    mealsPlan: 'All Meals',
    visaIncluded: true,
    guideIncluded: true,
  },
]

export const usePackageStore = create<PackageStore>((set) => ({
  packages: mockPackages,
  filteredPackages: mockPackages,
  filters: {
    priceRange: [0, 5000],
    duration: 'all',
    rating: 0,
    sortBy: 'popular',
  },
  setFilters: (newFilters) =>
    set((state) => {
      const filters = { ...state.filters, ...newFilters }
      const filtered = state.packages
        .filter((pkg) => {
          if (pkg.price < filters.priceRange[0] || pkg.price > filters.priceRange[1])
            return false
          if (filters.duration !== 'all') {
            const minDays = parseInt(filters.duration)
            if (pkg.duration < minDays) return false
          }
          if (filters.rating > 0 && pkg.rating < filters.rating) return false
          return true
        })
        .sort((a, b) => {
          if (filters.sortBy === 'price') return a.price - b.price
          if (filters.sortBy === 'rating') return b.rating - a.rating
          return b.reviews - a.reviews
        })

      return { filters, filteredPackages: filtered }
    }),
  resetFilters: () =>
    set((state) => ({
      filters: {
        priceRange: [0, 5000],
        duration: 'all',
        rating: 0,
        sortBy: 'popular',
      },
      filteredPackages: state.packages,
    })),
}))
