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
    default: `${SITE_NAME} | Quality Used Vehicles for International Export`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'used cars for export',
    'buy used vehicles online',
    'international car export',
    'used farm tractors',
    'electric bikes for sale',
    'vehicle shipping Africa',
    'car export South America',
    'used automobiles Eastern Europe',
    'quality inspected vehicles',
    'RosM Autos',
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
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
}
