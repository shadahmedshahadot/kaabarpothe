'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Save, RotateCcw, Plus, Trash2, ArrowLeft, Eye, CheckCircle2, Play, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { PageTitle } from '@/components/layouts/dashboard-shell'
import { Input, Textarea, Label } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useHeroContent } from '@/hooks/use-hero-content'
import { DEFAULT_HERO_CONTENT, type HeroContent } from '@/data/content/hero'

export default function HeroContentEditor() {
  const [saved, save, reset] = useHeroContent()
  const [draft, setDraft] = useState<HeroContent>(saved)
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => { setDraft(saved) }, [saved])

  const dirty = JSON.stringify(draft) !== JSON.stringify(saved)

  const flash = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2500)
  }

  const handleSave = () => { save(draft); flash('Hero content saved — refresh homepage to verify.') }
  const handleReset = () => {
    if (!confirm('Reset hero to default content? Custom edits will be lost.')) return
    reset(); flash('Hero reset to default.')
  }

  const setField = <K extends keyof HeroContent>(key: K, value: HeroContent[K]) =>
    setDraft(d => ({ ...d, [key]: value }))

  return (
    <>
      <Link href="/admin/content" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to content
      </Link>

      <PageTitle
        title="Hero section"
        description="Edit homepage hero — background video, headline, badges, stats. Changes persist in your browser."
        action={
          <div className="flex gap-2">
            <Link href="/" target="_blank" className="px-3 py-2 border border-border rounded-xl text-sm font-semibold inline-flex items-center gap-2 hover:bg-muted transition-colors">
              <Eye className="w-4 h-4" /> Preview
            </Link>
            <button onClick={handleReset} className="px-3 py-2 border border-border rounded-xl text-sm font-semibold inline-flex items-center gap-2 hover:bg-muted text-rose-600 transition-colors">
              <RotateCcw className="w-4 h-4" /> Reset
            </button>
            <button
              onClick={handleSave}
              disabled={!dirty}
              className="bg-foreground text-background px-4 py-2 rounded-xl text-sm font-semibold inline-flex items-center gap-2 hover:bg-primary disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <Save className="w-4 h-4" /> {dirty ? 'Save changes' : 'Saved'}
            </button>
          </div>
        }
      />

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed bottom-6 right-6 z-50 bg-emerald-500 text-white px-5 py-3 rounded-xl shadow-2xl inline-flex items-center gap-2"
          >
            <CheckCircle2 className="w-5 h-5" /> {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card title="Background video" icon={<Play className="w-4 h-4" />}>
            <div>
              <Label>YouTube video ID</Label>
              <Input
                value={draft.videoId}
                onChange={e => setField('videoId', e.target.value)}
                placeholder="weCvgHcbdP4"
              />
              <p className="text-xs text-muted-foreground mt-2">
                Paste the 11-character ID from <code className="bg-muted px-1 rounded">youtube.com/watch?v=<strong className="text-foreground">XXX</strong></code> or{' '}
                <code className="bg-muted px-1 rounded">youtu.be/<strong className="text-foreground">XXX</strong></code>
              </p>
              {draft.videoId && (
                <div className="mt-3 aspect-video rounded-xl overflow-hidden border border-border bg-black">
                  <iframe
                    src={`https://www.youtube.com/embed/${draft.videoId}?mute=1&autoplay=0&controls=1`}
                    className="w-full h-full"
                    title="Preview"
                  />
                </div>
              )}
            </div>
          </Card>

          <Card title="Headline" icon={<Sparkles className="w-4 h-4" />}>
            <div>
              <Label>Eyebrow badge</Label>
              <Input value={draft.badge} onChange={e => setField('badge', e.target.value)} />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>Title — first part</Label>
                <Input value={draft.titleStart} onChange={e => setField('titleStart', e.target.value)} />
              </div>
              <div>
                <Label>Title — highlighted part</Label>
                <Input value={draft.titleHighlight} onChange={e => setField('titleHighlight', e.target.value)} />
              </div>
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                rows={4}
                value={draft.description}
                onChange={e => setField('description', e.target.value)}
              />
            </div>
          </Card>

          <Card title="Call-to-action buttons">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>Umrah tab label</Label>
                <Input value={draft.ctaUmrah} onChange={e => setField('ctaUmrah', e.target.value)} />
              </div>
              <div>
                <Label>Hajj tab label</Label>
                <Input value={draft.ctaHajj} onChange={e => setField('ctaHajj', e.target.value)} />
              </div>
            </div>
          </Card>

          <Card title="Trust badges">
            <p className="text-xs text-muted-foreground mb-2">Three short trust badges shown below the booking widget.</p>
            {draft.trustBadges.map((b, i) => (
              <div key={i} className="flex gap-2 items-center">
                <Input
                  value={b}
                  onChange={e => {
                    const next = [...draft.trustBadges]
                    next[i] = e.target.value
                    setField('trustBadges', next)
                  }}
                />
                <button
                  onClick={() => setField('trustBadges', draft.trustBadges.filter((_, j) => j !== i))}
                  className="p-2 text-rose-500 hover:bg-rose-500/10 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            {draft.trustBadges.length < 5 && (
              <button
                onClick={() => setField('trustBadges', [...draft.trustBadges, 'New badge'])}
                className="w-full py-2.5 border-2 border-dashed border-border rounded-xl text-sm text-muted-foreground hover:border-primary hover:text-primary inline-flex items-center justify-center gap-2 transition-colors"
              >
                <Plus className="w-4 h-4" /> Add badge
              </button>
            )}
          </Card>

          <Card title="Right-side reflection card">
            <div>
              <Label>Eyebrow</Label>
              <Input value={draft.reflectionEyebrow} onChange={e => setField('reflectionEyebrow', e.target.value)} />
            </div>
            <div>
              <Label>Quote</Label>
              <Textarea rows={3} value={draft.reflectionQuote} onChange={e => setField('reflectionQuote', e.target.value)} />
            </div>
            <div>
              <Label>Reference / attribution</Label>
              <Input value={draft.reflectionRef} onChange={e => setField('reflectionRef', e.target.value)} />
            </div>

            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mt-4">Bottom info row</p>
            {draft.reflectionItems.map((item, i) => (
              <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-2 items-center">
                <Input
                  placeholder="Label"
                  value={item.label}
                  onChange={e => {
                    const next = [...draft.reflectionItems]
                    next[i] = { ...next[i], label: e.target.value }
                    setField('reflectionItems', next)
                  }}
                />
                <Input
                  placeholder="Value"
                  value={item.value}
                  onChange={e => {
                    const next = [...draft.reflectionItems]
                    next[i] = { ...next[i], value: e.target.value }
                    setField('reflectionItems', next)
                  }}
                />
                <button
                  onClick={() => setField('reflectionItems', draft.reflectionItems.filter((_, j) => j !== i))}
                  className="p-2 text-rose-500 hover:bg-rose-500/10 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            {draft.reflectionItems.length < 4 && (
              <button
                onClick={() => setField('reflectionItems', [...draft.reflectionItems, { label: 'New', value: 'Value' }])}
                className="w-full py-2.5 border-2 border-dashed border-border rounded-xl text-sm text-muted-foreground hover:border-primary hover:text-primary inline-flex items-center justify-center gap-2 transition-colors"
              >
                <Plus className="w-4 h-4" /> Add item
              </button>
            )}
          </Card>

          <Card title="Stats bar">
            <p className="text-xs text-muted-foreground mb-2">Four animated counters at bottom of hero.</p>
            {draft.stats.map((s, i) => (
              <div key={i} className="grid grid-cols-[1fr_80px_80px_60px_auto] gap-2 items-center">
                <Input
                  placeholder="Label"
                  value={s.label}
                  onChange={e => {
                    const next = [...draft.stats]
                    next[i] = { ...next[i], label: e.target.value }
                    setField('stats', next)
                  }}
                />
                <Input
                  type="number"
                  placeholder="Value"
                  value={s.value}
                  onChange={e => {
                    const next = [...draft.stats]
                    next[i] = { ...next[i], value: Number(e.target.value) }
                    setField('stats', next)
                  }}
                />
                <Input
                  placeholder="Suffix"
                  value={s.suffix ?? ''}
                  onChange={e => {
                    const next = [...draft.stats]
                    next[i] = { ...next[i], suffix: e.target.value }
                    setField('stats', next)
                  }}
                />
                <Input
                  type="number"
                  placeholder="Dec."
                  value={s.decimals ?? 0}
                  onChange={e => {
                    const next = [...draft.stats]
                    next[i] = { ...next[i], decimals: Number(e.target.value) }
                    setField('stats', next)
                  }}
                />
                <button
                  onClick={() => setField('stats', draft.stats.filter((_, j) => j !== i))}
                  className="p-2 text-rose-500 hover:bg-rose-500/10 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            {draft.stats.length < 6 && (
              <button
                onClick={() => setField('stats', [...draft.stats, { value: 0, label: 'New stat', suffix: '+' }])}
                className="w-full py-2.5 border-2 border-dashed border-border rounded-xl text-sm text-muted-foreground hover:border-primary hover:text-primary inline-flex items-center justify-center gap-2 transition-colors"
              >
                <Plus className="w-4 h-4" /> Add stat
              </button>
            )}
          </Card>
        </div>

        {/* Sidebar — live preview + tips */}
        <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-bold text-foreground mb-3">Live preview</h3>
            <p className="text-xs text-muted-foreground mb-4">A miniature of what visitors will see.</p>
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-foreground/90 p-5 text-white">
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/80" />
              <div className="relative">
                <Badge variant="default" className="!bg-amber-400/20 !text-amber-200 !border !border-amber-300/30 mb-3 inline-flex">
                  <Sparkles className="w-3 h-3" /> {draft.badge.slice(0, 30)}…
                </Badge>
                <p className="text-lg font-bold leading-tight">
                  {draft.titleStart} <span className="text-amber-300">{draft.titleHighlight}</span>
                </p>
                <p className="text-[10px] opacity-80 mt-2 line-clamp-3">{draft.description}</p>

                <div className="mt-4 grid grid-cols-2 gap-1.5">
                  <div className="bg-amber-400 text-foreground rounded-md text-[10px] font-bold py-1.5 text-center">{draft.ctaUmrah}</div>
                  <div className="bg-white/15 text-white rounded-md text-[10px] font-bold py-1.5 text-center">{draft.ctaHajj}</div>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-1.5">
                  {draft.stats.slice(0, 4).map((s, i) => (
                    <div key={i} className="bg-white/10 rounded-md p-2">
                      <p className="text-sm font-bold leading-none">{s.value.toLocaleString()}{s.suffix}</p>
                      <p className="text-[8px] opacity-70 uppercase tracking-wider mt-0.5 truncate">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-bold text-foreground mb-3 text-sm">Tips</h3>
            <ul className="text-xs text-muted-foreground space-y-2 leading-relaxed">
              <li>• Use cinematic 1080p+ video for best background quality.</li>
              <li>• Keep description under 200 chars for mobile.</li>
              <li>• Highlight part gets the amber gradient — make it the strongest 2-4 words.</li>
              <li>• Changes save to your browser's localStorage only (frontend demo).</li>
              <li>• Use <strong>Reset</strong> to restore defaults from the shipped build.</li>
            </ul>
          </div>

          <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-5">
            <p className="text-xs font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wider mb-1">Status</p>
            <p className="text-sm text-foreground">
              {dirty ? <span className="text-amber-700 dark:text-amber-300">Unsaved changes</span> : <span className="text-emerald-700 dark:text-emerald-300">All synced</span>}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

function Card({ title, icon, children }: { title: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <h3 className="font-bold text-foreground mb-4 inline-flex items-center gap-2">
        {icon && <span className="text-primary">{icon}</span>}
        {title}
      </h3>
      <div className="space-y-4">{children}</div>
    </div>
  )
}
