'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface StatCardProps {
  label: string
  value: string | React.ReactNode
  delta?: { value: string; positive: boolean }
  icon?: React.ReactNode
  className?: string
  index?: number
}

export function StatCard({ label, value, delta, icon, className, index = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3 }}
      className={cn('group rounded-2xl border border-border bg-card p-5 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30 transition-colors relative overflow-hidden', className)}
    >
      <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-primary/5 blur-2xl group-hover:bg-primary/10 transition-colors" />
      <div className="flex items-start justify-between mb-3 relative">
        <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">{label}</p>
        {icon && (
          <motion.div
            whileHover={{ rotate: 12, scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center"
          >
            {icon}
          </motion.div>
        )}
      </div>
      <div className="flex items-end justify-between gap-2 relative">
        <p className="text-2xl sm:text-3xl font-bold text-foreground leading-none">{value}</p>
        {delta && (
          <span className={cn('text-xs font-semibold px-2 py-0.5 rounded-full', delta.positive ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300' : 'bg-rose-500/10 text-rose-700 dark:text-rose-300')}>
            {delta.positive ? '↑' : '↓'} {delta.value}
          </span>
        )}
      </div>
    </motion.div>
  )
}
