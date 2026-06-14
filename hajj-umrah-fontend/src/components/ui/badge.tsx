import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground',
        secondary: 'border-transparent bg-secondary/10 text-secondary',
        outline: 'border-border text-foreground',
        success: 'border-transparent bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
        warning: 'border-transparent bg-amber-500/10 text-amber-700 dark:text-amber-300',
        danger: 'border-transparent bg-rose-500/10 text-rose-700 dark:text-rose-300',
        info: 'border-transparent bg-sky-500/10 text-sky-700 dark:text-sky-300',
        accent: 'border-transparent bg-accent/15 text-accent',
      },
    },
    defaultVariants: { variant: 'default' },
  },
)

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}
