'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

interface Props {
  videoId: string
  fallbackImage?: string
  className?: string
}

export function YouTubeVideoBackground({ videoId, fallbackImage, className = '' }: Props) {
  const [mount, setMount] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const trigger = () => setMount(true)
    const idle = (window as unknown as { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback
    let id: number | undefined
    if (idle) {
      id = idle(trigger, { timeout: 2500 })
    } else {
      id = window.setTimeout(trigger, 1800) as unknown as number
    }
    window.addEventListener('scroll', trigger, { once: true, passive: true })
    window.addEventListener('pointerdown', trigger, { once: true, passive: true })
    return () => {
      if (id !== undefined) {
        const cancel = (window as unknown as { cancelIdleCallback?: (h: number) => void }).cancelIdleCallback
        if (cancel) cancel(id)
        else clearTimeout(id)
      }
      window.removeEventListener('scroll', trigger)
      window.removeEventListener('pointerdown', trigger)
    }
  }, [])

  const src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=${videoId}&modestbranding=1&playsinline=1&disablekb=1&iv_load_policy=3&fs=0&cc_load_policy=0`

  return (
    <div
      className={`absolute top-0 left-1/2 -translate-x-1/2 w-screen h-full overflow-hidden pointer-events-none ${className}`}
    >
      {fallbackImage && (
        <div className={`absolute inset-0 transition-opacity duration-700 ${loaded ? 'opacity-0' : 'opacity-100'}`}>
          <Image
            src={fallbackImage}
            alt=""
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="object-cover"
          />
        </div>
      )}

      {mount && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[max(100vw,177.77vh)] h-[max(100vh,56.25vw)]">
          <iframe
            src={src}
            title="Background video"
            allow="autoplay; encrypted-media"
            allowFullScreen={false}
            frameBorder={0}
            loading="lazy"
            className="absolute inset-0 w-full h-full"
            onLoad={() => setLoaded(true)}
          />
        </div>
      )}
    </div>
  )
}
