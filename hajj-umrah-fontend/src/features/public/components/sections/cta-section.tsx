'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Phone, MessagesSquare, ShieldCheck, Users, Award } from 'lucide-react'

const trustBadges = [
  { Icon: ShieldCheck, label: 'সৌদি লাইসেন্সপ্রাপ্ত' },
  { Icon: Users, label: '৫০,০০০+ হাজী' },
  { Icon: Award, label: '৪.৯ / ৫ রেটিং' },
]

export function CTASection() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-foreground via-foreground to-primary/40"
        >
          <div className="absolute inset-0 opacity-40">
            <svg className="w-full h-full" viewBox="0 0 600 300" preserveAspectRatio="none">
              <defs>
                <radialGradient id="cta-g" cx="80%" cy="20%">
                  <stop offset="0%" stopColor="oklch(0.62 0.16 70)" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="oklch(0.62 0.16 70)" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="cta-g2" cx="20%" cy="80%">
                  <stop offset="0%" stopColor="oklch(0.72 0.14 150)" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="oklch(0.72 0.14 150)" stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect width="600" height="300" fill="url(#cta-g)" />
              <rect width="600" height="300" fill="url(#cta-g2)" />
              <pattern id="cta-p" width="30" height="30" patternUnits="userSpaceOnUse">
                <circle cx="15" cy="15" r="1" fill="white" opacity="0.3" />
              </pattern>
              <rect width="600" height="300" fill="url(#cta-p)" />
            </svg>
          </div>

          <motion.div
            animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-10 right-10 w-72 h-72 bg-amber-400/20 rounded-full blur-3xl"
          />

          <div className="relative grid lg:grid-cols-12 gap-8 items-center p-10 sm:p-16">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 mb-5">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-amber-400">যাত্রা শুরু করুন</p>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.05] mb-5 text-balance">
                আলেমের সাথে কথা বলুন।<br />
                <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400 bg-clip-text text-transparent">আস্থার সাথে</span> বুক করুন।
              </h2>
              <p className="text-lg text-white/70 max-w-xl leading-relaxed mb-8">
                আমাদের আলেম দলের সাথে ১৫-মিনিটের পরামর্শ আপনাকে সঠিক প্যাকেজ বেছে নিতে, ডকুমেন্ট প্রস্তুত করতে এবং আপনার আধ্যাত্মিক যাত্রা পরিকল্পনায় সাহায্য করে।
              </p>

              <div className="flex flex-wrap gap-3">
                {trustBadges.map(({ Icon, label }) => (
                  <div key={label} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-white/80 text-sm">
                    <Icon className="w-4 h-4 text-amber-400" />
                    {label}
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-3">
              <Link
                href="/packages/umrah"
                className="inline-flex items-center justify-between gap-3 bg-gradient-to-r from-primary to-amber-500 text-primary-foreground px-6 py-4 rounded-2xl font-bold shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02] transition-all group"
              >
                <span className="flex items-center gap-3">
                  <ArrowRight className="w-5 h-5" />
                  প্যাকেজ দেখুন
                </span>
                <span className="text-xs opacity-80 group-hover:translate-x-1 transition-transform">শুরু →</span>
              </Link>

              <Link href="/contact" className="inline-flex items-center justify-between gap-3 bg-white/10 backdrop-blur text-white border border-white/20 px-6 py-4 rounded-2xl font-semibold hover:bg-white/20 hover:border-white/40 transition-all group">
                <span className="flex items-center gap-3"><MessagesSquare className="w-5 h-5" /> ফ্রি ১৫-মিনিট পরামর্শ</span>
                <span className="text-xs opacity-80 group-hover:translate-x-1 transition-transform">বুক →</span>
              </Link>

              <a href="tel:+8801700000000" className="inline-flex items-center justify-between gap-3 bg-white/5 backdrop-blur text-white/90 border-2 border-amber-400/60 px-6 py-3.5 rounded-2xl font-semibold shadow-lg shadow-amber-400/20 hover:bg-amber-400/10 hover:border-amber-400 hover:text-white transition-all group">
                <span className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-amber-400/20 flex items-center justify-center">
                    <Phone className="w-4 h-4 text-amber-400" />
                  </span>
                  +৮৮০ ১৭০০-০০০০০০
                </span>
                <span className="text-xs bg-amber-400/20 text-amber-300 px-2 py-1 rounded-full font-bold">২৪/৭</span>
              </a>

              <p className="text-center text-xs text-white/50 mt-2">
                কোনো ক্রেডিট কার্ড লাগে না • ১০০% ফ্রি পরামর্শ
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
