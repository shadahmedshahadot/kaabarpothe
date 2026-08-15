export type StaticPageEntry = {
  pageKey: string
  pagePath: string
  pageName: string
}

export const DEFAULT_SEO_LOCALE = 'bn-BD'

/**
 * Central registry of every static/public page that should appear in the
 * SEO admin dashboard. Adding a new static page = one line here + one line
 * seeded via prisma seed (POST /api/seo/seed-defaults will backfill).
 */
export const STATIC_PAGES: StaticPageEntry[] = [
  { pageKey: 'home', pagePath: '/', pageName: 'Home' },
  { pageKey: 'about', pagePath: '/about', pageName: 'About' },
  { pageKey: 'contact', pagePath: '/contact', pageName: 'Contact' },
  { pageKey: 'faq', pagePath: '/faq', pageName: 'FAQ' },
  { pageKey: 'reviews', pagePath: '/reviews', pageName: 'Reviews' },
  { pageKey: 'packages-hajj', pagePath: '/packages/hajj', pageName: 'Hajj Packages' },
  { pageKey: 'packages-umrah', pagePath: '/packages/umrah', pageName: 'Umrah Packages' },
  { pageKey: 'transportation', pagePath: '/transportation', pageName: 'Transportation' },
  { pageKey: 'privacy', pagePath: '/privacy', pageName: 'Privacy Policy' },
  { pageKey: 'terms', pagePath: '/terms', pageName: 'Terms & Conditions' },
]

export const findStaticPage = (key: string) =>
  STATIC_PAGES.find(p => p.pageKey === key)
