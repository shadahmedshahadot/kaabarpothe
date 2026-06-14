import { Star, Check, X, Award } from 'lucide-react'
import { PageTitle } from '@/components/layouts/dashboard-shell'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/utils/format'
import { testimonials } from '@/data/testimonials'

export default function AdminReviewsPage() {
  return (
    <>
      <PageTitle title="Reviews" description="Approve, reject, or feature pilgrim reviews before they appear publicly." />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Stat label="Total reviews" value={testimonials.length} color="text-foreground" />
        <Stat label="Pending" value={4} color="text-amber-600" />
        <Stat label="Featured" value={testimonials.filter(t => t.featured).length} color="text-primary" />
        <Stat label="Avg. rating" value="4.9" color="text-emerald-600" />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {testimonials.map(t => (
          <div key={t.id} className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${t.avatar} text-white text-sm font-bold flex items-center justify-center`}>
                  {t.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.location} · {formatDate(t.date)}</p>
                </div>
              </div>
              <div className="flex">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>

            <p className="text-sm text-foreground/80 mb-4 line-clamp-3">{t.content}</p>

            <div className="flex items-center justify-between">
              <Badge variant="success">Approved</Badge>
              <div className="flex gap-1">
                {t.featured && <button className="p-1.5 bg-primary/10 text-primary rounded-lg" title="Featured"><Award className="w-3.5 h-3.5" /></button>}
                <button className="p-1.5 hover:bg-muted rounded-lg" title="Approve"><Check className="w-3.5 h-3.5 text-emerald-600" /></button>
                <button className="p-1.5 hover:bg-muted rounded-lg" title="Reject"><X className="w-3.5 h-3.5 text-rose-600" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

function Stat({ label, value, color }: { label: string; value: string | number; color: string }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5">
      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">{label}</p>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
    </div>
  )
}
