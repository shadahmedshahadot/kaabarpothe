import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import type { Package } from '@/data/packages'

export function PackageBreadcrumbs({ pkg }: { pkg: Package }) {
  return (
    <nav className="text-sm text-muted-foreground mb-6 flex items-center gap-2">
      <Link href="/" className="hover:text-foreground">Home</Link>
      <ChevronRight className="w-3 h-3" />
      <Link href={`/packages/${pkg.type}`} className="hover:text-foreground capitalize">{pkg.type} Packages</Link>
      <ChevronRight className="w-3 h-3" />
      <span className="text-foreground font-medium">{pkg.name}</span>
    </nav>
  )
}
