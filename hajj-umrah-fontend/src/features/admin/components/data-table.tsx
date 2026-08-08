'use client'

import { motion } from 'framer-motion'
import { Search, Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'

export interface Column<T> {
  key: string
  label: string
  render: (row: T) => React.ReactNode
  className?: string
}

interface Props<T> {
  data: T[]
  columns: Column<T>[]
  searchPlaceholder?: string
  emptyText?: string
  filters?: React.ReactNode
  actions?: React.ReactNode
  page?: number
  limit?: number
  total?: number
  onPageChange?: (page: number) => void
  search?: string
  onSearchChange?: (value: string) => void
  isFetching?: boolean
}

export function DataTable<T extends { id: string }>({
  data,
  columns,
  searchPlaceholder = 'অনুসন্ধান…',
  emptyText = 'কোনো ডেটা নেই',
  filters,
  actions,
  page,
  limit,
  total,
  onPageChange,
  search,
  onSearchChange,
  isFetching,
}: Props<T>) {
  const [searchInput, setSearchInput] = useState(search ?? '')

  useEffect(() => {
    if (search !== undefined && search !== searchInput) setSearchInput(search)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  useEffect(() => {
    if (!onSearchChange) return
    const t = setTimeout(() => {
      if (searchInput !== search) onSearchChange(searchInput)
    }, 350)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput])

  const hasPagination = page !== undefined && limit !== undefined && total !== undefined && !!onPageChange
  const _page = page ?? 1
  const _limit = limit ?? (data.length || 1)
  const _total = total ?? data.length
  const totalPages = Math.max(1, Math.ceil(_total / _limit))
  const from = _total === 0 ? 0 : (_page - 1) * _limit + 1
  const to = Math.min(_page * _limit, _total)
  const canPrev = _page > 1
  const canNext = _page < totalPages

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="bg-card border border-border rounded-2xl overflow-hidden"
    >
      <div className="p-4 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between border-b border-border">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="search"
            placeholder={searchPlaceholder}
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            className="w-full h-9 pl-10 pr-3 rounded-lg bg-muted/40 border border-transparent focus:border-primary focus:bg-card focus:outline-none text-sm transition-colors"
          />
        </div>
        <div className="flex gap-2 items-center flex-wrap">
          {filters}
          {actions}
        </div>
      </div>

      <div className="overflow-x-auto relative">
        {isFetching && (
          <div className="absolute top-2 right-2 z-10 text-muted-foreground">
            <Loader2 className="w-4 h-4 animate-spin" />
          </div>
        )}
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              {columns.map(c => (
                <th key={c.key} className={`px-4 py-3 text-left font-semibold text-xs uppercase tracking-wider text-muted-foreground ${c.className ?? ''}`}>
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr><td colSpan={columns.length} className="text-center py-12 text-muted-foreground">{emptyText}</td></tr>
            ) : (
              data.map((row, i) => (
                <motion.tr
                  key={row.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: Math.min(i * 0.03, 0.6), ease: 'easeOut' }}
                  className="border-b border-border last:border-0 hover:bg-muted/40 transition-colors"
                >
                  {columns.map(c => (
                    <td key={c.key} className={`px-4 py-4 ${c.className ?? ''}`}>{c.render(row)}</td>
                  ))}
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {hasPagination && (
        <div className="p-4 flex items-center justify-between border-t border-border text-xs text-muted-foreground">
          <span>
            দেখানো হচ্ছে {from}–{to} এর {_total}
          </span>
          <div className="flex gap-2 items-center">
            <span className="mr-2">পৃষ্ঠা {_page} / {totalPages}</span>
            <motion.button
              whileHover={{ scale: canPrev ? 1.04 : 1 }}
              whileTap={{ scale: canPrev ? 0.96 : 1 }}
              onClick={() => canPrev && onPageChange!(_page - 1)}
              disabled={!canPrev}
              className="px-3 py-1 rounded border border-border hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed"
            >
              পূর্ববর্তী
            </motion.button>
            <motion.button
              whileHover={{ scale: canNext ? 1.04 : 1 }}
              whileTap={{ scale: canNext ? 0.96 : 1 }}
              onClick={() => canNext && onPageChange!(_page + 1)}
              disabled={!canNext}
              className="px-3 py-1 rounded border border-border hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed"
            >
              পরবর্তী
            </motion.button>
          </div>
        </div>
      )}
    </motion.div>
  )
}
