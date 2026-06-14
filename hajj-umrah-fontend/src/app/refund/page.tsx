import type { Metadata } from 'next'
import { LegalPage } from '@/components/common/legal-page'

export const metadata: Metadata = { title: 'Refund Policy | Sakinah Travels' }

export default function RefundPolicyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Refund Policy"
      description="Clear, predictable refund terms based on how far out you cancel. We want you to book with confidence."
      effectiveDate="January 1, 2026"
      sections={[
        { heading: 'Cancellation schedule', body: ['60+ days before departure: 100% refund (minus $50 processing fee)', '30-59 days before departure: 75% refund', '15-29 days before departure: 50% refund', '8-14 days before departure: 25% refund', '0-7 days before departure: No refund'] },
        { heading: 'Visa denial', body: 'If your visa is denied through no fault of yours (incorrect submission etc.), we refund 100% of the package cost minus actual administrative fees (typically $150). This applies only to legitimate visa denials documented by Saudi authorities.' },
        { heading: 'Medical emergencies', body: ['Documented life-threatening medical emergencies (you or immediate family) qualify for 75% refund regardless of timing', 'Requires a physician\'s letter and hospital documentation', 'Travel insurance (mandatory and included) covers the remaining 25% in most cases', 'Submit documentation within 14 days of the event'] },
        { heading: 'Death of a pilgrim', body: 'In the event of the pilgrim\'s death before departure, we provide a 90% refund to the estate. Documentation required: death certificate and proof of relationship.' },
        { heading: 'Sakinah-initiated cancellations', body: 'If we cancel your booking due to insufficient group size, package modifications, or operational issues, you receive 100% refund or the option to transfer to another departure of equivalent value at no extra cost.' },
        { heading: 'Force majeure', body: 'For cancellations due to events beyond our control (pandemic, war, natural disaster, government restrictions), we provide credit toward a future booking valid for 24 months, OR a refund minus non-recoverable third-party costs (already-paid hotel deposits, non-refundable flights).' },
        { heading: 'How to request a refund', body: ['Log into your pilgrim dashboard at sakinah.travel/pilgrim', 'Click "Cancel Booking" on the relevant booking', 'Choose cancellation reason and upload supporting documents', 'Refund is processed within 5-10 business days to your original payment method', 'For complex cases, email refunds@sakinah.travel'] },
        { heading: 'Processing time', body: 'Credit card refunds: 5-10 business days. Bank transfer refunds: 7-14 business days. PayPal refunds: 1-3 business days.' },
        { heading: 'Non-refundable items', body: ['Visa fees once submitted and approved', 'Travel insurance premium', '$50 administrative processing fee on any cancellation', 'Optional add-ons consumed (premium kits, etc.)'] },
        { heading: 'Disputes', body: 'If you disagree with a refund decision, you may escalate to our resolution team at disputes@sakinah.travel. Disputes unresolved within 30 days may be referred to AAA arbitration per our Terms.' },
      ]}
    />
  )
}
