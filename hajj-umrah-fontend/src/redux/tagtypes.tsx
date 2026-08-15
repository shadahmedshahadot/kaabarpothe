export const tagTypesList = [
  'auth',
  'user',
  'package',
  'transport',
  'booking',
  'payment',
  'invoice',
  'inquiry',
  'blog',
  'faq',
  'testimonial',
  'siteContent',
  'document',
  'notification',
  'bookingMessage',
  'bookingTimeline',
  'bookingDocument',
  'bookingActivity',
  'seoPage',
  'seoGlobal',
] as const

export type TagType = (typeof tagTypesList)[number]
