import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Heart, Target, Users, Sparkles, Globe, Shield, ArrowRight, BadgeCheck } from 'lucide-react'
import { PageShell, PageHero } from '@/components/layouts/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { AnimatedCounter } from '@/components/ui/animated-counter'
import { StaggerContainer, StaggerItem } from '@/components/ui/scroll-reveal'
import { IMG } from '@/data/images'

export const metadata: Metadata = {
  title: 'About Us | Sakinah Travels',
  description: 'Our mission is to make Hajj and Umrah accessible, transparent, and spiritually meaningful for every Muslim worldwide.',
}

const milestones = [
  { year: '2015', title: 'Founded in New York', desc: 'Three brothers, all former pilgrims, decided to fix a broken industry.' },
  { year: '2017', title: 'Saudi Ministry license', desc: 'Became one of 30 fully licensed operators in North America.' },
  { year: '2019', title: '10,000 pilgrims served', desc: 'Reached a milestone of 10,000 successful pilgrimages.' },
  { year: '2021', title: 'Launched scholar network', desc: 'Onboarded 30+ Al-Azhar and Madinah University scholars as group leaders.' },
  { year: '2023', title: '5-star hotel partnerships', desc: 'Direct contracts with Raffles, Conrad, Fairmont, and Hilton.' },
  { year: '2026', title: '50,000+ pilgrims', desc: 'Serving Muslim communities in 30+ countries.' },
]

const values = [
  { Icon: Heart, title: 'Spiritual Focus', desc: 'Every decision filtered through one question: does this help our pilgrims worship better?' },
  { Icon: Shield, title: 'Radical Transparency', desc: 'Full price breakdown, zero hidden fees, and complete refund policies published openly.' },
  { Icon: Users, title: 'Scholar Oversight', desc: 'Our scholar review board approves every itinerary, ensuring fiqh-correctness.' },
  { Icon: Globe, title: 'Global Care, Local Touch', desc: 'Multilingual scholar team matched to your background, customs, and worship style.' },
]

const team = [
  { name: 'Imam Yusuf Khalil', role: 'Founder & Scholar', bio: 'Al-Azhar graduate. 25 years guiding Hajj groups.', avatar: 'from-amber-400 to-orange-500' },
  { name: 'Sister Amina Khalil', role: 'Co-Founder & Operations', bio: 'Former NYU MBA. Mother of three.', avatar: 'from-rose-400 to-pink-500' },
  { name: 'Brother Hamza Khalil', role: 'Co-Founder & Technology', bio: 'Stanford CS. Built our pilgrim app.', avatar: 'from-emerald-400 to-teal-500' },
  { name: 'Sheikh Tariq Mahmoud', role: 'Head of Scholar Board', bio: 'Madinah University. Hajj scholar 18 years.', avatar: 'from-blue-400 to-indigo-500' },
]

export default function AboutPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Our story"
        title="A platform built by pilgrims, for pilgrims."
        description="We started Sakinah because we were tired of overpriced packages, hidden fees, and impersonal service in our own Hajj journeys. Eleven years later, we serve 50,000+ pilgrims worldwide."
      />

      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto relative h-72 sm:h-96 rounded-3xl overflow-hidden shadow-2xl">
          <Image src={IMG.kaabaDayCrowd} alt="Masjid al-Haram" fill sizes="100vw" className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { value: 50000, suffix: '+', label: 'Pilgrims served' },
            { value: 1000, suffix: '+', label: 'Departures / year' },
            { value: 30, suffix: '', label: 'Countries' },
            { value: 4.9, suffix: '/5', decimals: 1, label: 'Avg. rating' },
          ].map((s, i) => (
            <div key={i} className="bg-card border border-border rounded-2xl p-6 text-center">
              <p className="text-4xl font-bold text-foreground mb-1">
                <AnimatedCounter to={s.value} decimals={s.decimals ?? 0} suffix={s.suffix} />
              </p>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-foreground to-foreground/90 text-background rounded-[2rem] p-10 sm:p-16 text-center relative overflow-hidden">
          <Target className="w-12 h-12 text-primary mx-auto mb-6" />
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">Our mission</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-balance leading-tight">
            To make the sacred journey accessible, transparent, and spiritually meaningful for every Muslim.
          </h2>
          <p className="text-lg opacity-80 max-w-3xl mx-auto leading-relaxed">
            We measure success not in bookings, but in the number of pilgrims whose journey transformed their relationship with Allah.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-3 text-center">What we stand for</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-foreground">Four values, one obsession.</h2>

          <StaggerContainer className="grid sm:grid-cols-2 gap-6">
            {values.map(v => (
              <StaggerItem key={v.title}>
                <Card className="!rounded-3xl p-8 h-full hover:shadow-xl transition-shadow">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-amber-600 text-white flex items-center justify-center mb-5 shadow-lg">
                    <v.Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{v.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{v.desc}</p>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-3 text-center">Our journey</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-foreground">Eleven years of sacred service.</h2>

          <div className="relative pl-8 sm:pl-12">
            <div className="absolute left-2 sm:left-4 top-2 bottom-2 w-px bg-border" />
            {milestones.map((m, i) => (
              <div key={i} className="relative mb-10 last:mb-0">
                <div className="absolute -left-7 sm:-left-9 w-4 h-4 rounded-full bg-gradient-to-br from-primary to-amber-500 shadow-lg shadow-primary/30 ring-4 ring-background" />
                <div className="bg-card border border-border rounded-2xl p-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-primary mb-2">{m.year}</p>
                  <h3 className="text-lg font-bold text-foreground mb-1.5">{m.title}</h3>
                  <p className="text-sm text-muted-foreground">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" id="careers">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-3 text-center">Leadership</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-foreground">The people behind the platform.</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((p, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${p.avatar} mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold shadow-lg`}>
                  {p.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                </div>
                <h3 className="font-bold text-foreground">{p.name}</h3>
                <p className="text-xs uppercase tracking-wider text-primary mt-0.5 mb-3">{p.role}</p>
                <p className="text-sm text-muted-foreground">{p.bio}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-card border border-border rounded-3xl p-8 sm:p-12 text-center">
            <BadgeCheck className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-2">Join our team</h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">We're hiring scholars, support staff, engineers, and designers. If you believe in our mission, we want to hear from you.</p>
            <Link href="/contact?type=careers" className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-xl font-semibold hover:bg-primary transition-colors">
              View open positions <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
