import { BarChart } from '@/features/admin/components/chart'

const MONTHLY_DATA = [
  { label: 'Jan', value: 124 },
  { label: 'Feb', value: 156 },
  { label: 'Mar', value: 198 },
  { label: 'Apr', value: 142 },
  { label: 'May', value: 89 },
  { label: 'Jun', value: 215 },
]

export function MonthlyBookingsChart() {
  return (
    <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6">
      <h3 className="font-bold text-foreground mb-1">Monthly bookings</h3>
      <p className="text-xs text-muted-foreground mb-5">Last 6 months</p>
      <BarChart data={MONTHLY_DATA} />
    </div>
  )
}
