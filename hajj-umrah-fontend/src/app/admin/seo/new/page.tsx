'use client'

import { useGetGlobalSEOQuery } from '@/redux/fetchres/seo/seoApi'
import { SEOEditor } from '@/features/admin/seo/SEOEditor'

export default function NewSEOPage() {
  const { data: globalData } = useGetGlobalSEOQuery()
  return <SEOEditor mode="create" page={null} global={globalData?.data ?? null} />
}
