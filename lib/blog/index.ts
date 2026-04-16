/**
 * Blog utilities — reads blog posts from /content/blog/*.json
 */

import fs from 'fs'
import path from 'path'
import type { BlogPost, BlogCategory } from '@/types/blog'

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

/**
 * Get all published blog posts sorted by date (newest first).
 */
export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return []

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.json'))

  const posts: BlogPost[] = files
    .map((file) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8')
      return JSON.parse(raw) as BlogPost
    })
    .filter((post) => new Date(post.publishedAt) <= new Date())
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

  return posts
}

/**
 * Get a single post by slug.
 */
export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.json`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(raw) as BlogPost
}

/**
 * Get all unique slugs for generateStaticParams.
 */
export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return []

  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.json'))
    .map((f) => f.replace('.json', ''))
}

/**
 * Get posts by category.
 */
export function getPostsByCategory(category: BlogCategory): BlogPost[] {
  return getAllPosts().filter((post) => post.category === category)
}

/**
 * Get related posts — prefers curated relatedSlugs, falls back to same-category.
 */
export function getRelatedPosts(currentSlug: string, limit = 3): BlogPost[] {
  const current = getPostBySlug(currentSlug)
  if (!current) return []

  // Use curated relatedSlugs if available
  if (current.relatedSlugs && current.relatedSlugs.length > 0) {
    const curated = current.relatedSlugs
      .map((slug) => getPostBySlug(slug))
      .filter((p): p is BlogPost => p !== null)
      .slice(0, limit)
    if (curated.length >= limit) return curated

    // Fill remaining slots with same-category posts
    const curatedSlugs = new Set(curated.map((p) => p.slug))
    const fallback = getAllPosts()
      .filter((p) => p.slug !== currentSlug && !curatedSlugs.has(p.slug) && p.category === current.category)
      .slice(0, limit - curated.length)
    return [...curated, ...fallback]
  }

  return getAllPosts()
    .filter((p) => p.slug !== currentSlug && p.category === current.category)
    .slice(0, limit)
}

/**
 * Get featured posts for homepage or sidebar.
 */
export function getFeaturedPosts(limit = 6): BlogPost[] {
  const all = getAllPosts()
  const featured = all.filter((p) => p.featured)
  if (featured.length >= limit) return featured.slice(0, limit)
  return all.slice(0, limit)
}
