import { PageTitle } from '@/components/layouts/dashboard-shell'
import { Badge } from '@/components/ui/badge'
import { formatCurrency, formatDate } from '@/utils/format'
import { bookings } from '@/data/bookings'

export default function PilgrimBookingsPage() {
  const my = bookings.filter(b => b.pilgrimId === 'p-001')
  return (
    <>
      <PageTitle title="My bookings" description="All your past and upcoming pilgrimages." />

      <div className="space-y-4">
        {my.map(b => (
          <div key={b.id} className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="grid md:grid-cols-3">
              <div className={`bg-gradient-to-br ${b.packageType === 'hajj' ? 'from-amber-400 via-orange-500 to-rose-500' : 'from-emerald-400 via-teal-500 to-cyan-500'} p-8 text-white relative`}>
                <svg className="absolute inset-0 w-full h-full opacity-15" viewBox="0 0 200 150" preserveAspectRatio="none">
                  <pattern id={`pb-${b.id}`} width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="10" cy="10" r="1.5" fill="white" />
                  </pattern>
                  <rect width="100%" height="100%" fill={`url(#pb-${b.id})`} />
                </svg>
                <p className="relative text-xs uppercase tracking-wider opacity-80 mb-2">{b.bookingCode}</p>
                <h3 className="relative text-2xl font-bold mb-1">{b.packageName}</h3>
                <p className="relative text-sm opacity-90">{formatDate(b.departureDate)} → {formatDate(b.returnDate)}</p>
              </div>

              <div className="md:col-span-2 p-6 grid sm:grid-cols-3 gap-4">
                <Info label="Status" value={<Badge variant={b.status === 'confirmed' ? 'success' : b.status === 'completed' ? 'info' : 'warning'}>{b.status}</Badge>} />
                <Info label="Visa" value={<Badge variant={b.visaStatus === 'approved' ? 'success' : 'warning'}>{b.visaStatus}</Badge>} />
                <Info label="Payment" value={<Badge variant={b.paymentStatus === 'paid' ? 'success' : 'warning'}>{b.paymentStatus}</Badge>} />
                <Info label="Total" value={<span className="font-bold text-foreground text-lg">{formatCurrency(b.totalAmount)}</span>} />
                <Info label="Paid" value={<span className="font-bold text-emerald-600 text-lg">{formatCurrency(b.paidAmount)}</span>} />
                <Info label="Pilgrims" value={<span className="font-semibold text-foreground">{b.pilgrimsCount}</span>} />
                <div className="sm:col-span-3 flex flex-wrap gap-2 mt-2 pt-4 border-t border-border">
                  <button className="text-sm bg-foreground text-background px-4 py-2 rounded-xl font-semibold hover:bg-primary">View details</button>
                  <button className="text-sm border border-border px-4 py-2 rounded-xl font-semibold hover:bg-muted">Download invoice</button>
                  <button className="text-sm border border-border px-4 py-2 rounded-xl font-semibold hover:bg-muted">View itinerary</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

function Info({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">{label}</p>
      {value}
    </div>
  )
}
