'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { ArrowRight, Loader2, Plane } from 'lucide-react'

import { SectionHeading } from '@/components/ui/section-heading'
import { FlightCard } from '@/features/flights/components/flight-card'
import { useGetFlightsQuery } from '@/redux/fetchres/flight/flightApi'
import { adaptFlight } from '@/redux/fetchres/flight/adapter'

export function FeaturedFlights() {
  const { data, isLoading, isError } = useGetFlightsQuery({ featured: true, status: 'ACTIVE', limit: 6 })

  const flights = useMemo(() => (data?.data ?? []).map(adaptFlight), [data])

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <svg className="absolute top-10 right-10 w-40 h-40 text-primary/5" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 0 L60 40 L100 50 L60 60 L50 100 L40 60 L0 50 L40 40 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <SectionHeading
            eyebrow="বাছাইকৃত ফ্লাইট"
            title="হারামের পথে সরাসরি — আপনার পছন্দের সময়ে।"
            description="বিশ্বস্ত এয়ারলাইন, প্রতিযোগিতামূলক মূল্য, পবিত্র যাত্রার জন্য বিশেষভাবে নির্বাচিত।"
            align="left"
            className="!max-w-2xl !mx-0"
          />
          <Link
            href="/flights"
            className="self-start inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-card border border-border text-sm font-semibold text-foreground hover:border-primary hover:text-primary hover:shadow-md transition-all group"
          >
            সব ফ্লাইট দেখুন
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">ফ্লাইট লোড হচ্ছে...</p>
          </div>
        )}

        {isError && (
          <div className="text-center py-20 max-w-md mx-auto">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-rose-500/10 flex items-center justify-center">
              <Plane className="w-8 h-8 text-rose-500" />
            </div>
            <p className="text-rose-500 font-semibold mb-1">ফ্লাইট লোড করতে ব্যর্থ হয়েছে</p>
            <p className="text-sm text-muted-foreground">সার্ভার চালু আছে কি?</p>
          </div>
        )}

        {!isLoading && !isError && flights.length === 0 && (
          <div className="text-center py-24 max-w-md mx-auto">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-muted flex items-center justify-center">
              <Plane className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">এখনও কোনো ফিচার্ড ফ্লাইট প্রকাশিত হয়নি।</p>
          </div>
        )}

        {!isLoading && !isError && flights.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {flights.map((f, i) => (
              <FlightCard key={f.id} flight={f} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
