import { LayoutDashboard, UserCircle, Calendar, CreditCard, ClipboardList, FileCheck, Plane, Hotel, FileText, Receipt, Bell } from 'lucide-react'
import type { NavGroup } from '@/components/layouts/dashboard-shell'
import { ROUTES } from '@/constants'

export const PILGRIM_NAV_GROUPS: NavGroup[] = [
  { label: 'Overview', items: [{ label: 'Dashboard', href: ROUTES.pilgrim.root, Icon: LayoutDashboard }] },
  {
    label: 'Journey',
    items: [
      { label: 'My Bookings', href: ROUTES.pilgrim.bookings, Icon: Calendar },
      { label: 'Visa Status', href: ROUTES.pilgrim.visa, Icon: FileCheck },
      { label: 'Flight Details', href: ROUTES.pilgrim.flight, Icon: Plane },
      { label: 'Hotel Details', href: ROUTES.pilgrim.hotel, Icon: Hotel },
    ],
  },
  {
    label: 'Finance',
    items: [
      { label: 'Payments', href: ROUTES.pilgrim.payments, Icon: CreditCard },
      { label: 'Installments', href: ROUTES.pilgrim.installments, Icon: ClipboardList },
      { label: 'Invoices', href: ROUTES.pilgrim.invoices, Icon: Receipt },
    ],
  },
  {
    label: 'Account',
    items: [
      { label: 'Profile', href: ROUTES.pilgrim.profile, Icon: UserCircle },
      { label: 'Documents', href: ROUTES.pilgrim.documents, Icon: FileText },
      { label: 'Notifications', href: ROUTES.pilgrim.notifications, Icon: Bell, badge: 3 },
    ],
  },
]

export const PILGRIM_USER = {
  name: 'Mohammad Anwar',
  role: 'Premium Hajj 2026 · Confirmed',
  avatar: 'from-blue-400 to-indigo-500',
} as const
