import Link from 'next/link'
import { ArrowLeft, Save, Upload, Plus, X } from 'lucide-react'
import { PageTitle } from '@/components/layouts/dashboard-shell'
import { Input, Textarea, Select, Label } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

export default function NewPackagePage() {
  return (
    <>
      <Link href="/admin/packages" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to packages
      </Link>

      <PageTitle
        title="Create new package"
        description="Build a Hajj or Umrah package with full details, itinerary, and pricing."
        action={
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-border rounded-xl text-sm font-semibold hover:bg-muted">Save draft</button>
            <button className="bg-foreground text-background px-4 py-2 rounded-xl text-sm font-semibold inline-flex items-center gap-2 hover:bg-primary">
              <Save className="w-4 h-4" /> Publish
            </button>
          </div>
        }
      />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Basic info */}
          <Card title="Basic information">
            <div>
              <Label>Package name</Label>
              <Input placeholder="Premium Hajj 2026" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>Type</Label>
                <Select defaultValue="umrah">
                  <option value="umrah">Umrah</option>
                  <option value="hajj">Hajj</option>
                </Select>
              </div>
              <div>
                <Label>Tier</Label>
                <Select defaultValue="standard">
                  <option value="budget">Budget</option>
                  <option value="economy">Economy</option>
                  <option value="standard">Standard</option>
                  <option value="premium">Premium</option>
                  <option value="vip">VIP / Luxury</option>
                </Select>
              </div>
            </div>
            <div>
              <Label>Short description</Label>
              <Input placeholder="One-line description shown in listings…" />
            </div>
            <div>
              <Label>Detailed description</Label>
              <Textarea rows={6} placeholder="Full package description…" />
            </div>
          </Card>

          {/* Dates and duration */}
          <Card title="Dates & duration">
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <Label>Duration (days)</Label>
                <Input type="number" placeholder="14" />
              </div>
              <div>
                <Label>Departure date</Label>
                <Input type="date" />
              </div>
              <div>
                <Label>Return date</Label>
                <Input type="date" />
              </div>
            </div>
          </Card>

          {/* Pricing */}
          <Card title="Pricing">
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <Label>Base price (USD)</Label>
                <Input type="number" placeholder="2999" />
              </div>
              <div>
                <Label>Discount (USD)</Label>
                <Input type="number" placeholder="0" />
              </div>
              <div>
                <Label>Total seats</Label>
                <Input type="number" placeholder="30" />
              </div>
            </div>
          </Card>

          {/* Hotels */}
          <Card title="Hotels">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Makkah hotel</p>
                <Input placeholder="Hotel name" />
                <Input placeholder="Distance from Haram" />
                <Select defaultValue="5"><option>3 stars</option><option>4 stars</option><option>5 stars</option></Select>
              </div>
              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Madinah hotel</p>
                <Input placeholder="Hotel name" />
                <Input placeholder="Distance from Masjid Nabawi" />
                <Select defaultValue="5"><option>3 stars</option><option>4 stars</option><option>5 stars</option></Select>
              </div>
            </div>
          </Card>

          {/* Itinerary */}
          <Card title="Itinerary">
            <p className="text-xs text-muted-foreground mb-4">Add day-by-day breakdown</p>
            <div className="space-y-3">
              {[1, 2, 3].map(d => (
                <div key={d} className="border border-border rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center">{d}</div>
                    <Input placeholder={`Day ${d} title`} className="flex-1" />
                    <button className="p-2 text-muted-foreground hover:text-rose-500"><X className="w-4 h-4" /></button>
                  </div>
                  <Textarea rows={2} placeholder="Day description…" />
                </div>
              ))}
              <button className="w-full py-3 border-2 border-dashed border-border rounded-xl text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors inline-flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" /> Add day
              </button>
            </div>
          </Card>

          {/* Inclusions */}
          <Card title="Inclusions & exclusions">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <Label>What's included</Label>
                <Textarea rows={6} placeholder="One per line…" />
              </div>
              <div>
                <Label>What's not included</Label>
                <Textarea rows={6} placeholder="One per line…" />
              </div>
            </div>
          </Card>

          {/* FAQs */}
          <Card title="Package FAQs">
            <div className="space-y-3">
              <div className="border border-border rounded-xl p-4">
                <Input placeholder="Question" className="mb-2" />
                <Textarea rows={2} placeholder="Answer" />
              </div>
              <button className="w-full py-3 border-2 border-dashed border-border rounded-xl text-sm text-muted-foreground hover:border-primary hover:text-primary inline-flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" /> Add FAQ
              </button>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <Card title="Status">
            <Select defaultValue="published">
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </Select>
            <Select defaultValue="available" className="mt-3">
              <option value="available">Available</option>
              <option value="limited">Limited seats</option>
              <option value="soldout">Sold out</option>
            </Select>
            <label className="flex items-center gap-2 mt-4 text-sm">
              <input type="checkbox" className="rounded border-border" /> Mark as featured
            </label>
          </Card>

          <Card title="Cover image">
            <div className="aspect-[4/3] rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-primary hover:text-primary cursor-pointer transition-colors">
              <Upload className="w-8 h-8" />
              <p className="text-xs">Click to upload cover</p>
            </div>
          </Card>

          <Card title="Gallery">
            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-square rounded-lg border-2 border-dashed border-border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary cursor-pointer">
                  <Plus className="w-4 h-4" />
                </div>
              ))}
            </div>
          </Card>

          <Card title="Highlights">
            <Input placeholder="Add highlight…" className="mb-2" />
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">5-star hotels</Badge>
              <Badge variant="outline">Scholar guide</Badge>
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <h3 className="font-bold text-foreground mb-4">{title}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  )
}
