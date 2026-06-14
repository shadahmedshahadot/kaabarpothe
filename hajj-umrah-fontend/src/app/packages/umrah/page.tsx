import type { Metadata } from 'next'
import { PageShell, PageHero } from '@/components/layouts/page-shell'
import { PackageListing } from '@/features/packages/components/package-listing'
import { getPackagesByType } from '@/data/packages'

export const metadata: Metadata = {
  title: 'Umrah Packages | Sakinah Travels',
  description: 'Budget, Economy, Premium, and Luxury Umrah packages year-round. Scholar-led groups, hotels near Haram, Saudi Ministry licensed.',
}

export default function UmrahPackagesPage() {
  const packages = getPackagesByType('umrah')
  return (
    <PageShell>
      <PageHero
        eyebrow="Umrah year-round"
        title="Umrah packages for every budget and season."
        description="From affordable Budget Umrah to ultra-luxury Mercedes-transferred suites. Perform Umrah any month of the year."
      />
      <PackageListing packages={packages} type="umrah" />
    </PageShell>
  )
}
