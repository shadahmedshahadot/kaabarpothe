import { Analytics } from '@vercel/analytics/next'
import { Geist, Geist_Mono } from 'next/font/google'
import type { Metadata } from 'next'
import './globals.css'
import { GoogleAnalytics } from '@/components/common/google-analytics'
import { rootMetadata, rootViewport } from '@/constants/metadata'
import GlobalProvider from '@/providers/globalProvider'
import { fetchGlobalSEO } from '@/lib/seo'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const viewport = rootViewport

export async function generateMetadata(): Promise<Metadata> {
  const global = await fetchGlobalSEO()
  if (!global) return rootMetadata

  return {
    ...rootMetadata,
    metadataBase: new URL(global.siteUrl || rootMetadata.metadataBase!.toString()),
    title: {
      default: global.defaultTitle,
      template: global.defaultTitleTemplate,
    },
    description: global.defaultDescription,
    keywords: global.defaultKeywords?.length
      ? global.defaultKeywords
      : rootMetadata.keywords,
    applicationName: global.siteName || rootMetadata.applicationName,
    openGraph: {
      ...rootMetadata.openGraph,
      siteName: global.defaultOgSiteName || global.siteName || rootMetadata.openGraph?.siteName,
      locale: global.defaultOgLocale || rootMetadata.openGraph?.locale,
      images: global.defaultOgImage
        ? [
            {
              url: global.defaultOgImage,
              width: 1200,
              height: 630,
              alt: global.defaultOgImageAlt || global.siteName,
            },
          ]
        : rootMetadata.openGraph?.images,
    },
    twitter: {
      ...rootMetadata.twitter,
      card:
        (global.defaultTwitterCard as 'summary' | 'summary_large_image') ??
        'summary_large_image',
      site: global.defaultTwitterSite ?? rootMetadata.twitter?.site,
      creator: global.defaultTwitterCreator ?? rootMetadata.twitter?.creator,
      images: global.defaultTwitterImage
        ? [global.defaultTwitterImage]
        : rootMetadata.twitter?.images,
    },
    verification: {
      google: global.verificationGoogle || undefined,
      yandex: global.verificationYandex || undefined,
      other: {
        ...(global.verificationBing
          ? { 'msvalidate.01': global.verificationBing }
          : {}),
        ...(global.verificationFacebook
          ? { 'facebook-domain-verification': global.verificationFacebook }
          : {}),
      },
    },
    icons: {
      ...(typeof rootMetadata.icons === 'object' && rootMetadata.icons !== null
        ? (rootMetadata.icons as Record<string, unknown>)
        : {}),
      apple:
        global.appleTouchIcon ||
        (typeof rootMetadata.icons === 'object' && rootMetadata.icons !== null
          ? (rootMetadata.icons as { apple?: string }).apple
          : undefined),
      shortcut:
        global.favicon ||
        (typeof rootMetadata.icons === 'object' && rootMetadata.icons !== null
          ? (rootMetadata.icons as { shortcut?: string }).shortcut
          : undefined),
    },
  }
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="bn-BD" dir="ltr" className={`${geistSans.variable} ${geistMono.variable} bg-background scroll-smooth`}>
      <body className="font-sans antialiased text-foreground overflow-x-hidden">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-foreground focus:text-background focus:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          মূল কন্টেন্টে যান
        </a>
        <GlobalProvider>{children}</GlobalProvider>
        <Analytics />
        <GoogleAnalytics />
      </body>
    </html>
  )
}
