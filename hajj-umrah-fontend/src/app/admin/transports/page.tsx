'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Plus, Edit, Trash2, Eye, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

import { PageTitle } from '@/components/layouts/dashboard-shell'
import { DataTable } from '@/features/admin/components/data-table'
import { Badge } from '@/components/ui/badge'
import { Select } from '@/components/ui/input'
import { formatCurrency } from '@/utils/format'
import {
  useGetTransportsQuery,
  useDeleteTransportMutation,
  type TransportListQuery,
} from '@/redux/fetchres/transport/transportApi'
import { TRANSPORT_TYPES, type Transport, type TransportStatus, type TransportType } from '@/data/transports'

const LIMIT = 10

export default function AdminTransportsPage() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [type, setType] = useState<'' | TransportType>('')
  const [status, setStatus] = useState<'' | TransportStatus>('')

  const query: TransportListQuery = {
    page,
    limit: LIMIT,
    ...(search ? { search } : {}),
    ...(type ? { type } : {}),
    ...(status ? { status } : {}),
  }

  const { data, isLoading, isError, isFetching } = useGetTransportsQuery(query)
  const [deleteTransport] = useDeleteTransportMutation()
  const [pendingId, setPendingId] = useState<string | null>(null)

  const total = data?.meta?.total ?? data?.data?.length ?? 0

  const onDelete = async (t: Transport) => {
    if (!confirm(`"${t.name}" মুছবেন?`)) return
    setPendingId(t.id)
    try {
      await deleteTransport(t.id).unwrap()
      toast.success('পরিবহন মুছে ফেলা হয়েছে')
    } catch (err: any) {
      toast.error(err?.data?.message || 'মুছতে ব্যর্থ হয়েছে')
    } finally {
      setPendingId(null)
    }
  }

  return (
    <>
      <PageTitle
        title="পরিবহন"
        description="সকল পরিবহন সেবা পরিচালনা করুন।"
        action={
          <Link
            href="/admin/transports/new"
            className="bg-foreground text-background px-4 py-2 rounded-xl text-sm font-semibold inline-flex items-center gap-2 hover:bg-primary transition-colors"
          >
            <Plus className="w-4 h-4" /> পরিবহন তৈরি করুন
          </Link>
        }
      />

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : isError ? (
        <div className="text-center py-20 text-rose-500">পরিবহন লোড করতে ব্যর্থ হয়েছে।</div>
      ) : (
        <DataTable<Transport>
          data={data?.data ?? []}
          page={page}
          limit={LIMIT}
          total={total}
          onPageChange={setPage}
          search={search}
          onSearchChange={v => { setSearch(v); setPage(1) }}
          isFetching={isFetching}
          searchPlaceholder="পরিবহন অনুসন্ধান…"
          filters={
            <>
              <Select value={type} onChange={e => { setType(e.target.value as '' | TransportType); setPage(1) }} className="w-auto min-w-[140px]">
                <option value="">সকল ধরন</option>
                {TRANSPORT_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
              </Select>
              <Select value={status} onChange={e => { setStatus(e.target.value as '' | TransportStatus); setPage(1) }} className="w-auto min-w-[120px]">
                <option value="">সকল অবস্থা</option>
                <option value="active">সক্রিয়</option>
                <option value="inactive">নিষ্ক্রিয়</option>
              </Select>
            </>
          }
          columns={[
            {
              key: 'name',
              label: 'পরিবহন',
              render: t => (
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-11 h-11 rounded-xl overflow-hidden flex-shrink-0 bg-muted">
                    {t.cover ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={t.cover} alt={t.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs font-bold">TR</div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground truncate">{t.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {t.vehicleType.replace(/-/g, ' ')} · {t.capacity} জন
                    </p>
                  </div>
                </div>
              ),
            },
            {
              key: 'type',
              label: 'ধরন',
              render: t => (
                <Badge variant="secondary">
                  {TRANSPORT_TYPES.find(x => x.value === t.type)?.label ?? t.type}
                </Badge>
              ),
            },
            {
              key: 'price',
              label: 'মূল্য',
              render: t => (
                <span className="font-bold text-foreground">
                  {formatCurrency(t.price)} <span className="text-xs text-muted-foreground">/ {t.pricingUnit === 'per-person' ? 'ব্যক্তি' : 'গাড়ি'}</span>
                </span>
              ),
            },
            {
              key: 'availability',
              label: 'উপলব্ধতা',
              render: t => (
                <Badge variant={t.availability === 'soldout' ? 'danger' : t.availability === 'limited' ? 'warning' : 'success'}>
                  {t.availability}
                </Badge>
              ),
            },
            {
              key: 'status',
              label: 'অবস্থা',
              render: t => (
                <Badge variant={t.status === 'active' ? 'success' : 'warning'}>
                  {t.status === 'active' ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                </Badge>
              ),
            },
            {
              key: 'actions',
              label: 'অ্যাকশন',
              render: t => (
                <div className="flex items-center gap-1 justify-end">
                  <Link href={`/transportation/${t.slug}`} className="p-1.5 hover:bg-muted rounded" title="দেখুন">
                    <Eye className="w-4 h-4 text-muted-foreground" />
                  </Link>
                  <Link href={`/admin/transports/${t.id}/edit`} className="p-1.5 hover:bg-muted rounded" title="সম্পাদনা">
                    <Edit className="w-4 h-4 text-muted-foreground" />
                  </Link>
                  <button
                    onClick={() => onDelete(t)}
                    disabled={pendingId === t.id}
                    className="p-1.5 hover:bg-muted rounded text-rose-500 disabled:opacity-50"
                    title="মুছুন"
                  >
                    {pendingId === t.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              ),
              className: 'text-right',
            },
          ]}
        />
      )}
    </>
  )
}
