/**
 * Publisher — Writes generated blog posts to /content/blog/ as JSON files.
 */

import fs from 'fs'
import path from 'path'
import type { BlogPost } from '../../types/blog'

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')
const PUBLISHED_LOG = path.join(process.cwd(), 'scripts', 'blog-engine', 'published.json')

/**
 * Ensure the blog content directory exists.
 */
function ensureDir() {
  if (!fs.existsSync(BLOG_DIR)) {
    fs.mkdirSync(BLOG_DIR, { recursive: true })
  }
}

/**
 * Get list of already-published topic titles to avoid duplicates.
 */
export function getPublishedTopics(): string[] {
  if (!fs.existsSync(PUBLISHED_LOG)) return []
  const data = JSON.parse(fs.readFileSync(PUBLISHED_LOG, 'utf-8'))
  return data.published || []
}

/**
 * Mark a topic as published.
 */
export function markPublished(topicTitle: string) {
  const existing = getPublishedTopics()
  existing.push(topicTitle)
  fs.writeFileSync(PUBLISHED_LOG, JSON.stringify({ published: existing }, null, 2))
}

/**
 * Check if a slug already exists.
 */
export function slugExists(slug: string): boolean {
  return fs.existsSync(path.join(BLOG_DIR, `${slug}.json`))
}

/**
 * Write a blog post to disk.
 */
export function publishPost(post: BlogPost): string {
  ensureDir()

  // Deduplicate slug if needed
  let finalSlug = post.slug
  let counter = 1
  while (slugExists(finalSlug)) {
    finalSlug = `${post.slug}-${counter}`
    counter++
  }
  post.slug = finalSlug

  const filePath = path.join(BLOG_DIR, `${finalSlug}.json`)
  fs.writeFileSync(filePath, JSON.stringify(post, null, 2), 'utf-8')

  return filePath
}

/**
 * Get count of existing blog posts.
 */
export function getPostCount(): number {
  ensureDir()
  return fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.json')).length
}
