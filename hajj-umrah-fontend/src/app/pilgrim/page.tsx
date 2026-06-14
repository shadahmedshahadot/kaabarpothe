import Link from 'next/link'
import { Calendar, Plane, Hotel, FileCheck, CreditCard, Download, MessageCircle, MapPin, ArrowRight } from 'lucide-react'
import { PageTitle } from '@/components/layouts/dashboard-shell'
import { Badge } from '@/components/ui/badge'
import { formatCurrency, formatDate } from '@/utils/format'

const booking = {
  bookingCode: 'HJ-2026-1001',
  packageName: 'Premium Hajj 2026',
  departureDate: '2026-05-19',
  returnDate: '2026-06-13',
  totalAmount: 26998,
  paidAmount: 26998,
  daysToGo: Math.max(0, Math.ceil((new Date('2026-05-19').getTime() - Date.now()) / 86400000)),
}

export default function PilgrimDashboardPage() {
  return (
    <>
      <PageTitle title="As-salamu alaykum, Mohammad" description="Your sacred journey is approaching, in sha Allah." />

      {/* Hero */}
      <div className="relative bg-gradient-to-br from-amber-400 via-orange-500 to-rose-500 rounded-3xl p-8 mb-8 text-white overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-15" viewBox="0 0 400 200" preserveAspectRatio="none">
          <pattern id="ph-p" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M15 0 L30 15 L15 30 L0 15 Z" fill="none" stroke="white" strokeWidth="0.8" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#ph-p)" />
        </svg>

        <div className="relative grid md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2">
            <p className="text-xs uppercase tracking-[0.25em] opacity-80 mb-2">{booking.bookingCode}</p>
            <h2 className="text-3xl font-bold mb-3">{booking.packageName}</h2>
            <div className="flex items-center gap-4 text-sm opacity-90 flex-wrap">
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {formatDate(booking.departureDate)} → {formatDate(booking.returnDate)}</span>
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> Makkah & Madinah</span>
            </div>
          </div>
          <div className="text-center md:text-right">
            <p className="text-6xl font-bold">{booking.daysToGo}</p>
            <p className="text-xs uppercase tracking-wider opacity-80 mt-1">Days to go</p>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Action Icon={Plane} title="Flight" desc="Direct from JFK" color="from-sky-400 to-blue-500" href="/pilgrim/flight" />
        <Action Icon={Hotel} title="Hotel" desc="Conrad Makkah" color="from-amber-400 to-orange-500" href="/pilgrim/hotel" />
        <Action Icon={FileCheck} title="Visa" desc="Approved ✓" color="from-emerald-400 to-teal-500" href="/pilgrim/visa" />
        <Action Icon={CreditCard} title="Payment" desc="Fully paid ✓" color="from-violet-400 to-purple-500" href="/pilgrim/payments" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Checklist */}
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6">
          <h3 className="font-bold text-foreground mb-4">Pre-departure checklist</h3>
          <div className="space-y-3">
            {[
              { label: 'Submit passport scan', done: true },
              { label: 'Upload passport photos', done: true },
              { label: 'Meningitis (ACWY) vaccination', done: true },
              { label: 'Pay deposit (25%)', done: true },
              { label: 'Pay remaining balance', done: true },
              { label: 'Confirm flight seats', done: false },
              { label: 'Attend orientation Zoom (May 10)', done: false },
              { label: 'Pack Ihram, sandals, prayer kit', done: false },
              { label: 'Inform family & employer of travel', done: false },
            ].map((step, i) => (
              <div key={i} className={`flex items-center gap-3 p-3 rounded-xl ${step.done ? 'bg-emerald-500/5' : 'bg-muted/30'}`}>
                <div className={`w-6 h-6 rounded-full ${step.done ? 'bg-emerald-500 text-white' : 'border-2 border-border'} flex items-center justify-center text-xs font-bold`}>
                  {step.done ? '✓' : ''}
                </div>
                <span className={`text-sm flex-1 ${step.done ? 'text-foreground' : 'text-foreground/80'}`}>{step.label}</span>
                {step.done && <Badge variant="success" className="text-[10px]">Done</Badge>}
              </div>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-primary to-amber-600 text-primary-foreground rounded-2xl p-6">
            <h3 className="font-bold mb-2">Need help?</h3>
            <p className="text-sm opacity-90 mb-4">Our 24/7 support team is here for any question about your journey.</p>
            <Link href="/contact" className="w-full bg-white/15 hover:bg-white/25 backdrop-blur py-2.5 rounded-xl font-semibold text-sm inline-flex items-center justify-center gap-2 transition-colors">
              <MessageCircle className="w-4 h-4" /> Contact support
            </Link>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-bold text-foreground mb-4">Documents</h3>
            <Link href="/pilgrim/documents" className="block py-2 text-sm text-primary hover:underline">View all documents →</Link>
            <Link href="/pilgrim/invoices" className="block py-2 text-sm text-primary hover:underline">Download invoices →</Link>
            <button className="w-full mt-2 border border-border py-2.5 rounded-xl text-sm font-semibold hover:bg-muted inline-flex items-center justify-center gap-2"><Download className="w-4 h-4" /> Itinerary PDF</button>
          </div>
        </div>
      </div>
    </>
  )
}

function Action({ Icon, title, desc, color, href }: { Icon: any; title: string; desc: string; color: string; href: string }) {
  return (
    <Link href={href} className="bg-card border border-border rounded-2xl p-5 hover:shadow-md hover:border-primary/40 transition-all group">
      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${color} text-white flex items-center justify-center mb-3 shadow group-hover:scale-105 transition-transform`}>
        <Icon className="w-5 h-5" />
      </div>
      <p className="font-bold text-foreground">{title}</p>
      <p className="text-xs text-muted-foreground flex items-center gap-1">{desc} <ArrowRight className="w-3 h-3 ml-auto transition-transform group-hover:translate-x-0.5" /></p>
    </Link>
  )
}
