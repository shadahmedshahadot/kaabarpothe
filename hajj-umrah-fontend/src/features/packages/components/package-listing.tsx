'use client'

import { useState, useMemo } from 'react'
import { Filter, SlidersHorizontal, Loader2, Search } from 'lucide-react'
import { PackageCard } from '@/components/ui/package-card'
import { Select } from '@/components/ui/input'
import type { PackageType } from '@/data/packages'
import {
  useGetPackagesQuery,
  type PackageListQuery,
  type PackageDto,
} from '@/redux/fetchres/package/packageApi'
import { adaptPackage } from '@/redux/fetchres/package/adapter'

const LIMIT = 10

type Sort = 'popular' | 'price-asc' | 'price-desc' | 'rating'

interface Props {
  type: PackageType
}

export function PackageListing({ type }: Props) {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [tier, setTier] = useState<'' | PackageDto['tier']>('')
  const [duration, setDuration] = useState<string>('')
  const [sort, setSort] = useState<Sort>('popular')

  const sortMap: Record<Sort, { sort?: string; order?: 'asc' | 'desc' }> = {
    popular: { sort: 'bookingsCount', order: 'desc' },
    'price-asc': { sort: 'price', order: 'asc' },
    'price-desc': { sort: 'price', order: 'desc' },
    rating: { sort: 'rating', order: 'desc' },
  }

  const query: PackageListQuery = {
    type: type.toUpperCase() as 'HAJJ' | 'UMRAH',
    status: 'PUBLISHED',
    page,
    limit: LIMIT,
    ...(search ? { search } : {}),
    ...(tier ? { tier } : {}),
    ...sortMap[sort],
  }

  const { data, isLoading, isError, isFetching } = useGetPackagesQuery(query)

  const packages = useMemo(() => {
    const list = (data?.data ?? []).map(adaptPackage)
    if (!duration) return list
    const [min, max] = duration.split('-').map(Number)
    return list.filter(p => p.duration >= min && (!max || p.duration <= max))
  }, [data, duration])

  const total = data?.meta?.total ?? data?.data?.length ?? 0
  const totalPages = Math.max(1, Math.ceil(total / LIMIT))
  const canPrev = page > 1
  const canNext = page < totalPages

  const tierOptions: PackageDto['tier'][] =
    type === 'hajj'
      ? ['ECONOMY', 'STANDARD', 'PREMIUM', 'VIP']
      : ['BUDGET', 'ECONOMY', 'PREMIUM', 'LUXURY']

  const tierLabel = (t: PackageDto['tier']) => t[0] + t.slice(1).toLowerCase()

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6 mb-8 items-start lg:items-center justify-between">
          <p className="text-sm text-muted-foreground">
            <span className="font-bold text-foreground">{total}</span>টি প্যাকেজ পাওয়া গেছে
            {isFetching && <Loader2 className="inline w-3 h-3 ml-2 animate-spin" />}
          </p>

          <div className="flex flex-wrap gap-3 items-center w-full lg:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="প্যাকেজ অনুসন্ধান…"
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1) }}
                className="h-9 pl-9 pr-3 rounded-lg border border-border bg-background text-sm min-w-[180px] focus:border-primary focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-2 text-sm text-foreground/70">
              <SlidersHorizontal className="w-4 h-4" /> ফিল্টার:
            </div>
            <Select value={tier} onChange={e => { setTier(e.target.value as '' | PackageDto['tier']); setPage(1) }} className="w-auto min-w-[140px]">
              <option value="">সব টিয়ার</option>
              {tierOptions.map(t => <option key={t} value={t}>{tierLabel(t)}</option>)}
            </Select>
            <Select value={duration} onChange={e => { setDuration(e.target.value); setPage(1) }} className="w-auto min-w-[140px]">
              <option value="">যেকোনো সময়কাল</option>
              <option value="5-9">৫-৯ দিন</option>
              <option value="10-14">১০-১৪ দিন</option>
              <option value="15-25">১৫+ দিন</option>
            </Select>
            <Select value={sort} onChange={e => setSort(e.target.value as Sort)} className="w-auto min-w-[160px]">
              <option value="popular">সবচেয়ে জনপ্রিয়</option>
              <option value="price-asc">মূল্য: কম থেকে বেশি</option>
              <option value="price-desc">মূল্য: বেশি থেকে কম</option>
              <option value="rating">সর্বোচ্চ রেটিং</option>
            </Select>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
          </div>
        ) : isError ? (
          <div className="text-center py-20 text-rose-500">প্যাকেজ লোড করতে ব্যর্থ হয়েছে।</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {packages.map((p, i) => <PackageCard key={p.id} pkg={p} index={i} />)}
            </div>

            {packages.length === 0 && (
              <div className="text-center py-20 text-muted-foreground">
                <Filter className="w-12 h-12 mx-auto mb-4 opacity-40" />
                <p>আপনার ফিল্টারের সাথে কোনো প্যাকেজ মেলেনি।</p>
              </div>
            )}

            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-3 text-sm">
                <button
                  onClick={() => canPrev && setPage(page - 1)}
                  disabled={!canPrev}
                  className="px-4 py-2 rounded-lg border border-border hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  পূর্ববর্তী
                </button>
                <span className="text-muted-foreground">পৃষ্ঠা {page} / {totalPages}</span>
                <button
                  onClick={() => canNext && setPage(page + 1)}
                  disabled={!canNext}
                  className="px-4 py-2 rounded-lg border border-border hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  পরবর্তী
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
