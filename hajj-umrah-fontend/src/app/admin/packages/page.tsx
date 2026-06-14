'use client'

import Link from 'next/link'
import { Plus, Edit, Copy, Trash2, MoreVertical, Eye } from 'lucide-react'
import { PageTitle } from '@/components/layouts/dashboard-shell'
import { DataTable } from '@/features/admin/components/data-table'
import { Badge } from '@/components/ui/badge'
import { formatCurrency } from '@/utils/format'
import { packages } from '@/data/packages'

export default function AdminPackagesPage() {
  return (
    <>
      <PageTitle
        title="Packages"
        description="Manage all Hajj and Umrah packages from one place."
        action={
          <Link href="/admin/packages/new" className="bg-foreground text-background px-4 py-2 rounded-xl text-sm font-semibold inline-flex items-center gap-2 hover:bg-primary transition-colors">
            <Plus className="w-4 h-4" /> Create Package
          </Link>
        }
      />

      <DataTable
        data={packages}
        searchPlaceholder="Search packages…"
        columns={[
          {
            key: 'name',
            label: 'Package',
            render: p => (
              <div className="flex items-center gap-3 min-w-0">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${p.cover} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                  {p.type === 'hajj' ? 'HJ' : 'UM'}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-foreground truncate">{p.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{p.tier} · {p.duration} days</p>
                </div>
              </div>
            ),
          },
          { key: 'type', label: 'Type', render: p => <Badge variant={p.type === 'hajj' ? 'accent' : 'secondary'} className="uppercase">{p.type}</Badge> },
          { key: 'price', label: 'Price', render: p => <span className="font-bold text-foreground">{formatCurrency(p.price - p.discount)}</span> },
          { key: 'status', label: 'Status', render: p => <Badge variant={p.status === 'published' ? 'success' : 'warning'}>{p.status}</Badge> },
          { key: 'availability', label: 'Avail.', render: p => <Badge variant={p.availability === 'soldout' ? 'danger' : p.availability === 'limited' ? 'warning' : 'success'}>{p.availability === 'limited' ? `${p.seatsLeft} left` : p.availability}</Badge> },
          { key: 'bookings', label: 'Bookings', render: p => <span className="font-medium text-foreground">{p.bookingsCount.toLocaleString()}</span> },
          {
            key: 'actions',
            label: 'Actions',
            render: p => (
              <div className="flex items-center gap-1 justify-end">
                <Link href={`/packages/${p.type}/${p.slug}`} className="p-1.5 hover:bg-muted rounded" title="View"><Eye className="w-4 h-4 text-muted-foreground" /></Link>
                <button className="p-1.5 hover:bg-muted rounded" title="Edit"><Edit className="w-4 h-4 text-muted-foreground" /></button>
                <button className="p-1.5 hover:bg-muted rounded" title="Duplicate"><Copy className="w-4 h-4 text-muted-foreground" /></button>
                <button className="p-1.5 hover:bg-muted rounded text-rose-500" title="Delete"><Trash2 className="w-4 h-4" /></button>
                <button className="p-1.5 hover:bg-muted rounded"><MoreVertical className="w-4 h-4 text-muted-foreground" /></button>
              </div>
            ),
            className: 'text-right',
          },
        ]}
      />
    </>
  )
}