import { Building, Globe, Bell, Mail, CreditCard, Code, Shield } from 'lucide-react'
import { PageTitle } from '@/components/layouts/dashboard-shell'
import { Input, Label, Textarea, Select } from '@/components/ui/input'

const tabs = [
  { Icon: Building, label: 'Company' },
  { Icon: Globe, label: 'SEO' },
  { Icon: Mail, label: 'Email' },
  { Icon: Bell, label: 'Notifications' },
  { Icon: CreditCard, label: 'Payments' },
  { Icon: Code, label: 'Integrations' },
  { Icon: Shield, label: 'Security' },
]

export default function AdminSettingsPage() {
  return (
    <>
      <PageTitle title="Settings" description="Configure your platform's core behavior, branding, and integrations." />

      <div className="grid lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-card border border-border rounded-2xl p-2 sticky top-24">
            {tabs.map((t, i) => (
              <button key={t.label} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${i === 0 ? 'bg-primary text-primary-foreground' : 'text-foreground/70 hover:bg-muted hover:text-foreground'}`}>
                <t.Icon className="w-4 h-4" /> {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3 space-y-6">
          <div className="bg-card border border-border rounded-2xl p-8">
            <h3 className="font-bold text-foreground mb-1">Company information</h3>
            <p className="text-sm text-muted-foreground mb-6">Displayed on invoices, footer, and legal pages.</p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>Company name</Label>
                <Input defaultValue="Sakinah Travels" />
              </div>
              <div>
                <Label>Tagline</Label>
                <Input defaultValue="Hajj & Umrah Platform" />
              </div>
              <div>
                <Label>Email</Label>
                <Input defaultValue="hello@sakinah.travel" />
              </div>
              <div>
                <Label>Phone</Label>
                <Input defaultValue="+1 (800) 555-1234" />
              </div>
              <div className="sm:col-span-2">
                <Label>Address</Label>
                <Textarea rows={2} defaultValue="500 Madison Ave, Floor 42, New York, NY 10022, USA" />
              </div>
              <div>
                <Label>Currency</Label>
                <Select defaultValue="USD">
                  <option value="USD">USD ($)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="EUR">EUR (€)</option>
                </Select>
              </div>
              <div>
                <Label>Time zone</Label>
                <Select defaultValue="America/New_York">
                  <option>America/New_York</option>
                  <option>Europe/London</option>
                  <option>Asia/Riyadh</option>
                </Select>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button className="px-4 py-2 border border-border rounded-xl text-sm font-semibold hover:bg-muted">Cancel</button>
              <button className="bg-foreground text-background px-4 py-2 rounded-xl text-sm font-semibold hover:bg-primary">Save changes</button>
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-8">
            <h3 className="font-bold text-foreground mb-1">SEO defaults</h3>
            <p className="text-sm text-muted-foreground mb-6">Used on pages without specific metadata.</p>
            <div className="space-y-4">
              <div>
                <Label>Default page title</Label>
                <Input defaultValue="Sakinah Travels — Hajj & Umrah Platform" />
              </div>
              <div>
                <Label>Default meta description</Label>
                <Textarea rows={2} defaultValue="Premium Hajj and Umrah packages. Trusted by 50,000+ pilgrims worldwide." />
              </div>
              <div>
                <Label>Open Graph image URL</Label>
                <Input defaultValue="/og-default.png" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
