import type { Metadata } from 'next'
import { SITE } from '@/constants/site'
import { DEFAULT_SEO_LOCALE } from '@/constants/seo-pages'

export type PageSEODto = {
  id: string
  pageKey: string
  pagePath: string
  locale: string
  pageName: string
  isSystem: boolean
  title: string | null
  metaDescription: string | null
  keywords: string[]
  robots: string | null
  robotsMaxSnippet: number | null
  robotsMaxImagePreview: string | null
  robotsMaxVideoPreview: number | null
  canonicalUrl: string | null
  canonicalAuto: boolean
  author: string | null
  language: string | null
  themeColor: string | null
  ogTitle: string | null
  ogDescription: string | null
  ogImage: string | null
  ogImageAlt: string | null
  ogUrl: string | null
  ogType: string | null
  ogSiteName: string | null
  ogLocale: string | null
  twitterCard: string | null
  twitterTitle: string | null
  twitterDescription: string | null
  twitterImage: string | null
  twitterImageAlt: string | null
  twitterSite: string | null
  twitterCreator: string | null
  structuredData: unknown
  customMeta: { name: string; content: string }[] | null
  breadcrumbs: { name: string; url: string }[] | null
  seoStatus: 'DRAFT' | 'PUBLISHED'
  createdAt: string
  updatedAt: string
}

export type GlobalSEODto = {
  key: string
  siteName: string
  defaultTitle: string
  defaultTitleTemplate: string
  defaultDescription: string
  defaultKeywords: string[]
  defaultOgImage: string | null
  defaultOgImageAlt: string | null
  defaultOgType: string
  defaultOgSiteName: string | null
  defaultOgLocale: string
  defaultTwitterCard: string
  defaultTwitterSite: string | null
  defaultTwitterCreator: string | null
  defaultTwitterImage: string | null
  defaultRobots: string
  themeColor: string | null
  themeColorDark: string | null
  siteUrl: string
  favicon: string | null
  appleTouchIcon: string | null
  organizationJsonLd: unknown
  websiteJsonLd: unknown
  verificationGoogle: string | null
  verificationBing: string | null
  verificationYandex: string | null
  verificationFacebook: string | null
  updatedAt: string
}

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:9000/api'

export const seoCacheTag = (path: string) => `seo:${path}`
export const GLOBAL_SEO_CACHE_TAG = 'seo:global'

async function safeJson<T>(
  url: string,
  opts: RequestInit & { next?: { revalidate?: number; tags?: string[] } },
): Promise<T | null> {
  try {
    const res = await fetch(url, opts)
    if (!res.ok) return null
    const json = await res.json()
    return (json?.data as T) ?? null
  } catch {
    return null
  }
}

export async function fetchGlobalSEO(): Promise<GlobalSEODto | null> {
  return safeJson<GlobalSEODto>(`${API_BASE}/seo/global`, {
    next: { revalidate: 300, tags: [GLOBAL_SEO_CACHE_TAG] },
  })
}

export async function fetchPageSEO(
  path: string,
  locale: string = DEFAULT_SEO_LOCALE,
): Promise<PageSEODto | null> {
  const url = `${API_BASE}/seo/pages/resolve?path=${encodeURIComponent(
    path,
  )}&locale=${encodeURIComponent(locale)}`
  return safeJson<PageSEODto>(url, {
    next: { revalidate: 300, tags: [seoCacheTag(path), GLOBAL_SEO_CACHE_TAG] },
  })
}

