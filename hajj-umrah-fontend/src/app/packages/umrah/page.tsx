import { PageShell, PageHero } from '@/components/layouts/page-shell'
import { PackageListing } from '@/features/packages/components/package-listing'
import { BreadcrumbJsonLd } from '@/components/common'
import StructuredData from '@/components/seo/StructuredData'
import { generateSEOMetadata, resolvePageSEO } from '@/lib/seo'

export async function generateMetadata() {
  return generateSEOMetadata('/packages/umrah')
}

export default async function UmrahPackagesPage() {
  const { structuredData } = await resolvePageSEO('/packages/umrah')
  return (
    <PageShell>
      <BreadcrumbJsonLd items={[{ label: 'উমরাহ প্যাকেজ' }]} />
      <StructuredData data={structuredData} keyPrefix="packages-umrah" />
      <PageHero
        eyebrow="সারা বছরের উমরাহ"
        title="প্রতিটি বাজেট ও মৌসুমের জন্য উমরাহ প্যাকেজ।"
        description="সাশ্রয়ী বাজেট উমরাহ থেকে শুরু করে অতি-লাক্সারি মার্সিডিজ ট্রান্সফারযুক্ত স্যুট পর্যন্ত। বছরের যেকোনো মাসে উমরাহ পালন করুন।"
      />
      <PackageListing type="umrah" />
    </PageShell>
  )
}
