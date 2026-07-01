'use client'

import { CheckCircle2, Clock, Loader2, AlertCircle } from 'lucide-react'
import { PageTitle } from '@/components/layouts/dashboard-shell'
import { Badge } from '@/components/ui/badge'
import { formatCurrency, formatDate } from '@/utils/format'
import { useGetPaymentsQuery } from '@/redux/fetchres/payment/paymentApi'

export default function InstallmentsPage() {
  const { data, isLoading, isError } = useGetPaymentsQuery()
  const payments = data?.data ?? []
  const plan = [...payments].sort((a, b) => {
    const ai = a.installmentNumber ?? 0
    const bi = b.installmentNumber ?? 0
    if (ai !== bi) return ai - bi
    return new Date(a.date).getTime() - new Date(b.date).getTime()
  })

  const total = plan.reduce((s, p) => s + p.amount, 0)
  const paid = plan.filter(p => p.status === 'COMPLETED').reduce((s, p) => s + p.amount, 0)
  const pct = total > 0 ? Math.min(100, (paid / total) * 100) : 0

  return (
    <>
      <PageTitle title="কিস্তি পরিকল্পনা" description="আপনার নির্ধারিত পেমেন্ট।" />

      {isLoading && (
        <div className="flex justify-center py-16">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      )}

      {isError && (
        <div className="bg-card border border-border rounded-2xl p-8 text-center text-sm text-rose-500">
          পেমেন্ট তথ্য লোড করতে ব্যর্থ।
        </div>
      )}

      {!isLoading && !isError && plan.length === 0 && (
        <div className="bg-card border border-border rounded-2xl p-8 text-center text-sm text-muted-foreground">
          কোনো কিস্তি নেই।
        </div>
      )}

      {plan.length > 0 && (
        <>
          <div className="bg-card border border-border rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-foreground">সামগ্রিক অগ্রগতি</p>
              <p className="text-sm text-muted-foreground">
                {formatCurrency(paid)} / {formatCurrency(total)}
              </p>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600"
                style={{ width: `${pct}%` }}
              />
            </div>
            <p className="text-xs text-emerald-700 mt-2 font-semibold">
              {Math.round(pct)}% পরিশোধিত
            </p>
          </div>

          <div className="space-y-3">
            {plan.map((p, idx) => {
              const isPaid = p.status === 'COMPLETED'
              const isFailed = p.status === 'FAILED'
              return (
                <div key={p.id} className="bg-card border border-border rounded-2xl p-5 flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      isPaid
                        ? 'bg-emerald-500 text-white'
                        : isFailed
                        ? 'bg-rose-500 text-white'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {isPaid ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : isFailed ? (
                      <AlertCircle className="w-6 h-6" />
                    ) : (
                      <Clock className="w-6 h-6" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">
                      কিস্তি {p.installmentNumber ?? idx + 1} / {plan.length}
                    </p>
                    <p className="text-xs text-muted-foreground">নির্ধারিত তারিখ {formatDate(p.date)}</p>
                    {p.transactionId && (
                      <p className="text-[10px] text-muted-foreground mt-0.5">TXN {p.transactionId}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-foreground text-lg">{formatCurrency(p.amount)}</p>
                    <Badge
                      variant={isPaid ? 'success' : isFailed ? 'danger' : 'warning'}
                      className="text-[10px]"
                    >
                      {p.status}
                    </Badge>
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}
    </>
  )
}
