'use client'

import Image from 'next/image'
import { Globe } from 'lucide-react'

type Props = {
  siteUrl: string
  path: string
  title?: string | null
  description?: string | null
  ogImage?: string | null
  ogTitle?: string | null
  ogDescription?: string | null
  twitterCard?: string | null
}

export function GooglePreview({ siteUrl, path, title, description }: Props) {
  const displayUrl = `${siteUrl.replace(/\/$/, '')}${path === '/' ? '' : path}`
  return (
    <div className="rounded-2xl border border-border bg-card p-5 space-y-2">
      <div className="text-xs uppercase font-semibold tracking-wider text-muted-foreground flex items-center gap-2">
        <Globe className="w-3.5 h-3.5" /> Google Search Preview
      </div>
      <div className="text-xs text-muted-foreground truncate">{displayUrl}</div>
      <div className="text-xl text-blue-700 dark:text-blue-400 leading-tight line-clamp-2">
        {title || 'Untitled page'}
      </div>
      <div className="text-sm text-muted-foreground line-clamp-3">
        {description || 'No description yet — search engines will fall back to page text.'}
      </div>
    </div>
  )
}

export function SocialPreview({
  siteUrl,
  path,
  ogImage,
  ogTitle,
  ogDescription,
  twitterCard,
}: Props) {
  const displayHost = siteUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')
  const isLarge = (twitterCard ?? 'summary_large_image') === 'summary_large_image'
  const displayUrl = `${displayHost}${path === '/' ? '' : path}`
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      <div className="px-5 pt-4 pb-2 text-xs uppercase font-semibold tracking-wider text-muted-foreground">
        Social Share Preview
      </div>
      <div className={isLarge ? 'flex flex-col' : 'flex flex-row'}>
        <div
          className={
            isLarge
              ? 'relative w-full aspect-[1200/630] bg-muted'
              : 'relative w-32 h-32 shrink-0 bg-muted'
          }
        >
          {ogImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={ogImage}
              alt="OG preview"
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-xs text-muted-foreground">
              No OG image
            </div>
          )}
        </div>
        <div className="px-5 py-3 space-y-1 min-w-0">
          <div className="text-xs uppercase text-muted-foreground truncate">
            {displayUrl}
          </div>
          <div className="text-base font-semibold text-foreground line-clamp-2">
            {ogTitle || 'Untitled'}
          </div>
          <div className="text-xs text-muted-foreground line-clamp-2">
            {ogDescription || '—'}
          </div>
        </div>
      </div>
    </div>
  )
}
