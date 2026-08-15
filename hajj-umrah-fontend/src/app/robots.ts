import type { MetadataRoute } from 'next'
import { SITE } from '@/constants/site'
import { fetchGlobalSEO } from '@/lib/seo'

export default async function robots(): Promise<MetadataRoute.Robots> {
  const global = await fetchGlobalSEO()
  const baseUrl = (global?.siteUrl || SITE.url).replace(/\/$/, '')

  const disallow = [
    '/admin',
    '/admin/*',
    '/pilgrim',
    '/pilgrim/*',
    '/login',
    '/register',
    '/booking',
    '/booking/*',
    '/api',
    '/api/*',
  ]

  const aiBots = [
    'GPTBot',
    'OAI-SearchBot',
    'ChatGPT-User',
    'Google-Extended',
    'GoogleOther',
    'Applebot-Extended',
    'PerplexityBot',
    'Perplexity-User',
    'ClaudeBot',
    'Claude-Web',
    'anthropic-ai',
    'CCBot',
    'cohere-ai',
    'Bytespider',
    'Amazonbot',
    'DuckAssistBot',
    'MistralAI-User',
    'meta-externalagent',
    'FacebookBot',
  ]

  return {
    rules: [
      { userAgent: '*', allow: '/', disallow },
      ...aiBots.map(userAgent => ({ userAgent, allow: '/', disallow })),
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
