import { faqs } from '@/data/faqs'
import { BreadcrumbJsonLd } from '@/components/common'
import StructuredData from '@/components/seo/StructuredData'
import { generateSEOMetadata, resolvePageSEO } from '@/lib/seo'

export async function generateMetadata() {
  return generateSEOMetadata('/faq')
}

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
}

export default async function FAQLayout({ children }: { children: React.ReactNode }) {
  const { structuredData } = await resolvePageSEO('/faq')
  return (
    <>
      <BreadcrumbJsonLd items={[{ label: 'প্রশ্নোত্তর' }]} />
      <StructuredData data={structuredData} keyPrefix="faq-page" />
      <StructuredData data={faqLd} keyPrefix="faq-content" />
      {children}
    </>
  )
}
