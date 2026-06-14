import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ | Sakinah Travels',
  description: 'Frequently asked questions about booking Hajj and Umrah packages, visas, payments, and the journey itself.',
}

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return children
}
