export interface Pilgrim {
  id: string
  fullName: string
  email: string
  phone: string
  dateOfBirth: string
  gender: 'male' | 'female'
  nationality: string
  passport: { number: string; issueDate: string; expiryDate: string; country: string }
  address: string
  city: string
  country: string
  avatar: string
  emergencyContact: { name: string; relationship: string; phone: string }
  bookingsCount: number
  totalSpent: number
  joinedDate: string
  documents: { type: string; status: 'pending' | 'uploaded' | 'verified'; uploadedDate?: string }[]
}

export const pilgrims: Pilgrim[] = [
  { id: 'p-001', fullName: 'Mohammad Anwar', email: 'm.anwar@email.com', phone: '+1 (718) 555-2341', dateOfBirth: '1978-05-12', gender: 'male', nationality: 'American', passport: { number: 'A12345678', issueDate: '2021-08-15', expiryDate: '2031-08-14', country: 'USA' }, address: '245 Atlantic Ave, Apt 5B', city: 'Brooklyn', country: 'USA', avatar: 'from-blue-400 to-indigo-500', emergencyContact: { name: 'Khadija Anwar', relationship: 'Wife', phone: '+1 (718) 555-2342' }, bookingsCount: 3, totalSpent: 38497, joinedDate: '2022-04-10', documents: [{ type: 'Passport', status: 'verified', uploadedDate: '2025-11-20' }, { type: 'Photo', status: 'verified', uploadedDate: '2025-11-20' }, { type: 'Vaccination Cert', status: 'verified', uploadedDate: '2025-11-25' }] },
  { id: 'p-002', fullName: 'Aisha Khan', email: 'aisha.khan@email.com', phone: '+44 7700 900123', dateOfBirth: '1992-09-22', gender: 'female', nationality: 'British', passport: { number: 'GB987654321', issueDate: '2020-03-10', expiryDate: '2030-03-09', country: 'UK' }, address: '12 Whitechapel Rd', city: 'London', country: 'UK', avatar: 'from-rose-400 to-pink-500', emergencyContact: { name: 'Imran Khan', relationship: 'Brother', phone: '+44 7700 900124' }, bookingsCount: 1, totalSpent: 1749, joinedDate: '2025-11-15', documents: [{ type: 'Passport', status: 'verified', uploadedDate: '2025-12-08' }, { type: 'Photo', status: 'verified', uploadedDate: '2025-12-08' }, { type: 'Vaccination Cert', status: 'verified', uploadedDate: '2025-12-10' }] },
  { id: 'p-003', fullName: 'Yusuf Garcia', email: 'y.garcia@email.com', phone: '+1 (832) 555-9912', dateOfBirth: '1965-02-08', gender: 'male', nationality: 'American', passport: { number: 'A87654321', issueDate: '2022-11-20', expiryDate: '2032-11-19', country: 'USA' }, address: '8910 Kirby Dr', city: 'Houston', country: 'USA', avatar: 'from-emerald-400 to-teal-500', emergencyContact: { name: 'Layla Garcia', relationship: 'Wife', phone: '+1 (832) 555-9913' }, bookingsCount: 4, totalSpent: 78498, joinedDate: '2019-07-22', documents: [{ type: 'Passport', status: 'verified', uploadedDate: '2025-10-12' }, { type: 'Photo', status: 'verified', uploadedDate: '2025-10-12' }, { type: 'Vaccination Cert', status: 'verified', uploadedDate: '2025-10-15' }, { type: 'Medical Letter', status: 'verified', uploadedDate: '2025-10-15' }] },
  { id: 'p-004', fullName: 'Hafsa Bilal', email: 'h.bilal@email.com', phone: '+1 (416) 555-3344', dateOfBirth: '1985-11-30', gender: 'female', nationality: 'Canadian', passport: { number: 'CA1234567', issueDate: '2023-05-15', expiryDate: '2033-05-14', country: 'Canada' }, address: '450 Bloor St W', city: 'Toronto', country: 'Canada', avatar: 'from-violet-400 to-purple-500', emergencyContact: { name: 'Bilal Hafsa', relationship: 'Husband', phone: '+1 (416) 555-3345' }, bookingsCount: 2, totalSpent: 20198, joinedDate: '2023-12-05', documents: [{ type: 'Passport', status: 'verified', uploadedDate: '2025-09-30' }, { type: 'Photo', status: 'verified', uploadedDate: '2025-09-30' }, { type: 'Vaccination Cert', status: 'verified', uploadedDate: '2025-10-02' }] },
  { id: 'p-005', fullName: 'Ibrahim Diop', email: 'i.diop@email.com', phone: '+33 6 12 34 56 78', dateOfBirth: '1972-04-18', gender: 'male', nationality: 'French', passport: { number: 'FR12345678', issueDate: '2020-07-10', expiryDate: '2030-07-09', country: 'France' }, address: '34 Rue de la République', city: 'Paris', country: 'France', avatar: 'from-amber-400 to-orange-500', emergencyContact: { name: 'Fatou Diop', relationship: 'Wife', phone: '+33 6 12 34 56 79' }, bookingsCount: 2, totalSpent: 27246, joinedDate: '2020-11-12', documents: [{ type: 'Passport', status: 'verified', uploadedDate: '2025-09-15' }, { type: 'Photo', status: 'verified', uploadedDate: '2025-09-15' }, { type: 'Vaccination Cert', status: 'verified', uploadedDate: '2025-09-20' }] },
]

export const getPilgrim = (id: string) => pilgrims.find(p => p.id === id)
