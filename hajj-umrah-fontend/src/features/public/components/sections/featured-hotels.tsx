'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { ArrowRight, Loader2, BedDouble } from 'lucide-react'

import { SectionHeading } from '@/components/ui/section-heading'
import { HotelCard } from '@/features/hotels/components/hotel-card'
import { useGetHotelsQuery } from '@/redux/fetchres/hotel/hotelApi'
import { adaptHotel } from '@/redux/fetchres/hotel/adapter'

export function FeaturedHotels() {
  const { data, isLoading, isError } = useGetHotelsQuery({ featured: true, status: 'ACTIVE', limit: 6 })

  const hotels = useMemo(() => (data?.data ?? []).map(adaptHotel), [data])

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-muted/30 to-transparent overflow-hidden">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-accent/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <SectionHeading
            eyebrow="বাছাইকৃত হোটেল"
            title="হারাম ও মসজিদে নববীর কাছের প্রিমিয়াম হোটেল।"
            description="৩-তারকা থেকে ৫-তারকা — প্রতিটি বাজেটের জন্য, হাঁটার দূরত্বে।"
            align="left"
            className="!max-w-2xl !mx-0"
          />
          <Link
            href="/hotels"
            className="self-start inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-card border border-border text-sm font-semibold text-foreground hover:border-primary hover:text-primary hover:shadow-md transition-all group"
          >
            সব হোটেল দেখুন
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">হোটেল লোড হচ্ছে...</p>
          </div>
        )}

        {isError && (
          <div className="text-center py-20 max-w-md mx-auto">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-rose-500/10 flex items-center justify-center">
              <BedDouble className="w-8 h-8 text-rose-500" />
            </div>
            <p className="text-rose-500 font-semibold mb-1">হোটেল লোড করতে ব্যর্থ হয়েছে</p>
            <p className="text-sm text-muted-foreground">সার্ভার চালু আছে কি?</p>
          </div>
        )}

        {!isLoading && !isError && hotels.length === 0 && (
          <div className="text-center py-24 max-w-md mx-auto">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-muted flex items-center justify-center">
              <BedDouble className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">এখনও কোনো ফিচার্ড হোটেল প্রকাশিত হয়নি।</p>
          </div>
        )}

        {!isLoading && !isError && hotels.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotels.map((h, i) => (
              <HotelCard key={h.id} hotel={h} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
