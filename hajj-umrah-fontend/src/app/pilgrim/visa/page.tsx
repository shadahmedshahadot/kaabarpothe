import { CheckCircle2, FileCheck, Clock, Download } from 'lucide-react'
import { PageTitle } from '@/components/layouts/dashboard-shell'
import { Badge } from '@/components/ui/badge'

const steps = [
  { title: 'Application submitted', desc: 'Personal info and passport data', date: '2025-11-22', done: true },
  { title: 'Biometric registration', desc: 'Fingerprint and photo capture', date: '2025-12-01', done: true },
  { title: 'Ministry of Hajj review', desc: 'Documentation review by Saudi authorities', date: '2025-12-15', done: true },
  { title: 'Visa issued', desc: 'Electronic visa stamped to passport', date: '2026-01-04', done: true },
  { title: 'Visa printed & ready', desc: 'Printed copy ready at our office for collection', date: '2026-04-15', done: false },
]

export default function VisaPage() {
  return (
    <>
      <PageTitle title="Visa status" description="Track every step of your Hajj visa application." />

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/15 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Current status</p>
              <p className="text-xl font-bold text-emerald-700 dark:text-emerald-300">Visa Approved</p>
            </div>
          </div>

          <div className="relative pl-8">
            <div className="absolute left-3 top-2 bottom-2 w-px bg-border" />
            {steps.map((s, i) => (
              <div key={i} className="relative mb-6 last:mb-0">
                <div className={`absolute -left-7 w-6 h-6 rounded-full ${s.done ? 'bg-emerald-500 text-white' : 'bg-card border-2 border-border text-muted-foreground'} flex items-center justify-center text-xs font-bold`}>
                  {s.done ? '✓' : i + 1}
                </div>
                <div className="bg-muted/30 rounded-xl p-4">
                  <p className="font-semibold text-foreground">{s.title}</p>
                  <p className="text-xs text-muted-foreground">{s.desc}</p>
                  <p className="text-xs text-muted-foreground mt-1">{s.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-card border border-border rounded-2xl p-6">
            <FileCheck className="w-8 h-8 text-primary mb-3" />
            <p className="font-bold text-foreground">Visa documents</p>
            <p className="text-xs text-muted-foreground mb-4">Download or view your visa</p>
            <button className="w-full bg-foreground text-background py-2.5 rounded-xl font-semibold text-sm inline-flex items-center justify-center gap-2 hover:bg-primary"><Download className="w-4 h-4" /> Download visa PDF</button>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-bold text-foreground mb-3">Visa details</h3>
            <div className="space-y-2 text-sm">
              <Row label="Type" value="Hajj 2026" />
              <Row label="Number" value="HVZ-2026-1234567" />
              <Row label="Issued" value="Jan 4, 2026" />
              <Row label="Valid until" value="Jun 20, 2026" />
              <Row label="Entry type" value="Single" />
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
