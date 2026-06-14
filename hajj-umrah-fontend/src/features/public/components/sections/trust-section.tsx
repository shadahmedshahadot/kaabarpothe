'use client'

import { motion } from 'framer-motion'
import { ShieldCheck, Award, HandCoins, Clock, Compass, Users, Heart, Sparkles } from 'lucide-react'
import { StaggerContainer, StaggerItem } from '@/components/ui/scroll-reveal'
import { SectionHeading } from '@/components/ui/section-heading'

const features = [
  { Icon: ShieldCheck, title: 'Saudi Ministry Licensed', desc: 'Officially authorized by the Saudi Ministry of Hajj & Umrah. Full visa processing and permits.', color: 'from-emerald-400 to-teal-500' },
  { Icon: Award, title: 'Scholar-Led Groups', desc: 'Every group accompanied by a graduate scholar from Al-Azhar, Madinah University, or equivalent.', color: 'from-amber-400 to-orange-500' },
  { Icon: HandCoins, title: 'Transparent Pricing', desc: 'No hidden fees. Visa, flights, hotels, meals, ziyarat — fully disclosed up front.', color: 'from-sky-400 to-blue-500' },
  { Icon: Clock, title: '24/7 Ground Support', desc: 'Local team in Makkah and Madinah available around the clock for any emergency.', color: 'from-rose-400 to-pink-500' },
  { Icon: Compass, title: 'Curated Itineraries', desc: 'Carefully planned daily schedules balancing worship, rest, and educational ziyarat tours.', color: 'from-violet-400 to-purple-500' },
  { Icon: Users, title: 'Multilingual Support', desc: 'Our 24/7 team speaks English, Arabic, Urdu, Bengali, French, Indonesian, and more.', color: 'from-cyan-400 to-blue-500' },
  { Icon: Heart, title: 'Spiritual Preparation', desc: 'Pre-departure courses covering rituals, etiquette, and inner preparation for the journey.', color: 'from-fuchsia-400 to-pink-500' },
  { Icon: Sparkles, title: 'Lifetime Memory', desc: 'Premium ihram kits, group photo books, and ongoing alumni community for life.', color: 'from-yellow-400 to-amber-500' },
]

export function TrustSection() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1/4 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Why pilgrims choose us"
          title="The most trusted Hajj & Umrah platform."
          description="Eight pillars of service that set us apart from agencies who treat your sacred journey as just another booking."
          className="mb-16"
        />

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map(({ Icon, title, desc, color }) => (
            <StaggerItem key={title}>
              <motion.div
                whileHover={{ y: -6, rotateZ: -0.5 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="group relative bg-card border border-border rounded-2xl p-6 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30 transition-colors h-full overflow-hidden"
              >
                <div className={`absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br ${color} opacity-10 blur-2xl group-hover:opacity-25 transition-opacity`} />
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white mb-4 shadow-lg`}
                >
                  <Icon className="w-6 h-6" />
                </motion.div>
                <h3 className="font-bold text-foreground mb-2 relative">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed relative">{desc}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
