import { Download, FileSpreadsheet, FileText, BarChart3, TrendingUp, Users, DollarSign, Plane } from 'lucide-react'
import { PageTitle } from '@/components/layouts/dashboard-shell'
import { BarChart, LineChart } from '@/features/admin/components/chart'

const reportTypes = [
  { Icon: DollarSign, title: 'Revenue report', desc: 'Monthly breakdown of revenue by package, tier, and tier.', color: 'emerald' },
  { Icon: Plane, title: 'Bookings report', desc: 'All bookings by status, source, and time period.', color: 'sky' },
  { Icon: Users, title: 'Group leaders report', desc: 'Per-group-leader performance and pilgrim satisfaction ratings.', color: 'violet' },
  { Icon: Users, title: 'Pilgrims report', desc: 'Demographics, retention, repeat bookings.', color: 'amber' },
  { Icon: TrendingUp, title: 'Conversion report', desc: 'Inquiry to booking conversion funnel.', color: 'rose' },
  { Icon: BarChart3, title: 'Marketing report', desc: 'Traffic, campaigns, channel attribution.', color: 'orange' },
]

export default function AdminReportsPage() {
  return (
    <>
      <PageTitle
        title="Reports"
        description="Export comprehensive reports in CSV or PDF format."
        action={
          <div className="flex gap-2">
            <button className="px-3 py-2 border border-border rounded-xl text-sm font-semibold inline-flex items-center gap-2 hover:bg-muted">
              <FileSpreadsheet className="w-4 h-4" /> CSV
            </button>
            <button className="bg-foreground text-background px-4 py-2 rounded-xl text-sm font-semibold inline-flex items-center gap-2 hover:bg-primary">
              <FileText className="w-4 h-4" /> PDF
            </button>
          </div>
        }
      />

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6">
          <h3 className="font-bold text-foreground mb-1">Year-over-year revenue</h3>
          <p className="text-xs text-muted-foreground mb-5">2025 vs 2026</p>
          <LineChart data={[420000, 510000, 645000, 780000, 920000, 1100000, 1450000, 1620000]} />
        </div>
        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="font-bold text-foreground mb-1">Top packages</h3>
          <p className="text-xs text-muted-foreground mb-5">By bookings (YTD)</p>
          <BarChart data={[
            { label: 'Eco', value: 2410, color: 'bg-gradient-to-t from-emerald-400 to-teal-500' },
            { label: 'Bdg', value: 1820, color: 'bg-gradient-to-t from-amber-400 to-orange-500' },
            { label: 'Prm', value: 980, color: 'bg-gradient-to-t from-blue-400 to-indigo-500' },
            { label: 'Std', value: 1340, color: 'bg-gradient-to-t from-violet-400 to-purple-500' },
            { label: 'VIP', value: 156, color: 'bg-gradient-to-t from-rose-400 to-pink-500' },
            { label: 'Lux', value: 215, color: 'bg-gradient-to-t from-yellow-400 to-amber-500' },
          ]} />
        </div>
      </div>

      <h2 className="text-lg font-bold text-foreground mb-4">Generate report</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {reportTypes.map(r => (
          <div key={r.title} className="bg-card border border-border rounded-2xl p-6 hover:shadow-md transition-shadow">
            <div className={`w-11 h-11 rounded-xl bg-${r.color}-500/10 text-${r.color}-600 flex items-center justify-center mb-4`}>
              <r.Icon className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-foreground mb-1">{r.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{r.desc}</p>
            <button className="text-sm font-semibold text-primary hover:text-primary/80 inline-flex items-center gap-1">
              <Download className="w-4 h-4" /> Generate
            </button>
          </div>
        ))}
      </div>
    </>
  )
}
