import { BreadcrumbJsonLd } from '@/components/common'
import StructuredData from '@/components/seo/StructuredData'
import { generateSEOMetadata, resolvePageSEO } from '@/lib/seo'

export async function generateMetadata() {
  return generateSEOMetadata('/contact')
}

export default async function ContactLayout({ children }: { children: React.ReactNode }) {
  const { structuredData } = await resolvePageSEO('/contact')
  return (
    <>
      <BreadcrumbJsonLd items={[{ label: 'যোগাযোগ' }]} />
      <StructuredData data={structuredData} keyPrefix="contact" />
      {children}
    </>
  )
}
