'use client'

import Link from 'next/link'
import { Plus, Edit, Trash2, Eye, Clock } from 'lucide-react'
import { PageTitle } from '@/components/layouts/dashboard-shell'
import { DataTable } from '@/features/admin/components/data-table'
import { Badge } from '@/components/ui/badge'
import { formatDate, formatNumber } from '@/utils/format'
import { blogs } from '@/data/blogs'

export default function AdminBlogsPage() {
  return (
    <>
      <PageTitle
        title="Blog articles"
        description={`${blogs.length} articles · ${blogs.filter(b => b.featured).length} featured`}
        action={
          <button className="bg-foreground text-background px-4 py-2 rounded-xl text-sm font-semibold inline-flex items-center gap-2 hover:bg-primary transition-colors">
            <Plus className="w-4 h-4" /> New article
          </button>
        }
      />
      <DataTable
        data={blogs}
        searchPlaceholder="Search articles…"
        columns={[
          {
            key: 'post',
            label: 'Article',
            render: b => (
              <div className="flex items-center gap-3 min-w-0">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${b.cover} flex-shrink-0`} />
                <div className="min-w-0">
                  <p className="font-semibold text-foreground truncate">{b.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{b.excerpt}</p>
                </div>
              </div>
            ),
          },
          { key: 'cat', label: 'Category', render: b => <Badge variant="outline">{b.category}</Badge> },
          { key: 'author', label: 'Author', render: b => <span className="text-sm text-foreground/80">{b.author}</span> },
          { key: 'read', label: 'Read time', render: b => <span className="text-sm text-muted-foreground inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {b.readTime}m</span> },
          { key: 'views', label: 'Views', render: b => <span className="font-medium text-foreground">{formatNumber(b.views)}</span> },
          { key: 'date', label: 'Published', render: b => <span className="text-sm text-muted-foreground">{formatDate(b.publishedDate)}</span> },
          { key: 'status', label: 'Status', render: b => <Badge variant={b.featured ? 'default' : 'success'}>{b.featured ? 'Featured' : 'Published'}</Badge> },
          {
            key: 'actions',
            label: '',
            render: b => (
              <div className="flex items-center gap-1 justify-end">
                <Link href={`/blog/${b.slug}`} className="p-1.5 hover:bg-muted rounded"><Eye className="w-4 h-4 text-muted-foreground" /></Link>
                <button className="p-1.5 hover:bg-muted rounded"><Edit className="w-4 h-4 text-muted-foreground" /></button>
                <button className="p-1.5 hover:bg-muted rounded text-rose-500"><Trash2 className="w-4 h-4" /></button>
              </div>
            ),
            className: 'text-right',
          },
        ]}
      />
    </>
  )
}