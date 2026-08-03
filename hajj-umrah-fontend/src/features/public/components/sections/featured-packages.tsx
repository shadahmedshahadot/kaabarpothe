'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Loader2, Package as PackageIcon, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

import { SectionHeading } from '@/components/ui/section-heading'
import { PackageCard } from '@/components/ui/package-card'
import { useGetPackagesQuery } from '@/redux/fetchres/package/packageApi'
import { adaptPackage } from '@/redux/fetchres/package/adapter'

export function FeaturedPackages() {
  const [tab, setTab] = useState<'all' | 'hajj' | 'umrah'>('all')
  const { data, isLoading, isError } = useGetPackagesQuery({ featured: true, limit: 12 })

  const list = useMemo(() => {
    const all = (data?.data ?? []).map(adaptPackage)
    return all.filter(p => tab === 'all' || p.type === tab).slice(0, 6)
  }, [data, tab])

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-muted/30 via-muted/20 to-transparent overflow-hidden">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <SectionHeading
            eyebrow="বাছাইকৃত প্রস্থান"
            title="আপনার মতো হাজীদের পছন্দের প্যাকেজ।"
            description="বাজেট উমরাহ থেকে ভিআইপি হজ্জ — প্রতিটি প্যাকেজ আমাদের আলেম পর্যালোচনা বোর্ড দ্বারা যাচাইকৃত।"
            align="left"
            className="!max-w-2xl !mx-0"
          />

          <div className="inline-flex p-1.5 bg-card border border-border rounded-2xl self-start shadow-sm">
            {(['all', 'umrah', 'hajj'] as const).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`relative px-6 py-2.5 text-sm font-semibold rounded-xl transition-colors ${
                  tab === t ? 'text-white' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab === t && (
                  <motion.span
                    layoutId="featured-tab"
                    className="absolute inset-0 bg-gradient-to-r from-primary to-amber-500 rounded-xl shadow-md shadow-primary/30"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10">
                  {t === 'all' ? 'সব' : t === 'umrah' ? 'উমরাহ' : 'হজ্জ'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">প্যাকেজ লোড হচ্ছে...</p>
          </div>
        )}

        {isError && (
          <div className="text-center py-20 max-w-md mx-auto">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-rose-500/10 flex items-center justify-center">
              <PackageIcon className="w-8 h-8 text-rose-500" />
            </div>
            <p className="text-rose-500 font-semibold mb-1">প্যাকেজ লোড করতে ব্যর্থ হয়েছে</p>
            <p className="text-sm text-muted-foreground">সার্ভার চালু আছে কি?</p>
          </div>
        )}

        {!isLoading && !isError && list.length === 0 && (
          <div className="text-center py-24 max-w-md mx-auto">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-muted flex items-center justify-center">
              <PackageIcon className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">কোন প্যাকেজ পাওয়া যায়নি।</p>
          </div>
        )}

        {!isLoading && !isError && list.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map((pkg, i) => (
              <PackageCard key={pkg.id} pkg={pkg} index={i} />
            ))}
          </div>
        )}

        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/packages/umrah"
            className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background rounded-2xl font-semibold hover:bg-primary shadow-lg hover:shadow-primary/30 transition-all group"
          >
            <Sparkles className="w-4 h-4" />
            সব প্যাকেজ দেখুন
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-border rounded-2xl font-semibold hover:border-primary hover:text-primary transition-colors"
          >
            কাস্টম প্যাকেজ চান?
          </Link>
        </div>
      </div>
    </section>
  )
}
