'use client'

type Props = {
  value: string | null | undefined
  min?: number
  recommended: number
  warning: number
}

export function CharacterCounter({ value, min, recommended, warning }: Props) {
  const len = value?.length ?? 0
  let color = 'text-muted-foreground'
  let label: string | null = null
  if (len === 0) {
    color = 'text-red-600'
    label = 'Empty'
  } else if (min && len < min) {
    color = 'text-amber-600'
    label = `Too short (min ${min})`
  } else if (len > warning) {
    color = 'text-red-600'
    label = `Way over (~${warning})`
  } else if (len > recommended) {
    color = 'text-amber-600'
    label = `Over recommended (${recommended})`
  } else {
    color = 'text-emerald-600'
    label = 'Good'
  }
  return (
    <div className={`text-xs mt-1 ${color} flex items-center justify-between`}>
      <span>{label}</span>
      <span className="tabular-nums">
        {len}/{recommended}
      </span>
    </div>
  )
}
