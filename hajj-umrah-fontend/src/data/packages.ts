import { IMG } from './images'

export type PackageType = 'hajj' | 'umrah'
export type PackageTier = 'budget' | 'economy' | 'standard' | 'premium' | 'vip' | 'luxury'

export interface ItineraryDay {
  day: number
  title: string
  description: string
  activities: string[]
}

export interface PackageFAQ {
  q: string
  a: string
}

export interface Package {
  id: string
  slug: string
  name: string
  type: PackageType
  tier: PackageTier
  shortDescription: string
  description: string
  duration: number
  departureDate: string
  returnDate: string
  price: number
  discount: number
  status: 'published' | 'draft'
  availability: 'available' | 'limited' | 'soldout'
  seatsLeft: number
  rating: number
  reviewsCount: number
  bookingsCount: number
  featured: boolean
  hotelMakkah: { name: string; stars: number; distance: string; image: string }
  hotelMadinah: { name: string; stars: number; distance: string; image: string }
  flight: { airline: string; departure: string; arrival: string; class: string }
  meals: string
  transport: string
  ziyarah: string[]
  visa: string
  included: string[]
  excluded: string[]
  itinerary: ItineraryDay[]
  gallery: string[]
  cover: string
  faqs: PackageFAQ[]
  highlights: string[]
  groupSize: string
}

const baseItinerary = (type: PackageType, days: number): ItineraryDay[] => {
  const start: ItineraryDay[] = [
    { day: 1, title: 'Departure & Arrival in Jeddah', description: 'Flight from your home city, arrival at King Abdulaziz International Airport, transfer to Makkah hotel.', activities: ['Airport meet & greet', 'Visa processing assistance', 'Transfer by AC coach', 'Hotel check-in', 'Welcome briefing'] },
    { day: 2, title: 'First Umrah & Tawaf', description: 'Perform first Umrah with experienced scholar. Ihram preparation, Tawaf, Sa\'i, and Halq/Taqsir.', activities: ['Ihram from Miqat', 'Tawaf al-Umrah', 'Sa\'i between Safa & Marwa', 'Hair cutting (Halq/Taqsir)', 'Group reflection'] },
    { day: 3, title: 'Worship in Masjid al-Haram', description: 'Full day of worship, additional Umrahs, and Quran study circles.', activities: ['Fajr at Haram', 'Optional second Umrah', 'Quran tafsir session', 'Maghrib & Isha prayers'] },
  ]
  if (type === 'hajj') {
    start.push(
      { day: 4, title: 'Departure to Mina (8th Dhul Hijjah)', description: 'Travel to Mina for Yawm al-Tarwiyah, spend the day in worship and prayer.', activities: ['Travel to Mina tents', 'Five prayers in Mina', 'Group lectures', 'Rest in AC tents'] },
      { day: 5, title: 'Day of Arafat (9th Dhul Hijjah)', description: 'The most sacred day of Hajj. Wuquf at Arafat, then travel to Muzdalifah at sunset.', activities: ['Travel to Arafat after Fajr', 'Khutbah at Masjid Namirah', 'Dua\'a until sunset', 'Travel to Muzdalifah', 'Collect pebbles for Jamarat'] },
      { day: 6, title: 'Eid al-Adha & Stoning (10th)', description: 'Stoning of Jamarat al-Aqaba, Qurbani, Halq, Tawaf al-Ifadah.', activities: ['Stone Jamarat al-Aqaba', 'Qurbani sacrifice', 'Halq / Taqsir', 'Tawaf al-Ifadah & Sa\'i', 'Return to Mina'] },
      { day: 7, title: 'Days of Tashreeq (11th-13th)', description: 'Continue stoning of three Jamarat each day.', activities: ['Stone three Jamarat', 'Worship in Mina', 'Group discussions'] },
    )
  }
  const middleStart = type === 'hajj' ? 8 : 4
  for (let i = middleStart; i <= days - 2; i++) {
    if (i === middleStart) {
      start.push({ day: i, title: 'Departure to Madinah', description: 'Travel by AC coach to the city of the Prophet ﷺ. Check-in to hotel near Masjid an-Nabawi.', activities: ['Travel by luxury coach (~5 hours)', 'Hotel check-in', 'Visit Masjid an-Nabawi', 'Salam at Rawdah Sharif'] })
    } else if (i === middleStart + 1) {
      start.push({ day: i, title: 'Ziyarat of Madinah', description: 'Historical and spiritual tour of Madinah\'s holy sites.', activities: ['Quba Mosque', 'Masjid al-Qiblatain', 'Mount Uhud & martyrs', 'Seven Mosques', 'Date farms'] })
    } else {
      start.push({ day: i, title: `Worship at Masjid an-Nabawi`, description: 'Continued prayers in the second holiest mosque. Visit Rawdah Sharif daily.', activities: ['40 prayers tradition', 'Rawdah visit', 'Quran circles', 'Group sessions'] })
    }
  }
  start.push(
    { day: days - 1, title: 'Final Day in Madinah', description: 'Last prayers, farewell tawaf preparation, group reflection.', activities: ['Final Rawdah visit', 'Shopping at Madinah souks', 'Pack & prepare', 'Group photo'] },
    { day: days, title: 'Departure Home', description: 'Transfer to Madinah airport for flight home.', activities: ['Hotel check-out', 'Transfer to airport', 'Flight home', 'Hajj/Umrah Mubarak'] },
  )
  return start
}

