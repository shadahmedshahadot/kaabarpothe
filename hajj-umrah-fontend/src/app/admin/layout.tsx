'use client'

import { DashboardShell } from '@/components/layouts/dashboard-shell'
import { ADMIN_NAV_GROUPS, ADMIN_USER } from '@/features/admin/constants/navigation'
import { RouteGuard } from '@/features/auth/components/route-guard'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <RouteGuard role="ADMIN">
      <DashboardShell
        title="কাবার পথে"
        subtitle="অ্যাডমিন কন্ট্রোল প্যানেল"
        accent="from-emerald-500 via-teal-500 to-cyan-500"
        navGroups={ADMIN_NAV_GROUPS}
        userName={ADMIN_USER.name}
        userRole={ADMIN_USER.role}
        userAvatar={ADMIN_USER.avatar}
      >
        {children}
      </DashboardShell>
    </RouteGuard>
  )
}
