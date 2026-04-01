import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/constants'
import { automobileBrands } from '@/lib/products'
import { getAllPosts } from '@/lib/blog'

/**
 * XML Sitemap — includes static pages, brand pages, and blog posts.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  // Core static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE_URL}/inventory`, lastModified: now, changeFrequency: 'daily', priority: 0.95 },
    { url: `${SITE_URL}/inventory/tractors`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/how-it-works`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/shipping`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: 'daily', priority: 0.85 },
  ]

  // Brand hub pages
  const brandPages: MetadataRoute.Sitemap = automobileBrands.map(({ slug }) => ({
    url: `${SITE_URL}/inventory/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }))

  // Blog posts — each post gets its own sitemap entry
  const blogPosts = getAllPosts()
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...brandPages, ...blogPages]
}
