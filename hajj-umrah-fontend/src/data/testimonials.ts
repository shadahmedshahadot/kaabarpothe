export interface Testimonial {
  id: string
  name: string
  location: string
  packageName: string
  rating: number
  date: string
  content: string
  avatar: string
  verified: boolean
  featured: boolean
}

export const testimonials: Testimonial[] = [
  {
    id: 'tst-001',
    name: 'Mohammad Anwar',
    location: 'Brooklyn, NY',
    packageName: 'Premium Hajj 2026',
    rating: 5,
    date: '2025-12-08',
    content: 'Subhanallah, the most well-organized Hajj I could have imagined. The scholar leading our group, Sheikh Ahmad, was knowledgeable and humble. Hotel was 50 meters from the Haram and our Mina tents were better than expected. Worth every dollar.',
    avatar: 'from-blue-400 to-indigo-500',
    verified: true, featured: true,
  },
  {
    id: 'tst-002',
    name: 'Aisha Khan',
    location: 'London, UK',
    packageName: 'Economy Umrah',
    rating: 5,
    date: '2025-11-22',
    content: 'My first Umrah and I was nervous about traveling alone. Fatima made everything seamless from visa to return. The all-women group was a beautiful experience. Recommended to all sisters going for the first time.',
    avatar: 'from-rose-400 to-pink-500',
    verified: true, featured: true,
  },
  {
    id: 'tst-003',
    name: 'Yusuf Garcia',
    location: 'Houston, TX',
    packageName: 'VIP Hajj 2026',
    rating: 5,
    date: '2025-12-15',
    content: 'I have been on three Hajjs over the years. This was by far the most spiritually focused thanks to the small group size and 5-star arrangements that removed all logistical stress. Personal scholar, private transport — flawless.',
    avatar: 'from-emerald-400 to-teal-500',
    verified: true, featured: true,
  },
  {
    id: 'tst-004',
    name: 'Hafsa Bilal',
    location: 'Toronto, ON',
    packageName: 'Luxury Umrah',
    rating: 5,
    date: '2025-10-30',
    content: 'My elderly parents needed wheelchair access and Maryam went above and beyond. Daily transport to the Haram, comfortable suite with Haram view. My mother kept saying we should book again next year.',
    avatar: 'from-violet-400 to-purple-500',
    verified: true, featured: true,
  },
  {
    id: 'tst-005',
    name: 'Ibrahim Diop',
    location: 'Paris, France',
    packageName: 'Standard Hajj 2026',
    rating: 5,
    date: '2025-12-02',
    content: 'Ibrahim Keita organized everything in French for our family from Senegal living in France. Cultural sensitivity, beautiful Mina tents, and brilliant ziyarat tours. Three generations of our family did Hajj together with peace of mind.',
    avatar: 'from-amber-400 to-orange-500',
    verified: true, featured: true,
  },
  {
    id: 'tst-006',
    name: 'Zainab Mustafa',
    location: 'Birmingham, UK',
    packageName: 'Budget Umrah',
    rating: 4,
    date: '2025-11-10',
    content: 'Honestly impressed for the price. Hotel was a 10-minute walk but the room was clean and quiet. Breakfast had good variety. Coach was on time every day. Recommended for budget-conscious families.',
    avatar: 'from-teal-400 to-cyan-500',
    verified: true, featured: false,
  },
  {
    id: 'tst-007',
    name: 'Khalid Rashid',
    location: 'Sydney, AU',
    packageName: 'Premium Umrah',
    rating: 5,
    date: '2025-09-18',
    content: 'Multi-city itinerary via Istanbul was a beautiful touch. Omar handled all visas and the Swissôtel Makkah room had a stunning Haram view from the 22nd floor. Will book again, In sha Allah.',
    avatar: 'from-orange-400 to-red-500',
    verified: true, featured: true,
  },
  {
    id: 'tst-008',
    name: 'Salma Al-Faisal',
    location: 'Manchester, UK',
    packageName: 'Economy Umrah',
    rating: 5,
    date: '2025-08-25',
    content: 'Booking process via the app was incredibly smooth. Live chat support answered every question within minutes. Hotels were clean, meals were halal-certified, and our group leader was a treasure. May Allah accept.',
    avatar: 'from-pink-400 to-fuchsia-500',
    verified: true, featured: false,
  },
  {
    id: 'tst-009',
    name: 'Abdul Rahman',
    location: 'Detroit, MI',
    packageName: 'Standard Hajj 2026',
    rating: 5,
    date: '2025-12-12',
    content: 'Khadija\'s pre-departure educational program transformed how we approached Hajj. We arrived spiritually ready and the logistics were perfect. The Malcolm X heritage element added profound meaning.',
    avatar: 'from-yellow-400 to-amber-500',
    verified: true, featured: true,
  },
  {
    id: 'tst-010',
    name: 'Nusaybah Ali',
    location: 'Chicago, IL',
    packageName: 'Premium Umrah',
    rating: 5,
    date: '2025-10-05',
    content: 'As a working professional I needed an efficient short Umrah. Safiya designed a 7-day premium package that worked perfectly with my schedule. App-based itinerary, real-time updates, premium hotels. Excellent.',
    avatar: 'from-indigo-400 to-violet-500',
    verified: true, featured: false,
  },
  {
    id: 'tst-011',
    name: 'Saeed Mansoor',
    location: 'Houston, TX',
    packageName: 'Economy Hajj 2026',
    rating: 5,
    date: '2025-11-28',
    content: 'For the price, I expected basic. What I got was extraordinary. The group leader was a scholar in his own right. Mina tents, while D-category, were clean and well-managed. Highly recommend Al-Safar.',
    avatar: 'from-cyan-400 to-blue-500',
    verified: true, featured: false,
  },
  {
    id: 'tst-012',
    name: 'Rabia Tariq',
    location: 'Toronto, ON',
    packageName: 'Family Umrah',
    rating: 5,
    date: '2025-09-30',
    content: 'Traveling with two children under 8 felt impossible until we found this platform. Family suite, kids meal options, baby strollers arranged. My kids still talk about the Tawaf.',
    avatar: 'from-emerald-400 to-green-500',
    verified: true, featured: false,
  },
]

export const getFeaturedTestimonials = () => testimonials.filter(t => t.featured)
