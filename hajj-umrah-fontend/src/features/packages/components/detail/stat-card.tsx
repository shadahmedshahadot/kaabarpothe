import type { ComponentType } from 'react'

interface Props {
  icon: ComponentType<{ className?: string }>
  label: string
  value: string
}

export function PackageStatCard({ icon: Icon, label, value }: Props) {
  return (
    <div className="bg-card border border-border rounded-xl p-4">
      <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1.5 uppercase tracking-wider">
        <Icon className="w-4 h-4" /> {label}
      </div>
      <p className="font-bold text-foreground">{value}</p>
    </div>
  )
}
