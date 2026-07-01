'use client'

import Link from 'next/link'
import { Eye, Mail, Phone, Loader2 } from 'lucide-react'
import { PageTitle } from '@/components/layouts/dashboard-shell'
import { DataTable } from '@/features/admin/components/data-table'
import { Badge } from '@/components/ui/badge'
import { formatCurrency, formatDate } from '@/utils/format'
import { useGetUsersQuery, type UserDto } from '@/redux/fetchres/user/userApi'

const AVATAR_GRADIENTS = [
  'from-blue-400 to-indigo-500',
  'from-emerald-400 to-teal-500',
  'from-amber-400 to-orange-500',
  'from-rose-400 to-pink-500',
  'from-violet-400 to-purple-500',
  'from-sky-400 to-cyan-500',
]

const gradientFor = (id: string) => {
  let h = 0
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) | 0
  return AVATAR_GRADIENTS[Math.abs(h) % AVATAR_GRADIENTS.length]
}

export default function AdminPilgrimsPage() {
  const { data, isLoading, isError } = useGetUsersQuery({ role: 'USER', limit: 100 })
  const pilgrims = data?.data ?? []

  return (
    <>
      <PageTitle title="হাজী" description={`${data?.meta?.total ?? pilgrims.length} নিবন্ধিত হাজী`} />

      {isLoading && (
        <div className="flex justify-center py-16">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      )}

      {isError && (
        <div className="bg-card border border-border rounded-2xl p-8 text-center text-sm text-rose-500">
          হাজী তালিকা লোড করতে ব্যর্থ হয়েছে।
        </div>
      )}

      {!isLoading && !isError && (
        <DataTable<UserDto>
          data={pilgrims}
          searchPlaceholder="হাজী অনুসন্ধান…"
          emptyText="এখনো কোনো হাজী নিবন্ধিত হননি।"
          columns={[
            {
              key: 'p',
              label: 'হাজী',
              render: p => (
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradientFor(p.id)} text-white font-bold flex items-center justify-center`}>
                    {(p.full_name || p.email)
                      .split(' ')
                      .map(n => n[0])
                      .slice(0, 2)
                      .join('')
                      .toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{p.full_name || '—'}</p>
                    <p className="text-xs text-muted-foreground">
                      {[p.city, p.country].filter(Boolean).join(', ') || 'ঠিকানা নেই'}
                    </p>
                  </div>
                </div>
              ),
            },
            {
              key: 'contact',
              label: 'যোগাযোগ',
              render: p => (
                <div className="text-sm">
                  <p className="text-foreground/80 flex items-center gap-1.5">
                    <Mail className="w-3 h-3" /> {p.email}
                  </p>
                  {p.phone && (
                    <p className="text-muted-foreground flex items-center gap-1.5 text-xs">
                      <Phone className="w-3 h-3" /> {p.phone}
                    </p>
                  )}
                </div>
              ),
            },
            {
              key: 'passport',
              label: 'পাসপোর্ট',
              render: p => (
                <div className="text-sm">
                  <p className="font-mono text-foreground">{p.passportNumber || '—'}</p>
                  {p.passportExpiryDate && (
                    <p className="text-xs text-muted-foreground">
                      মেয়াদ {formatDate(p.passportExpiryDate, { year: 'numeric', month: 'short' })}
                    </p>
                  )}
                </div>
              ),
            },
            {
              key: 'bookings',
              label: 'বুকিং',
              render: p => <span className="font-semibold text-foreground">{p.bookingsCount}</span>,
            },
            {
              key: 'spent',
              label: 'মোট ব্যয়',
              render: p => <span className="font-bold text-foreground">{formatCurrency(p.totalSpent)}</span>,
            },
            {
              key: 'docs',
              label: 'ডকুমেন্ট',
              render: p => {
                const docs = p.documents ?? []
                const verified = docs.filter(d => d.status === 'VERIFIED').length
                if (docs.length === 0) return <Badge variant="outline">০/০</Badge>
                return (
                  <Badge variant={verified === docs.length ? 'success' : 'warning'}>
                    {verified}/{docs.length} যাচাইকৃত
                  </Badge>
                )
              },
            },
            {
              key: 'actions',
              label: '',
              render: p => (
                <Link href={`/admin/pilgrims/${p.id}`} className="p-1.5 hover:bg-muted rounded inline-block">
                  <Eye className="w-4 h-4 text-muted-foreground" />
                </Link>
              ),
              className: 'text-right',
            },
          ]}
        />
      )}
    </>
  )
}
