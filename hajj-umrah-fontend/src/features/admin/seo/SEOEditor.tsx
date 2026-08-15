'use client'

import { useState, useEffect, useMemo } from 'react'
import { toast } from 'sonner'
import { Save, ShieldCheck, Info } from 'lucide-react'
import type { PageSEODto, GlobalSEODto } from '@/lib/seo'
import { Input, Textarea, Select, Label } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { CoverUpload } from '@/components/common/cover-upload'
import {
  useUpdateSEOPageMutation,
  useCreateSEOPageMutation,
} from '@/redux/fetchres/seo/seoApi'
import { CharacterCounter } from './CharacterCounter'
import { GooglePreview, SocialPreview } from './SEOPreviews'
import { TITLE_LIMITS, DESC_LIMITS, computeSEOScore, statusColor } from './seoScore'

type EditorMode = 'create' | 'edit'

type PageForm = Partial<PageSEODto> & {
  pageKey: string
  pagePath: string
  pageName: string
  locale: string
  keywords: string[]
  canonicalAuto: boolean
}

const ROBOTS_PRESETS = [
  'index,follow',
  'index,nofollow',
  'noindex,follow',
  'noindex,nofollow',
]

const OG_TYPES = ['website', 'article']
const TWITTER_CARDS = ['summary', 'summary_large_image']
const MAX_IMAGE_PREVIEW = ['none', 'standard', 'large']

const emptyPage: PageForm = {
  pageKey: '',
  pagePath: '/',
  locale: 'bn-BD',
  pageName: '',
  keywords: [],
  robots: 'index,follow',
  canonicalAuto: true,
  ogType: 'website',
  twitterCard: 'summary_large_image',
  seoStatus: 'PUBLISHED',
}

type Props = {
  mode: EditorMode
  page: PageSEODto | null
  global: GlobalSEODto | null
}

type TabKey = 'general' | 'og' | 'twitter' | 'advanced' | 'preview'

const TABS: { key: TabKey; label: string }[] = [
  { key: 'general', label: 'General SEO' },
  { key: 'og', label: 'Open Graph' },
  { key: 'twitter', label: 'Twitter / X' },
  { key: 'advanced', label: 'Advanced' },
  { key: 'preview', label: 'Preview + Score' },
]

async function triggerRevalidate(path: string) {
  try {
    await fetch('/api/seo/revalidate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path }),
    })
  } catch {
    // non-blocking
  }
}

