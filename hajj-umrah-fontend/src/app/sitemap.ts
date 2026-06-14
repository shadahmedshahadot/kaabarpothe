import type { MetadataRoute } from 'next'
import { packages } from '@/data/packages'
import { blogs } from '@/data/blogs'

const SITE = 'https://sakinah.travel'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const staticRoutes = ['', '/about', '/packages/hajj', '/packages/umrah', '/reviews', '/blog', '/faq', '/contact', '/privacy', '/terms', '/refund', '/login', '/register']
  return [
    ...staticRoutes.map(r => ({ url: `${SITE}${r}`, lastModified: now, priority: r === '' ? 1 : 0.8 })),
    ...packages.map(p => ({ url: `${SITE}/packages/${p.type}/${p.slug}`, lastModified: now, priority: 0.9 })),
    ...blogs.map(b => ({ url: `${SITE}/blog/${b.slug}`, lastModified: new Date(b.publishedDate), priority: 0.6 })),
  ]
}
