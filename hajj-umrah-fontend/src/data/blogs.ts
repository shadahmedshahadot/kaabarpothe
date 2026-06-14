export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  author: string
  authorRole: string
  authorAvatar: string
  category: string
  tags: string[]
  cover: string
  readTime: number
  publishedDate: string
  views: number
  featured: boolean
}

const longContent = (intro: string, sections: { heading: string; body: string }[]) => {
  return `${intro}\n\n${sections.map(s => `## ${s.heading}\n\n${s.body}`).join('\n\n')}`
}

export const blogs: BlogPost[] = [
  {
    id: 'blg-001', slug: 'complete-hajj-preparation-checklist',
    title: 'The Complete Hajj Preparation Checklist: 90 Days Before Departure',
    excerpt: 'A practical week-by-week guide to physical, financial, and spiritual preparation for your Hajj journey.',
    content: longContent(
      'Preparing for Hajj is not just about packing a suitcase. It is a 90-day transformation of the body, finances, and soul. This guide walks you through every week leading to your sacred journey.',
      [
        { heading: '90 Days Out: Documents & Health', body: 'Begin with passport validity (must be valid 6+ months after return), apply for your visa via your booking team, and schedule mandatory vaccinations including meningitis (ACWY) and seasonal flu. Visit your physician for a baseline checkup, especially if you have chronic conditions.' },
        { heading: '60 Days Out: Physical Preparation', body: 'Hajj involves significant walking — sometimes 15-25 kilometers per day during peak rituals. Begin a daily walking routine of 5km, gradually increasing. Practice in the same shoes you intend to wear. Build endurance with stair climbing and stretching.' },
        { heading: '30 Days Out: Financial & Spiritual', body: 'Settle outstanding debts and discuss your absence with your employer. Pay any pending zakat. Make a will if you have not already. Begin daily Quran recitation focused on Surah Al-Baqarah verses 196-203 (Hajj rulings). Increase voluntary prayers.' },
        { heading: '14 Days Out: Logistics & Packing', body: 'Confirm flight details, hotel addresses, and emergency contacts. Pack two ihrams (men), modest abayas (women), comfortable sandals, prayer mat, small zamzam container, basic medications, and a money belt. Print all confirmations.' },
        { heading: '7 Days Out: Final Spiritual Prep', body: 'Seek forgiveness from family and friends. Make sincere taubah. Pray Istikharah for safe travel. Memorize key duas: Talbiyah, dua at Multazam, dua on Arafat. Inform community of your travel for their duas.' },
        { heading: 'Departure Day', body: 'Wake for Tahajjud. Pray two rakat for travel. Recite Bismillah and travel dua entering the vehicle. Maintain ablution from the time of departure. Begin Talbiyah after donning Ihram at the Miqat. You are now Allah\'s guest.' },
      ]
    ),
    author: 'Sheikh Ahmad bin Khalil', authorRole: 'Hajj Scholar',
    authorAvatar: 'from-amber-400 to-orange-500',
    category: 'Hajj Preparation',
    tags: ['Hajj', 'Checklist', 'Preparation', 'Spiritual'],
    cover: 'from-amber-400 via-orange-400 to-rose-400',
    readTime: 12, publishedDate: '2026-01-15', views: 14820, featured: true,
  },
  {
    id: 'blg-002', slug: 'umrah-vs-hajj-key-differences',
    title: 'Umrah vs Hajj: Understanding the Key Differences',
    excerpt: 'Clear, scholarly explanation of how Umrah and Hajj differ in obligation, timing, and rituals.',
    content: longContent(
      'Many Muslims use the terms Umrah and Hajj interchangeably, but they are distinct acts of worship with important differences. Understanding these is essential for any pilgrim.',
      [
        { heading: 'Obligation', body: 'Hajj is one of the five pillars of Islam, obligatory once in a lifetime upon every adult Muslim with the physical and financial means. Umrah is highly recommended (sunnah muakkadah) according to most scholars but not obligatory — though some scholars hold it is obligatory once in a lifetime.' },
        { heading: 'Timing', body: 'Hajj can only be performed during specific days of the month of Dhul Hijjah (8th through 13th). Umrah can be performed at any time of the year, with extra reward during Ramadan equivalent to performing Hajj according to authentic hadith.' },
        { heading: 'Rituals', body: 'Umrah consists of four main rites: Ihram, Tawaf, Sa\'i, and Halq/Taqsir. Hajj includes all of these plus Wuquf at Arafat, staying at Muzdalifah, stoning the Jamarat, and offering a sacrifice (Qurbani).' },
        { heading: 'Duration', body: 'Umrah typically takes a few hours to complete the rituals, though pilgrims often stay 7-14 days for spiritual benefit. Hajj rituals span 5-6 days, with most packages running 18-25 days total to include time in Madinah.' },
        { heading: 'Cost', body: 'Umrah is generally more affordable, starting from $1,200 for budget packages. Hajj prices begin around $6,500 due to longer stays, additional permits, Mina arrangements, and the Qurbani requirement.' },
      ]
    ),
    author: 'Dr. Yusuf Ibrahim', authorRole: 'Islamic Scholar',
    authorAvatar: 'from-emerald-400 to-teal-500',
    category: 'Education',
    tags: ['Hajj', 'Umrah', 'Education', 'Differences'],
    cover: 'from-emerald-400 via-teal-400 to-cyan-400',
    readTime: 8, publishedDate: '2026-02-03', views: 9240, featured: true,
  },
  {
    id: 'blg-003', slug: 'choosing-right-hajj-package',
    title: 'How to Choose the Right Hajj Package for Your Family',
    excerpt: 'Six factors to weigh when selecting from Economy, Standard, Premium, and VIP Hajj tiers.',
    content: longContent(
      'With Hajj package tiers ranging from $6,500 to over $25,000 per person, choosing the right one requires careful evaluation. Here are six factors to guide your decision.',
      [
        { heading: '1. Budget Reality', body: 'Be honest about what you can afford without going into debt. Allah does not obligate Hajj on those without means. Economy packages provide all rituals fully — luxury is a comfort, not a requirement.' },
        { heading: '2. Physical Condition', body: 'For senior pilgrims or those with mobility issues, Premium or VIP packages with closer hotels and private transport are worth the investment. Walking even 500 meters in 45°C heat is exhausting.' },
        { heading: '3. Group Size Preference', body: 'Budget and Economy tiers have 40-60 pilgrims per group. Premium has 20-30. VIP has 10-15. If you value personal scholarly attention and quieter groups, invest accordingly.' },
        { heading: '4. Hotel Distance from Haram', body: 'A 5-star hotel 500m away is more convenient than a 4-star directly adjacent — for some. For elderly pilgrims, direct adjacency is invaluable. Calculate walking minutes, not just distance.' },
        { heading: '5. Mina Tent Category', body: 'Tents are categorized A through D. A-category has hotel-style amenities; D-category is basic shared dormitory-style. Five nights at Mina in extreme heat make this matter more than you might expect.' },
        { heading: '6. Scholar & Group Leader', body: 'Quality of scholarly guidance varies enormously. Read reviews specifically about the group leader. A knowledgeable, compassionate scholar transforms the experience from logistics to deep spiritual journey.' },
      ]
    ),
    author: 'Fatima Zahra Malik', authorRole: 'Travel Specialist',
    authorAvatar: 'from-rose-400 to-pink-500',
    category: 'Travel Tips',
    tags: ['Hajj', 'Packages', 'Family', 'Decision Guide'],
    cover: 'from-rose-400 via-pink-400 to-fuchsia-400',
    readTime: 10, publishedDate: '2026-02-18', views: 11320, featured: true,
  },
  {
    id: 'blg-004', slug: 'best-time-for-umrah',
    title: 'The Best Time to Perform Umrah: Month-by-Month Guide',
    excerpt: 'Weather, crowd levels, and spiritual significance for every month of the Hijri calendar.',
    content: longContent(
      'Umrah can be performed any time of the year, but each month offers a different experience. This guide helps you choose based on your priorities.',
      [
        { heading: 'Ramadan: Maximum Reward, Maximum Crowds', body: 'Umrah in Ramadan equals Hajj in reward per the Prophet ﷺ. Expect crowds 5x normal, hotel prices 3x normal. Book 8-12 months ahead. Last 10 nights are particularly intense.' },
        { heading: 'Shawwal to Dhul Qadah: Sweet Spot', body: 'Cooler weather (October-November), moderate crowds, and standard pricing. Many consider this the best balance for a peaceful spiritual experience.' },
        { heading: 'Muharram to Safar: Quietest Period', body: 'After Hajj season ends, Makkah becomes notably quieter through early Rabi al-Awwal. Excellent for elderly pilgrims and first-timers who want a less overwhelming experience.' },
        { heading: 'Rabi al-Awwal to Jumada: Pleasant Spring', body: 'Mild weather (15-25°C), moderate crowds, and good prices. February through May is ideal for families with children.' },
        { heading: 'Rajab to Shaban: Pre-Ramadan Rush', body: 'Crowds begin building. Prices increase. Many pilgrims combine Umrah with stays leading into Ramadan. Plan accordingly.' },
      ]
    ),
    author: 'Omar Hassan', authorRole: 'Senior Scholar',
    authorAvatar: 'from-blue-400 to-cyan-500',
    category: 'Travel Tips',
    tags: ['Umrah', 'Timing', 'Calendar', 'Planning'],
    cover: 'from-blue-400 via-cyan-400 to-teal-400',
    readTime: 7, publishedDate: '2026-03-02', views: 7820, featured: false,
  },
  {
    id: 'blg-005', slug: 'what-to-pack-for-umrah',
    title: 'What to Pack for Umrah: The Essential Packing List',
    excerpt: 'Detailed packing list for men and women, with climate considerations for each season.',
    content: longContent(
      'Pack light, pack smart. Excess luggage is a burden during transfers between hotels and Mina. This list covers absolute essentials.',
      [
        { heading: 'For Men', body: 'Two complete Ihram sets (one as backup), Ihram belt with pouch, prayer cap, comfortable sandals (broken in), 3-4 sets of comfortable clothing for after Tahallul, undergarments (5-7 sets), prayer mat.' },
        { heading: 'For Women', body: 'Modest abayas (3-4), hijabs (5-7), comfortable walking shoes, undergarments (7+ sets), prayer clothes, personal hygiene products for the entire stay.' },
        { heading: 'Health & Hygiene', body: 'Prescription medications with copies of prescriptions, basic first aid (band-aids, antiseptic), pain relievers, anti-diarrheal, hand sanitizer, sunscreen SPF 50+, lip balm, moisturizer for dry climate.' },
        { heading: 'Documents', body: 'Passport with visa, printed flight tickets, hotel confirmations, travel insurance, photocopies of all documents stored separately, emergency contacts written on paper (not just phone).' },
        { heading: 'Useful Items', body: 'Small backpack for Tawaf, refillable water bottle, small zamzam container (5L), prayer beads, pocket Quran, phone with offline maps and translation apps, universal adapter, power bank.' },
      ]
    ),
    author: 'Aisha Rahmani', authorRole: 'Travel Specialist',
    authorAvatar: 'from-violet-400 to-purple-500',
    category: 'Travel Tips',
    tags: ['Umrah', 'Packing', 'Essentials', 'Checklist'],
    cover: 'from-violet-400 via-purple-400 to-fuchsia-400',
    readTime: 6, publishedDate: '2026-01-28', views: 12450, featured: false,
  },
  {
    id: 'blg-006', slug: 'spiritual-significance-tawaf',
    title: 'The Spiritual Significance of Tawaf: More Than Walking',
    excerpt: 'A scholarly meditation on the meaning, history, and inner dimensions of the seven circumambulations.',
    content: longContent(
      'Tawaf is the act of circumambulating the Kaaba seven times. Outwardly it is walking. Inwardly it is the soul orbiting the throne of God\'s love.',
      [
        { heading: 'Historical Origin', body: 'The Kaaba was first built by Adam (peace be upon him) and rebuilt by Ibrahim and Ismail. The Tawaf is older than recorded history — angels themselves perform Tawaf around the Bayt al-Mamur in the heavens, of which the Kaaba is the earthly reflection.' },
        { heading: 'Outer Form', body: 'Begin from the Black Stone with Takbeer, complete seven rounds counter-clockwise, perform Raml (slight jog) in the first three rounds for men, end with two rakat behind Maqam Ibrahim and drink Zamzam.' },
        { heading: 'Inner Meaning', body: 'Each round dissolves a layer of self. The first round, you arrive as you are. By the seventh, you have nothing but the love of Allah. The Kaaba is the center; you orbit because the soul belongs to the One.' },
        { heading: 'Etiquette', body: 'Maintain dhikr — do not chat. Keep your eyes lowered. Do not push. Help the elderly. Remember the Prophet ﷺ said Tawaf is a prayer, except that Allah has permitted speech within it — meaning the dignity of prayer must be maintained.' },
      ]
    ),
    author: 'Sheikh Yusuf Ibrahim', authorRole: 'Islamic Scholar',
    authorAvatar: 'from-emerald-400 to-teal-500',
    category: 'Spirituality',
    tags: ['Tawaf', 'Spirituality', 'Kaaba', 'Worship'],
    cover: 'from-emerald-400 via-green-400 to-teal-400',
    readTime: 9, publishedDate: '2026-02-25', views: 6890, featured: false,
  },
  {
    id: 'blg-007', slug: 'first-time-umrah-mistakes',
    title: '10 Common Mistakes First-Time Umrah Pilgrims Make',
    excerpt: 'Avoid these costly and spiritual mistakes that almost every first-time pilgrim makes.',
    content: longContent(
      'Twenty years of guiding first-time pilgrims has taught us the patterns. These ten mistakes are nearly universal — but every one is avoidable.',
      [
        { heading: '1. Overpacking', body: 'You will buy souvenirs. Leave half your suitcase empty.' },
        { heading: '2. Ignoring Physical Prep', body: 'Walking 15km daily without training causes injuries. Start walking 3 months out.' },
        { heading: '3. Skipping Visa Insurance', body: 'Mandatory medical insurance is included, but upgrade to comprehensive. Hospital bills in Saudi are high without coverage.' },
        { heading: '4. Wrong Ihram Wrap', body: 'Practice donning Ihram before travel. YouTube tutorials work. Wearing it wrong invalidates aspects of your worship.' },
        { heading: '5. Not Learning Duas', body: 'Memorize key duas in Arabic. Reading from paper while crying in Tawaf is awkward and disconnects you.' },
        { heading: '6. Phone Distraction', body: 'Live streaming Tawaf for Instagram defeats the purpose. Be present.' },
        { heading: '7. Wrong Shoes', body: 'New shoes equal blisters. Bring broken-in walking sandals.' },
        { heading: '8. Skipping Madinah', body: 'Even if your time is limited, do not skip visiting Masjid an-Nabawi. Many regret this.' },
        { heading: '9. Buying Cheap Zamzam', body: 'Buy Zamzam only from official sources at the Haram or from our office. Counterfeits exist.' },
        { heading: '10. Forgetting to Make Dua for Others', body: 'The dua of one performing Umrah is special. Carry a list of people who asked for your prayers.' },
      ]
    ),
    author: 'Khadija Suleiman', authorRole: 'Senior Scholar',
    authorAvatar: 'from-orange-400 to-red-500',
    category: 'Travel Tips',
    tags: ['Umrah', 'First-Time', 'Mistakes', 'Tips'],
    cover: 'from-orange-400 via-red-400 to-rose-400',
    readTime: 8, publishedDate: '2026-03-10', views: 18750, featured: true,
  },
  {
    id: 'blg-008', slug: 'visiting-madinah-guide',
    title: 'Visiting Madinah: A Complete Guide to the City of the Prophet',
    excerpt: 'Historical sites, etiquette at Masjid an-Nabawi, and the lost places most pilgrims miss.',
    content: longContent(
      'Madinah is not a side trip. It is the spiritual culmination of your journey. This guide ensures you experience it fully.',
      [
        { heading: 'Masjid an-Nabawi', body: 'The Prophet ﷺ said: One prayer here is better than 1,000 prayers elsewhere, except Masjid al-Haram. Aim for 40 prayers (8 days of all 5). Visit the Rawdah daily — separate timings for men and women.' },
        { heading: 'The Rawdah Sharif', body: 'The garden of paradise between the Prophet\'s tomb and his minbar. Pray two rakat here. Send salawat. Maintain whispered voice and decorum. Free e-tasreeh required — book via Nusuk app or our team.' },
        { heading: 'Quba Mosque', body: 'The first mosque in Islam. Praying two rakat here equals an Umrah in reward. Visit on Saturday morning per the Sunnah of the Prophet ﷺ.' },
        { heading: 'Mount Uhud & The Martyrs', body: 'Site of the Battle of Uhud (3 AH). Visit the cemetery of the 70 martyrs including Hamza ibn Abdul Muttalib. Read Surah Yaseen and reflect.' },
        { heading: 'Masjid al-Qiblatain', body: 'The mosque of two qiblas where the verse changing the direction of prayer from Jerusalem to Makkah was revealed during prayer.' },
        { heading: 'Date Farms', body: 'Madinah\'s ajwa dates are mentioned in hadith as protection from poison. Visit a farm, taste fresh dates, and bring some home.' },
      ]
    ),
    author: 'Maryam al-Zahrani', authorRole: 'Senior Scholar',
    authorAvatar: 'from-teal-400 to-emerald-500',
    category: 'Destinations',
    tags: ['Madinah', 'Ziyarat', 'Travel Guide', 'Spirituality'],
    cover: 'from-teal-400 via-emerald-400 to-green-400',
    readTime: 11, publishedDate: '2026-03-20', views: 8460, featured: false,
  },
]

export const getBlog = (slug: string) => blogs.find(b => b.slug === slug)
export const getFeaturedBlogs = () => blogs.filter(b => b.featured)
