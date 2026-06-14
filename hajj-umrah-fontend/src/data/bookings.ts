export type BookingStatus = 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled'
export type PaymentStatus = 'unpaid' | 'partial' | 'paid' | 'refunded'

export interface Booking {
  id: string
  bookingCode: string
  packageId: string
  packageName: string
  packageType: 'hajj' | 'umrah'
  pilgrimId: string
  pilgrimName: string
  pilgrimEmail: string
  pilgrimPhone: string
  status: BookingStatus
  paymentStatus: PaymentStatus
  totalAmount: number
  paidAmount: number
  installmentsCount: number
  installmentsPaid: number
  departureDate: string
  returnDate: string
  pilgrimsCount: number
  bookedDate: string
  notes: string
  visaStatus: 'pending' | 'submitted' | 'approved' | 'rejected'
  documentsStatus: 'incomplete' | 'complete'
}

export const bookings: Booking[] = [
  { id: 'bkg-1001', bookingCode: 'HJ-2026-1001', packageId: 'pkg-hajj-premium', packageName: 'Premium Hajj 2026', packageType: 'hajj', pilgrimId: 'p-001', pilgrimName: 'Mohammad Anwar', pilgrimEmail: 'm.anwar@email.com', pilgrimPhone: '+1 (718) 555-2341', status: 'confirmed', paymentStatus: 'paid', totalAmount: 26998, paidAmount: 26998, installmentsCount: 4, installmentsPaid: 4, departureDate: '2026-05-19', returnDate: '2026-06-13', pilgrimsCount: 2, bookedDate: '2025-11-20', notes: 'Couple, requested adjacent rooms', visaStatus: 'approved', documentsStatus: 'complete' },
  { id: 'bkg-1002', bookingCode: 'UM-2026-1002', packageId: 'pkg-umrah-economy', packageName: 'Economy Umrah', packageType: 'umrah', pilgrimId: 'p-002', pilgrimName: 'Aisha Khan', pilgrimEmail: 'aisha.khan@email.com', pilgrimPhone: '+44 7700 900123', status: 'confirmed', paymentStatus: 'paid', totalAmount: 1749, paidAmount: 1749, installmentsCount: 2, installmentsPaid: 2, departureDate: '2026-03-01', returnDate: '2026-03-10', pilgrimsCount: 1, bookedDate: '2025-12-08', notes: 'Women-only group, first-time pilgrim', visaStatus: 'approved', documentsStatus: 'complete' },
  { id: 'bkg-1003', bookingCode: 'HJ-2026-1003', packageId: 'pkg-hajj-vip', packageName: 'VIP Hajj 2026', packageType: 'hajj', pilgrimId: 'p-003', pilgrimName: 'Yusuf Garcia', pilgrimEmail: 'y.garcia@email.com', pilgrimPhone: '+1 (832) 555-9912', status: 'confirmed', paymentStatus: 'partial', totalAmount: 46998, paidAmount: 30000, installmentsCount: 5, installmentsPaid: 3, departureDate: '2026-05-18', returnDate: '2026-06-14', pilgrimsCount: 2, bookedDate: '2025-10-12', notes: 'VIP couple, Mercedes V-Class transfers', visaStatus: 'approved', documentsStatus: 'complete' },
  { id: 'bkg-1004', bookingCode: 'UM-2026-1004', packageId: 'pkg-umrah-luxury', packageName: 'Luxury Umrah', packageType: 'umrah', pilgrimId: 'p-004', pilgrimName: 'Hafsa Bilal', pilgrimEmail: 'h.bilal@email.com', pilgrimPhone: '+1 (416) 555-3344', status: 'in-progress', paymentStatus: 'paid', totalAmount: 18198, paidAmount: 18198, installmentsCount: 3, installmentsPaid: 3, departureDate: '2026-04-01', returnDate: '2026-04-14', pilgrimsCount: 3, bookedDate: '2025-09-30', notes: 'Family with elderly parents, wheelchair access', visaStatus: 'approved', documentsStatus: 'complete' },
  { id: 'bkg-1005', bookingCode: 'HJ-2026-1005', packageId: 'pkg-hajj-standard', packageName: 'Standard Hajj 2026', packageType: 'hajj', pilgrimId: 'p-005', pilgrimName: 'Ibrahim Diop', pilgrimEmail: 'i.diop@email.com', pilgrimPhone: '+33 6 12 34 56 78', status: 'confirmed', paymentStatus: 'paid', totalAmount: 25497, paidAmount: 25497, installmentsCount: 4, installmentsPaid: 4, departureDate: '2026-05-20', returnDate: '2026-06-12', pilgrimsCount: 3, bookedDate: '2025-09-15', notes: 'Three generations, French-speaking guide', visaStatus: 'approved', documentsStatus: 'complete' },
  { id: 'bkg-1006', bookingCode: 'UM-2026-1006', packageId: 'pkg-umrah-budget', packageName: 'Budget Umrah', packageType: 'umrah', pilgrimId: 'p-006', pilgrimName: 'Zainab Mustafa', pilgrimEmail: 'z.mustafa@email.com', pilgrimPhone: '+44 7700 900456', status: 'completed', paymentStatus: 'paid', totalAmount: 1099, paidAmount: 1099, installmentsCount: 1, installmentsPaid: 1, departureDate: '2025-11-05', returnDate: '2025-11-11', pilgrimsCount: 1, bookedDate: '2025-08-20', notes: 'Student package', visaStatus: 'approved', documentsStatus: 'complete' },
  { id: 'bkg-1007', bookingCode: 'UM-2026-1007', packageId: 'pkg-umrah-premium', packageName: 'Premium Umrah', packageType: 'umrah', pilgrimId: 'p-007', pilgrimName: 'Khalid Rashid', pilgrimEmail: 'k.rashid@email.com', pilgrimPhone: '+61 4 1234 5678', status: 'pending', paymentStatus: 'partial', totalAmount: 6198, paidAmount: 1500, installmentsCount: 4, installmentsPaid: 1, departureDate: '2026-03-15', returnDate: '2026-03-26', pilgrimsCount: 2, bookedDate: '2026-01-08', notes: 'Multi-city via Istanbul', visaStatus: 'submitted', documentsStatus: 'incomplete' },
  { id: 'bkg-1008', bookingCode: 'UM-2026-1008', packageId: 'pkg-umrah-economy', packageName: 'Economy Umrah', packageType: 'umrah', pilgrimId: 'p-008', pilgrimName: 'Salma Al-Faisal', pilgrimEmail: 's.faisal@email.com', pilgrimPhone: '+44 7700 900789', status: 'completed', paymentStatus: 'paid', totalAmount: 1749, paidAmount: 1749, installmentsCount: 2, installmentsPaid: 2, departureDate: '2025-08-25', returnDate: '2025-09-03', pilgrimsCount: 1, bookedDate: '2025-06-10', notes: 'Tech professional', visaStatus: 'approved', documentsStatus: 'complete' },
  { id: 'bkg-1009', bookingCode: 'HJ-2026-1009', packageId: 'pkg-hajj-standard', packageName: 'Standard Hajj 2026', packageType: 'hajj', pilgrimId: 'p-009', pilgrimName: 'Abdul Rahman', pilgrimEmail: 'a.rahman@email.com', pilgrimPhone: '+1 (313) 555-1122', status: 'confirmed', paymentStatus: 'partial', totalAmount: 8499, paidAmount: 4000, installmentsCount: 4, installmentsPaid: 2, departureDate: '2026-05-20', returnDate: '2026-06-12', pilgrimsCount: 1, bookedDate: '2025-12-20', notes: 'Educational program participant', visaStatus: 'submitted', documentsStatus: 'complete' },
  { id: 'bkg-1010', bookingCode: 'UM-2026-1010', packageId: 'pkg-umrah-premium', packageName: 'Premium Umrah', packageType: 'umrah', pilgrimId: 'p-010', pilgrimName: 'Nusaybah Ali', pilgrimEmail: 'n.ali@email.com', pilgrimPhone: '+1 (773) 555-7788', status: 'pending', paymentStatus: 'partial', totalAmount: 3099, paidAmount: 800, installmentsCount: 3, installmentsPaid: 1, departureDate: '2026-04-15', returnDate: '2026-04-26', pilgrimsCount: 1, bookedDate: '2026-02-01', notes: 'Express 7-day variant requested', visaStatus: 'pending', documentsStatus: 'incomplete' },
  { id: 'bkg-1011', bookingCode: 'HJ-2026-1011', packageId: 'pkg-hajj-economy', packageName: 'Economy Hajj 2026', packageType: 'hajj', pilgrimId: 'p-011', pilgrimName: 'Saeed Mansoor', pilgrimEmail: 's.mansoor@email.com', pilgrimPhone: '+1 (713) 555-9988', status: 'confirmed', paymentStatus: 'partial', totalAmount: 12998, paidAmount: 6500, installmentsCount: 5, installmentsPaid: 3, departureDate: '2026-05-22', returnDate: '2026-06-11', pilgrimsCount: 2, bookedDate: '2025-11-10', notes: 'Father-son pair', visaStatus: 'submitted', documentsStatus: 'complete' },
  { id: 'bkg-1012', bookingCode: 'UM-2026-1012', packageId: 'pkg-umrah-economy', packageName: 'Economy Umrah', packageType: 'umrah', pilgrimId: 'p-012', pilgrimName: 'Rabia Tariq', pilgrimEmail: 'r.tariq@email.com', pilgrimPhone: '+1 (416) 555-4455', status: 'confirmed', paymentStatus: 'paid', totalAmount: 4998, paidAmount: 4998, installmentsCount: 2, installmentsPaid: 2, departureDate: '2026-03-01', returnDate: '2026-03-10', pilgrimsCount: 3, bookedDate: '2025-12-01', notes: 'Family with children — family suite', visaStatus: 'approved', documentsStatus: 'complete' },
]

export const getBooking = (id: string) => bookings.find(b => b.id === id || b.bookingCode === id)
