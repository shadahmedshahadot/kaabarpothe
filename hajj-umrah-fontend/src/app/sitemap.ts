import type { MetadataRoute } from 'next'
import { SITE } from '@/constants/site'
import { packages } from '@/data/packages'
import { transports } from '@/data/transports'
import { fetchGlobalSEO, type PageSEODto } from '@/lib/seo'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:9000/api'

type Entry = MetadataRoute.Sitemap[number]
type Freq = Entry['changeFrequency']

const entry = (base: string, path: string, priority: number, changeFrequency: Freq, lastModified: Date = new Date()): Entry => ({
  url: `${base}${path}`,
  lastModified,
  priority,
  changeFrequency,
})

const isIndexable = (robots?: string | null) => {
  if (!robots) return true
  return !robots.toLowerCase().includes('noindex')
}

const STATIC_PRIORITY: Record<string, { priority: number; freq: Freq }> = {
  '/': { priority: 1, freq: 'daily' },
  '/about': { priority: 0.8, freq: 'monthly' },
  '/contact': { priority: 0.7, freq: 'yearly' },
  '/faq': { priority: 0.8, freq: 'monthly' },
  '/reviews': { priority: 0.7, freq: 'weekly' },
  '/packages/hajj': { priority: 0.95, freq: 'weekly' },
  '/packages/umrah': { priority: 0.95, freq: 'weekly' },
  '/transportation': { priority: 0.7, freq: 'weekly' },
  '/privacy': { priority: 0.3, freq: 'yearly' },
  '/terms': { priority: 0.3, freq: 'yearly' },
}

type PublishedPage = Pick<PageSEODto, 'pageKey' | 'pagePath' | 'locale' | 'robots' | 'seoStatus' | 'updatedAt'>

async function fetchPublishedPages(): Promise<PublishedPage[]> {
  try {
    const res = await fetch(`${API_BASE}/seo/public/pages`, {
      next: { revalidate: 300, tags: ['seo:sitemap'] },
    })
    if (!res.ok) return []
    const json = await res.json()
    return (json?.data as PublishedPage[]) ?? []
  } catch {
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [global, pages] = await Promise.all([fetchGlobalSEO(), fetchPublishedPages()])
  const base = (global?.siteUrl || SITE.url).replace(/\/$/, '')

  const includedPaths = new Set<string>()
  const staticRoutes: Entry[] = []

  for (const page of pages) {
    if (page.seoStatus === 'DRAFT') continue
    if (!isIndexable(page.robots)) continue
    const cfg = STATIC_PRIORITY[page.pagePath] ?? { priority: 0.5, freq: 'monthly' as Freq }
    staticRoutes.push(
      entry(base, page.pagePath, cfg.priority, cfg.freq, new Date(page.updatedAt)),
    )
    includedPaths.add(page.pagePath)
  }

  // Ensure well-known static paths always appear even if DB has no row yet.
  for (const path of Object.keys(STATIC_PRIORITY)) {
    if (!includedPaths.has(path)) {
      const cfg = STATIC_PRIORITY[path]
      staticRoutes.push(entry(base, path, cfg.priority, cfg.freq))
    }
  }

  const packageRoutes: Entry[] = packages
    .filter(p => p.status === 'published')
    .map(p => entry(base, `/packages/${p.type}/${p.slug}`, 0.9, 'weekly'))

  const transportRoutes: Entry[] = transports
    .filter(t => t.status === 'active')
    .map(t => entry(base, `/transportation/${t.slug}`, 0.6, 'monthly'))

  return [...staticRoutes, ...packageRoutes, ...transportRoutes]
}
