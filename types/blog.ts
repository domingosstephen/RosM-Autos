/**
 * Blog post types for the automated content engine.
 */

export interface BlogAuthor {
  name: string
  title: string
  bio: string
  image?: string
}

export interface BlogPost {
  slug: string
  title: string
  seoTitle: string
  seoDescription: string
  excerpt: string
  content: string // HTML content
  category: BlogCategory
  tags: string[]
  keywords: string[]
  author: BlogAuthor
  publishedAt: string // ISO date
  updatedAt: string // ISO date
  image: string
  imageAlt: string
  readingTime: number // minutes
  featured: boolean

  // AEO/GEO fields
  faqItems?: { question: string; answer: string }[]
  tldr?: string // Short summary for AI extraction

  // Internal linking — curated related posts (set by scripts/internal-linking.js)
  relatedSlugs?: string[]
}

export type BlogCategory =
  | 'buying-guide'
  | 'import-guide'
  | 'shipping'
  | 'market-insight'
  | 'vehicle-review'
  | 'country-guide'
  | 'tractor-guide'
  | 'industry-news'
  | 'comparison'
  | 'how-to'

export const BLOG_CATEGORIES: Record<BlogCategory, { label: string; description: string }> = {
  'buying-guide': {
    label: 'Buying Guide',
    description: 'Expert advice on purchasing used vehicles for export',
  },
  'import-guide': {
    label: 'Import Guide',
    description: 'Country-specific import duty, customs, and regulation guides',
  },
  shipping: {
    label: 'Shipping',
    description: 'RoRo, container shipping, and logistics information',
  },
  'market-insight': {
    label: 'Market Insight',
    description: 'Vehicle market trends, pricing data, and industry analysis',
  },
  'vehicle-review': {
    label: 'Vehicle Review',
    description: 'In-depth reviews of popular export vehicles and tractors',
  },
  'country-guide': {
    label: 'Country Guide',
    description: 'Complete vehicle import guides for specific countries',
  },
  'tractor-guide': {
    label: 'Tractor Guide',
    description: 'Farm tractor buying, maintenance, and export guides',
  },
  'industry-news': {
    label: 'Industry News',
    description: 'Latest news in vehicle export, trade regulations, and markets',
  },
  comparison: {
    label: 'Comparison',
    description: 'Side-by-side vehicle and shipping comparisons',
  },
  'how-to': {
    label: 'How-To',
    description: 'Step-by-step guides for vehicle import processes',
  },
}
