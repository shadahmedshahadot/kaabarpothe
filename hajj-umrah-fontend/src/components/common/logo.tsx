import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { LOGO_ALT, LOGO_SRC, SITE } from '@/constants'

interface LogoProps {
  href?: string | null
  variant?: 'light' | 'dark'
  showText?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const sizeMap = {
  sm: { box: 'h-10 w-10', pad: 'p-1', title: 'text-sm', sub: 'text-[10px]' },
  md: { box: 'h-12 w-12', pad: 'p-1', title: 'text-base', sub: 'text-[10px]' },
  lg: { box: 'h-14 w-14', pad: 'p-1', title: 'text-lg', sub: 'text-[10px]' },
  xl: { box: 'h-20 w-20', pad: 'p-1.5', title: 'text-2xl', sub: 'text-xs' },
}

export function Logo({
  href = '/',
  variant = 'light',
  showText = true,
  size = 'md',
  className,
}: LogoProps) {
  const s = sizeMap[size]
  const inner = (
    <span className={cn('inline-flex items-center gap-3 group', className)}>
      <span
        className={cn(
          'relative shrink-0 overflow-hidden rounded-2xl bg-white ring-1 ring-black/5 shadow-md shadow-black/10 transition-transform duration-300 group-hover:scale-[1.04]',
          s.box,
        )}
      >
        <Image
          src={LOGO_SRC}
          alt={LOGO_ALT}
          fill
          sizes="96px"
          className={cn('object-contain', s.pad)}
          priority
        />
      </span>
      {showText && (
        <span
          className={cn(
            'hidden sm:block leading-tight',
            variant === 'light' ? 'text-foreground' : 'text-white',
          )}
        >
          <span className={cn('block font-bold tracking-tight', s.title)}>{SITE.name}</span>
          <span
            className={cn(
              'block uppercase tracking-[0.18em]',
              s.sub,
              variant === 'light' ? 'text-muted-foreground' : 'text-white/70',
            )}
          >
            Hajj &amp; Umrah
          </span>
        </span>
      )}
    </span>
  )
  if (href === null) return inner
  return <Link href={href}>{inner}</Link>
}
