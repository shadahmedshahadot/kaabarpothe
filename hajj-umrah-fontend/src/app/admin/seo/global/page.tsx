'use client'

import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Save } from 'lucide-react'
import {
  useGetGlobalSEOQuery,
  useUpsertGlobalSEOMutation,
} from '@/redux/fetchres/seo/seoApi'
import type { GlobalSEODto } from '@/lib/seo'
import { Input, Textarea, Select, Label } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { CoverUpload } from '@/components/common/cover-upload'

type Form = Partial<GlobalSEODto>

export default function GlobalSEOSettingsPage() {
  const { data, isLoading } = useGetGlobalSEOQuery()
  const [upsert, { isLoading: saving }] = useUpsertGlobalSEOMutation()
  const [form, setForm] = useState<Form>({})
  const [orgJsonText, setOrgJsonText] = useState('')
  const [websiteJsonText, setWebsiteJsonText] = useState('')
  const [orgError, setOrgError] = useState<string | null>(null)
  const [websiteError, setWebsiteError] = useState<string | null>(null)

  useEffect(() => {
    if (data?.data) {
      setForm(data.data)
      setOrgJsonText(
        data.data.organizationJsonLd
          ? JSON.stringify(data.data.organizationJsonLd, null, 2)
          : '',
      )
      setWebsiteJsonText(
        data.data.websiteJsonLd
          ? JSON.stringify(data.data.websiteJsonLd, null, 2)
          : '',
      )
    }
  }, [data])

  const update = <K extends keyof Form>(k: K, v: Form[K]) =>
    setForm(prev => ({ ...prev, [k]: v }))

  const handleSave = async () => {
    let organizationJsonLd: Record<string, unknown> | null | undefined
    let websiteJsonLd: Record<string, unknown> | null | undefined
    if (orgJsonText.trim()) {
      try {
        organizationJsonLd = JSON.parse(orgJsonText)
        setOrgError(null)
      } catch (err) {
        setOrgError((err as Error).message)
        toast.error('Organization JSON-LD is invalid')
        return
      }
    } else {
      organizationJsonLd = null
    }
    if (websiteJsonText.trim()) {
      try {
        websiteJsonLd = JSON.parse(websiteJsonText)
        setWebsiteError(null)
      } catch (err) {
        setWebsiteError((err as Error).message)
        toast.error('Website JSON-LD is invalid')
        return
      }
    } else {
      websiteJsonLd = null
    }
    try {
      await upsert({
        ...form,
        organizationJsonLd,
        websiteJsonLd,
      } as never).unwrap()
      toast.success('Global SEO saved — refreshing site cache')
      await fetch('/api/seo/revalidate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ all: true }),
      }).catch(() => null)
    } catch (err) {
      const msg = (err as { data?: { message?: string } })?.data?.message ?? 'Save failed'
      toast.error(msg)
    }
  }

  if (isLoading) return <div className="py-12 text-center text-muted-foreground">Loading…</div>

  return (
    <div className="space-y-6 max-w-5xl">
      <header className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Global SEO Settings</h1>
          <p className="text-sm text-muted-foreground">
            Site-wide defaults. Individual pages always override these.
          </p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          <Save className="w-4 h-4 mr-1.5" /> {saving ? 'Saving…' : 'Save Global SEO'}
        </Button>
      </header>

      <section className="grid gap-6 md:grid-cols-2 rounded-2xl border border-border bg-card p-5">
        <div>
          <Label>Site Name</Label>
          <Input value={form.siteName ?? ''} onChange={e => update('siteName', e.target.value)} />
        </div>
        <div>
          <Label>Site URL</Label>
          <Input value={form.siteUrl ?? ''} onChange={e => update('siteUrl', e.target.value)} />
        </div>
        <div className="md:col-span-2">
          <Label>Default Title</Label>
          <Input
            value={form.defaultTitle ?? ''}
            onChange={e => update('defaultTitle', e.target.value)}
          />
        </div>
        <div>
          <Label>Default Title Template (use %s)</Label>
          <Input
            value={form.defaultTitleTemplate ?? ''}
            onChange={e => update('defaultTitleTemplate', e.target.value)}
            placeholder="%s | Site"
          />
        </div>
        <div>
          <Label>Default OG Locale</Label>
          <Input
            value={form.defaultOgLocale ?? ''}
            onChange={e => update('defaultOgLocale', e.target.value)}
            placeholder="bn_BD"
          />
        </div>
        <div className="md:col-span-2">
          <Label>Default Description</Label>
          <Textarea
            value={form.defaultDescription ?? ''}
            onChange={e => update('defaultDescription', e.target.value)}
          />
        </div>
        <div className="md:col-span-2">
          <Label>Default Keywords (comma separated)</Label>
          <Input
            value={(form.defaultKeywords ?? []).join(', ')}
            onChange={e =>
              update(
                'defaultKeywords',
                e.target.value.split(',').map(s => s.trim()).filter(Boolean),
              )
            }
          />
        </div>
        <div>
          <Label>Default Robots</Label>
          <Input value={form.defaultRobots ?? ''} onChange={e => update('defaultRobots', e.target.value)} />
        </div>
        <div>
          <Label>Default OG Type</Label>
          <Select value={form.defaultOgType ?? 'website'} onChange={e => update('defaultOgType', e.target.value)}>
            <option value="website">website</option>
            <option value="article">article</option>
          </Select>
        </div>
        <div>
          <Label>Default OG Site Name</Label>
          <Input
            value={form.defaultOgSiteName ?? ''}
            onChange={e => update('defaultOgSiteName', e.target.value)}
          />
        </div>
        <div>
          <Label>Default Twitter Card</Label>
          <Select
            value={form.defaultTwitterCard ?? 'summary_large_image'}
            onChange={e => update('defaultTwitterCard', e.target.value)}
          >
            <option value="summary">summary</option>
            <option value="summary_large_image">summary_large_image</option>
          </Select>
        </div>
        <div>
          <Label>Default Twitter Site (@handle)</Label>
          <Input
            value={form.defaultTwitterSite ?? ''}
            onChange={e => update('defaultTwitterSite', e.target.value)}
          />
        </div>
        <div>
          <Label>Default Twitter Creator (@handle)</Label>
          <Input
            value={form.defaultTwitterCreator ?? ''}
            onChange={e => update('defaultTwitterCreator', e.target.value)}
          />
        </div>
        <div className="md:col-span-2">
          <Label>Default OG Image (1200 × 630)</Label>
          <CoverUpload
            value={form.defaultOgImage ?? ''}
            onChange={url => update('defaultOgImage', url)}
            folder="site"
            label=""
            aspect="video"
          />
        </div>
        <div>
          <Label>Default OG Image Alt</Label>
          <Input
            value={form.defaultOgImageAlt ?? ''}
            onChange={e => update('defaultOgImageAlt', e.target.value)}
          />
        </div>
        <div>
          <Label>Default Twitter Image</Label>
          <Input
            value={form.defaultTwitterImage ?? ''}
            onChange={e => update('defaultTwitterImage', e.target.value)}
            placeholder="Optional — falls back to OG image"
          />
        </div>
        <div>
          <Label>Theme Color (Light)</Label>
          <Input value={form.themeColor ?? ''} onChange={e => update('themeColor', e.target.value)} placeholder="#0f172a" />
        </div>
        <div>
          <Label>Theme Color (Dark)</Label>
          <Input
            value={form.themeColorDark ?? ''}
            onChange={e => update('themeColorDark', e.target.value)}
            placeholder="#020617"
          />
        </div>
        <div>
          <Label>Favicon URL / Path</Label>
          <Input value={form.favicon ?? ''} onChange={e => update('favicon', e.target.value)} placeholder="/favicon.svg" />
        </div>
        <div>
          <Label>Apple Touch Icon</Label>
          <Input
            value={form.appleTouchIcon ?? ''}
            onChange={e => update('appleTouchIcon', e.target.value)}
            placeholder="/apple-icon.png"
          />
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2 rounded-2xl border border-border bg-card p-5">
        <div>
          <Label>Google Verification</Label>
          <Input
            value={form.verificationGoogle ?? ''}
            onChange={e => update('verificationGoogle', e.target.value)}
          />
        </div>
        <div>
          <Label>Bing (msvalidate.01)</Label>
          <Input
            value={form.verificationBing ?? ''}
            onChange={e => update('verificationBing', e.target.value)}
          />
        </div>
        <div>
          <Label>Yandex Verification</Label>
          <Input
            value={form.verificationYandex ?? ''}
            onChange={e => update('verificationYandex', e.target.value)}
          />
        </div>
        <div>
          <Label>Facebook Domain Verification</Label>
          <Input
            value={form.verificationFacebook ?? ''}
            onChange={e => update('verificationFacebook', e.target.value)}
          />
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card p-5 space-y-4">
        <div>
          <Label>Organization JSON-LD (rendered on every page)</Label>
          <Textarea
            value={orgJsonText}
            onChange={e => setOrgJsonText(e.target.value)}
            rows={10}
            className="font-mono text-xs"
          />
          {orgError && <p className="text-xs text-red-600 mt-1">Invalid: {orgError}</p>}
        </div>
        <div>
          <Label>WebSite JSON-LD (rendered on every page)</Label>
          <Textarea
            value={websiteJsonText}
            onChange={e => setWebsiteJsonText(e.target.value)}
            rows={8}
            className="font-mono text-xs"
          />
          {websiteError && <p className="text-xs text-red-600 mt-1">Invalid: {websiteError}</p>}
        </div>
      </section>
    </div>
  )
}
