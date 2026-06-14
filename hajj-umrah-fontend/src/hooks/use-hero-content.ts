'use client'

import { useEffect, useState } from 'react'
import { DEFAULT_HERO_CONTENT, HERO_STORAGE_KEY, type HeroContent } from '@/data/content/hero'

export function useHeroContent(): [HeroContent, (next: HeroContent) => void, () => void] {
  const [content, setContent] = useState<HeroContent>(DEFAULT_HERO_CONTENT)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(HERO_STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<HeroContent>
        setContent({ ...DEFAULT_HERO_CONTENT, ...parsed })
      }
    } catch {}
  }, [])

  const save = (next: HeroContent) => {
    setContent(next)
    try {
      localStorage.setItem(HERO_STORAGE_KEY, JSON.stringify(next))
      window.dispatchEvent(new Event('hero-content-updated'))
    } catch {}
  }

  const reset = () => {
    setContent(DEFAULT_HERO_CONTENT)
    try {
      localStorage.removeItem(HERO_STORAGE_KEY)
      window.dispatchEvent(new Event('hero-content-updated'))
    } catch {}
  }

  useEffect(() => {
    const onUpdate = () => {
      try {
        const raw = localStorage.getItem(HERO_STORAGE_KEY)
        setContent(raw ? { ...DEFAULT_HERO_CONTENT, ...JSON.parse(raw) } : DEFAULT_HERO_CONTENT)
      } catch {}
    }
    window.addEventListener('hero-content-updated', onUpdate)
    window.addEventListener('storage', e => { if (e.key === HERO_STORAGE_KEY) onUpdate() })
    return () => {
      window.removeEventListener('hero-content-updated', onUpdate)
      window.removeEventListener('storage', onUpdate)
    }
  }, [])

  return [content, save, reset]
}
