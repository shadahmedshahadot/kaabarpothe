'use client'

import { Bell, FileCheck, Plane, CreditCard, Calendar, Loader2, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { PageTitle } from '@/components/layouts/dashboard-shell'
import { formatDate } from '@/utils/format'
import {
  useGetNotificationsQuery,
  useMarkAllNotificationsReadMutation,
  useMarkNotificationReadMutation,
  useDeleteNotificationMutation,
  type NotificationType,
} from '@/redux/fetchres/notification/notificationApi'

const iconFor = (type: NotificationType) => {
  switch (type) {
    case 'VISA_UPDATE':
    case 'DOCUMENTS_UPLOADED':
    case 'DOCUMENTS_REQUESTED':
      return { Icon: FileCheck, color: 'emerald' as const }
    case 'FLIGHT_ASSIGNED':
      return { Icon: Plane, color: 'sky' as const }
    case 'HOTEL_ASSIGNED':
    case 'TRANSPORTATION_ASSIGNED':
      return { Icon: Calendar, color: 'amber' as const }
    case 'PAYMENT_APPROVED':
      return { Icon: CreditCard, color: 'violet' as const }
    default:
      return { Icon: Bell, color: 'rose' as const }
  }
}

const relativeTime = (iso: string): string => {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins} মিনিট আগে`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs} ঘণ্টা আগে`
  const days = Math.floor(hrs / 24)
  if (days < 7) return `${days} দিন আগে`
  return formatDate(iso)
}

export default function PilgrimNotificationsPage() {
  const { data, isLoading, isError, refetch } = useGetNotificationsQuery()
  const [markRead] = useMarkNotificationReadMutation()
  const [markAllRead, { isLoading: isMarkingAll }] = useMarkAllNotificationsReadMutation()
  const [deleteNotif] = useDeleteNotificationMutation()

  const items = data?.data ?? []

  const onMarkAll = async () => {
    try {
      await markAllRead().unwrap()
      toast.success('সব বিজ্ঞপ্তি পঠিত হিসেবে চিহ্নিত')
      refetch()
    } catch (err: any) {
      toast.error(err?.data?.message || 'ব্যর্থ হয়েছে')
    }
  }

  const onClick = async (id: string, read: boolean) => {
    if (read) return
    try {
      await markRead(id).unwrap()
    } catch {}
  }

  const onDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    if (!confirm('বিজ্ঞপ্তি মুছবেন?')) return
    try {
      await deleteNotif(id).unwrap()
      refetch()
    } catch (err: any) {
      toast.error(err?.data?.message || 'ব্যর্থ')
    }
  }

  return (
    <>
      <PageTitle
        title="বিজ্ঞপ্তি"
        description="আপনার বুকিং, পেমেন্ট ও যাত্রা সংক্রান্ত আপডেট।"
        action={
          <button
            type="button"
            onClick={onMarkAll}
            disabled={isMarkingAll || items.every(i => i.read)}
            className="text-sm font-semibold text-primary hover:underline disabled:opacity-40 disabled:no-underline"
          >
            {isMarkingAll ? 'চলছে…' : 'সব পঠিত হিসেবে চিহ্নিত করুন'}
          </button>
        }
      />

      {isLoading && (
        <div className="flex justify-center py-16">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      )}

      {isError && (
        <div className="bg-card border border-border rounded-2xl p-8 text-center text-sm text-rose-500">
          বিজ্ঞপ্তি লোড করতে ব্যর্থ হয়েছে।
        </div>
      )}

      {!isLoading && items.length === 0 && (
        <div className="bg-card border border-border rounded-2xl p-8 text-center text-sm text-muted-foreground">
          কোনো বিজ্ঞপ্তি নেই।
        </div>
      )}

      {items.length > 0 && (
        <div className="bg-card border border-border rounded-2xl divide-y divide-border">
          {items.map(n => {
            const { Icon, color } = iconFor(n.type)
            return (
              <div
                key={n.id}
                onClick={() => onClick(n.id, n.read)}
                className={`flex items-start gap-4 p-5 hover:bg-muted/30 transition-colors cursor-pointer ${!n.read ? 'bg-primary/5' : ''}`}
              >
                <div className={`w-10 h-10 rounded-xl bg-${color}-500/15 text-${color}-600 flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground">{n.title}</p>
                  <p className="text-sm text-muted-foreground">{n.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{relativeTime(n.createdAt)}</p>
                </div>
                {!n.read && <span className="w-2 h-2 rounded-full bg-primary mt-2" />}
                <button
                  type="button"
                  onClick={e => onDelete(e, n.id)}
                  className="text-muted-foreground hover:text-rose-500 p-1 -mr-1"
                  aria-label="মুছুন"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}
