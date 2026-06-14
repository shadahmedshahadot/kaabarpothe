import { DonutChart } from '@/features/admin/components/chart'

const TIER_DATA = [
  { label: 'Budget', value: 1820, color: 'oklch(0.68 0.14 70)' },
  { label: 'Economy', value: 2410, color: 'oklch(0.58 0.14 150)' },
  { label: 'Premium', value: 980, color: 'oklch(0.48 0.12 210)' },
  { label: 'VIP/Luxury', value: 371, color: 'oklch(0.72 0.12 30)' },
]

export function TierDistribution() {
  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <h3 className="font-bold text-foreground mb-1">Bookings by tier</h3>
      <p className="text-xs text-muted-foreground mb-4">All-time distribution</p>
      <DonutChart data={TIER_DATA} />
      <div className="space-y-1.5 mt-4">
        {TIER_DATA.map(t => (
          <div key={t.label} className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ background: t.color }} />
              <span className="text-foreground/80">{t.label}</span>
            </span>
            <span className="font-semibold text-foreground">{t.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