export function SEOEditor({ mode, page, global }: Props) {
  const [form, setForm] = useState<PageForm>(() => {
    if (page) return { ...(page as unknown as PageForm) }
    return { ...emptyPage }
  })
  const [tab, setTab] = useState<TabKey>('general')
  const [structuredDataText, setStructuredDataText] = useState<string>(() =>
    page?.structuredData
      ? JSON.stringify(page.structuredData, null, 2)
      : '',
  )
  const [structuredDataError, setStructuredDataError] = useState<string | null>(null)

  const [updatePage, { isLoading: saving }] = useUpdateSEOPageMutation()
  const [createPage, { isLoading: creating }] = useCreateSEOPageMutation()

  useEffect(() => {
    if (page) {
      setForm({ ...(page as unknown as PageForm) })
      setStructuredDataText(
        page.structuredData ? JSON.stringify(page.structuredData, null, 2) : '',
      )
    }
  }, [page])

  const update = <K extends keyof PageForm>(key: K, value: PageForm[K]) =>
    setForm(prev => ({ ...prev, [key]: value }))

  const parseStructuredData = (): unknown | undefined | 'invalid' => {
    if (!structuredDataText.trim()) return undefined
    try {
      const parsed = JSON.parse(structuredDataText)
      setStructuredDataError(null)
      return parsed
    } catch (err) {
      setStructuredDataError((err as Error).message)
      return 'invalid'
    }
  }

  const handleSave = async () => {
    if (!form.pageKey || !form.pagePath || !form.pageName) {
      toast.error('Page key, path and name are required')
      return
    }
    const structuredData = parseStructuredData()
    if (structuredData === 'invalid') {
      toast.error('Structured data is not valid JSON')
      setTab('advanced')
      return
    }
    const payload = {
      ...form,
      keywords: Array.isArray(form.keywords) ? form.keywords : [],
      structuredData: structuredData ?? null,
    }

    try {
      if (mode === 'create') {
        const res = await createPage(payload as never).unwrap()
        toast.success('SEO created')
        await triggerRevalidate(res.data.pagePath)
        window.location.href = '/admin/seo'
      } else if (page) {
        await updatePage({ id: page.id, body: payload as never }).unwrap()
        toast.success('SEO updated — cache will refresh shortly')
        await triggerRevalidate(payload.pagePath)
      }
    } catch (err) {
      const msg = (err as { data?: { message?: string } })?.data?.message ?? 'Save failed'
      toast.error(msg)
    }
  }

  const score = useMemo(() => computeSEOScore(form as PageSEODto), [form])
  const siteUrl = global?.siteUrl || 'https://www.kaabarpothe.com'

  return (
    <div className="space-y-6">
      <header className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {mode === 'create' ? 'Create Page SEO' : `Edit SEO — ${form.pageName}`}
          </h1>
          <p className="text-sm text-muted-foreground">
            Path <code className="bg-muted px-1.5 rounded text-xs">{form.pagePath || '/'}</code>{' '}
            · Locale <code className="bg-muted px-1.5 rounded text-xs">{form.locale}</code>
            {page?.isSystem && (
              <span className="ml-2 inline-flex items-center gap-1 text-xs text-emerald-700 dark:text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" /> System page (cannot be deleted)
              </span>
            )}
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <span
            className={`text-xs font-medium px-2 py-1 rounded border ${statusColor(score.status)}`}
          >
            {score.percentage}% · {score.status}
          </span>
          <Button onClick={handleSave} disabled={saving || creating}>
            <Save className="w-4 h-4 mr-1.5" />
            {saving || creating ? 'Saving…' : 'Save'}
          </Button>
        </div>
      </header>

      <div className="flex gap-2 border-b border-border overflow-x-auto">
        {TABS.map(t => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              tab === t.key
                ? 'border-primary text-foreground'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'general' && (
        <section className="grid gap-6 md:grid-cols-2">
          <div>
            <Label>Page Name</Label>
            <Input
              value={form.pageName}
              onChange={e => update('pageName', e.target.value)}
              placeholder="e.g. About"
            />
          </div>
          <div>
            <Label>Page Key</Label>
            <Input
              value={form.pageKey}
              onChange={e => update('pageKey', e.target.value)}
              placeholder="e.g. about"
              disabled={page?.isSystem}
            />
          </div>
          <div>
            <Label>Path</Label>
            <Input
              value={form.pagePath}
              onChange={e => update('pagePath', e.target.value)}
              placeholder="/about"
              disabled={page?.isSystem}
            />
          </div>
          <div>
            <Label>Locale</Label>
            <Input
              value={form.locale}
              onChange={e => update('locale', e.target.value)}
              placeholder="bn-BD"
            />
          </div>
          <div className="md:col-span-2">
            <Label>SEO Title</Label>
            <Input
              value={form.title ?? ''}
              onChange={e => update('title', e.target.value)}
              placeholder="Recommended 50-60 characters"
            />
            <CharacterCounter
              value={form.title}
              min={TITLE_LIMITS.min}
              recommended={TITLE_LIMITS.recommended}
              warning={TITLE_LIMITS.warning}
            />
          </div>
          <div className="md:col-span-2">
            <Label>Meta Description</Label>
            <Textarea
              value={form.metaDescription ?? ''}
              onChange={e => update('metaDescription', e.target.value)}
              placeholder="Recommended 150-160 characters"
            />
            <CharacterCounter
              value={form.metaDescription}
              min={DESC_LIMITS.min}
              recommended={DESC_LIMITS.recommended}
              warning={DESC_LIMITS.warning}
            />
          </div>
          <div className="md:col-span-2">
            <Label>Keywords (comma separated)</Label>
            <Input
              value={(form.keywords || []).join(', ')}
              onChange={e =>
                update(
                  'keywords',
                  e.target.value
                    .split(',')
                    .map(s => s.trim())
                    .filter(Boolean),
                )
              }
              placeholder="hajj, umrah, packages"
            />
          </div>
          <div>
            <Label>Robots</Label>
            <div className="flex gap-2 flex-wrap mb-2">
              {ROBOTS_PRESETS.map(preset => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => update('robots', preset)}
                  className={`text-xs px-2 py-1 rounded border ${
                    form.robots === preset
                      ? 'bg-primary/10 border-primary text-primary'
                      : 'border-border bg-muted/30 text-muted-foreground hover:bg-muted'
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>
            <Input
              value={form.robots ?? ''}
              onChange={e => update('robots', e.target.value)}
              placeholder="index,follow"
            />
          </div>
          <div>
            <Label>Max Image Preview</Label>
            <Select
              value={form.robotsMaxImagePreview ?? 'large'}
              onChange={e => update('robotsMaxImagePreview', e.target.value)}
            >
              {MAX_IMAGE_PREVIEW.map(v => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label>Max Snippet (chars, -1 = unlimited)</Label>
            <Input
              type="number"
              value={form.robotsMaxSnippet ?? -1}
              onChange={e => update('robotsMaxSnippet', Number(e.target.value))}
            />
          </div>
          <div>
            <Label>Max Video Preview (seconds, -1 = unlimited)</Label>
            <Input
              type="number"
              value={form.robotsMaxVideoPreview ?? -1}
              onChange={e => update('robotsMaxVideoPreview', Number(e.target.value))}
            />
          </div>
          <div className="md:col-span-2 flex items-center gap-3">
            <input
              id="canonicalAuto"
              type="checkbox"
              checked={form.canonicalAuto}
              onChange={e => update('canonicalAuto', e.target.checked)}
              className="w-4 h-4"
            />
            <Label htmlFor="canonicalAuto" className="mb-0">
              Auto-generate canonical URL from page path
            </Label>
          </div>
          {!form.canonicalAuto && (
            <div className="md:col-span-2">
              <Label>Custom Canonical URL</Label>
              <Input
                value={form.canonicalUrl ?? ''}
                onChange={e => update('canonicalUrl', e.target.value)}
                placeholder={`${siteUrl}${form.pagePath}`}
              />
            </div>
          )}
          <div>
            <Label>SEO Status</Label>
            <Select
              value={form.seoStatus ?? 'PUBLISHED'}
              onChange={e => update('seoStatus', e.target.value as PageForm['seoStatus'])}
            >
              <option value="PUBLISHED">Published</option>
              <option value="DRAFT">Draft (excluded from sitemap)</option>
            </Select>
          </div>
        </section>
      )}

      {tab === 'og' && (
        <section className="grid gap-6 md:grid-cols-2">
          <div className="md:col-span-2">
            <Label>OG Title</Label>
            <Input
              value={form.ogTitle ?? ''}
              onChange={e => update('ogTitle', e.target.value)}
              placeholder="Falls back to SEO title if empty"
            />
          </div>
          <div className="md:col-span-2">
            <Label>OG Description</Label>
            <Textarea
              value={form.ogDescription ?? ''}
              onChange={e => update('ogDescription', e.target.value)}
              placeholder="Falls back to meta description if empty"
            />
          </div>
          <div className="md:col-span-2">
            <Label>OG Image (1200 × 630 recommended)</Label>
            <CoverUpload
              value={form.ogImage ?? ''}
              onChange={url => update('ogImage', url)}
              folder="site"
              label=""
              aspect="video"
            />
          </div>
          <div>
            <Label>OG Image Alt Text</Label>
            <Input
              value={form.ogImageAlt ?? ''}
              onChange={e => update('ogImageAlt', e.target.value)}
            />
          </div>
          <div>
            <Label>OG Type</Label>
            <Select value={form.ogType ?? 'website'} onChange={e => update('ogType', e.target.value)}>
              {OG_TYPES.map(v => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label>OG URL (leave blank to auto)</Label>
            <Input
              value={form.ogUrl ?? ''}
              onChange={e => update('ogUrl', e.target.value)}
              placeholder={`${siteUrl}${form.pagePath}`}
            />
          </div>
          <div>
            <Label>OG Site Name</Label>
            <Input
              value={form.ogSiteName ?? ''}
              onChange={e => update('ogSiteName', e.target.value)}
            />
          </div>
          <div>
            <Label>OG Locale</Label>
            <Input
              value={form.ogLocale ?? ''}
              onChange={e => update('ogLocale', e.target.value)}
              placeholder="bn_BD"
            />
          </div>
        </section>
      )}

      {tab === 'twitter' && (
        <section className="grid gap-6 md:grid-cols-2">
          <div>
            <Label>Twitter Card</Label>
            <Select
              value={form.twitterCard ?? 'summary_large_image'}
              onChange={e => update('twitterCard', e.target.value)}
            >
              {TWITTER_CARDS.map(v => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label>Twitter Site (@handle)</Label>
            <Input
              value={form.twitterSite ?? ''}
              onChange={e => update('twitterSite', e.target.value)}
              placeholder="@kaabarpothe"
            />
          </div>
          <div className="md:col-span-2">
            <Label>Twitter Title</Label>
            <Input
              value={form.twitterTitle ?? ''}
              onChange={e => update('twitterTitle', e.target.value)}
            />
          </div>
          <div className="md:col-span-2">
            <Label>Twitter Description</Label>
            <Textarea
              value={form.twitterDescription ?? ''}
              onChange={e => update('twitterDescription', e.target.value)}
            />
          </div>
          <div className="md:col-span-2">
            <Label>Twitter Image</Label>
            <CoverUpload
              value={form.twitterImage ?? ''}
              onChange={url => update('twitterImage', url)}
              folder="site"
              label=""
              aspect="video"
            />
          </div>
          <div>
            <Label>Twitter Image Alt</Label>
            <Input
              value={form.twitterImageAlt ?? ''}
              onChange={e => update('twitterImageAlt', e.target.value)}
            />
          </div>
          <div>
            <Label>Twitter Creator (@handle)</Label>
            <Input
              value={form.twitterCreator ?? ''}
              onChange={e => update('twitterCreator', e.target.value)}
            />
          </div>
        </section>
      )}

      {tab === 'advanced' && (
        <section className="grid gap-6 md:grid-cols-2">
          <div>
            <Label>Author</Label>
            <Input
              value={form.author ?? ''}
              onChange={e => update('author', e.target.value)}
            />
          </div>
          <div>
            <Label>Language (hreflang)</Label>
            <Input
              value={form.language ?? ''}
              onChange={e => update('language', e.target.value)}
              placeholder="bn-BD"
            />
          </div>
          <div>
            <Label>Theme Color</Label>
            <Input
              value={form.themeColor ?? ''}
              onChange={e => update('themeColor', e.target.value)}
              placeholder="#0f172a"
            />
          </div>
          <div className="md:col-span-2">
            <Label>Structured Data (JSON-LD)</Label>
            <p className="text-xs text-muted-foreground mb-2 inline-flex items-center gap-1">
              <Info className="w-3.5 h-3.5" /> Accepts a single JSON object or array of
              objects. Global Organization + WebSite are added automatically — put
              page-specific schemas here (Article, FAQPage, Product, etc).
            </p>
            <Textarea
              value={structuredDataText}
              onChange={e => setStructuredDataText(e.target.value)}
              onBlur={parseStructuredData}
              rows={12}
              className="font-mono text-xs"
              placeholder='[{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[...]}]'
            />
            {structuredDataError && (
              <p className="text-xs text-red-600 mt-1">Invalid JSON: {structuredDataError}</p>
            )}
          </div>
        </section>
      )}

      {tab === 'preview' && (
        <section className="grid gap-6 lg:grid-cols-2">
          <GooglePreview
            siteUrl={siteUrl}
            path={form.pagePath}
            title={form.title}
            description={form.metaDescription}
          />
          <SocialPreview
            siteUrl={siteUrl}
            path={form.pagePath}
            ogImage={form.ogImage ?? global?.defaultOgImage}
            ogTitle={form.ogTitle ?? form.title}
            ogDescription={form.ogDescription ?? form.metaDescription}
            twitterCard={form.twitterCard}
          />
          <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-5 space-y-3">
            <h3 className="text-sm font-semibold text-foreground">SEO Health Checks</h3>
            <ul className="space-y-1">
              {score.checks.map(c => (
                <li key={c.id} className="text-sm flex items-start gap-2">
                  <span
                    className={
                      c.passed
                        ? 'text-emerald-600 shrink-0'
                        : 'text-amber-600 shrink-0'
                    }
                  >
                    {c.passed ? '✓' : '⚠'}
                  </span>
                  <span className={c.passed ? 'text-muted-foreground' : 'text-foreground'}>
                    {c.label}
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-muted-foreground pt-2 border-t border-border">
              This is an internal completeness indicator — not a Google ranking score.
            </p>
          </div>
        </section>
      )}
    </div>
  )
}
