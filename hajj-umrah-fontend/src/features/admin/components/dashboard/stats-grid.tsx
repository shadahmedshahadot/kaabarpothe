import { DollarSign, Users, Package as PackageIcon, Calendar } from 'lucide-react'
import { StatCard } from '@/components/ui/stat-card'
import { formatCurrency } from '@/utils/format'

interface Props {
  totalRevenue: number
  bookingsCount: number
  totalPilgrims: number
  activePackages: number
}

export function AdminStatsGrid({ totalRevenue, bookingsCount, totalPilgrims, activePackages }: Props) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StatCard label="Total revenue" value={formatCurrency(totalRevenue)} delta={{ value: '24%', positive: true }} icon={<DollarSign className="w-5 h-5" />} index={0} />
      <StatCard label="Bookings" value={bookingsCount} delta={{ value: '18%', positive: true }} icon={<Calendar className="w-5 h-5" />} index={1} />
      <StatCard label="Pilgrims" value={totalPilgrims} delta={{ value: '12%', positive: true }} icon={<Users className="w-5 h-5" />} index={2} />
      <StatCard label="Active packages" value={activePackages} delta={{ value: '2', positive: true }} icon={<PackageIcon className="w-5 h-5" />} index={3} />
    </div>
  )
}
