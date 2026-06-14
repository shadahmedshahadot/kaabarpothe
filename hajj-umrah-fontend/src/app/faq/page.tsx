'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { PageShell, PageHero } from '@/components/layouts/page-shell'
import { Accordion, AccordionItem } from '@/components/ui/accordion'
import { Input } from '@/components/ui/input'
import { faqs, faqCategories } from '@/data/faqs'

export default function FAQPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<string>('All')

  const filtered = faqs.filter(f =>
    (category === 'All' || f.category === category) &&
    (f.question.toLowerCase().includes(search.toLowerCase()) || f.answer.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <PageShell>
      <PageHero
        eyebrow="Got questions?"
        title="Frequently asked questions."
        description="Everything you need to know about booking, visas, payments, and the journey itself. Can't find your answer? Contact us."
      >
        <div className="max-w-xl mx-auto mt-8 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search FAQs..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="!h-14 pl-12 text-base shadow-lg"
          />
        </div>
      </PageHero>

      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04 } } }}
            className="flex flex-wrap gap-2 mb-10 justify-center"
          >
            {['All', ...faqCategories].map(c => (
              <motion.button
                key={c}
                variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCategory(c)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                  category === c ? 'bg-foreground text-background' : 'bg-muted text-foreground hover:bg-muted/70'
                }`}
              >
                {c}
              </motion.button>
            ))}
          </motion.div>

          {filtered.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">No FAQs match your search.</p>
          ) : (
            <div className="bg-card border border-border rounded-3xl p-6 sm:p-10">
              <Accordion>
                {filtered.map(f => (
                  <AccordionItem key={f.id} title={f.question}>{f.answer}</AccordionItem>
                ))}
              </Accordion>
            </div>
          )}

          <div className="mt-12 bg-gradient-to-br from-primary/10 to-amber-500/10 border border-primary/20 rounded-3xl p-8 sm:p-12 text-center">
            <h3 className="text-2xl font-bold text-foreground mb-2">Still have questions?</h3>
            <p className="text-muted-foreground mb-6">Our team is available 24/7. We typically respond within 2 hours.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a href="/contact" className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-xl font-semibold hover:bg-primary transition-colors">
                Contact us
              </a>
              <a href="tel:+18005551234" className="inline-flex items-center gap-2 border border-border bg-card text-foreground px-6 py-3 rounded-xl font-semibold hover:bg-muted transition-colors">
                Call +1 (800) 555-1234
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
