'use client'

import { motion } from 'framer-motion'
import { Search, FileCheck, CreditCard, Plane } from 'lucide-react'
import { SectionHeading } from '@/components/ui/section-heading'

const steps = [
  { n: '01', Icon: Search, title: 'Choose Your Package', desc: 'Browse our curated Hajj and Umrah packages by budget, dates, and amenities. Compare side-by-side.' },
  { n: '02', Icon: FileCheck, title: 'Reserve & Submit Docs', desc: 'Secure your spot with a 25% deposit. Upload passport and photos. Our team handles visa processing.' },
  { n: '03', Icon: CreditCard, title: 'Pay in Installments', desc: 'Spread the remaining balance over 2-6 monthly payments. Auto-pay or manual — your choice.' },
  { n: '04', Icon: Plane, title: 'Depart with Confidence', desc: 'Meet your group, receive your premium kit, and embark with full ground support from arrival to return.' },
]

export function ProcessSection() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-muted/30 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="How it works"
          title="From booking to boarding in four steps."
          description="A simple, transparent process designed to let you focus on what matters most — your spiritual preparation."
          className="mb-16"
        />

        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.svg
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: 'easeInOut' }}
            className="hidden lg:block absolute top-12 left-0 right-0 h-2 w-full"
            viewBox="0 0 1200 4" preserveAspectRatio="none"
          >
            <motion.path
              d="M0 2 L1200 2"
              stroke="oklch(0.62 0.16 70)"
              strokeWidth="2"
              strokeDasharray="6 8"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: 'easeInOut' }}
            />
          </motion.svg>

          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="bg-card border border-border rounded-2xl p-6 h-full hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30 transition-colors"
              >
                <div className="flex items-start justify-between mb-5">
                  <motion.div
                    whileHover={{ rotate: -8, scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-amber-600 flex items-center justify-center text-white shadow-lg shadow-primary/25"
                  >
                    <s.Icon className="w-6 h-6" />
                  </motion.div>
                  <span className="text-3xl font-bold text-muted-foreground/30 tabular-nums">{s.n}</span>
                </div>
                <h3 className="font-bold text-foreground text-lg mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
