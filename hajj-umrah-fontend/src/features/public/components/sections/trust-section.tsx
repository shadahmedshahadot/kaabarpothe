'use client'

import { motion } from 'framer-motion'
import { ShieldCheck, Award, HandCoins, Clock, Compass, Users, Heart, Sparkles } from 'lucide-react'
import { StaggerContainer, StaggerItem } from '@/components/ui/scroll-reveal'
import { SectionHeading } from '@/components/ui/section-heading'

const features = [
  { Icon: ShieldCheck, title: 'সৌদি মন্ত্রণালয় লাইসেন্সপ্রাপ্ত', desc: 'সৌদি হজ্জ ও উমরাহ মন্ত্রণালয় কর্তৃক আনুষ্ঠানিকভাবে অনুমোদিত। সম্পূর্ণ ভিসা প্রক্রিয়াকরণ ও অনুমতিপত্র।', color: 'from-emerald-400 to-teal-500', badge: 'অনুমোদিত' },
  { Icon: Award, title: 'আলেম পরিচালিত গ্রুপ', desc: 'প্রতিটি গ্রুপের সঙ্গী আল-আজহার, মদিনা বিশ্ববিদ্যালয় বা সমমানের গ্র্যাজুয়েট আলেম।', color: 'from-amber-400 to-orange-500', badge: 'বিশেষজ্ঞ' },
  { Icon: HandCoins, title: 'স্বচ্ছ মূল্য', desc: 'কোনো গোপন ফি নেই। ভিসা, ফ্লাইট, হোটেল, খাবার, যিয়ারত — সব আগে থেকে উন্মুক্ত।', color: 'from-sky-400 to-blue-500', badge: 'স্বচ্ছ' },
  { Icon: Clock, title: '২৪/৭ সরাসরি সহায়তা', desc: 'মক্কা ও মদিনায় স্থানীয় দল যেকোনো জরুরি অবস্থায় ২৪ ঘণ্টা উপলব্ধ।', color: 'from-rose-400 to-pink-500', badge: '২৪/৭' },
  { Icon: Compass, title: 'বাছাইকৃত ভ্রমণসূচি', desc: 'ইবাদত, বিশ্রাম ও শিক্ষামূলক যিয়ারত ভারসাম্য বজায় রেখে যত্নসহকারে পরিকল্পিত দৈনিক সময়সূচি।', color: 'from-violet-400 to-purple-500', badge: 'বাছাই' },
  { Icon: Users, title: 'বহুভাষিক সহায়তা', desc: 'আমাদের ২৪/৭ দল বাংলা, ইংরেজি, আরবি, উর্দু, ফরাসি, ইন্দোনেশিয়ান ও আরও ভাষায় কথা বলে।', color: 'from-cyan-400 to-blue-500', badge: '৭+ ভাষা' },
  { Icon: Heart, title: 'আধ্যাত্মিক প্রস্তুতি', desc: 'যাত্রার জন্য আচার, শিষ্টাচার ও অভ্যন্তরীণ প্রস্তুতি বিষয়ে প্রাক-প্রস্থান কোর্স।', color: 'from-fuchsia-400 to-pink-500', badge: 'কোর্স' },
  { Icon: Sparkles, title: 'আজীবন স্মৃতি', desc: 'প্রিমিয়াম ইহরাম কিট, গ্রুপ ফটো বই এবং আজীবন চলমান প্রাক্তন সদস্য কমিউনিটি।', color: 'from-yellow-400 to-amber-500', badge: 'প্রিমিয়াম' },
]

export function TrustSection() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.95_0.05_70_/_0.35),transparent_60%)]" />
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
        <div className="absolute inset-0 opacity-[0.03] [background-image:radial-gradient(circle_at_1px_1px,currentColor_1px,transparent_0)] [background-size:32px_32px]" />
      </div>

      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="কেন হাজীরা আমাদের বেছে নেন"
          title="সবচেয়ে বিশ্বস্ত হজ্জ ও উমরাহ প্ল্যাটফর্ম।"
          description="সেবার আটটি স্তম্ভ যা আমাদের আলাদা করে সেই এজেন্সিগুলো থেকে যারা আপনার পবিত্র যাত্রাকে শুধু আরেকটি বুকিং হিসেবে দেখে।"
          className="mb-16"
        />

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map(({ Icon, title, desc, color, badge }) => (
            <StaggerItem key={title}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="group relative bg-card border border-border rounded-2xl p-6 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/40 transition-all h-full overflow-hidden"
              >
                <div className={`absolute -top-16 -right-16 w-40 h-40 rounded-full bg-gradient-to-br ${color} opacity-10 blur-2xl group-hover:opacity-30 transition-opacity duration-500`} />
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${color} opacity-0 group-hover:opacity-100 transition-opacity`} />

                <div className="flex items-start justify-between mb-5 relative">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-white shadow-lg`}
                  >
                    <Icon className="w-6 h-6" />
                  </motion.div>
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    {badge}
                  </span>
                </div>

                <h3 className="font-bold text-foreground text-base mb-2 relative leading-snug">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed relative">{desc}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
