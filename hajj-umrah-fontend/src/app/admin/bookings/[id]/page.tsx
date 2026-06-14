import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Mail, Phone, Plane, Calendar, Users, DollarSign, FileText, MessageSquare, CheckCircle2 } from 'lucide-react'
import { PageTitle } from '@/components/layouts/dashboard-shell'
import { Badge } from '@/components/ui/badge'
import { formatCurrency, formatDate } from '@/utils/format'
import { bookings, getBooking } from '@/data/bookings'
import { payments } from '@/data/payments'

export function generateStaticParams() {
  return bookings.map(b => ({ id: b.id }))
}

export default async function AdminBookingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const booking = getBooking(id)
  if (!booking) notFound()
  const bookingPayments = payments.filter(p => p.bookingId === booking.id)

  return (
    <>
      <Link href="/admin/bookings" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to bookings
      </Link>

      <PageTitle
        title={booking.bookingCode}
        description={`${booking.packageName} · ${booking.pilgrimsCount} pilgrim(s)`}
        action={
          <div className="flex gap-2 flex-wrap">
            <button className="px-3 py-2 border border-border rounded-xl text-sm font-semibold hover:bg-muted">Download invoice</button>
            <button className="bg-foreground text-background px-4 py-2 rounded-xl text-sm font-semibold hover:bg-primary transition-colors">Update status</button>
          </div>
        }
      />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-foreground">Booking summary</h3>
              <div className="flex gap-1.5">
                <Badge variant={booking.status === 'confirmed' ? 'success' : 'warning'}>{booking.status}</Badge>
                <Badge variant={booking.paymentStatus === 'paid' ? 'success' : 'warning'}>{booking.paymentStatus}</Badge>
                <Badge variant={booking.visaStatus === 'approved' ? 'success' : 'warning'}>Visa {booking.visaStatus}</Badge>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <InfoRow icon={Calendar} label="Booked" value={formatDate(booking.bookedDate)} />
              <InfoRow icon={Plane} label="Departure" value={formatDate(booking.departureDate)} />
              <InfoRow icon={Plane} label="Return" value={formatDate(booking.returnDate)} />
              <InfoRow icon={Users} label="Pilgrims" value={`${booking.pilgrimsCount} adult(s)`} />
              <InfoRow icon={DollarSign} label="Total" value={formatCurrency(booking.totalAmount)} />
              <InfoRow icon={DollarSign} label="Paid" value={formatCurrency(booking.paidAmount)} />
            </div>
            {booking.notes && (
              <div className="mt-5 p-4 bg-muted/40 rounded-xl">
                <p className="text-xs font-semibold uppercase text-muted-foreground mb-1">Notes</p>
                <p className="text-sm text-foreground">{booking.notes}</p>
              </div>
            )}
          </div>

          {/* Installments */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-bold text-foreground mb-4">Payment history</h3>
            <div className="space-y-2">
              {bookingPayments.map(p => (
                <div key={p.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${p.status === 'completed' ? 'bg-emerald-500/15 text-emerald-600' : 'bg-amber-500/15 text-amber-600'}`}>
                      {p.status === 'completed' ? <CheckCircle2 className="w-4 h-4" /> : <DollarSign className="w-4 h-4" />}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Installment {p.installmentNumber}/{p.installmentsTotal}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(p.date)} · {p.method}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-foreground">{formatCurrency(p.amount)}</p>
                    <Badge variant={p.status === 'completed' ? 'success' : 'warning'} className="text-[10px]">{p.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-bold text-foreground mb-4">Activity timeline</h3>
            <div className="space-y-4">
              {[
                { Icon: CheckCircle2, title: 'Payment received', desc: `${formatCurrency(booking.paidAmount)} paid`, time: '2 days ago', color: 'emerald' },
                { Icon: FileText, title: 'Documents verified', desc: 'All passport scans approved', time: '1 week ago', color: 'sky' },
                { Icon: MessageSquare, title: 'Note added', desc: booking.notes, time: '2 weeks ago', color: 'amber' },
                { Icon: Calendar, title: 'Booking confirmed', desc: `Deposit received`, time: '3 weeks ago', color: 'violet' },
              ].map((a, i) => (
                <div key={i} className="flex gap-3">
                  <div className={`w-9 h-9 rounded-lg bg-${a.color}-500/15 text-${a.color}-600 flex items-center justify-center flex-shrink-0`}>
                    <a.Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">{a.title}</p>
                    <p className="text-xs text-muted-foreground">{a.desc}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-bold text-foreground mb-4">Pilgrim</h3>
            <div className="space-y-2">
              <p className="font-semibold text-foreground">{booking.pilgrimName}</p>
              <a href={`mailto:${booking.pilgrimEmail}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><Mail className="w-4 h-4" /> {booking.pilgrimEmail}</a>
              <a href={`tel:${booking.pilgrimPhone}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><Phone className="w-4 h-4" /> {booking.pilgrimPhone}</a>
            </div>
            <Link href={`/admin/pilgrims/${booking.pilgrimId}`} className="block mt-4 text-center bg-muted hover:bg-muted/70 py-2 rounded-xl text-sm font-semibold">View pilgrim profile</Link>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-bold text-foreground mb-4">Status update</h3>
            <div className="space-y-2 text-sm">
              <button className="w-full text-left px-3 py-2 bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/15 rounded-xl">Mark as confirmed</button>
              <button className="w-full text-left px-3 py-2 bg-sky-500/10 text-sky-700 hover:bg-sky-500/15 rounded-xl">Set in-progress</button>
              <button className="w-full text-left px-3 py-2 bg-violet-500/10 text-violet-700 hover:bg-violet-500/15 rounded-xl">Mark completed</button>
              <button className="w-full text-left px-3 py-2 bg-rose-500/10 text-rose-700 hover:bg-rose-500/15 rounded-xl">Cancel booking</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function InfoRow({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div>
      <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground mb-1">
        <Icon className="w-3.5 h-3.5" /> {label}
      </div>
      <p className="font-semibold text-foreground">{value}</p>
    </div>
  )
}
