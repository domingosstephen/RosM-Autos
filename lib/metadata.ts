/**
 * Metadata — SOP §4.2
 * Title tags: 55-60 chars, primary keyword near front, brand at end.
 * Meta descriptions: 140-160 chars, primary keyword + value prop + CTA.
 * Keywords: comprehensive coverage of vehicle brands, body types, target
 *           markets, and informational queries (GEO/AEO §7 & §8).
 */

import type { Metadata } from 'next'
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from './constants'

interface PageMetaInput {
  title: string
  description: string
  path: string
  ogImage?: string
}

export function createPageMetadata({
  title,
  description,
  path,
  ogImage,
}: PageMetaInput): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`
  const url = `${SITE_URL}${path}`

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: ogImage || `${SITE_URL}/icons/og-image.png`,
          width: 1200,
          height: 630,
          alt: `${title} - ${SITE_NAME}`,
        },
      ],
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage || `${SITE_URL}/icons/og-image.png`],
    },
  }
}

export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Used Cars & Tractors for Export from Germany`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,

  // SOP §4.2 — comprehensive keyword set covering vehicle brands, body types,
  // target markets (Africa, South America, Eastern Europe), and buyer intent queries.
  keywords: [
    // Core service
    'used cars for export',
    'used vehicles for export',
    'buy used car from Germany',
    'vehicle export Germany',
    'international car export',
    'car export Africa',
    'car export South America',
    'used automobiles Eastern Europe',

    // Vehicle brands (SOP §2.2 topical authority — brand cluster)
    'used Toyota for export',
    'used Mercedes-Benz for export',
    'used Ford for export',
    'used Nissan for export',
    'used Isuzu for export',
    'Toyota Land Cruiser export',
    'Toyota Hilux export',
    'Toyota RAV4 export',
    'Toyota Highlander export',
    'Mercedes-Benz GLE export',
    'Mercedes-Benz Sprinter export',
    'Ford Ranger export Africa',
    'Ford Raptor export',
    'Nissan Navara export',
    'Isuzu D-Max export',

    // Tractors
    'used farm tractors for export',
    'buy used tractor online',
    'farm tractor export Africa',
    'agricultural equipment export Germany',

    // Target markets (GEO — SOP §6.4 geo-targeted content)
    'buy car Nigeria from Germany',
    'buy car Ghana from Germany',
    'buy car Kenya from Germany',
    'buy car Tanzania from Germany',
    'buy car Uganda Germany',
    'buy car South Africa import',
    'vehicle import Brazil',
    'used cars Poland from Germany',
    'used cars Romania from Germany',
    'vehicle export Ukraine',

    // Informational / AEO queries (SOP §8.2 PAA targets)
    'how to buy used car from Germany',
    'how to import used car from Germany',
    'vehicle export shipping Germany',
    'used car export documentation',
    'RoRo shipping used cars',
    'container shipping used vehicles',
    'used car inspection export',
    'quality used vehicles international',

    // Brand
    'RosM Autos',
    'rosm-autos.com',
  ],

  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  alternates: {
    canonical: SITE_URL,
  },

  // Verification — add Search Console / Bing verification codes here when available
  // verification: {
  //   google: 'YOUR_GOOGLE_SITE_VERIFICATION_CODE',
  //   yandex: 'YOUR_YANDEX_CODE',
  //   bing: 'YOUR_BING_CODE',
  // },

  category: 'automotive',
}
