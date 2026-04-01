#!/usr/bin/env npx tsx
/**
 * Topic Researcher — Discovers new blog topics using AI analysis.
 *
 * Strategies:
 *   1. Keyword expansion — takes existing keywords and finds related long-tails
 *   2. Competitor gap analysis — analyzes competitor blogs for topics we haven't covered
 *   3. Question mining — finds real questions people ask about vehicle export
 *   4. Regional expansion — creates country-specific variants of successful topics
 *   5. Seasonal/trend topics — timely content based on regulation changes, events
 *
 * Usage:
 *   npx tsx scripts/blog-engine/researcher.ts                    # Full research run
 *   npx tsx scripts/blog-engine/researcher.ts --strategy keyword # Single strategy
 *   npx tsx scripts/blog-engine/researcher.ts --approve          # Review & approve pending
 *   npx tsx scripts/blog-engine/researcher.ts --list             # List pending topics
 *   npx tsx scripts/blog-engine/researcher.ts --approve-all      # Approve all pending
 *   npx tsx scripts/blog-engine/researcher.ts --reject <index>   # Reject a topic by index
 */

import fs from 'fs'
import path from 'path'
import type { TopicSeed } from './config'
import type { BlogCategory } from '../../types/blog'
import { TOPIC_CLUSTERS, COMPETITORS } from './config'
import { getPublishedTopics } from './publisher'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface PendingTopic extends TopicSeed {
  category: BlogCategory
  source: 'keyword-expansion' | 'competitor-gap' | 'question-mining' | 'regional-expansion' | 'seasonal' | 'manual'
  suggestedAt: string
  status: 'pending' | 'approved' | 'rejected'
}

interface PendingStore {
  pending: PendingTopic[]
  approved: PendingTopic[]
  rejected: PendingTopic[]
}

const PENDING_FILE = path.join(process.cwd(), 'scripts', 'blog-engine', 'pending-topics.json')
const CONTROL_FILE = path.join(process.cwd(), 'scripts', 'blog-engine', 'control.json')

// ---------------------------------------------------------------------------
// Store operations
// ---------------------------------------------------------------------------

function loadPending(): PendingStore {
  if (!fs.existsSync(PENDING_FILE)) return { pending: [], approved: [], rejected: [] }
  return JSON.parse(fs.readFileSync(PENDING_FILE, 'utf-8'))
}

function savePending(store: PendingStore) {
  fs.writeFileSync(PENDING_FILE, JSON.stringify(store, null, 2))
}

function loadControl() {
  return JSON.parse(fs.readFileSync(CONTROL_FILE, 'utf-8'))
}

// ---------------------------------------------------------------------------
// AI Provider (same as generator.ts)
// ---------------------------------------------------------------------------

async function aiGenerate(systemPrompt: string, userPrompt: string): Promise<string> {
  const anthropicKey = process.env.ANTHROPIC_API_KEY
  const openaiKey = process.env.OPENAI_API_KEY

  if (anthropicKey) {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': anthropicKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4000,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }],
      }),
    })
    if (!res.ok) throw new Error(`Anthropic API error ${res.status}: ${await res.text()}`)
    const data = await res.json()
    return data.content[0].text
  }

  if (openaiKey) {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${openaiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        max_tokens: 4000,
        temperature: 0.8,
      }),
    })
    if (!res.ok) throw new Error(`OpenAI API error ${res.status}: ${await res.text()}`)
    const data = await res.json()
    return data.choices[0].message.content
  }

  throw new Error('No AI provider configured. Set ANTHROPIC_API_KEY or OPENAI_API_KEY.')
}

// ---------------------------------------------------------------------------
// Research strategies
// ---------------------------------------------------------------------------

