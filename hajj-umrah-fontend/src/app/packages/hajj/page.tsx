import type { Metadata } from 'next'
import { PageShell, PageHero } from '@/components/layouts/page-shell'
import { PackageListing } from '@/features/packages/components/package-listing'
import { getPackagesByType } from '@/data/packages'

export const metadata: Metadata = {
  title: 'Hajj Packages 2026 | Sakinah Travels',
  description: 'Browse Economy, Standard, Premium, and VIP Hajj packages for 2026. Scholar-led groups, 5-star hotels, Saudi Ministry licensed.',
}

export default function HajjPackagesPage() {
  const packages = getPackagesByType('hajj')
  return (
    <PageShell>
      <PageHero
        eyebrow="Hajj 2026"
        title="Complete Hajj packages, four tiers, one sacred goal."
        description="From Economy quad rooms to VIP 5-star suites with personal scholars. Every package is Saudi Ministry licensed and fully inclusive."
      />
      <PackageListing packages={packages} type="hajj" />
    </PageShell>
  )
}
