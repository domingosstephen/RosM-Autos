#!/usr/bin/env npx tsx
/**
 * Blog Engine Runner — Main entry point for automated blog generation.
 *
 * Usage:
 *   npx tsx scripts/blog-engine/run.ts              # Generate default batch (3 articles)
 *   npx tsx scripts/blog-engine/run.ts --count 5    # Generate 5 articles
 *   npx tsx scripts/blog-engine/run.ts --stats       # Show topic coverage stats
 *   npx tsx scripts/blog-engine/run.ts --dry-run     # Show what would be generated
 *
 * Environment:
 *   ANTHROPIC_API_KEY or OPENAI_API_KEY must be set.
 */

import { selectTopics, getTopicStats } from './topic-selector'
import { generateArticle } from './generator'
import { publishPost, markPublished, getPostCount } from './publisher'

// ---------------------------------------------------------------------------
// CLI argument parsing
// ---------------------------------------------------------------------------
const args = process.argv.slice(2)
const isDryRun = args.includes('--dry-run')
const isStats = args.includes('--stats')
const countIdx = args.indexOf('--count')
const count = countIdx !== -1 ? parseInt(args[countIdx + 1], 10) : undefined

// ---------------------------------------------------------------------------
// Stats mode
// ---------------------------------------------------------------------------
if (isStats) {
  const stats = getTopicStats()
  console.log('\n📊 Blog Engine — Topic Coverage Stats\n')
  console.log(`Engine status:           ${stats.engineEnabled ? '🟢 ACTIVE' : '🔴 PAUSED'}`)
  console.log(`Articles per day:        ${stats.articlesPerDay}`)
  console.log(`Total topics (config):   ${stats.configTopics}`)
  console.log(`Total topics (research): ${stats.addonTopics}`)
  console.log(`Already published:       ${stats.publishedCount}`)
  console.log(`Remaining:               ${stats.remaining}`)
  console.log(`Days of content left:    ~${stats.daysOfContentLeft} days\n`)
  console.log('By category:')
  for (const [cat, data] of Object.entries(stats.byCategory)) {
    const bar = '█'.repeat(data.published) + '░'.repeat(data.total - data.published)
    console.log(`  ${cat.padEnd(18)} ${bar} ${data.published}/${data.total}`)
  }
  console.log(`\nExisting blog posts: ${getPostCount()}`)
  console.log('\nControls: edit scripts/blog-engine/control.json')
  console.log('Research: npx tsx scripts/blog-engine/researcher.ts')
  process.exit(0)
}

// ---------------------------------------------------------------------------
// Main generation flow
// ---------------------------------------------------------------------------
async function main() {
  console.log('\n🚀 RosM Autos Blog Engine — Starting generation run\n')

  // Select topics
  const topics = selectTopics(count)

  if (topics.length === 0) {
    console.log('No topics available. All configured topics have been published.')
    console.log('Add new topics to scripts/blog-engine/config.ts to continue.')
    process.exit(0)
  }

  console.log(`Selected ${topics.length} topic(s) for generation:\n`)
  topics.forEach(({ topic, category }, i) => {
    console.log(`  ${i + 1}. [${category}] ${topic.title}`)
    console.log(`     Primary keyword: "${topic.primaryKeyword}"`)
    console.log(`     Priority: ${topic.priority} | Intent: ${topic.searchIntent}`)
    console.log()
  })

  if (isDryRun) {
    console.log('(Dry run — no articles generated)\n')
    const stats = getTopicStats()
    console.log(`Remaining topics after this run: ${stats.remaining - topics.length}`)
    process.exit(0)
  }

  // Generate articles
  const results: { title: string; slug: string; file: string; success: boolean }[] = []

  for (const { topic, category } of topics) {
    console.log(`\n📝 Generating: "${topic.title}"...`)

    try {
      const post = await generateArticle(topic, category)
      const filePath = publishPost(post)
      markPublished(topic.title)

      console.log(`   ✅ Published: ${post.slug}`)
      console.log(`   📄 File: ${filePath}`)
      console.log(`   📊 Words: ~${post.content.replace(/<[^>]*>/g, '').split(/\s+/).length}`)
      console.log(`   🏷️  Tags: ${post.tags.join(', ')}`)

      results.push({ title: post.title, slug: post.slug, file: filePath, success: true })
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error)
      console.error(`   ❌ Failed: ${msg}`)
      results.push({ title: topic.title, slug: '', file: '', success: false })
    }

    // Small delay between API calls
    if (topics.indexOf({ topic, category }) < topics.length - 1) {
      await new Promise((r) => setTimeout(r, 2000))
    }
  }

  // Summary
  console.log('\n' + '═'.repeat(60))
  console.log('📋 Generation Summary\n')
  const succeeded = results.filter((r) => r.success)
  const failed = results.filter((r) => !r.success)
  console.log(`  Succeeded: ${succeeded.length}`)
  console.log(`  Failed:    ${failed.length}`)
  console.log(`  Total posts now: ${getPostCount()}\n`)

  if (failed.length > 0) {
    console.log('  Failed topics:')
    failed.forEach((r) => console.log(`    - ${r.title}`))
  }

  const stats = getTopicStats()
  console.log(`\n  Topics remaining: ${stats.remaining}`)
  console.log(`  Estimated days of content: ~${stats.daysOfContentLeft}`)
  console.log()

  // Exit with error if all failed
  if (succeeded.length === 0) {
    process.exit(1)
  }
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
