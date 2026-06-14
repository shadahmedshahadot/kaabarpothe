import type { Metadata } from 'next'
import { LegalPage } from '@/components/common/legal-page'

export const metadata: Metadata = { title: 'Privacy Policy | Sakinah Travels' }

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      description="How we collect, use, and protect your personal information when you book your sacred journey with us."
      effectiveDate="January 1, 2026"
      sections={[
        { heading: 'Information we collect', body: ['Identity data: full name, date of birth, passport number, nationality.', 'Contact data: email, phone, mailing address.', 'Financial data: payment card details (tokenized via Stripe), bank account information.', 'Medical data: vaccination records, mobility requirements, medical conditions disclosed for safety.', 'Travel data: passport scans, visa applications, biometric registration data submitted to Saudi authorities.'] },
        { heading: 'How we use your information', body: ['Process bookings and visa applications', 'Communicate about your journey, payments, and itinerary changes', 'Comply with Saudi Ministry of Hajj and government regulations', 'Improve our services through anonymized analytics', 'Send marketing communications (only with your consent)'] },
        { heading: 'Who we share with', body: ['Saudi Ministry of Hajj & Umrah for visa and permit processing', 'Airlines, hotels, and ground transportation for service delivery', 'Payment processors (Stripe, PayPal) — we never store full card numbers', 'Government authorities when legally required', 'We never sell your data to third parties for advertising.'] },
        { heading: 'Cookies', body: 'We use essential cookies for site functionality and analytics cookies (Google Analytics, Vercel Analytics) to understand site usage. Marketing cookies require explicit consent. You can manage cookies via your browser settings or our cookie banner.' },
        { heading: 'Data retention', body: 'We retain booking data for 7 years for tax and regulatory compliance. Personal account data is retained while your account is active and 2 years after deletion. You may request deletion at any time subject to legal requirements.' },
        { heading: 'Your rights', body: ['Access: request a copy of all data we hold about you', 'Rectification: correct inaccurate data', 'Erasure: request deletion (subject to legal retention)', 'Portability: receive your data in a structured format', 'Objection: opt out of marketing or data processing', 'Contact privacy@sakinah.travel to exercise these rights.'] },
        { heading: 'Security', body: 'All data is encrypted in transit (TLS 1.3) and at rest (AES-256). Payment data is PCI-DSS Level 1 compliant. We perform annual security audits and penetration testing.' },
        { heading: 'International transfers', body: 'Data may be processed in the USA, EU, and Saudi Arabia (for visa processing). All transfers use Standard Contractual Clauses or equivalent safeguards.' },
        { heading: 'Contact', body: 'For privacy questions, email privacy@sakinah.travel or write to: Privacy Officer, Sakinah Travels, 500 Madison Ave, Floor 42, New York, NY 10022.' },
      ]}
    />
  )
}
