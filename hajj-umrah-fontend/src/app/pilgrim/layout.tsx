'use client'

import { DashboardShell } from '@/components/layouts/dashboard-shell'
import { PILGRIM_NAV_GROUPS, PILGRIM_USER } from '@/features/pilgrim/constants/navigation'
import { RouteGuard } from '@/features/auth/components/route-guard'
import { useGetMeQuery } from '@/redux/fetchres/user/userApi'

export default function PilgrimLayout({ children }: { children: React.ReactNode }) {
  const { data } = useGetMeQuery()
  const me = data?.data
  const displayName = me?.full_name?.trim() || me?.email || PILGRIM_USER.name
  return (
    <RouteGuard role="USER">
      <DashboardShell
        title="আমার যাত্রা"
        subtitle="হাজী পোর্টাল"
        accent="from-amber-400 to-orange-500"
        navGroups={PILGRIM_NAV_GROUPS}
        userName={displayName}
        userRole={PILGRIM_USER.role}
        userAvatar={PILGRIM_USER.avatar}
      >
        {children}
      </DashboardShell>
    </RouteGuard>
  )
}
