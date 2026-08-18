import dynamic from 'next/dynamic'
import { Header } from '@/components/layouts/site-header'
import { Hero } from '@/features/public/components/sections/hero-section'
import { TrustSection } from '@/features/public/components/sections/trust-section'
import { Footer } from '@/components/layouts/site-footer'
import StructuredData from '@/components/seo/StructuredData'
import { generateSEOMetadata, resolvePageSEO } from '@/lib/seo'

const FeaturedPackages = dynamic(
  () => import('@/features/public/components/sections/featured-packages').then(m => m.FeaturedPackages),
)
const ProcessSection = dynamic(
  () => import('@/features/public/components/sections/process-section').then(m => m.ProcessSection),
)
const DestinationsSection = dynamic(
  () => import('@/features/public/components/sections/destinations-section').then(m => m.DestinationsSection),
)
const Testimonials = dynamic(
  () => import('@/features/public/components/sections/testimonials-section').then(m => m.Testimonials),
)
const CTASection = dynamic(
  () => import('@/features/public/components/sections/cta-section').then(m => m.CTASection),
)

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
