import { Bell, FileCheck, Plane, CreditCard, Calendar } from 'lucide-react'
import { PageTitle } from '@/components/layouts/dashboard-shell'

const items = [
  { Icon: FileCheck, color: 'emerald', title: 'Your visa is ready', desc: 'Download your Hajj 2026 visa from the documents section.', time: '2 hours ago', unread: true },
  { Icon: Calendar, color: 'amber', title: 'Pre-departure orientation', desc: 'Zoom session on May 10 at 7pm EST. Calendar invite sent.', time: '1 day ago', unread: true },
  { Icon: Plane, color: 'sky', title: 'Flight check-in opens soon', desc: 'Online check-in opens 48h before your flight on Emirates.', time: '3 days ago', unread: true },
  { Icon: CreditCard, color: 'violet', title: 'Final payment received', desc: 'Your installment of $6,748 has been processed successfully.', time: '1 week ago', unread: false },
  { Icon: Bell, color: 'rose', title: 'Group leader assigned', desc: 'Sheikh Ahmad bin Khalil will be your group leader.', time: '2 weeks ago', unread: false },
]

export default function PilgrimNotificationsPage() {
  return (
    <>
      <PageTitle title="Notifications" description="Updates about your bookings, payments, and journey." action={<button className="text-sm font-semibold text-primary hover:underline">Mark all read</button>} />

      <div className="bg-card border border-border rounded-2xl divide-y divide-border">
        {items.map((n, i) => (
          <div key={i} className={`flex items-start gap-4 p-5 hover:bg-muted/30 transition-colors ${n.unread ? 'bg-primary/5' : ''}`}>
            <div className={`w-10 h-10 rounded-xl bg-${n.color}-500/15 text-${n.color}-600 flex items-center justify-center flex-shrink-0`}>
              <n.Icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground">{n.title}</p>
              <p className="text-sm text-muted-foreground">{n.desc}</p>
              <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
            </div>
            {n.unread && <span className="w-2 h-2 rounded-full bg-primary mt-2" />}
          </div>
        ))}
      </div>
    </>
  )
}
