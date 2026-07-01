'use client'

import { CheckCircle2, FileCheck, Clock, Download, Loader2, AlertCircle } from 'lucide-react'
import { PageTitle } from '@/components/layouts/dashboard-shell'
import { formatDate } from '@/utils/format'
import { useGetBookingsQuery, type VisaStatus, type BookingDto } from '@/redux/fetchres/booking/bookingApi'

const VISA_FLOW: { key: string; title: string; desc: string }[] = [
  { key: 'submitted', title: 'আবেদন জমা', desc: 'ব্যক্তিগত তথ্য ও পাসপোর্ট ডেটা' },
  { key: 'biometric', title: 'বায়োমেট্রিক নিবন্ধন', desc: 'ফিঙ্গারপ্রিন্ট ও ছবি গ্রহণ' },
  { key: 'review', title: 'হজ্জ মন্ত্রণালয়ের পর্যালোচনা', desc: 'সৌদি কর্তৃপক্ষের ডকুমেন্ট পর্যালোচনা' },
  { key: 'issued', title: 'ভিসা ইস্যু', desc: 'পাসপোর্টে ইলেকট্রনিক ভিসা সংযুক্ত' },
  { key: 'printed', title: 'ভিসা মুদ্রিত ও প্রস্তুত', desc: 'সংগ্রহের জন্য মুদ্রিত কপি প্রস্তুত' },
]

const stepDoneIndex = (v: VisaStatus): number => {
  switch (v) {
    case 'PENDING':
      return 0
    case 'SUBMITTED':
      return 2
    case 'APPROVED':
      return 4
    case 'REJECTED':
      return 0
    default:
      return 0
  }
}

const STATUS_TEXT: Record<VisaStatus, { label: string; color: string }> = {
  PENDING: { label: 'অপেক্ষমান', color: 'bg-amber-500/15 text-amber-600' },
  SUBMITTED: { label: 'জমা দেওয়া হয়েছে', color: 'bg-sky-500/15 text-sky-600' },
  APPROVED: { label: 'ভিসা অনুমোদিত', color: 'bg-emerald-500/15 text-emerald-600' },
  REJECTED: { label: 'প্রত্যাখ্যাত', color: 'bg-rose-500/15 text-rose-600' },
}

export default function VisaPage() {
  const { data, isLoading, isError } = useGetBookingsQuery({ limit: 10 })
  const bookings = data?.data ?? []
  const active: BookingDto | undefined = bookings.find(b => b.visaStatus && b.visaStatus !== 'PENDING') || bookings[0]

  const handleDownload = () => {
    if (typeof window !== 'undefined') window.print()
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (isError || !active) {
    return (
      <>
        <PageTitle title="ভিসার অবস্থা" description="আপনার হজ্জ ভিসা আবেদনের ধাপ ট্র্যাক করুন।" />
        <div className="bg-card border border-border rounded-2xl p-8 text-center text-sm text-muted-foreground">
          {isError ? 'ভিসা তথ্য লোড করতে ব্যর্থ।' : 'কোনো সক্রিয় বুকিং পাওয়া যায়নি।'}
        </div>
      </>
    )
  }

  const doneUpto = stepDoneIndex(active.visaStatus)
  const status = STATUS_TEXT[active.visaStatus]
  const StatusIcon =
    active.visaStatus === 'APPROVED' ? CheckCircle2 : active.visaStatus === 'REJECTED' ? AlertCircle : Clock

  return (
    <>
      <PageTitle title="ভিসার অবস্থা" description={`বুকিং ${active.bookingCode} — ভিসা ট্র্যাক করুন।`} />

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-12 h-12 rounded-xl ${status.color} flex items-center justify-center`}>
              <StatusIcon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">বর্তমান অবস্থা</p>
              <p className="text-xl font-bold text-foreground">{status.label}</p>
            </div>
          </div>

          <div className="relative pl-8">
            <div className="absolute left-3 top-2 bottom-2 w-px bg-border" />
            {VISA_FLOW.map((s, i) => {
              const done = i <= doneUpto
              return (
                <div key={s.key} className="relative mb-6 last:mb-0">
                  <div
                    className={`absolute -left-7 w-6 h-6 rounded-full ${
                      done ? 'bg-emerald-500 text-white' : 'bg-card border-2 border-border text-muted-foreground'
                    } flex items-center justify-center text-xs font-bold`}
                  >
                    {done ? '✓' : i + 1}
                  </div>
                  <div className="bg-muted/30 rounded-xl p-4">
                    <p className="font-semibold text-foreground">{s.title}</p>
                    <p className="text-xs text-muted-foreground">{s.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-card border border-border rounded-2xl p-6">
            <FileCheck className="w-8 h-8 text-primary mb-3" />
            <p className="font-bold text-foreground">ভিসা ডকুমেন্ট</p>
            <p className="text-xs text-muted-foreground mb-4">
              {active.visaStatus === 'APPROVED' ? 'আপনার ভিসা ডাউনলোড বা প্রিন্ট করুন' : 'ভিসা অনুমোদিত হলে ডাউনলোড উপলব্ধ হবে'}
            </p>
            <button
              type="button"
              onClick={handleDownload}
              disabled={active.visaStatus !== 'APPROVED'}
              className="w-full bg-foreground text-background py-2.5 rounded-xl font-semibold text-sm inline-flex items-center justify-center gap-2 hover:bg-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="w-4 h-4" /> ভিসা PDF ডাউনলোড
            </button>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-bold text-foreground mb-3">ভিসা বিবরণ</h3>
            <div className="space-y-2 text-sm">
              <Row label="ধরন" value={active.packageType === 'HAJJ' ? 'হজ্জ' : 'উমরাহ'} />
              <Row label="বুকিং" value={active.bookingCode} />
              <Row label="যাত্রা" value={formatDate(active.departureDate)} />
              <Row label="ফেরা" value={formatDate(active.returnDate)} />
              {active.pilgrimPassportNo && <Row label="পাসপোর্ট" value={active.pilgrimPassportNo} />}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-semibold text-foreground">{value}</span>
    </div>
  )
}
