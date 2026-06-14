import { Header } from '@/components/layouts/site-header'
import { Hero } from '@/features/public/components/sections/hero-section'
import { TrustSection } from '@/features/public/components/sections/trust-section'
import { FeaturedPackages } from '@/features/public/components/sections/featured-packages'
import { ProcessSection } from '@/features/public/components/sections/process-section'
import { DestinationsSection } from '@/features/public/components/sections/destinations-section'
import { Testimonials } from '@/features/public/components/sections/testimonials-section'
import { BlogPreview } from '@/features/public/components/sections/blog-preview'
import { CTASection } from '@/features/public/components/sections/cta-section'
import { Footer } from '@/components/layouts/site-footer'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  name: 'Sakinah Travels',
  url: 'https://sakinah.travel',
  description: 'Premium Hajj and Umrah packages.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '500 Madison Ave, Floor 42',
    addressLocality: 'New York',
    addressRegion: 'NY',
    postalCode: '10022',
    addressCountry: 'US',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: 4.9,
    reviewCount: 12420,
    bestRating: 5,
  },
  telephone: '+1-800-555-1234',
}

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main>
        <Hero />
        <TrustSection />
        <FeaturedPackages />
        <ProcessSection />
        <DestinationsSection />
        <Testimonials />
        <BlogPreview />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
