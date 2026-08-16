import { Utensils, Bus, CheckCircle2, ShieldCheck } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { Package } from '@/data/packages'
import { InfoBox } from './info-box'

export function OverviewTab({ pkg }: { pkg: Package }) {
  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-foreground mb-4">এই প্যাকেজ সম্পর্কে</h2>
        <div
          className="package-rich-text text-muted-foreground leading-relaxed mb-6 space-y-3 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_a]:text-primary [&_a]:underline [&_h1]:text-xl [&_h1]:font-bold [&_h1]:text-foreground [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-foreground [&_h3]:font-semibold [&_h3]:text-foreground [&_strong]:text-foreground [&_img]:rounded-lg [&_img]:my-3"
          dangerouslySetInnerHTML={{ __html: pkg.description || '' }}
        />

        <h3 className="font-bold text-foreground mb-3">হাইলাইট</h3>
        <div className="grid grid-cols-2 gap-2">
          {pkg.highlights.map(h => (
            <div key={h} className="flex items-center gap-2 text-sm text-foreground/80">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" /> {h}
            </div>
          ))}
        </div>

        <h3 className="font-bold text-foreground mt-8 mb-3">অন্তর্ভুক্ত যিয়ারত</h3>
        <div className="flex flex-wrap gap-2">
          {pkg.ziyarah.map(z => (
            <Badge key={z} variant="outline">{z}</Badge>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <InfoBox Icon={Utensils} title="খাবার" lines={[pkg.meals]} />
        <InfoBox Icon={Bus} title="পরিবহন" lines={[pkg.transport]} />
        <InfoBox Icon={ShieldCheck} title="ভিসা" lines={[pkg.visa]} />
      </div>
    </div>
  )
}
