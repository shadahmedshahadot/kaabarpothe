'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { useGetTransportsQuery, type TransportListQuery } from '@/redux/fetchres/transport/transportApi'
import type { TransportType } from '@/data/transports'
import { TransportListing } from './transport-listing'

const LIMIT = 10

type Sort = 'recommended' | 'price-asc' | 'price-desc'

export function TransportListingRemote() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [type, setType] = useState<'' | TransportType>('')
  const [sort, setSort] = useState<Sort>('recommended')

  const sortMap: Record<Sort, { sort?: string; order?: 'asc' | 'desc' }> = {
    recommended: {},
    'price-asc': { sort: 'price', order: 'asc' },
    'price-desc': { sort: 'price', order: 'desc' },
  }

  const query: TransportListQuery = {
    status: 'active',
    page,
    limit: LIMIT,
    ...(search ? { search } : {}),
    ...(type ? { type } : {}),
    ...sortMap[sort],
  }

  const { data, isLoading, isError, isFetching } = useGetTransportsQuery(query)
  const list = data?.data ?? []
  const total = data?.meta?.total ?? list.length

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    )
  }

  if (isError && list.length === 0) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        পরিবহন তথ্য লোড করতে ব্যর্থ। পরে চেষ্টা করুন।
      </div>
    )
  }

  return (
    <TransportListing
      transports={list}
      search={search}
      onSearch={v => { setSearch(v); setPage(1) }}
      type={type}
      onType={v => { setType(v); setPage(1) }}
      sort={sort}
      onSort={setSort}
      page={page}
      onPageChange={setPage}
      limit={LIMIT}
      total={total}
      isFetching={isFetching}
    />
  )
}
