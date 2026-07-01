'use client'

import { Loader2 } from 'lucide-react'
import { useGetTransportsQuery } from '@/redux/fetchres/transport/transportApi'
import { transports as fallback } from '@/data/transports'
import { TransportListing } from './transport-listing'

export function TransportListingRemote() {
  const { data, isLoading, isError } = useGetTransportsQuery()
  const list = data?.data?.length ? data.data : fallback

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

  return <TransportListing transports={list} />
}