const RESEARCH_SYSTEM_PROMPT = `You are an SEO content strategist for RosM Autos, a Germany-based dealer exporting quality-inspected used cars, farm tractors, and electric bikes to Africa, South America, and Eastern Europe.

Your job is to discover high-value blog topic opportunities. Every topic must:
1. Target a specific search query with real search volume
2. Be relevant to used vehicle/tractor export from Germany
3. Have clear AEO potential (answer a question AI engines might get asked)
4. Not duplicate existing topics

Return ONLY valid JSON arrays, no markdown fences or extra text.`

async function researchKeywordExpansion(existingTopics: string[]): Promise<PendingTopic[]> {
  console.log('  Running keyword expansion...')

  const existingKeywords = TOPIC_CLUSTERS.flatMap((c) =>
    c.topics.flatMap((t) => [t.primaryKeyword, ...t.secondaryKeywords])
  )

  const prompt = `Based on these existing keywords in the vehicle export niche:
${existingKeywords.slice(0, 30).map((k) => `- ${k}`).join('\n')}

And these already-covered topics (DO NOT suggest these):
${existingTopics.slice(0, 20).map((t) => `- ${t}`).join('\n')}

Generate 8 NEW long-tail keyword topic opportunities we haven't covered. Focus on:
- Specific vehicle model + country combinations (e.g., "Toyota Prado import duty Ghana")
- Cost calculator queries (e.g., "total cost import car to [country]")
- Process queries (e.g., "how to register imported car in [country]")
- Comparison queries (e.g., "[brand] vs [brand] for [use case]")

Return JSON array:
[{
  "title": "Article title",
  "primaryKeyword": "main search query",
  "secondaryKeywords": ["kw1", "kw2", "kw3"],
  "searchIntent": "informational|commercial",
  "targetRegions": ["Country"],
  "priority": 1|2|3,
  "aiQueryTargets": ["Question 1?", "Question 2?"],
  "category": "country-guide|buying-guide|shipping|comparison|how-to|tractor-guide|market-insight"
}]`

  const raw = await aiGenerate(RESEARCH_SYSTEM_PROMPT, prompt)
  return parseTopics(raw, 'keyword-expansion')
}

async function researchCompetitorGaps(existingTopics: string[]): Promise<PendingTopic[]> {
  console.log('  Running competitor gap analysis...')

  const prompt = `You are analyzing the used vehicle export blog niche. The major competitors are:
${COMPETITORS.map((c) => `- ${c}`).join('\n')}

Our existing topics cover:
${existingTopics.map((t) => `- ${t}`).join('\n')}

These competitors typically publish content about:
- Vehicle buying guides for specific markets
- Import regulation updates by country
- Shipping cost comparisons
- Vehicle maintenance tips for tropical/harsh climates
- Financing and payment methods for international buyers
- Port-specific clearance guides
- Vehicle brand reliability rankings by region

Identify 8 high-value topics that competitors likely cover but we DON'T yet. Focus on topics with high commercial intent or that answer common buyer questions.

Return JSON array:
[{
  "title": "Article title",
  "primaryKeyword": "main search query",
  "secondaryKeywords": ["kw1", "kw2", "kw3"],
  "searchIntent": "informational|commercial",
  "targetRegions": ["Country/Region"],
  "priority": 1|2|3,
  "aiQueryTargets": ["Question 1?", "Question 2?"],
  "category": "country-guide|buying-guide|shipping|comparison|how-to|tractor-guide|market-insight|vehicle-review"
}]`

  const raw = await aiGenerate(RESEARCH_SYSTEM_PROMPT, prompt)
  return parseTopics(raw, 'competitor-gap')
}

