'use client'

import { useParams } from 'next/navigation'
import { useGetSEOPageQuery, useGetGlobalSEOQuery } from '@/redux/fetchres/seo/seoApi'
import { SEOEditor } from '@/features/admin/seo/SEOEditor'

export default function EditSEOPage() {
  const params = useParams<{ id: string }>()
  const id = params?.id
  const { data, isLoading } = useGetSEOPageQuery(id!, { skip: !id })
  const { data: globalData } = useGetGlobalSEOQuery()

  if (isLoading || !data?.data) {
    return <div className="py-12 text-center text-muted-foreground">Loading…</div>
  }

  return <SEOEditor mode="edit" page={data.data} global={globalData?.data ?? null} />
}
