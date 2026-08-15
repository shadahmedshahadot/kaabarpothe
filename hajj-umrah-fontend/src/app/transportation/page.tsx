import { PageShell, PageHero } from '@/components/layouts/page-shell'
import { TransportListingRemote } from '@/features/transports/components/transport-listing-remote'
import StructuredData from '@/components/seo/StructuredData'
import { generateSEOMetadata, resolvePageSEO } from '@/lib/seo'

export async function generateMetadata() {
  return generateSEOMetadata('/transportation')
}

export default async function TransportationPage() {
  const { structuredData } = await resolvePageSEO('/transportation')
  return (
    <PageShell>
      <StructuredData data={structuredData} keyPrefix="transportation" />
      <PageHero
        eyebrow="পরিবহন"
        title="সৌদি আরবে স্থল পরিবহন।"
        description="বিমানবন্দর ট্রান্সফার, আন্তঃনগর কোচ, যিয়ারত ট্যুর এবং হারাম শাটল। আলাদাভাবে অথবা আপনার হোটেল ও ফ্লাইটের সাথে বুক করুন।"
      />
      <TransportListingRemote />
    </PageShell>
  )
}
