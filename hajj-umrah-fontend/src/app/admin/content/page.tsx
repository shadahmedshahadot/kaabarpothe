import Link from 'next/link'
import { FileText, Image as ImageIcon, Layout, Globe, Mail, Bell } from 'lucide-react'
import { PageTitle } from '@/components/layouts/dashboard-shell'

const sections = [
  { Icon: Layout, title: 'Homepage sections', desc: 'Hero, features, CTA, testimonials toggle', href: '/admin/content/hero', color: 'amber' },
  { Icon: ImageIcon, title: 'Hero & banners', desc: 'Background video, headlines, CTA copy, stats', href: '/admin/content/hero', color: 'rose' },
  { Icon: FileText, title: 'About page', desc: 'Mission, values, team members, timeline', href: '/admin/content?section=about', color: 'emerald' },
  { Icon: Globe, title: 'Footer content', desc: 'Links, contact info, social handles, addresses', href: '/admin/content?section=footer', color: 'sky' },
  { Icon: Mail, title: 'Email templates', desc: 'Booking confirmation, welcome, reminders', href: '/admin/content?section=emails', color: 'violet' },
  { Icon: Bell, title: 'Notifications', desc: 'In-app and email notification triggers', href: '/admin/content?section=notifications', color: 'orange' },
]

export default function AdminContentPage() {
  return (
    <>
      <PageTitle title="Content management" description="Edit every piece of public-facing copy and media from here." />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map(s => (
          <Link key={s.title} href={s.href} className="bg-card border border-border rounded-2xl p-6 hover:shadow-md hover:border-primary/40 transition-all group">
            <div className={`w-11 h-11 rounded-xl bg-${s.color}-500/10 text-${s.color}-600 flex items-center justify-center mb-4`}>
              <s.Icon className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{s.title}</h3>
            <p className="text-sm text-muted-foreground">{s.desc}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 bg-card border border-border rounded-2xl p-8 text-center">
        <h3 className="font-bold text-foreground mb-2">Looking for blogs or FAQs?</h3>
        <p className="text-muted-foreground mb-5">Blog articles and FAQ entries have dedicated CMS sections.</p>
        <div className="flex gap-3 justify-center">
          <Link href="/admin/content/blogs" className="bg-foreground text-background px-4 py-2 rounded-xl text-sm font-semibold hover:bg-primary">Manage Blogs</Link>
          <Link href="/admin/content/faqs" className="border border-border text-foreground px-4 py-2 rounded-xl text-sm font-semibold hover:bg-muted">Manage FAQs</Link>
        </div>
      </div>
    </>
  )
}
