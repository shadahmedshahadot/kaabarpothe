import type { ComponentType } from 'react'

interface Props {
  Icon: ComponentType<{ className?: string }>
  title: string
  lines: string[]
}

export function InfoBox({ Icon, title, lines }: Props) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
          <Icon className="w-4 h-4" />
        </div>
        <h4 className="font-bold text-foreground">{title}</h4>
      </div>
      {lines.map((l, i) => (
        <p key={i} className="text-sm text-muted-foreground leading-relaxed">{l}</p>
      ))}
    </div>
  )
}
