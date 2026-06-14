'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
  gradient?: boolean
}

export function SectionHeading({ eyebrow, title, description, align = 'center', className, gradient = true }: SectionHeadingProps) {
  return (
    <div className={cn(align === 'center' ? 'text-center mx-auto' : 'text-left', 'max-w-3xl', className)}>
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={cn('inline-flex items-center gap-2 mb-4', align === 'center' && 'justify-center')}
        >
          <span className="w-8 h-px bg-primary" />
          <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-primary">
            {eyebrow}
          </span>
          <span className="w-8 h-px bg-primary" />
        </motion.div>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-5 text-balance leading-[1.1]"
      >
        {gradient ? (
          <>
            {title.split(' ').slice(0, -1).join(' ')}{' '}
            <span className="bg-gradient-to-r from-primary via-amber-500 to-accent bg-clip-text text-transparent">
              {title.split(' ').slice(-1)}
            </span>
          </>
        ) : (
          title
        )}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-base sm:text-lg text-muted-foreground text-balance leading-relaxed"
        >
          {description}
        </motion.p>
      )}
    </div>
  )
}