const commonFaqs: PackageFAQ[] = [
  { q: 'Is the visa fee included?', a: 'Yes, all package prices include the Umrah/Hajj visa processing fee, biometric registration, and Ministry of Hajj e-tasreeh.' },
  { q: 'What documents do I need?', a: 'Valid passport (6+ months), passport-size photos, vaccination certificates (meningitis, COVID where applicable), and completed application form.' },
  { q: 'Can I extend my stay?', a: 'Extensions are subject to visa rules and hotel availability. Contact our team at least 30 days before departure for arrangements.' },
  { q: 'Is travel insurance included?', a: 'Mandatory medical insurance is included. We recommend upgrading to comprehensive coverage which we can arrange for an additional fee.' },
  { q: 'What is the cancellation policy?', a: 'Free cancellation 60+ days before departure. See our Refund Policy page for the complete schedule.' },
]

const commonZiyarah = [
  'Jabal al-Nour (Cave of Hira)', 'Jabal Thawr', 'Masjid al-Jin', 'Masjid Aisha (Tan\'eem)',
  'Quba Mosque', 'Masjid al-Qiblatain', 'Mount Uhud', 'Seven Mosques', 'Date farms of Madinah',
]

export const packages: Package[] = [
  // ============ HAJJ ============
  {
    id: 'pkg-hajj-economy',
    slug: 'economy-hajj-2026',
    name: 'Economy Hajj 2026',
    type: 'hajj', tier: 'economy',
    shortDescription: 'Affordable complete Hajj with shared rooms and 3-star hotels near Haram.',
    description: 'Our Economy Hajj package gives budget-conscious pilgrims a complete and spiritually fulfilling experience. Stay at clean, comfortable 3-star hotels within walking distance of the Haram. Travel with experienced group leaders, enjoy nutritious meals, and focus entirely on your worship without financial stress.',
    duration: 21,
    departureDate: '2026-05-22', returnDate: '2026-06-11',
    price: 6499, discount: 0,
    status: 'published', availability: 'available', seatsLeft: 18,
    rating: 4.6, reviewsCount: 234, bookingsCount: 612, featured: false,
    hotelMakkah: { name: 'Dar Al Eiman Royal', stars: 3, distance: '850m from Haram', image: IMG.haramAerial },
    hotelMadinah: { name: 'Olayan Al Madinah', stars: 3, distance: '450m from Masjid Nabawi', image: IMG.nabawiDay },
    flight: { airline: 'Saudi Airlines', departure: 'Direct from JFK', arrival: 'Jeddah (JED)', class: 'Economy' },
    meals: 'Breakfast & Dinner — buffet style with South Asian, Arab, and Western options',
    transport: 'AC coach for all transfers and ziyarat tours',
    ziyarah: commonZiyarah,
    visa: 'Hajj visa, biometric registration, and e-tasreeh included',
    included: ['Hajj visa & permits', 'Round-trip flights (Economy)', '3-star hotels (quad share)', 'AC coach transport', 'Breakfast & dinner', 'Qurbani coupon', 'Ihram for males', 'Experienced group leader', 'Ziyarat tours', 'Mina tent (D-category)', '24/7 ground support'],
    excluded: ['Personal expenses', 'Lunch', 'Travel insurance upgrades', 'Phone & internet', 'Laundry', 'Tips for porters'],
    itinerary: baseItinerary('hajj', 21),
    gallery: [IMG.kaabaDayCrowd, IMG.haramAerial, IMG.nabawiDay, IMG.nabawiUmbrellas, IMG.pilgrimsWalking, IMG.greenDomeClose],
    cover: IMG.kaabaDayCrowd,
    faqs: commonFaqs,
    highlights: ['3-star hotels close to Haram', 'Quad-share rooms', 'Full Hajj rituals coverage', 'Group leader & scholar'],
    groupSize: '40-60 pilgrims',
  },
  {
    id: 'pkg-hajj-standard',
    slug: 'standard-hajj-2026',
    name: 'Standard Hajj 2026',
    type: 'hajj', tier: 'standard',
    shortDescription: 'Balanced 4-star comfort with triple-share rooms and full ziyarat tours.',
    description: 'The Standard Hajj package delivers excellent value with 4-star hotels in prime locations, triple-share rooms, and a comprehensive worship and ziyarat schedule led by qualified scholars. The most popular choice for families and individual pilgrims seeking a balance of comfort and affordability.',
    duration: 23,
    departureDate: '2026-05-20', returnDate: '2026-06-12',
    price: 8999, discount: 500,
    status: 'published', availability: 'limited', seatsLeft: 6,
    rating: 4.8, reviewsCount: 421, bookingsCount: 1340, featured: true,
    hotelMakkah: { name: 'Hilton Suites Makkah', stars: 4, distance: '400m from Haram', image: IMG.kaabaClockTower },
    hotelMadinah: { name: 'Pullman Zamzam Madinah', stars: 4, distance: '180m from Masjid Nabawi', image: IMG.greenDomeMinarets },
    flight: { airline: 'Emirates / Qatar Airways', departure: 'Connection via DXB/DOH', arrival: 'Jeddah (JED)', class: 'Economy Plus' },
    meals: 'Breakfast, lunch & dinner — international buffet',
    transport: 'Premium AC coach + airport luxury transfers',
    ziyarah: commonZiyarah,
    visa: 'Hajj visa, biometric registration, e-tasreeh, all permits included',
    included: ['Hajj visa & permits', 'Round-trip flights', '4-star hotels (triple share)', 'All meals', 'Luxury transport', 'Qurbani coupon', 'Ihram & belt', 'Scholar guide', 'Full ziyarat tours', 'Mina tent (C-category)', 'Zamzam water (10L)', '24/7 multilingual support'],
    excluded: ['Personal shopping', 'Laundry', 'Phone calls', 'Tips for porters', 'Optional spa services'],
    itinerary: baseItinerary('hajj', 23),
    gallery: [IMG.kaabaClockTower, IMG.kaabaDayMinarets, IMG.greenDomeMinarets, IMG.nabawiUmbrellaGolden, IMG.nabawiInterior, IMG.kaabaIhramDay],
    cover: IMG.kaabaClockTower,
    faqs: commonFaqs,
    highlights: ['4-star prime location hotels', 'Scholar-led worship', 'Triple-share rooms', 'Premium Mina tents'],
    groupSize: '30-45 pilgrims',
  },
  {
    id: 'pkg-hajj-premium',
    slug: 'premium-hajj-2026',
    name: 'Premium Hajj 2026',
    type: 'hajj', tier: 'premium',
    shortDescription: '5-star hotels with Haram views and double-share rooms. Premium worship experience.',
    description: 'Step into the Premium Hajj experience with 5-star accommodations boasting direct Haram views, double-share rooms with luxury amenities, and a dedicated scholar group leader. Mina tents are upgraded to B-category with private bathrooms. Ideal for pilgrims who value comfort during their sacred journey.',
    duration: 24,
    departureDate: '2026-05-19', returnDate: '2026-06-13',
    price: 13499, discount: 800,
    status: 'published', availability: 'available', seatsLeft: 12,
    rating: 4.9, reviewsCount: 187, bookingsCount: 542, featured: true,
    hotelMakkah: { name: 'Conrad Makkah / Fairmont Clock Tower', stars: 5, distance: '50m / Haram view', image: IMG.kaabaDayMinarets },
    hotelMadinah: { name: 'The Oberoi Madinah', stars: 5, distance: '120m from Masjid Nabawi', image: IMG.greenDomeClose },
    flight: { airline: 'Emirates / Qatar Airways', departure: 'Direct (where available)', arrival: 'Jeddah (JED)', class: 'Premium Economy' },
    meals: 'All meals — premium international buffet, Iftar packages',
    transport: 'Luxury AC coach + private SUVs for VIP transfers',
    ziyarah: commonZiyarah,
    visa: 'Hajj visa, e-tasreeh, all permits, biometric included',
    included: ['Hajj visa & permits', 'Premium Economy flights', '5-star Haram-view hotels (double share)', 'All meals premium', 'Luxury transport', 'Premium Qurbani', 'Ihram premium kit', 'Dedicated scholar', 'Full ziyarat with historian', 'Mina tent (B-category)', 'Zamzam (10L)', 'Welcome gift hamper', '24/7 concierge'],
    excluded: ['Personal shopping', 'Spa', 'International calls', 'Optional excursions'],
    itinerary: baseItinerary('hajj', 24),
    gallery: [IMG.kaabaDayMinarets, IMG.kaabaNightKiswa, IMG.greenDomeClose, IMG.greenDomeStarFrame, IMG.nabawiUmbrellaSky, IMG.kaabaCloseDoor],
    cover: IMG.kaabaDayMinarets,
    faqs: commonFaqs,
    highlights: ['5-star Haram-view hotels', 'Double-share rooms', 'Dedicated scholar', 'Premium Mina tents'],
    groupSize: '20-30 pilgrims',
  },
  {
    id: 'pkg-hajj-vip',
    slug: 'vip-hajj-2026',
    name: 'VIP Hajj 2026',
    type: 'hajj', tier: 'vip',
    shortDescription: 'Unmatched 5-star luxury, single rooms, private scholar, Mina VIP tents.',
    description: 'The pinnacle of Hajj travel. Single-occupancy 5-star suites with direct Haram view, dedicated personal scholar, private transfers, VIP Mina tents (A-category) with hotel-style amenities, and concierge available 24/7. Designed for the discerning pilgrim who wishes to dedicate every moment to worship without distraction.',
    duration: 25,
    departureDate: '2026-05-18', returnDate: '2026-06-14',
    price: 24999, discount: 1500,
    status: 'published', availability: 'limited', seatsLeft: 4,
    rating: 5.0, reviewsCount: 78, bookingsCount: 156, featured: true,
    hotelMakkah: { name: 'Raffles Makkah Palace', stars: 5, distance: 'Adjacent to Haram', image: IMG.kaabaNightKiswa },
    hotelMadinah: { name: 'Madinah Marriott', stars: 5, distance: '90m from Masjid Nabawi', image: IMG.nabawiNight },
    flight: { airline: 'Emirates / Qatar', departure: 'Direct', arrival: 'Jeddah (JED)', class: 'Business Class' },
    meals: 'All meals à la carte, premium Iftar, in-room dining',
    transport: 'Private Mercedes V-Class transfers throughout',
    ziyarah: commonZiyarah,
    visa: 'VIP Hajj visa fast-track, all permits, biometric included',
    included: ['Hajj visa fast-track', 'Business Class flights', '5-star suite single occupancy', 'All meals premium', 'Private Mercedes transfers', 'Premium Qurbani × 2', 'Ihram luxury kit', 'Personal scholar (1:5 ratio)', 'Private ziyarat tours', 'Mina tent (A-category VIP)', 'Zamzam (20L)', 'Welcome hamper', 'Personal butler', '24/7 concierge'],
    excluded: ['Personal shopping above limit', 'Spa upgrades'],
    itinerary: baseItinerary('hajj', 25),
    gallery: [IMG.kaabaNightKiswa, IMG.kaabaNightHaram, IMG.kaabaNightFamily, IMG.nabawiNight, IMG.greenDomeStarFrame, IMG.kaabaCloseDoor],
    cover: IMG.kaabaNightKiswa,
    faqs: commonFaqs,
    highlights: ['Single 5-star suites', 'Personal scholar', 'VIP Mina tents', 'Business Class flights'],
    groupSize: '10-15 pilgrims',
  },

  // ============ UMRAH ============
  {
    id: 'pkg-umrah-budget',
    slug: 'budget-umrah-2026',
    name: 'Budget Umrah',
    type: 'umrah', tier: 'budget',
    shortDescription: 'Most affordable Umrah with 3-star hotels and quad rooms. Perfect for solo travelers.',
    description: 'Our Budget Umrah lets you perform your Umrah without overspending. Stay in clean, well-located 3-star hotels within 15-minute walks of the Haram, share rooms with fellow pilgrims, and enjoy daily breakfast. All visa and ground services included.',
    duration: 7,
    departureDate: '2026-02-15', returnDate: '2026-02-21',
    price: 1199, discount: 100,
    status: 'published', availability: 'available', seatsLeft: 42,
    rating: 4.5, reviewsCount: 312, bookingsCount: 1820, featured: false,
    hotelMakkah: { name: 'Al Massa Hotel', stars: 3, distance: '900m from Haram', image: IMG.haramAerial },
    hotelMadinah: { name: 'Dallah Taibah', stars: 3, distance: '350m from Masjid Nabawi', image: IMG.nabawiUmbrellas },
    flight: { airline: 'Turkish Airlines', departure: 'Connection via IST', arrival: 'Jeddah (JED)', class: 'Economy' },
    meals: 'Breakfast only',
    transport: 'Shared AC coach for transfers and ziyarat',
    ziyarah: ['Jabal al-Nour', 'Jabal Thawr', 'Masjid Aisha', 'Quba Mosque', 'Masjid al-Qiblatain', 'Mount Uhud'],
    visa: 'Umrah visa and processing included',
    included: ['Umrah visa', 'Round-trip flights', '3-star hotels (quad)', 'Breakfast', 'Shared transport', 'Ziyarat tours', 'Group leader', 'Zamzam 5L'],
    excluded: ['Lunch & dinner', 'Personal expenses', 'Travel insurance', 'Phone & internet', 'Tips'],
    itinerary: baseItinerary('umrah', 7),
    gallery: [IMG.kaabaIhramDay, IMG.haramAerial, IMG.nabawiUmbrellas, IMG.greenDomeClose],
    cover: IMG.kaabaIhramDay,
    faqs: commonFaqs,
    highlights: ['3-star hotels', 'Quad-share rooms', 'Most affordable', 'Group leader'],
    groupSize: '25-40 pilgrims',
  },
  {
    id: 'pkg-umrah-economy',
    slug: 'economy-umrah-2026',
    name: 'Economy Umrah',
    type: 'umrah', tier: 'economy',
    shortDescription: 'Solid 3-star Plus stay with triple rooms and half-board meals. Most popular Umrah.',
    description: 'Our most-booked Umrah package balances quality and affordability. Stay closer to the Haram in 3-star Plus hotels, share triple rooms with comfortable bedding, and enjoy breakfast and dinner. A trusted choice that has served thousands of pilgrims.',
    duration: 10,
    departureDate: '2026-03-01', returnDate: '2026-03-10',
    price: 1899, discount: 150,
    status: 'published', availability: 'available', seatsLeft: 27,
    rating: 4.7, reviewsCount: 489, bookingsCount: 2410, featured: true,
    hotelMakkah: { name: 'Al Marwa Rayhaan by Rotana', stars: 4, distance: '500m from Haram', image: IMG.kaabaDayCrowd },
    hotelMadinah: { name: 'Royal Inn Madinah', stars: 4, distance: '250m from Masjid Nabawi', image: IMG.nabawiUmbrellaGolden },
    flight: { airline: 'Qatar Airways', departure: 'Connection via DOH', arrival: 'Jeddah (JED)', class: 'Economy' },
    meals: 'Breakfast & dinner — buffet',
    transport: 'AC coach for all transfers and ziyarat',
    ziyarah: commonZiyarah,
    visa: 'Umrah visa, biometric, and processing included',
    included: ['Umrah visa', 'Round-trip flights', '4-star hotels (triple)', 'Breakfast & dinner', 'AC transport', 'Ziyarat tours', 'Scholar group leader', 'Ihram for males', 'Zamzam 5L', '24/7 support'],
    excluded: ['Lunch', 'Personal expenses', 'Optional excursions', 'Tips'],
    itinerary: baseItinerary('umrah', 10),
    gallery: [IMG.kaabaDayCrowd, IMG.kaabaIhramDay, IMG.nabawiUmbrellaGolden, IMG.greenDomeMinarets, IMG.nabawiCoupleArches],
    cover: IMG.kaabaDayCrowd,
    faqs: commonFaqs,
    highlights: ['4-star hotels', 'Triple-share rooms', 'Scholar leader', 'Half-board meals'],
    groupSize: '20-30 pilgrims',
  },
  {
    id: 'pkg-umrah-premium',
    slug: 'premium-umrah-2026',
    name: 'Premium Umrah',
    type: 'umrah', tier: 'premium',
    shortDescription: '5-star Haram-area hotels with double rooms and full-board meals.',
    description: 'Elevate your Umrah with our Premium package. 5-star hotels within minutes of the Haram, double-occupancy rooms with luxury amenities, three meals a day, and dedicated scholar guidance. Includes premium ziyarat tours with a historian.',
    duration: 12,
    departureDate: '2026-03-15', returnDate: '2026-03-26',
    price: 3299, discount: 200,
    status: 'published', availability: 'available', seatsLeft: 18,
    rating: 4.9, reviewsCount: 234, bookingsCount: 980, featured: true,
    hotelMakkah: { name: 'Swissôtel Makkah / Pullman Zamzam', stars: 5, distance: '180m from Haram', image: IMG.kaabaDayMinarets },
    hotelMadinah: { name: 'Le Meridien Madinah', stars: 5, distance: '120m from Masjid Nabawi', image: IMG.greenDomeStarFrame },
    flight: { airline: 'Emirates / Qatar', departure: 'Connection or Direct', arrival: 'Jeddah (JED)', class: 'Economy Plus' },
    meals: 'All meals — premium international buffet',
    transport: 'Luxury AC coach + private airport transfers',
    ziyarah: commonZiyarah,
    visa: 'Umrah visa fast-track included',
    included: ['Umrah visa fast-track', 'Premium Economy flights', '5-star hotels (double share)', 'All meals premium', 'Luxury transport', 'Dedicated scholar', 'Full ziyarat with historian', 'Ihram premium kit', 'Zamzam 10L', 'Welcome gift', '24/7 concierge'],
    excluded: ['Personal shopping', 'Spa', 'Optional excursions'],
    itinerary: baseItinerary('umrah', 12),
    gallery: [IMG.kaabaDayMinarets, IMG.kaabaNightFamily, IMG.greenDomeStarFrame, IMG.nabawiUmbrellaSky, IMG.kaabaCloseDoor, IMG.greenDomeClose],
    cover: IMG.kaabaDayMinarets,
    faqs: commonFaqs,
    highlights: ['5-star Haram-area hotels', 'Double rooms', 'Full board', 'Premium ziyarat'],
    groupSize: '15-25 pilgrims',
  },
  {
    id: 'pkg-umrah-luxury',
    slug: 'luxury-umrah-2026',
    name: 'Luxury Umrah',
    type: 'umrah', tier: 'luxury',
    shortDescription: 'Ultimate single-suite 5-star experience with private scholar and Mercedes transfers.',
    description: 'The most exclusive Umrah journey. Private 5-star suites with direct Haram view, a personal scholar guide, Mercedes V-Class private transfers, à la carte premium meals, and 24/7 butler service. A truly unforgettable spiritual experience for VIP pilgrims.',
    duration: 14,
    departureDate: '2026-04-01', returnDate: '2026-04-14',
    price: 6499, discount: 400,
    status: 'published', availability: 'limited', seatsLeft: 6,
    rating: 5.0, reviewsCount: 89, bookingsCount: 215, featured: true,
    hotelMakkah: { name: 'Raffles Makkah Palace (Suite)', stars: 5, distance: 'Adjacent to Haram', image: IMG.kaabaNightHaram },
    hotelMadinah: { name: 'The Oberoi Madinah (Suite)', stars: 5, distance: '90m from Masjid Nabawi', image: IMG.nabawiNight },
    flight: { airline: 'Emirates / Qatar', departure: 'Direct', arrival: 'Jeddah (JED)', class: 'Business Class' },
    meals: 'À la carte premium, in-room dining 24/7',
    transport: 'Private Mercedes V-Class throughout',
    ziyarah: commonZiyarah,
    visa: 'Umrah visa VIP fast-track included',
    included: ['VIP visa fast-track', 'Business Class flights', '5-star suite single occupancy', 'À la carte meals', 'Private Mercedes', 'Personal scholar (1:3)', 'Private ziyarat', 'Luxury ihram kit', 'Zamzam 20L', 'Welcome hamper', 'Personal butler', '24/7 concierge'],
    excluded: ['Personal shopping above limit'],
    itinerary: baseItinerary('umrah', 14),
    gallery: [IMG.kaabaNightHaram, IMG.kaabaNightKiswa, IMG.kaabaNightFamily, IMG.nabawiNight, IMG.greenDomeStarFrame],
    cover: IMG.kaabaNightHaram,
    faqs: commonFaqs,
    highlights: ['Single 5-star suites', 'Personal scholar', 'Mercedes transfers', 'Business Class'],
    groupSize: '8-12 pilgrims',
  },
]

export const getPackage = (slug: string) => packages.find(p => p.slug === slug)
export const getPackagesByType = (type: PackageType) => packages.filter(p => p.type === type)
export const getFeaturedPackages = () => packages.filter(p => p.featured)
