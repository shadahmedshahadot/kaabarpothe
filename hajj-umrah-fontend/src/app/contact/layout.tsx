import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us | Sakinah Travels',
  description: '24/7 pilgrim support. Talk to our scholar team about Hajj or Umrah packages, group bookings, or visa questions.',
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