async function researchQuestionMining(existingTopics: string[]): Promise<PendingTopic[]> {
  console.log('  Running question mining...')

  const control = loadControl()
  const regions = control.research?.targetRegions || ['Nigeria', 'Ghana', 'Kenya', 'Brazil']

  const prompt = `Generate 8 blog topics based on REAL QUESTIONS that people searching about importing used vehicles from Germany would ask. Think about:

- Questions on forums (Reddit, Nairaland, KenyaTalk, etc.)
- "People Also Ask" style queries on Google
- Questions that ChatGPT/Perplexity frequently get asked about vehicle import
- Concerns first-time importers have (scams, hidden costs, vehicle condition, etc.)

Target regions: ${regions.join(', ')}

Already covered topics (DO NOT duplicate):
${existingTopics.slice(0, 15).map((t) => `- ${t}`).join('\n')}

Focus on questions with emotional weight — fear of being scammed, confusion about costs, uncertainty about the process. These convert well.

Return JSON array:
[{
  "title": "Article title (frame as answering the question)",
  "primaryKeyword": "the question or query",
  "secondaryKeywords": ["kw1", "kw2", "kw3"],
  "searchIntent": "informational|commercial",
  "targetRegions": ["Country"],
  "priority": 1|2|3,
  "aiQueryTargets": ["Exact question 1?", "Exact question 2?"],
  "category": "country-guide|buying-guide|shipping|comparison|how-to|market-insight"
}]`

  const raw = await aiGenerate(RESEARCH_SYSTEM_PROMPT, prompt)
  return parseTopics(raw, 'question-mining')
}

async function researchRegionalExpansion(existingTopics: string[]): Promise<PendingTopic[]> {
  console.log('  Running regional expansion...')

  const control = loadControl()
  const regions = control.research?.targetRegions || []

  // Find countries we haven't written country guides for yet
  const coveredCountries = existingTopics
    .filter((t) => t.toLowerCase().includes('import') || t.toLowerCase().includes('guide'))
    .map((t) => {
      const match = t.match(/to\s+(\w+)/i)
      return match ? match[1] : null
    })
    .filter(Boolean)

  const uncoveredCountries = regions.filter(
    (r: string) => !coveredCountries.some((c) => c && r.toLowerCase().includes(c.toLowerCase()))
  )

  if (uncoveredCountries.length === 0) {
    console.log('    All target regions covered. Skipping.')
    return []
  }

  const prompt = `Create vehicle import guide topics for these countries that we haven't covered yet:
${uncoveredCountries.map((c: string) => `- ${c}`).join('\n')}

For each country, create a comprehensive import guide topic that covers:
- Import duties and taxes
- Required documents
- Port of entry and customs process
- Vehicle age restrictions (if any)
- Step-by-step process

Return JSON array with one topic per uncovered country (max 6):
[{
  "title": "Complete Guide to Importing a Used Car to [Country] from Germany",
  "primaryKeyword": "import used car [country]",
  "secondaryKeywords": ["[country] vehicle import duty", "[country] customs clearance", "buy car Germany [country]"],
  "searchIntent": "informational",
  "targetRegions": ["Country"],
  "priority": 2,
  "aiQueryTargets": ["How do I import a car to [Country]?", "What is the import duty on cars in [Country]?"],
  "category": "country-guide"
}]`

  const raw = await aiGenerate(RESEARCH_SYSTEM_PROMPT, prompt)
  return parseTopics(raw, 'regional-expansion')
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function parseTopics(raw: string, source: PendingTopic['source']): PendingTopic[] {
  let jsonStr = raw.trim()
  if (jsonStr.startsWith('```')) {
    jsonStr = jsonStr.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '')
  }

  try {
    const topics = JSON.parse(jsonStr)
    return topics.map((t: Record<string, unknown>) => ({
      ...t,
      source,
      suggestedAt: new Date().toISOString(),
      status: 'pending' as const,
    }))
  } catch (err) {
    console.error(`    Failed to parse AI response: ${err}`)
    return []
  }
}

