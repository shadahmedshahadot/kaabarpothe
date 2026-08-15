import { BreadcrumbJsonLd } from '@/components/common'
import StructuredData from '@/components/seo/StructuredData'
import { generateSEOMetadata, resolvePageSEO } from '@/lib/seo'

export async function generateMetadata() {
  return generateSEOMetadata('/reviews')
}

export default async function ReviewsLayout({ children }: { children: React.ReactNode }) {
  const { structuredData } = await resolvePageSEO('/reviews')
  return (
    <>
      <BreadcrumbJsonLd items={[{ label: 'রিভিউ' }]} />
      <StructuredData data={structuredData} keyPrefix="reviews" />
      {children}
    </>
  )
}
