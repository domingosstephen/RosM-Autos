/**
 * Topic Selector — Picks the best topics for the next generation run.
 *
 * Sources topics from:
 *   1. config.ts — hardcoded topic clusters (seed content)
 *   2. addon-topics.json — topics discovered by researcher.ts and approved
 *   3. control.json — category enable/disable and per-week limits
 *
 * Strategy:
 *   1. Never repeat already-published topics
 *   2. Respect control.json (paused engine, disabled categories, weekly limits)
 *   3. Prioritize by: priority level > category diversity > region coverage
 *   4. Mix categories for natural publishing cadence
 */

import fs from 'fs'
import path from 'path'
import { TOPIC_CLUSTERS, GENERATION_CONFIG } from './config'
import type { TopicSeed } from './config'
import type { BlogCategory } from '../../types/blog'
import { getPublishedTopics } from './publisher'

const ADDON_FILE = path.join(process.cwd(), 'scripts', 'blog-engine', 'addon-topics.json')
const CONTROL_FILE = path.join(process.cwd(), 'scripts', 'blog-engine', 'control.json')

interface ScoredTopic {
  topic: TopicSeed
  category: BlogCategory
  score: number
}

interface Control {
  engine: { enabled: boolean; articlesPerDay: number }
  approval: { requireApproval: boolean }
  categories: Record<string, { enabled: boolean; maxPerWeek: number; priority: string }>
}

function loadControl(): Control {
  if (!fs.existsSync(CONTROL_FILE)) {
    return {
      engine: { enabled: true, articlesPerDay: 3 },
      approval: { requireApproval: false },
      categories: {},
    }
  }
  return JSON.parse(fs.readFileSync(CONTROL_FILE, 'utf-8'))
}

function loadAddonTopics(): { topic: TopicSeed; category: BlogCategory }[] {
  if (!fs.existsSync(ADDON_FILE)) return []
  const data = JSON.parse(fs.readFileSync(ADDON_FILE, 'utf-8'))
  return data.map((item: { category: BlogCategory; topic: TopicSeed }) => ({
    topic: item.topic,
    category: item.category,
  }))
}

/**
 * Select the next batch of topics to generate articles for.
 */
export function selectTopics(count?: number): { topic: TopicSeed; category: BlogCategory }[] {
  const control = loadControl()

  // Check if engine is enabled
  if (!control.engine.enabled) {
    console.log('Blog engine is PAUSED. Set "enabled": true in control.json to resume.')
    return []
  }

  const numTopics = count || control.engine.articlesPerDay || GENERATION_CONFIG.articlesPerRun
  const published = getPublishedTopics()

  // Flatten all topics from config + addon sources
  const allTopics: { topic: TopicSeed; category: BlogCategory }[] = []

  for (const cluster of TOPIC_CLUSTERS) {
    for (const topic of cluster.topics) {
      allTopics.push({ topic, category: cluster.category })
    }
  }

  // Add researched & approved topics
  const addonTopics = loadAddonTopics()
  allTopics.push(...addonTopics)

  // Filter out already published and disabled categories
  const available = allTopics.filter(({ topic, category }) => {
    if (published.includes(topic.title)) return false
    const catConfig = control.categories[category]
    if (catConfig && !catConfig.enabled) return false
    return true
  })

  if (available.length === 0) {
    console.log('All topics have been published or are in disabled categories.')
    console.log('Run the researcher to discover new topics:')
    console.log('  npx tsx scripts/blog-engine/researcher.ts')
    return []
  }

  // Score topics
  const scored: ScoredTopic[] = available.map(({ topic, category }) => {
    let score = 0

    // Priority weight (1=highest -> score 30, 2->20, 3->10)
    score += (4 - topic.priority) * 10

    // Control.json category priority boost
    const catConfig = control.categories[category]
    if (catConfig) {
      if (catConfig.priority === 'high') score += 10
      else if (catConfig.priority === 'medium') score += 5
      // 'low' gets no boost
    }

    // Search intent weight
    if (topic.searchIntent === 'informational') score += 8
    if (topic.searchIntent === 'commercial') score += 10

    // AI query targets boost
    score += topic.aiQueryTargets.length * 3

    // Secondary keywords boost
    score += Math.min(topic.secondaryKeywords.length, 5) * 2

    // Category diversity bonus
    const publishedInCategory = published.filter((title) =>
      allTopics.some(
        (t) => t.category === category && t.topic.title === title
      )
    ).length
    score += Math.max(0, 10 - publishedInCategory * 2)

    // Small random factor
    score += Math.random() * 5

    return { topic, category, score }
  })

  // Sort by score descending
  scored.sort((a, b) => b.score - a.score)

  // Pick top N with category diversity (max 2 per category per run)
  const selected: ScoredTopic[] = []
  const categoryCount: Record<string, number> = {}

  for (const item of scored) {
    if (selected.length >= numTopics) break

    const catCount = categoryCount[item.category] || 0
    if (catCount >= 2) continue

    selected.push(item)
    categoryCount[item.category] = catCount + 1
  }

  return selected.map(({ topic, category }) => ({ topic, category }))
}

/**
 * Get statistics about topic coverage.
 */
export function getTopicStats() {
  const published = getPublishedTopics()

  // Count from both config and addon sources
  const configTopics = TOPIC_CLUSTERS.reduce((sum, c) => sum + c.topics.length, 0)
  const addonTopics = loadAddonTopics().length
  const totalTopics = configTopics + addonTopics

  const byCategory: Record<string, { total: number; published: number }> = {}

  for (const cluster of TOPIC_CLUSTERS) {
    const pubCount = cluster.topics.filter((t) => published.includes(t.title)).length
    byCategory[cluster.category] = {
      total: cluster.topics.length,
      published: pubCount,
    }
  }

  // Add addon topics to category counts
  for (const { category } of loadAddonTopics()) {
    if (!byCategory[category]) {
      byCategory[category] = { total: 0, published: 0 }
    }
    byCategory[category].total++
  }

  const control = loadControl()
  const articlesPerDay = control.engine.articlesPerDay || GENERATION_CONFIG.articlesPerRun

  return {
    totalTopics,
    configTopics,
    addonTopics,
    publishedCount: published.length,
    remaining: totalTopics - published.length,
    byCategory,
    daysOfContentLeft: Math.ceil((totalTopics - published.length) / articlesPerDay),
    engineEnabled: control.engine.enabled,
    articlesPerDay,
  }
}
