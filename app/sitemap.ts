import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/constants'
import { automobileBrands } from '@/lib/products'

/**
 * XML Sitemap
 *
 * Only includes URLs that exist as pages. Product detail pages are not separate
 * routes (products are shown on brand pages), so we do not list /inventory/{product-slug}
 * to avoid 4xx "URL not allowed" / "Blocked due to other 4xx" in Search Console.
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

  // Brand hub pages only — /inventory/[brand] exists; /inventory/[product-slug] does not
  const brandPages: MetadataRoute.Sitemap = automobileBrands.map(({ slug }) => ({
    url: `${SITE_URL}/inventory/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }))

  return [...staticPages, ...brandPages]
}
