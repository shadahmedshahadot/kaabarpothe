import { PageShell, PageHero } from '@/components/layouts/page-shell'
import { PackageListing } from '@/features/packages/components/package-listing'
import { BreadcrumbJsonLd } from '@/components/common'
import StructuredData from '@/components/seo/StructuredData'
import { generateSEOMetadata, resolvePageSEO } from '@/lib/seo'

export async function generateMetadata() {
  return generateSEOMetadata('/packages/hajj')
}

export default async function HajjPackagesPage() {
  const { structuredData } = await resolvePageSEO('/packages/hajj')
  return (
    <PageShell>
      <BreadcrumbJsonLd items={[{ label: 'হজ্জ প্যাকেজ' }]} />
      <StructuredData data={structuredData} keyPrefix="packages-hajj" />
      <PageHero
        eyebrow="হজ্জ ২০২৬"
        title="সম্পূর্ণ হজ্জ প্যাকেজ, চারটি স্তর, একটি পবিত্র লক্ষ্য।"
        description="ইকোনমি কোয়াড রুম থেকে শুরু করে ব্যক্তিগত আলেমসহ ভিআইপি ৫-তারকা স্যুট পর্যন্ত। প্রতিটি প্যাকেজ সৌদি মন্ত্রণালয় অনুমোদিত এবং সম্পূর্ণ অন্তর্ভুক্ত।"
      />
      <PackageListing type="hajj" />
    </PageShell>
  )
}
