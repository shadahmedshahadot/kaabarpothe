export type SEODefaults = {
  pageKey: string;
  pagePath: string;
  pageName: string;
  title?: string;
  metaDescription?: string;
  keywords?: string[];
  robots?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string;
  twitterCard?: string;
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
};

export const DEFAULT_LOCALE = 'bn-BD';

export const STATIC_PAGE_REGISTRY: SEODefaults[] = [
  {
    pageKey: 'home',
    pagePath: '/',
    pageName: 'Home',
    title: 'কাবার পথে | পবিত্র হজ ও উমরাহ যাত্রা',
    metaDescription:
      'বিশ্বস্ত হজ ও উমরাহ প্যাকেজ, পবিত্র ভ্রমণ পরিকল্পনা ও পরিপূর্ণ সেবা কাবার পথে থেকে।',
    keywords: ['হজ', 'উমরাহ', 'পবিত্র যাত্রা', 'মক্কা', 'মদিনা'],
    robots: 'index,follow',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'কাবার পথে',
        url: 'https://www.kaabarpothe.com',
      },
    ],
  },
  {
    pageKey: 'about',
    pagePath: '/about',
    pageName: 'About',
    title: 'আমাদের সম্পর্কে | কাবার পথে',
    metaDescription:
      'আমাদের মিশন, দর্শন ও অভিজ্ঞ দল সম্পর্কে জানুন। আমরা আপনার পবিত্র হজ ও উমরাহ যাত্রার সঙ্গী।',
    robots: 'index,follow',
    ogType: 'website',
    twitterCard: 'summary_large_image',
  },
  {
    pageKey: 'contact',
    pagePath: '/contact',
    pageName: 'Contact',
    title: 'যোগাযোগ | কাবার পথে',
    metaDescription:
      'আপনার প্রশ্ন বা বুকিং নিয়ে আমাদের সাথে যোগাযোগ করুন। আমাদের দল সবসময় সহায়তার জন্য প্রস্তুত।',
    robots: 'index,follow',
    ogType: 'website',
    twitterCard: 'summary_large_image',
  },
  {
    pageKey: 'faq',
    pagePath: '/faq',
    pageName: 'FAQ',
    title: 'সচরাচর জিজ্ঞাসা | কাবার পথে',
    metaDescription:
      'হজ ও উমরাহ যাত্রা সম্পর্কে গুরুত্বপূর্ণ প্রশ্ন ও উত্তর। ভিসা, ফ্লাইট, হোটেল ও ইতিহাস।',
    robots: 'index,follow',
    ogType: 'website',
    twitterCard: 'summary_large_image',
  },
  {
    pageKey: 'reviews',
    pagePath: '/reviews',
    pageName: 'Reviews',
    title: 'পিলগ্রিমদের প্রতিক্রিয়া | কাবার পথে',
    metaDescription:
      'আমাদের যাত্রীদের প্রকৃত অভিজ্ঞতা ও রিভিউ পড়ুন এবং আপনার পবিত্র যাত্রার জন্য অনুপ্রাণিত হোন।',
    robots: 'index,follow',
    ogType: 'website',
    twitterCard: 'summary_large_image',
  },
  {
    pageKey: 'packages-hajj',
    pagePath: '/packages/hajj',
    pageName: 'Hajj Packages',
    title: 'হজ প্যাকেজ | কাবার পথে',
    metaDescription:
      'বাজেট থেকে লাক্সারি পর্যন্ত সমস্ত হজ প্যাকেজ ব্রাউজ করুন। ভিসা, হোটেল ও পরিবহন অন্তর্ভুক্ত।',
    keywords: ['হজ প্যাকেজ', 'হজ ২০২৬', 'বাংলাদেশ থেকে হজ'],
    robots: 'index,follow',
    ogType: 'website',
    twitterCard: 'summary_large_image',
  },
  {
    pageKey: 'packages-umrah',
    pagePath: '/packages/umrah',
    pageName: 'Umrah Packages',
    title: 'উমরাহ প্যাকেজ | কাবার পথে',
    metaDescription:
      'সারা বছর ধরে বিভিন্ন উমরাহ প্যাকেজ। মক্কা ও মদিনায় আপনার পবিত্র যাত্রার জন্য।',
    keywords: ['উমরাহ প্যাকেজ', 'উমরাহ ২০২৬'],
    robots: 'index,follow',
    ogType: 'website',
    twitterCard: 'summary_large_image',
  },
  {
    pageKey: 'transportation',
    pagePath: '/transportation',
    pageName: 'Transportation',
    title: 'পরিবহন সেবা | কাবার পথে',
    metaDescription:
      'বিমানবন্দর ট্রান্সফার, আন্তঃশহর ও জিয়ারত ভ্রমণের জন্য বিশ্বস্ত পরিবহন সেবা।',
    robots: 'index,follow',
    ogType: 'website',
    twitterCard: 'summary_large_image',
  },
  {
    pageKey: 'privacy',
    pagePath: '/privacy',
    pageName: 'Privacy Policy',
    title: 'গোপনীয়তা নীতি | কাবার পথে',
    metaDescription:
      'আমরা কীভাবে আপনার ব্যক্তিগত তথ্য সংগ্রহ, ব্যবহার ও সুরক্ষিত রাখি তা জানুন।',
    robots: 'index,follow',
    ogType: 'website',
    twitterCard: 'summary',
  },
  {
    pageKey: 'terms',
    pagePath: '/terms',
    pageName: 'Terms & Conditions',
    title: 'শর্তাবলী | কাবার পথে',
    metaDescription:
      'আমাদের সেবা ব্যবহারের শর্তাবলী, বুকিং নীতি ও দায়বদ্ধতা।',
    robots: 'index,follow',
    ogType: 'website',
    twitterCard: 'summary',
  },
];

export const DEFAULT_GLOBAL_SEO = {
  siteName: 'কাবার পথে',
  defaultTitle: 'কাবার পথে | পবিত্র হজ ও উমরাহ যাত্রা',
  defaultTitleTemplate: '%s | কাবার পথে',
  defaultDescription:
    'বাংলাদেশ থেকে হজ ও উমরাহ যাত্রার বিশ্বস্ত সঙ্গী। অভিজ্ঞ দল, স্বচ্ছ মূল্য ও পূর্ণ সেবা।',
  defaultKeywords: ['হজ', 'উমরাহ', 'কাবার পথে', 'বাংলাদেশ হজ'],
  defaultOgImage: 'https://www.kaabarpothe.com/logo.jpeg',
  defaultOgImageAlt: 'কাবার পথে',
  defaultOgType: 'website',
  defaultOgSiteName: 'কাবার পথে',
  defaultOgLocale: 'bn_BD',
  defaultTwitterCard: 'summary_large_image',
  defaultTwitterImage: 'https://www.kaabarpothe.com/logo.jpeg',
  defaultRobots: 'index,follow',
  themeColor: '#0f172a',
  themeColorDark: '#020617',
  siteUrl: 'https://www.kaabarpothe.com',
  favicon: '/favicon.svg',
  appleTouchIcon: '/apple-icon.png',
  organizationJsonLd: {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: 'কাবার পথে',
    url: 'https://www.kaabarpothe.com',
    logo: 'https://www.kaabarpothe.com/logo.jpeg',
  },
  websiteJsonLd: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'কাবার পথে',
    url: 'https://www.kaabarpothe.com',
  },
};