function absoluteUrl(base: string, pathOrUrl: string | null | undefined): string | undefined {
  if (!pathOrUrl) return undefined
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl
  const cleanBase = base.replace(/\/$/, '')
  const cleanPath = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`
  return `${cleanBase}${cleanPath}`
}

function parseRobotsString(value?: string | null) {
  if (!value) return undefined
  const parts = value
    .toLowerCase()
    .split(',')
    .map(v => v.trim())
    .filter(Boolean)
  return {
    index: !parts.includes('noindex'),
    follow: !parts.includes('nofollow'),
    nocache: parts.includes('nocache'),
  }
}

export type ResolvedSEO = {
  metadata: Metadata
  structuredData: Array<Record<string, unknown>>
  page: PageSEODto | null
  global: GlobalSEODto | null
}

/**
 * Merge Global SEO + Page SEO → Next.js Metadata + JSON-LD.
 * Page-level values always override global. Falls back safely when either
 * request fails so the site never renders a broken <head>.
 */
export async function resolvePageSEO(
  path: string,
  locale: string = DEFAULT_SEO_LOCALE,
): Promise<ResolvedSEO> {
  const [global, page] = await Promise.all([
    fetchGlobalSEO(),
    fetchPageSEO(path, locale),
  ])

  const baseUrl = global?.siteUrl || SITE.url
  const canonicalRaw =
    page?.canonicalAuto === false && page?.canonicalUrl
      ? page.canonicalUrl
      : path
  const canonical = absoluteUrl(baseUrl, canonicalRaw)

  const title = page?.title ?? global?.defaultTitle ?? SITE.name
  const description =
    page?.metaDescription ?? global?.defaultDescription ?? SITE.description
  const keywords =
    page?.keywords && page.keywords.length
      ? page.keywords
      : global?.defaultKeywords ?? [...SITE.keywords]

  const ogTitle = page?.ogTitle ?? page?.title ?? title
  const ogDescription = page?.ogDescription ?? page?.metaDescription ?? description
  const ogImage =
    page?.ogImage ?? global?.defaultOgImage ?? absoluteUrl(baseUrl, SITE.ogImage)
  const ogImageAlt =
    page?.ogImageAlt ?? global?.defaultOgImageAlt ?? SITE.ogImageAlt
  const ogType = (page?.ogType ?? global?.defaultOgType ?? 'website') as
    | 'website'
    | 'article'
  const ogSiteName =
    page?.ogSiteName ?? global?.defaultOgSiteName ?? global?.siteName ?? SITE.name
  const ogLocale = page?.ogLocale ?? global?.defaultOgLocale ?? SITE.locale
  const ogUrl = page?.ogUrl ? absoluteUrl(baseUrl, page.ogUrl) : canonical

  const twitterCard =
    (page?.twitterCard ??
      global?.defaultTwitterCard ??
      'summary_large_image') as 'summary' | 'summary_large_image'
  const twitterTitle = page?.twitterTitle ?? ogTitle
  const twitterDescription = page?.twitterDescription ?? ogDescription
  const twitterImage =
    page?.twitterImage ?? global?.defaultTwitterImage ?? ogImage
  const twitterSite = page?.twitterSite ?? global?.defaultTwitterSite ?? undefined
  const twitterCreator =
    page?.twitterCreator ?? global?.defaultTwitterCreator ?? undefined

  const robots = parseRobotsString(
    page?.robots ?? global?.defaultRobots ?? 'index,follow',
  )

  const languageAlternates: Record<string, string> = {}
  if (canonical) {
    languageAlternates[page?.language ?? locale] = canonical
    languageAlternates['x-default'] = canonical
  }

  const metadata: Metadata = {
    metadataBase: new URL(baseUrl),
    title,
    description,
    keywords,
    authors: page?.author ? [{ name: page.author }] : undefined,
    alternates: canonical
      ? { canonical, languages: languageAlternates }
      : undefined,
    openGraph: {
      type: ogType,
      locale: ogLocale,
      url: ogUrl,
      siteName: ogSiteName ?? undefined,
      title: ogTitle,
      description: ogDescription,
      images: ogImage
        ? [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: ogImageAlt ?? undefined,
            },
          ]
        : undefined,
    },
    twitter: {
      card: twitterCard,
      site: twitterSite,
      creator: twitterCreator,
      title: twitterTitle,
      description: twitterDescription,
      images: twitterImage ? [twitterImage] : undefined,
    },
    robots: robots
      ? {
          index: robots.index,
          follow: robots.follow,
          nocache: robots.nocache,
          googleBot: {
            index: robots.index,
            follow: robots.follow,
            'max-video-preview': page?.robotsMaxVideoPreview ?? -1,
            'max-image-preview':
              (page?.robotsMaxImagePreview as
                | 'none'
                | 'standard'
                | 'large'
                | undefined) ?? 'large',
            'max-snippet': page?.robotsMaxSnippet ?? -1,
          },
        }
      : undefined,
    other: page?.customMeta?.length
      ? page.customMeta.reduce<Record<string, string>>((acc, m) => {
          acc[m.name] = m.content
          return acc
        }, {})
      : undefined,
  }

  const structuredData: Array<Record<string, unknown>> = []
  if (global?.websiteJsonLd && typeof global.websiteJsonLd === 'object') {
    structuredData.push(global.websiteJsonLd as Record<string, unknown>)
  }
  if (global?.organizationJsonLd && typeof global.organizationJsonLd === 'object') {
    structuredData.push(global.organizationJsonLd as Record<string, unknown>)
  }
  if (Array.isArray(page?.structuredData)) {
    for (const entry of page.structuredData as Array<Record<string, unknown>>) {
      if (entry && typeof entry === 'object') structuredData.push(entry)
    }
  } else if (page?.structuredData && typeof page.structuredData === 'object') {
    structuredData.push(page.structuredData as Record<string, unknown>)
  }
  if (page?.breadcrumbs && Array.isArray(page.breadcrumbs) && page.breadcrumbs.length) {
    structuredData.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: page.breadcrumbs.map((b, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: b.name,
        item: absoluteUrl(baseUrl, b.url),
      })),
    })
  }

  return { metadata, structuredData, page, global }
}

/**
 * Convenience helper for pages that only need Next.js Metadata (no JSON-LD).
 */
export async function generateSEOMetadata(
  path: string,
  locale: string = DEFAULT_SEO_LOCALE,
): Promise<Metadata> {
  const { metadata } = await resolvePageSEO(path, locale)
  return metadata
}
