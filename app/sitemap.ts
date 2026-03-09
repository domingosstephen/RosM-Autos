import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/constants'
import { allProducts, automobileBrands } from '@/lib/products'

/**
 * XML Sitemap
 *
 * SOP §3.1.1 — Dynamically generated, submitted to Google Search Console and
 *              Bing Webmaster Tools. Every published URL included.
 *              Brand pages and tractors page added so crawlers discover them.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  // Core static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL,                              lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${SITE_URL}/inventory`,               lastModified: now, changeFrequency: 'daily',   priority: 0.95 },
    { url: `${SITE_URL}/inventory/tractors`,      lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${SITE_URL}/how-it-works`,            lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/shipping`,                lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/faq`,                     lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${SITE_URL}/about`,                   lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/contact`,                 lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/blog`,                    lastModified: now, changeFrequency: 'weekly',  priority: 0.65 },
  ]

  // Brand hub pages — one per car brand (SOP §3.1.1 — no orphan pages)
  const brandPages: MetadataRoute.Sitemap = automobileBrands.map(({ slug }) => ({
    url: `${SITE_URL}/inventory/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }))

  // Individual product pages
  const productPages: MetadataRoute.Sitemap = allProducts.map((product) => ({
    url: `${SITE_URL}/inventory/${product.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...brandPages, ...productPages]
}
