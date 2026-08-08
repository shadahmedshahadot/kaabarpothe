'use client'

import { Filter, SlidersHorizontal, Loader2, Search } from 'lucide-react'
import { Select } from '@/components/ui/input'
import { type Transport, type TransportType, TRANSPORT_TYPES } from '@/data/transports'
import { TransportCard } from './transport-card'

type Sort = 'recommended' | 'price-asc' | 'price-desc'

interface Props {
  transports: Transport[]
  search: string
  onSearch: (v: string) => void
  type: '' | TransportType
  onType: (v: '' | TransportType) => void
  sort: Sort
  onSort: (v: Sort) => void
  page: number
  onPageChange: (p: number) => void
  limit: number
  total: number
  isFetching?: boolean
}

export function TransportListing({
  transports,
  search,
  onSearch,
  type,
  onType,
  sort,
  onSort,
  page,
  onPageChange,
  limit,
  total,
  isFetching,
}: Props) {
  const totalPages = Math.max(1, Math.ceil(total / limit))
  const canPrev = page > 1
  const canNext = page < totalPages

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6 mb-8 items-start lg:items-center justify-between">
          <p className="text-sm text-muted-foreground">
            <span className="font-bold text-foreground">{total}</span> টি পরিষেবা উপলব্ধ
            {isFetching && <Loader2 className="inline w-3 h-3 ml-2 animate-spin" />}
          </p>
          <div className="flex flex-wrap gap-3 items-center w-full lg:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="পরিবহন অনুসন্ধান…"
                value={search}
                onChange={e => onSearch(e.target.value)}
                className="h-9 pl-9 pr-3 rounded-lg border border-border bg-background text-sm min-w-[180px] focus:border-primary focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-2 text-sm text-foreground/70">
              <SlidersHorizontal className="w-4 h-4" /> ফিল্টার:
            </div>
            <Select value={type} onChange={e => onType(e.target.value as '' | TransportType)} className="w-auto min-w-[160px]">
              <option value="">সকল ধরন</option>
              {TRANSPORT_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
            </Select>
            <Select value={sort} onChange={e => onSort(e.target.value as Sort)} className="w-auto min-w-[160px]">
              <option value="recommended">প্রস্তাবিত</option>
              <option value="price-asc">দাম: কম থেকে বেশি</option>
              <option value="price-desc">দাম: বেশি থেকে কম</option>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {transports.map((t, i) => <TransportCard key={t.id} transport={t} index={i} />)}
        </div>

        {transports.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <Filter className="w-12 h-12 mx-auto mb-4 opacity-40" />
            <p>আপনার ফিল্টারের সাথে কোনো পরিবহন পরিষেবা মেলেনি।</p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-3 text-sm">
            <button
              onClick={() => canPrev && onPageChange(page - 1)}
              disabled={!canPrev}
              className="px-4 py-2 rounded-lg border border-border hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed"
            >
              পূর্ববর্তী
            </button>
            <span className="text-muted-foreground">পৃষ্ঠা {page} / {totalPages}</span>
            <button
              onClick={() => canNext && onPageChange(page + 1)}
              disabled={!canNext}
              className="px-4 py-2 rounded-lg border border-border hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed"
            >
              পরবর্তী
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
