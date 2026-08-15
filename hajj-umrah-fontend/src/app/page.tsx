import { Header } from '@/components/layouts/site-header'
import { Hero } from '@/features/public/components/sections/hero-section'
import { TrustSection } from '@/features/public/components/sections/trust-section'
import { FeaturedPackages } from '@/features/public/components/sections/featured-packages'
import { ProcessSection } from '@/features/public/components/sections/process-section'
import { DestinationsSection } from '@/features/public/components/sections/destinations-section'
import { Testimonials } from '@/features/public/components/sections/testimonials-section'
import { CTASection } from '@/features/public/components/sections/cta-section'
import { Footer } from '@/components/layouts/site-footer'
import StructuredData from '@/components/seo/StructuredData'
import { generateSEOMetadata, resolvePageSEO } from '@/lib/seo'

export async function generateMetadata() {
  return generateSEOMetadata('/')
}

export default async function Home() {
  const { structuredData } = await resolvePageSEO('/')
  return (
    <>
      <StructuredData data={structuredData} keyPrefix="home" />
      <div className="bg-home-canvas min-h-screen">
        <Header />
        <main id="main-content">
          <Hero />
          <TrustSection />
          <FeaturedPackages />
          <ProcessSection />
          <DestinationsSection />
          <Testimonials />
          <CTASection />
        </main>
        <Footer />
      </div>
    </>
  )
}
