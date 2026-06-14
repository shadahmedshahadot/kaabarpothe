'use client'

import { useEffect, useRef, useState } from 'react'

interface Props {
  videoId: string
  fallbackImage?: string
  className?: string
}

/**
 * Fullscreen looping muted YouTube background video.
 * Uses YouTube iframe API for continuous looped playback.
 *
 * Swap `videoId` to your preferred YouTube video. Examples:
 *  - Quran.com Makkah live (24/7 stream): may be unreliable
 *  - Hajj cinematic montage (your own URL)
 *
 * Looks best with cinematic, slow-motion Makkah / Madinah footage.
 */
export function YouTubeVideoBackground({ videoId, fallbackImage, className = '' }: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 400)
    return () => clearTimeout(t)
  }, [])

  const src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=${videoId}&modestbranding=1&playsinline=1&disablekb=1&iv_load_policy=3&fs=0&cc_load_policy=0`

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Fallback poster while video loads */}
      {fallbackImage && (
        <div
          className={`absolute inset-0 bg-center bg-cover transition-opacity duration-700 ${loaded ? 'opacity-0' : 'opacity-100'}`}
          style={{ backgroundImage: `url(${fallbackImage})` }}
        />
      )}

      {/* YouTube iframe — sized 177.77vh wide on landscape (16:9 cover hack) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300vw] h-[300vh] sm:w-[177.77vh] sm:h-[100vh] sm:min-w-full sm:min-h-full">
        <iframe
          ref={iframeRef}
          src={src}
          title="Background video"
          allow="autoplay; encrypted-media"
          allowFullScreen={false}
          frameBorder={0}
          className="absolute inset-0 w-full h-full"
          onLoad={() => setLoaded(true)}
        />
      </div>
    </div>
  )
}
