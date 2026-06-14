import type { Metadata } from 'next'
import { LegalPage } from '@/components/common/legal-page'

export const metadata: Metadata = { title: 'Terms & Conditions | Sakinah Travels' }

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms & Conditions"
      description="The terms governing your use of our website, services, and bookings. Please read carefully before completing a transaction."
      effectiveDate="January 1, 2026"
      sections={[
        { heading: 'Acceptance of terms', body: 'By accessing or using our website, mobile app, or services, you agree to be bound by these Terms & Conditions. If you do not agree, please do not use our services.' },
        { heading: 'Eligibility', body: ['Be 18 years or older (or have parental consent)', 'Be a Muslim wishing to perform Hajj or Umrah', 'Provide accurate identity and travel documents', 'Meet Saudi Ministry of Hajj eligibility rules'] },
        { heading: 'Booking and payment', body: ['25% deposit required to confirm booking (30% for VIP)', 'Remaining balance payable in installments per agreed schedule', 'All prices in USD unless stated otherwise', 'Prices may change due to exchange rates, fuel surcharges, or government fees beyond our control', 'Prices guaranteed once 50% has been paid'] },
        { heading: 'Cancellation and refunds', body: 'See our Refund Policy page for the complete cancellation schedule. Briefly: full refund 60+ days out, 75% refund 30-59 days, 50% refund 15-29 days, no refund within 14 days except for documented medical emergencies.' },
        { heading: 'Visa and travel documents', body: ['Provide a valid passport (6+ months validity from return date)', 'Submit accurate visa application data', 'Complete biometric registration when required', 'Visa approval is at the sole discretion of the Saudi government', 'We are not liable for visa denials. See Refund Policy for visa denial refunds.'] },
        { heading: 'Code of conduct', body: 'Pilgrims must respect Islamic etiquette, group leader instructions, Saudi laws, and fellow pilgrims. Behavior that endangers others or violates Saudi law may result in immediate removal from the group at the pilgrim\'s expense, with no refund.' },
        { heading: 'Force majeure', body: 'We are not liable for cancellations, delays, or service disruptions caused by events beyond our control: natural disasters, pandemics, government restrictions, airline strikes, war, or terrorism. We will work in good faith to provide alternatives or partial refunds where possible.' },
        { heading: 'Liability', body: 'Our maximum liability is limited to the amount paid for the affected service. We are not liable for indirect, consequential, or punitive damages. We strongly recommend comprehensive travel insurance.' },
        { heading: 'Intellectual property', body: 'All content on our website (text, images, logos, code) is owned by Sakinah Travels or licensors. You may not reproduce, distribute, or create derivative works without written permission.' },
        { heading: 'Dispute resolution', body: 'These Terms are governed by the laws of New York, USA. Disputes will be resolved through binding arbitration administered by AAA, except where prohibited by law. You waive the right to class action.' },
        { heading: 'Amendments', body: 'We may update these Terms at any time. Material changes will be notified via email. Continued use after notification constitutes acceptance.' },
      ]}
    />
  )
}
