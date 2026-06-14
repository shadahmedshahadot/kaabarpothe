export interface FAQ {
  id: string
  category: string
  question: string
  answer: string
}

export const faqs: FAQ[] = [
  // Booking
  { id: 'f1', category: 'Booking', question: 'How do I book a package?', answer: 'Browse our Hajj or Umrah packages, click the package that interests you, review the full itinerary, and click "Book Now". You will be guided through pilgrim details, document upload, and a 25% deposit. The remaining balance can be paid in installments.' },
  { id: 'f2', category: 'Booking', question: 'Can I book for someone else (mahram, parents)?', answer: 'Yes. During booking, add each pilgrim\'s passport details and relationship. Sisters traveling without a mahram must be 45+ years old per current Saudi Ministry rules and travel as part of an approved group.' },
  { id: 'f3', category: 'Booking', question: 'What is the deposit amount?', answer: 'A 25% deposit secures your booking. For VIP packages it is 30%. The deposit is fully refundable up to 60 days before departure.' },
  { id: 'f4', category: 'Booking', question: 'Can I pay in installments?', answer: 'Yes. After the deposit, the remaining balance can be paid in 2-6 monthly installments. Auto-pay setup is available in your pilgrim dashboard.' },
  { id: 'f5', category: 'Booking', question: 'When should I book?', answer: 'For Hajj, book 6-12 months ahead. For Ramadan Umrah, book 8-12 months ahead. For Umrah in other months, 2-4 months ahead is usually sufficient.' },

  // Visa & Documents
  { id: 'f6', category: 'Visa & Documents', question: 'Is the visa included in package price?', answer: 'Yes, all our packages include the Umrah or Hajj visa fee, biometric registration, and Ministry of Hajj e-tasreeh permits.' },
  { id: 'f7', category: 'Visa & Documents', question: 'What documents do I need?', answer: 'A valid passport with at least 6 months validity from your return date, recent passport-size photographs (white background), vaccination certificates (meningitis ACWY required, others as applicable), and a completed application form.' },
  { id: 'f8', category: 'Visa & Documents', question: 'How long does visa processing take?', answer: 'Standard processing is 7-14 business days. Express processing (5 business days) is available for an additional fee. VIP packages include fast-track processing.' },
  { id: 'f9', category: 'Visa & Documents', question: 'What vaccinations are required?', answer: 'Meningitis ACWY (mandatory, certificate required), seasonal flu (recommended), COVID-19 vaccines per current Saudi rules. Pilgrims from yellow fever countries require yellow fever certification.' },

  // Travel & Logistics
  { id: 'f10', category: 'Travel', question: 'Are flights included?', answer: 'Yes, all packages include round-trip flights from major US/UK/Canadian airports. Add-on departures from other cities are available with possible fare adjustments.' },
  { id: 'f11', category: 'Travel', question: 'What airline will I fly?', answer: 'Saudi Airlines, Emirates, Qatar Airways, or Turkish Airlines depending on package and route. Premium and VIP packages prioritize direct flights and premium economy/business cabins.' },
  { id: 'f12', category: 'Travel', question: 'Can I extend my stay or arrive early?', answer: 'Yes, with notice. Add-on nights and flight changes are possible if requested 30+ days before departure. Visa extension is subject to Saudi Ministry rules.' },
  { id: 'f13', category: 'Travel', question: 'What if my flight is delayed or cancelled?', answer: 'Our 24/7 emergency line handles rebooking, hotel coverage, and meal vouchers. Travel insurance (included) covers most disruptions.' },

  // Hotels & Accommodation
  { id: 'f14', category: 'Hotels', question: 'How close are the hotels to the Haram?', answer: 'Budget: 700-900m walk. Economy: 400-500m. Premium: 100-200m. VIP: directly adjacent or Haram-view. All hotels offer shuttle service to the Haram.' },
  { id: 'f15', category: 'Hotels', question: 'Can I get a single room?', answer: 'Yes, single room supplement is available on all packages except Budget. VIP packages include single occupancy by default.' },
  { id: 'f16', category: 'Hotels', question: 'Are family rooms available?', answer: 'Yes, family rooms accommodating 2 adults + 2 children are available on Economy, Premium, and Luxury Umrah packages, and Standard, Premium, VIP Hajj packages.' },

  // Payments & Refunds
  { id: 'f17', category: 'Payments', question: 'What payment methods do you accept?', answer: 'Credit/debit cards (Visa, Mastercard, Amex), bank transfer, ACH/Direct Debit, and Apple/Google Pay. We also accept installment financing via Affirm and Klarna where available.' },
  { id: 'f18', category: 'Payments', question: 'Is my payment secure?', answer: 'Yes. All payments are processed through PCI-DSS Level 1 compliant gateways with end-to-end TLS encryption. We never store full card numbers.' },
  { id: 'f19', category: 'Payments', question: 'What is your refund policy?', answer: 'Full refund 60+ days before departure. 75% refund 30-59 days. 50% refund 15-29 days. No refund within 14 days, except for documented medical emergencies. See our Refund Policy page for details.' },
  { id: 'f20', category: 'Payments', question: 'Can I get a refund if my visa is denied?', answer: 'Yes. If visa is denied through no fault of the pilgrim, we refund 100% of the package cost minus actual administrative fees (typically $150).' },

  // During the Journey
  { id: 'f21', category: 'During Journey', question: 'Will there be a group leader?', answer: 'Yes, every group has an experienced scholar or trained group leader who handles logistics, leads worship, and is available 24/7 during your stay.' },
  { id: 'f22', category: 'During Journey', question: 'What if I have a medical emergency?', answer: 'Immediate medical care is available at hotel medical desks, and major hospitals serve the Makkah and Madinah areas with 24/7 emergency rooms. Travel insurance covers expenses. Our ground team coordinates with families.' },
  { id: 'f23', category: 'During Journey', question: 'Is Wi-Fi available at hotels?', answer: 'Yes, all hotels offer free Wi-Fi in lobbies and rooms. Premium and VIP packages include international roaming SIMs.' },
  { id: 'f24', category: 'During Journey', question: 'Can I use my regular phone?', answer: 'Yes. Saudi telecoms STC, Mobily, and Zain offer tourist SIMs at the airport for $15-30 with data. Most US/UK plans offer international roaming.' },

  // Special Cases
  { id: 'f25', category: 'Special Cases', question: 'Can elderly pilgrims with mobility issues go?', answer: 'Yes. We offer wheelchair-accessible packages with closer hotels, medical escort options, and Maryam Suleiman specializes in senior pilgrims. Contact us for tailored arrangements.' },
  { id: 'f26', category: 'Special Cases', question: 'Are children allowed?', answer: 'Yes. Family packages accommodate children. Children under 12 receive 25% discount, under 5 receive 50% discount (excluding flights and visa fees).' },
  { id: 'f27', category: 'Special Cases', question: 'Do you offer women-only groups?', answer: 'Yes. Fatima Zahra Malik specializes in women-only Umrah groups with female group leaders. Available on Economy and Premium Umrah packages.' },
  { id: 'f28', category: 'Special Cases', question: 'Can I combine Umrah with a tour of Turkey, Egypt, or Jordan?', answer: 'Yes. Multi-city itineraries with stops in Istanbul, Cairo, Amman, or Kuala Lumpur can be arranged. Contact our team for custom routing.' },
]

export const faqCategories = ['Booking', 'Visa & Documents', 'Travel', 'Hotels', 'Payments', 'During Journey', 'Special Cases']
