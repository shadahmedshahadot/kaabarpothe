// Editable hero content. Admin dashboard reads + writes this shape.
// Default values shipped with the build; runtime edits persist via localStorage.

export interface HeroStat {
  value: number
  suffix?: string
  decimals?: number
  label: string
}

export interface HeroContent {
  videoId: string
  badge: string
  titleStart: string
  titleHighlight: string
  description: string
  ctaUmrah: string
  ctaHajj: string
  trustBadges: string[]
  reflectionEyebrow: string
  reflectionQuote: string
  reflectionRef: string
  reflectionItems: { label: string; value: string }[]
  stats: HeroStat[]
}

export const DEFAULT_HERO_CONTENT: HeroContent = {
  videoId: 'weCvgHcbdP4',
  badge: 'Sacred journeys, perfected since 2015',
  titleStart: 'Your sacred journey,',
  titleHighlight: 'designed for grace.',
  description:
    'Curated Hajj & Umrah packages led by qualified scholars, with transparent pricing, 5-star partners, and 24/7 ground support. Trusted by 50,000+ pilgrims worldwide.',
  ctaUmrah: 'Find Umrah',
  ctaHajj: 'Find Hajj',
  trustBadges: [
    'Saudi Ministry Licensed',
    '4.9/5 (12K+ reviews)',
    'Free cancellation 60+ days',
  ],
  reflectionEyebrow: "Today's reflection",
  reflectionQuote:
    '"And proclaim to mankind the Hajj. They will come to thee on foot and on every lean camel, from every deep ravine."',
  reflectionRef: "— Qur'an 22:27",
  reflectionItems: [
    { label: 'Hajj 2026', value: 'May 19' },
    { label: 'Umrah', value: 'Year-round' },
    { label: 'Visa SLA', value: '7-14 days' },
  ],
  stats: [
    { value: 50000, suffix: '+', label: 'Pilgrims Served' },
    { value: 1000, suffix: '+', label: 'Departures / Year' },
    { value: 4.9, decimals: 1, suffix: '/5', label: 'Avg. Rating' },
    { value: 100, suffix: '%', label: 'Saudi Licensed' },
  ],
}

export const HERO_STORAGE_KEY = 'sakinah:hero-content:v1'
