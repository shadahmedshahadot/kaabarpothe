import type { PageSEODto } from '@/lib/seo'

export type ScoreCheck = {
  id: string
  label: string
  passed: boolean
  message?: string
}

export type ScoreResult = {
  score: number
  total: number
  percentage: number
  status: 'Excellent' | 'Good' | 'Needs Improvement'
  checks: ScoreCheck[]
}

const TITLE_MIN = 30
const TITLE_MAX = 60
const DESC_MIN = 80
const DESC_MAX = 160

export const TITLE_LIMITS = { min: TITLE_MIN, recommended: TITLE_MAX, warning: 70 }
export const DESC_LIMITS = { min: DESC_MIN, recommended: DESC_MAX, warning: 180 }

export function computeSEOScore(page: Partial<PageSEODto>): ScoreResult {
  const checks: ScoreCheck[] = [
    {
      id: 'title',
      label: 'Title present',
      passed: !!page.title && page.title.trim().length > 0,
    },
    {
      id: 'title-length',
      label: `Title length ${TITLE_MIN}-${TITLE_MAX} chars`,
      passed:
        !!page.title &&
        page.title.length >= TITLE_MIN &&
        page.title.length <= TITLE_MAX,
    },
    {
      id: 'description',
      label: 'Meta description present',
      passed: !!page.metaDescription && page.metaDescription.trim().length > 0,
    },
    {
      id: 'description-length',
      label: `Description length ${DESC_MIN}-${DESC_MAX} chars`,
      passed:
        !!page.metaDescription &&
        page.metaDescription.length >= DESC_MIN &&
        page.metaDescription.length <= DESC_MAX,
    },
    {
      id: 'canonical',
      label: 'Canonical set (auto or custom)',
      passed: page.canonicalAuto === true || !!page.canonicalUrl,
    },
    {
      id: 'robots',
      label: 'Robots configured',
      passed: !!page.robots,
    },
    {
      id: 'og-title',
      label: 'Open Graph title (or falls back to title)',
      passed: !!(page.ogTitle || page.title),
    },
    {
      id: 'og-description',
      label: 'Open Graph description (or falls back)',
      passed: !!(page.ogDescription || page.metaDescription),
    },
    {
      id: 'og-image',
      label: 'Open Graph image',
      passed: !!page.ogImage,
    },
    {
      id: 'twitter-card',
      label: 'Twitter card type set',
      passed: !!page.twitterCard,
    },
    {
      id: 'structured-data',
      label: 'Structured data (JSON-LD) present',
      passed:
        Array.isArray(page.structuredData)
          ? (page.structuredData as unknown[]).length > 0
          : !!page.structuredData,
    },
  ]

  const total = checks.length
  const score = checks.filter(c => c.passed).length
  const percentage = Math.round((score / total) * 100)
  const status: ScoreResult['status'] =
    percentage >= 85 ? 'Excellent' : percentage >= 60 ? 'Good' : 'Needs Improvement'
  return { score, total, percentage, status, checks }
}

export function statusColor(status: ScoreResult['status']): string {
  if (status === 'Excellent') return 'text-emerald-600 bg-emerald-500/10 border-emerald-500/30'
  if (status === 'Good') return 'text-amber-600 bg-amber-500/10 border-amber-500/30'
  return 'text-red-600 bg-red-500/10 border-red-500/30'
}
