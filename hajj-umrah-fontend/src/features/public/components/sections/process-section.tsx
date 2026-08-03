'use client'

import { motion } from 'framer-motion'
import { Search, FileCheck, CreditCard, Plane, CheckCircle2 } from 'lucide-react'
import { SectionHeading } from '@/components/ui/section-heading'

const steps = [
  {
    n: '০১',
    Icon: Search,
    title: 'প্যাকেজ বেছে নিন',
    desc: 'বাজেট, তারিখ ও সুবিধা অনুযায়ী আমাদের বাছাইকৃত হজ্জ ও উমরাহ প্যাকেজ ব্রাউজ করুন। পাশাপাশি তুলনা করুন।',
    accent: 'from-sky-500 to-blue-600',
    duration: '১০-১৫ মিনিট',
  },
  {
    n: '০২',
    Icon: FileCheck,
    title: 'রিজার্ভ ও ডকুমেন্ট জমা',
    desc: '২৫% জমা দিয়ে আপনার জায়গা নিশ্চিত করুন। পাসপোর্ট ও ছবি আপলোড করুন। ভিসা প্রক্রিয়া আমাদের দল সামলায়।',
    accent: 'from-emerald-500 to-teal-600',
    duration: '৭-১৪ দিন',
  },
  {
    n: '০৩',
    Icon: CreditCard,
    title: 'কিস্তিতে পরিশোধ',
    desc: 'অবশিষ্ট ব্যালেন্স ২-৬ মাসিক কিস্তিতে ভাগ করুন। অটো-পে বা ম্যানুয়াল — আপনার পছন্দ।',
    accent: 'from-amber-500 to-orange-600',
    duration: '২-৬ মাস',
  },
  {
    n: '০৪',
    Icon: Plane,
    title: 'আস্থার সাথে যাত্রা',
    desc: 'আপনার গ্রুপের সাথে দেখা করুন, প্রিমিয়াম কিট নিন এবং আগমন থেকে ফেরা পর্যন্ত সম্পূর্ণ সহায়তায় যাত্রা শুরু করুন।',
    accent: 'from-violet-500 to-purple-600',
    duration: '১০-৪০ দিন',
  },
]

export function ProcessSection() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-muted/30 overflow-hidden">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(currentColor_1px,transparent_1px),linear-gradient(90deg,currentColor_1px,transparent_1px)] [background-size:40px_40px]" />
      </div>

      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="কীভাবে কাজ করে"
          title="বুকিং থেকে বোর্ডিং পর্যন্ত চার ধাপে।"
          description="সহজ, স্বচ্ছ প্রক্রিয়া যেন আপনি সবচেয়ে গুরুত্বপূর্ণ বিষয়ে — আপনার আধ্যাত্মিক প্রস্তুতিতে মনোনিবেশ করতে পারেন।"
          className="mb-16"
        />

        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.svg
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: 'easeInOut' }}
            className="hidden lg:block absolute top-16 left-[12%] right-[12%] h-2"
            viewBox="0 0 1000 4" preserveAspectRatio="none"
          >
            <motion.path
              d="M0 2 L1000 2"
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
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="group bg-card border border-border rounded-2xl p-6 h-full hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/40 transition-all relative overflow-hidden"
              >
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${s.accent} opacity-0 group-hover:opacity-100 transition-opacity`} />
                <div className={`absolute -bottom-16 -right-16 w-40 h-40 rounded-full bg-gradient-to-br ${s.accent} opacity-5 blur-2xl group-hover:opacity-20 transition-opacity duration-500`} />

                <div className="flex items-start justify-between mb-5 relative">
                  <motion.div
                    whileHover={{ rotate: -8, scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.accent} flex items-center justify-center text-white shadow-lg`}
                  >
                    <s.Icon className="w-6 h-6" />
                  </motion.div>
                  <span className="text-3xl font-bold text-muted-foreground/25 tabular-nums group-hover:text-primary/40 transition-colors">{s.n}</span>
                </div>

                <h3 className="font-bold text-foreground text-lg mb-2 relative">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 relative">{s.desc}</p>

                <div className="flex items-center gap-2 pt-4 border-t border-border/60 relative">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span className="text-xs font-semibold text-foreground/70">{s.duration}</span>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
