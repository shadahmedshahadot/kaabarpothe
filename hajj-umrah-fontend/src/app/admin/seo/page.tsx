'use client'

import Link from 'next/link'
import { toast } from 'sonner'
import { Pencil, PlusCircle, RefreshCw, Search, Settings2, ExternalLink, Trash2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import { ROUTES } from '@/constants'
import {
  useListSEOPagesQuery,
  useSeedSEODefaultsMutation,
  useDeleteSEOPageMutation,
} from '@/redux/fetchres/seo/seoApi'
import { computeSEOScore, statusColor } from '@/features/admin/seo/seoScore'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function AdminSEOListPage() {
  const [search, setSearch] = useState('')
  const { data, isLoading, refetch, isFetching } = useListSEOPagesQuery()
  const [seed, { isLoading: seeding }] = useSeedSEODefaultsMutation()
  const [deletePage] = useDeleteSEOPageMutation()

  const rows = useMemo(() => {
    const list = data?.data ?? []
    if (!search.trim()) return list
    const q = search.toLowerCase()
    return list.filter(
      p =>
        p.pageName.toLowerCase().includes(q) ||
        p.pagePath.toLowerCase().includes(q) ||
        p.pageKey.toLowerCase().includes(q),
    )
  }, [data, search])

  const handleSeed = async () => {
    try {
      const res = await seed().unwrap()
      const created = (res as { data: { created?: number } })?.data?.created ?? 0
      toast.success(`Seeded defaults — ${created} new pages created.`)
      refetch()
    } catch (err) {
      const msg = (err as { data?: { message?: string } })?.data?.message ?? 'Seed failed'
      toast.error(msg)
    }
  }

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete SEO settings for "${name}"? System pages cannot be deleted.`)) return
    try {
      await deletePage(id).unwrap()
      toast.success('SEO entry deleted')
    } catch (err) {
      const msg = (err as { data?: { message?: string } })?.data?.message ?? 'Delete failed'
      toast.error(msg)
    }
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">SEO Management</h1>
          <p className="text-sm text-muted-foreground max-w-2xl">
            Manage title, meta description, Open Graph, Twitter, canonical, robots and
            structured data for every public page. Changes are picked up automatically
            without a redeploy.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href={ROUTES.admin.seo.global}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card text-sm font-medium hover:bg-muted transition-colors"
          >
            <Settings2 className="w-4 h-4" /> Global Defaults
          </Link>
          <button
            type="button"
            onClick={handleSeed}
            disabled={seeding}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card text-sm font-medium hover:bg-muted transition-colors disabled:opacity-60"
          >
            <RefreshCw className={`w-4 h-4 ${seeding ? 'animate-spin' : ''}`} /> Seed defaults
          </button>
          <Link
            href={ROUTES.admin.seo.new}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            <PlusCircle className="w-4 h-4" /> Add Page
          </Link>
        </div>
      </header>

      <div className="flex items-center gap-2 max-w-md">
        <Search className="w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by name, path, or key"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="text-left py-3 px-4 font-semibold">Page</th>
                <th className="text-left py-3 px-4 font-semibold">Path</th>
                <th className="text-left py-3 px-4 font-semibold">SEO Title</th>
                <th className="text-left py-3 px-4 font-semibold">Robots</th>
                <th className="text-left py-3 px-4 font-semibold">Status</th>
                <th className="text-left py-3 px-4 font-semibold">Score</th>
                <th className="text-left py-3 px-4 font-semibold">Updated</th>
                <th className="text-right py-3 px-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading || isFetching ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-muted-foreground">
                    Loading pages…
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-muted-foreground">
                    No pages yet. Click <strong>Seed defaults</strong> to bootstrap the
                    known static pages.
                  </td>
                </tr>
              ) : (
                rows.map(page => {
                  const score = computeSEOScore(page)
                  return (
                    <tr key={page.id} className="hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-4">
                        <div className="font-medium text-foreground">{page.pageName}</div>
                        <div className="text-xs text-muted-foreground">
                          {page.pageKey}
                          {page.isSystem ? ' · system' : ''} · {page.locale}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <code className="text-xs bg-muted px-2 py-1 rounded">
                          {page.pagePath}
                        </code>
                      </td>
                      <td className="py-3 px-4 max-w-xs truncate" title={page.title ?? ''}>
                        {page.title || <span className="text-muted-foreground italic">—</span>}
                      </td>
                      <td className="py-3 px-4">
                        <code className="text-xs bg-muted px-2 py-0.5 rounded">
                          {page.robots || 'index,follow'}
                        </code>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`text-xs font-medium px-2 py-1 rounded ${
                            page.seoStatus === 'PUBLISHED'
                              ? 'bg-emerald-500/10 text-emerald-600'
                              : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          {page.seoStatus}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded border ${statusColor(
                            score.status,
                          )}`}
                        >
                          {score.percentage}% · {score.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-xs text-muted-foreground">
                        {new Date(page.updatedAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-end gap-1.5">
                          <a
                            href={page.pagePath}
                            target="_blank"
                            rel="noreferrer noopener"
                            title="Open live page"
                            className="p-2 rounded-md hover:bg-muted text-muted-foreground"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                          <Link
                            href={ROUTES.admin.seo.edit(page.id)}
                            title="Edit SEO"
                            className="p-2 rounded-md hover:bg-muted text-muted-foreground"
                          >
                            <Pencil className="w-4 h-4" />
                          </Link>
                          {!page.isSystem && (
                            <button
                              type="button"
                              onClick={() => handleDelete(page.id, page.pageName)}
                              title="Delete"
                              className="p-2 rounded-md hover:bg-red-500/10 text-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