function deduplicateTopics(
  newTopics: PendingTopic[],
  existingTitles: string[],
  pendingTitles: string[]
): PendingTopic[] {
  const allExisting = [...existingTitles, ...pendingTitles].map((t) => t.toLowerCase())
  return newTopics.filter((t) => {
    const lower = t.title.toLowerCase()
    // Check exact match
    if (allExisting.includes(lower)) return false
    // Check keyword overlap (>80% means likely duplicate)
    const newWords = new Set(lower.split(/\s+/))
    for (const existing of allExisting) {
      const existingWords = new Set(existing.split(/\s+/))
      const overlap = [...newWords].filter((w) => existingWords.has(w)).length
      if (overlap / Math.max(newWords.size, existingWords.size) > 0.7) return false
    }
    return true
  })
}

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

async function main() {
  const args = process.argv.slice(2)
  const store = loadPending()

  // --list: show pending topics
  if (args.includes('--list')) {
    console.log('\n📋 Pending Topics for Review\n')
    if (store.pending.length === 0) {
      console.log('  No pending topics. Run research first:')
      console.log('  npx tsx scripts/blog-engine/researcher.ts\n')
      return
    }
    store.pending.forEach((t, i) => {
      console.log(`  [${i}] ${t.title}`)
      console.log(`      Category: ${t.category} | Source: ${t.source} | Priority: ${t.priority}`)
      console.log(`      Keyword: "${t.primaryKeyword}"`)
      console.log(`      Regions: ${t.targetRegions.join(', ')}`)
      console.log()
    })
    console.log(`  Total pending: ${store.pending.length}`)
    console.log(`  Total approved (in pipeline): ${store.approved.length}`)
    console.log(`  Total rejected: ${store.rejected.length}\n`)
    return
  }

  // --approve-all: move all pending to approved
  if (args.includes('--approve-all')) {
    const count = store.pending.length
    store.approved.push(...store.pending.map((t) => ({ ...t, status: 'approved' as const })))
    store.pending = []
    savePending(store)
    console.log(`\n✅ Approved all ${count} pending topics.\n`)
    console.log('These topics will be picked up by the blog engine on the next run.')
    console.log('To add them to the main config, run: npx tsx scripts/blog-engine/researcher.ts --sync\n')
    return
  }

  // --approve <indices>: approve specific topics
  if (args.includes('--approve')) {
    const indices = args
      .slice(args.indexOf('--approve') + 1)
      .filter((a) => !a.startsWith('--'))
      .map(Number)
      .filter((n) => !isNaN(n))

    if (indices.length === 0) {
      console.log('Usage: --approve 0 1 3  (space-separated indices from --list)')
      return
    }

    let approved = 0
    // Sort descending so splicing doesn't shift indices
    for (const i of indices.sort((a, b) => b - a)) {
      if (i >= 0 && i < store.pending.length) {
        const topic = store.pending.splice(i, 1)[0]
        topic.status = 'approved'
        store.approved.push(topic)
        approved++
        console.log(`  ✅ Approved: ${topic.title}`)
      }
    }
    savePending(store)
    console.log(`\nApproved ${approved} topic(s). Remaining pending: ${store.pending.length}\n`)
    return
  }

  // --reject <indices>
  if (args.includes('--reject')) {
    const indices = args
      .slice(args.indexOf('--reject') + 1)
      .filter((a) => !a.startsWith('--'))
      .map(Number)
      .filter((n) => !isNaN(n))

    if (indices.length === 0) {
      console.log('Usage: --reject 0 2  (space-separated indices from --list)')
      return
    }

    let rejected = 0
    for (const i of indices.sort((a, b) => b - a)) {
      if (i >= 0 && i < store.pending.length) {
        const topic = store.pending.splice(i, 1)[0]
        topic.status = 'rejected'
        store.rejected.push(topic)
        rejected++
        console.log(`  ❌ Rejected: ${topic.title}`)
      }
    }
    savePending(store)
    console.log(`\nRejected ${rejected} topic(s). Remaining pending: ${store.pending.length}\n`)
    return
  }

  // --sync: write approved topics into config.ts topic clusters
  if (args.includes('--sync')) {
    if (store.approved.length === 0) {
      console.log('\nNo approved topics to sync. Approve some first.\n')
      return
    }
    // Write approved topics as an addendum JSON file that the topic selector reads
    const addonPath = path.join(process.cwd(), 'scripts', 'blog-engine', 'addon-topics.json')
    const existing = fs.existsSync(addonPath) ? JSON.parse(fs.readFileSync(addonPath, 'utf-8')) : []
    const newTopics = store.approved.map((t) => ({
      category: t.category,
      topic: {
        title: t.title,
        primaryKeyword: t.primaryKeyword,
        secondaryKeywords: t.secondaryKeywords,
        searchIntent: t.searchIntent,
        targetRegions: t.targetRegions,
        priority: t.priority,
        aiQueryTargets: t.aiQueryTargets,
      },
    }))
    const merged = [...existing, ...newTopics]
    fs.writeFileSync(addonPath, JSON.stringify(merged, null, 2))
    store.approved = []
    savePending(store)
    console.log(`\n✅ Synced ${newTopics.length} approved topics to addon-topics.json`)
    console.log('These will be picked up by the blog engine on the next run.\n')
    return
  }

  // Default: run research
  const strategy = args.includes('--strategy')
    ? args[args.indexOf('--strategy') + 1]
    : 'all'

  console.log('\n🔍 RosM Autos Topic Researcher — Starting research\n')

  const allExistingTitles = [
    ...getPublishedTopics(),
    ...TOPIC_CLUSTERS.flatMap((c) => c.topics.map((t) => t.title)),
  ]
  const pendingTitles = store.pending.map((t) => t.title)

  let newTopics: PendingTopic[] = []

  const strategies: Record<string, () => Promise<PendingTopic[]>> = {
    keyword: () => researchKeywordExpansion(allExistingTitles),
    competitor: () => researchCompetitorGaps(allExistingTitles),
    question: () => researchQuestionMining(allExistingTitles),
    regional: () => researchRegionalExpansion(allExistingTitles),
  }

  if (strategy === 'all') {
    for (const [name, fn] of Object.entries(strategies)) {
      try {
        const topics = await fn()
        const deduped = deduplicateTopics(topics, allExistingTitles, pendingTitles)
        console.log(`    Found ${topics.length} topics, ${deduped.length} unique\n`)
        newTopics.push(...deduped)
        // Add to pending titles for next strategy's dedup
        pendingTitles.push(...deduped.map((t) => t.title))
      } catch (err) {
        console.error(`    Error in ${name}: ${err}\n`)
      }
      // Delay between API calls
      await new Promise((r) => setTimeout(r, 2000))
    }
  } else if (strategies[strategy]) {
    const topics = await strategies[strategy]()
    newTopics = deduplicateTopics(topics, allExistingTitles, pendingTitles)
    console.log(`  Found ${topics.length} topics, ${newTopics.length} unique\n`)
  } else {
    console.error(`Unknown strategy: ${strategy}`)
    console.log('Available: keyword, competitor, question, regional, all')
    process.exit(1)
  }

  // Add to pending store
  store.pending.push(...newTopics)
  savePending(store)

  console.log('═'.repeat(50))
  console.log(`\n📋 Research Complete\n`)
  console.log(`  New topics discovered: ${newTopics.length}`)
  console.log(`  Total pending review:  ${store.pending.length}`)
  console.log(`  Already approved:      ${store.approved.length}\n`)
  console.log('Next steps:')
  console.log('  1. Review:  npx tsx scripts/blog-engine/researcher.ts --list')
  console.log('  2. Approve: npx tsx scripts/blog-engine/researcher.ts --approve 0 1 2')
  console.log('     Or:      npx tsx scripts/blog-engine/researcher.ts --approve-all')
  console.log('  3. Sync:    npx tsx scripts/blog-engine/researcher.ts --sync')
  console.log('  4. Reject:  npx tsx scripts/blog-engine/researcher.ts --reject 3 5\n')
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
