import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Reviews & Testimonials | Sakinah Travels',
  description: 'Read real reviews from verified Hajj and Umrah pilgrims. 12,000+ reviews. 4.9 average rating.',
}

export default function ReviewsLayout({ children }: { children: React.ReactNode }) {
  return children
}
