'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, Send, MessagesSquare, Building } from 'lucide-react'
import { PageShell, PageHero } from '@/components/layouts/page-shell'
import { Input, Textarea, Select, Label } from '@/components/ui/input'

export default function ContactPage() {
  const [sent, setSent] = useState(false)

  return (
    <PageShell>
      <PageHero
        eyebrow="Get in touch"
        title="We're here to help, 24/7."
        description="Whether you're starting your first inquiry, finalizing a booking, or need help during your journey — our team responds within 2 hours."
      />

      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* Contact info */}
          <div className="space-y-4">
            <ContactCard Icon={Phone} title="Call us" lines={['+1 (800) 555-1234', '24/7 pilgrim support line']} />
            <ContactCard Icon={Mail} title="Email" lines={['hello@sakinah.travel', 'support@sakinah.travel']} />
            <ContactCard Icon={MessagesSquare} title="Live chat" lines={['Available 7am - 11pm EST', 'Avg. response < 5 min']} />
            <ContactCard Icon={Building} title="Office" lines={['500 Madison Ave, Floor 42', 'New York, NY 10022, USA']} />
            <ContactCard Icon={Clock} title="Hours" lines={['Mon-Fri: 7am - 11pm EST', 'Sat-Sun: 9am - 8pm EST']} />
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-3xl p-8 sm:p-10">
              {sent ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-600 mx-auto mb-4 flex items-center justify-center">
                    <Send className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Message sent!</h3>
                  <p className="text-muted-foreground">We'll respond within 2 hours.</p>
                  <button onClick={() => setSent(false)} className="mt-6 inline-flex items-center gap-2 bg-foreground text-background px-5 py-2.5 rounded-xl font-semibold">Send another</button>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSent(true) }} className="space-y-5">
                  <h2 className="text-2xl font-bold text-foreground mb-1">Send us a message</h2>
                  <p className="text-sm text-muted-foreground mb-6">Fill out the form and our team will get back to you.</p>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label>First name</Label>
                      <Input required placeholder="Ahmad" />
                    </div>
                    <div>
                      <Label>Last name</Label>
                      <Input required placeholder="Hassan" />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label>Email</Label>
                      <Input type="email" required placeholder="you@email.com" />
                    </div>
                    <div>
                      <Label>Phone</Label>
                      <Input type="tel" placeholder="+1 (555) 123-4567" />
                    </div>
                  </div>

                  <div>
                    <Label>What's this about?</Label>
                    <Select required defaultValue="">
                      <option value="" disabled>Select inquiry type</option>
                      <option value="package">Package question</option>
                      <option value="consultation">Free 15-min consultation</option>
                      <option value="booking">Existing booking</option>
                      <option value="group">Group booking (10+)</option>
                      <option value="other">Something else</option>
                    </Select>
                  </div>

                  <div>
                    <Label>Subject</Label>
                    <Input required placeholder="Premium Hajj 2026 — group of 5" />
                  </div>

                  <div>
                    <Label>Your message</Label>
                    <Textarea rows={5} required placeholder="Tell us about your journey..." />
                  </div>

                  <button type="submit" className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-amber-600 text-primary-foreground px-6 py-3.5 rounded-xl font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all">
                    Send message <Send className="w-4 h-4" />
                  </button>
                  <p className="text-xs text-muted-foreground">By submitting, you agree to our Privacy Policy and Terms.</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  )
}

function ContactCard({ Icon, title, lines }: { Icon: any; title: string; lines: string[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ x: 4 }}
      className="bg-card border border-border rounded-2xl p-5 hover:border-primary/30 hover:shadow-md transition-colors"
    >
      <div className="flex items-center gap-3 mb-2">
        <motion.div
          whileHover={{ rotate: 12, scale: 1.1 }}
          className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center"
        >
          <Icon className="w-5 h-5" />
        </motion.div>
        <h3 className="font-bold text-foreground">{title}</h3>
      </div>
      {lines.map((l, i) => (
        <p key={i} className={`text-sm ${i === 0 ? 'text-foreground' : 'text-muted-foreground'} leading-relaxed`}>{l}</p>
      ))}
    </motion.div>
  )
}
