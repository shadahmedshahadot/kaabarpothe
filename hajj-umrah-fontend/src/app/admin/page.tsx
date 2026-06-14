import Link from 'next/link'
import { Package as PackageIcon, CheckCircle2, Clock, MessageSquare, Calendar, TrendingUp } from 'lucide-react'
import { PageTitle } from '@/components/layouts/dashboard-shell'
import { formatCurrency } from '@/utils/format'
import { bookings } from '@/data/bookings'
import { pilgrims } from '@/data/pilgrims'
import { inquiries } from '@/data/inquiries'
import { packages } from '@/data/packages'
import { ROUTES } from '@/constants'
import { AdminStatsGrid } from '@/features/admin/components/dashboard/stats-grid'
import { RevenueChart } from '@/features/admin/components/dashboard/revenue-chart'
import { TierDistribution } from '@/features/admin/components/dashboard/tier-distribution'
import { MonthlyBookingsChart } from '@/features/admin/components/dashboard/monthly-bookings'
import { QuickStats } from '@/features/admin/components/dashboard/quick-stats'
import { RecentBookings } from '@/features/admin/components/dashboard/recent-bookings'
import { RecentActivity, type ActivityItem } from '@/features/admin/components/dashboard/recent-activity'

export default function AdminDashboardPage() {
  const totalRevenue = bookings.reduce((s, b) => s + b.paidAmount, 0)
  const pendingRevenue = bookings.reduce((s, b) => s + (b.totalAmount - b.paidAmount), 0)
  const totalPilgrims = bookings.reduce((s, b) => s + b.pilgrimsCount, 0)
  const activePackages = packages.filter(p => p.status === 'published').length

  const quickStats = [
    { label: 'Pending revenue', value: formatCurrency(pendingRevenue), color: 'amber' },
    { label: 'Active packages', value: activePackages.toString(), color: 'emerald' },
    { label: 'Open inquiries', value: inquiries.filter(i => i.status === 'new').length.toString(), color: 'sky' },
    { label: 'Pending visas', value: bookings.filter(b => b.visaStatus === 'pending' || b.visaStatus === 'submitted').length.toString(), color: 'rose' },
  ]

  const activity: ActivityItem[] = [
    { Icon: CheckCircle2, color: 'emerald', text: `${pilgrims[0].fullName} completed payment`, time: '2026-06-12T11:00:00' },
    { Icon: MessageSquare, color: 'sky', text: `New inquiry from ${inquiries[0].name}`, time: '2026-06-12T08:30:00' },
    { Icon: Calendar, color: 'amber', text: `New booking ${bookings[0].bookingCode}`, time: '2026-06-11T14:20:00' },
    { Icon: TrendingUp, color: 'violet', text: `Premium Hajj 2026 reached 90% capacity`, time: '2026-06-11T10:00:00' },
    { Icon: Clock, color: 'rose', text: `Visa pending for ${bookings.find(b => b.visaStatus === 'pending')?.pilgrimName ?? 'pilgrim'}`, time: '2026-06-10T16:00:00' },
  ]

  return (
    <>
      <PageTitle
        title="Welcome back, Imam Yusuf"
        description="Here's what's happening at Sakinah today."
        action={
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-border rounded-xl text-sm font-semibold hover:bg-muted transition-colors">Export</button>
            <Link href={`${ROUTES.admin.packages}/new`} className="bg-foreground text-background px-4 py-2 rounded-xl text-sm font-semibold inline-flex items-center gap-2 hover:bg-primary transition-colors">
              <PackageIcon className="w-4 h-4" /> New Package
            </Link>
          </div>
        }
      />

      <AdminStatsGrid totalRevenue={totalRevenue} bookingsCount={bookings.length} totalPilgrims={totalPilgrims} activePackages={activePackages} />

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <RevenueChart />
        <TierDistribution />
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <MonthlyBookingsChart />
        <QuickStats stats={quickStats} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <RecentBookings bookings={bookings.slice(0, 5)} />
        <RecentActivity items={activity} />
      </div>
    </>
  )
}
