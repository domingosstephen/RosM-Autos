import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/constants'
import { allProducts } from '@/lib/products'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: `${SITE_URL}/inventory`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${SITE_URL}/how-it-works`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${SITE_URL}/shipping`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${SITE_URL}/faq`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${SITE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${SITE_URL}/blog`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.6 },
  ]

  const productPages = allProducts.map((product) => ({
    url: `${SITE_URL}/inventory/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...productPages]
}
