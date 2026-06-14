export interface Inquiry {
  id: string
  name: string
  email: string
  phone: string
  type: 'general' | 'package' | 'consultation'
  subject: string
  message: string
  packageRef?: string
  status: 'new' | 'in-progress' | 'responded' | 'closed'
  priority: 'low' | 'medium' | 'high'
  createdDate: string
}

export const inquiries: Inquiry[] = [
  { id: 'inq-001', name: 'Hassan Mahmood', email: 'hassan.m@email.com', phone: '+1 (555) 123-4567', type: 'package', subject: 'Question about Premium Hajj 2026', message: 'I am traveling with my elderly parents (75 and 70). Do you offer wheelchair-accessible Mina tents? What is the closest hotel option?', packageRef: 'pkg-hajj-premium', status: 'in-progress', priority: 'high', createdDate: '2026-06-12T08:30:00' },
  { id: 'inq-002', name: 'Layla Mohammed', email: 'layla.m@email.com', phone: '+44 7700 901234', type: 'consultation', subject: 'First-time Umrah consultation', message: 'I am 32 and want to do Umrah for the first time. Can someone walk me through the process and recommend the right package?', status: 'new', priority: 'medium', createdDate: '2026-06-12T14:15:00' },
  { id: 'inq-003', name: 'Maryam Ali', email: 'm.ali@email.com', phone: '+1 (416) 555-7788', type: 'package', subject: 'Group booking for 25 people', message: 'Our Islamic center wants to book a group of 25 for Umrah in March 2026. What group discounts are available?', packageRef: 'pkg-umrah-economy', status: 'responded', priority: 'high', createdDate: '2026-06-10T11:20:00' },
  { id: 'inq-004', name: 'Bilal Ahmad', email: 'b.ahmad@email.com', phone: '+61 4 1234 9876', type: 'consultation', subject: 'Multi-city itinerary', message: 'Looking to combine Umrah with stops in Istanbul and Jordan. Need help planning a 21-day itinerary.', status: 'in-progress', priority: 'low', createdDate: '2026-06-09T09:50:00' },
  { id: 'inq-005', name: 'Sumayya Khan', email: 's.khan@email.com', phone: '+44 7700 905566', type: 'general', subject: 'Vaccination requirements update', message: 'Has the meningitis vaccine requirement changed for 2026 Hajj? Need clarification for medical records.', status: 'responded', priority: 'medium', createdDate: '2026-06-08T13:10:00' },
  { id: 'inq-006', name: 'Khalid Rasheed', email: 'k.rasheed@email.com', phone: '+1 (713) 555-2233', type: 'package', subject: 'VIP Hajj availability', message: 'Are there still seats available in the VIP Hajj 2026 package? I am looking for two adjacent single suites.', packageRef: 'pkg-hajj-vip', status: 'in-progress', priority: 'high', createdDate: '2026-06-07T18:25:00' },
  { id: 'inq-007', name: 'Fatima Saleem', email: 'f.saleem@email.com', phone: '+44 161 555 4477', type: 'consultation', subject: 'Women-only Umrah group', message: 'Looking for an all-women Umrah group departing in April. Is this possible?', status: 'new', priority: 'medium', createdDate: '2026-06-12T07:00:00' },
]
