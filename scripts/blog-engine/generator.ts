/**
 * Article Generator — Uses AI to create SEO/AEO/GEO-optimized blog posts.
 *
 * Supports both Anthropic (Claude) and OpenAI APIs.
 * Set ANTHROPIC_API_KEY or OPENAI_API_KEY in environment.
 */

import fs from 'fs'
import path from 'path'
import type { BlogPost, BlogAuthor } from '../../types/blog'
import type { TopicSeed } from './config'
import { AUTHORS, GENERATION_CONFIG } from './config'

// ---------------------------------------------------------------------------
// AI Provider abstraction
// ---------------------------------------------------------------------------

interface AIProvider {
  generate(systemPrompt: string, userPrompt: string): Promise<string>
}

function getProvider(): AIProvider {
  const anthropicKey = process.env.ANTHROPIC_API_KEY
  const openaiKey = process.env.OPENAI_API_KEY

  if (anthropicKey) {
    return {
      async generate(systemPrompt: string, userPrompt: string): Promise<string> {
        const res = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': anthropicKey,
            'anthropic-version': '2023-06-01',
          },
          body: JSON.stringify({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 8000,
            system: systemPrompt,
            messages: [{ role: 'user', content: userPrompt }],
          }),
        })
        if (!res.ok) {
          const err = await res.text()
          throw new Error(`Anthropic API error ${res.status}: ${err}`)
        }
        const data = await res.json()
        return data.content[0].text
      },
    }
  }

  if (openaiKey) {
    return {
      async generate(systemPrompt: string, userPrompt: string): Promise<string> {
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
            max_tokens: 8000,
            temperature: 0.7,
          }),
        })
        if (!res.ok) {
          const err = await res.text()
          throw new Error(`OpenAI API error ${res.status}: ${err}`)
        }
        const data = await res.json()
        return data.choices[0].message.content
      },
    }
  }

  throw new Error(
    'No AI provider configured. Set ANTHROPIC_API_KEY or OPENAI_API_KEY environment variable.'
  )
}

// ---------------------------------------------------------------------------
// System prompt — the core SEO/AEO/GEO optimization instructions
// ---------------------------------------------------------------------------

const SYSTEM_PROMPT = `You are an expert automotive journalist and SEO content writer for RosM Autos, a Germany-based international dealer of quality-inspected used automobiles, farm tractors, and electric bikes. You export to Africa, South America, and Eastern Europe.

Your articles must be optimized for three search paradigms simultaneously:

## SEO (Search Engine Optimization)
- Natural keyword integration (primary keyword in H1, first paragraph, and 2-3 H2s)
- Comprehensive coverage that beats competing content
- Proper heading hierarchy (H2 for sections, H3 for subsections)
- Internal linking opportunities (mention inventory, shipping, contact pages)
- 1800-3000 words for topical authority

## AEO (Answer Engine Optimization)
- Lead EVERY section with a direct, extractable answer (40-60 words)
- Use headings that match how people ask questions
- Include a FAQ section with 5 natural-language Q&As
- Structure content so any paragraph can stand alone as a snippet
- Use numbered lists for processes, bullet lists for features

## GEO (Generative Engine Optimization — AI Citation)
- Include specific statistics with sources (e.g., "According to the Nigerian Customs Service...")
- Use authoritative tone with domain expertise
- Add comparison tables for any "vs" content
- Make claims verifiable and specific (exact numbers, not vague)
- Include expert perspective and first-hand experience signals
- Avoid AI-detectable patterns: no em dashes, no "dive into", no "game-changer", no "it's important to note"

## Content Style Rules
- Write in a clear, professional but approachable tone
- Use active voice
- Be specific: exact prices, timelines, document names
- Include real-world context (port names, regulation names, agency names)
- Reference RosM Autos naturally where relevant (not forced)
- Add a TLDR/Key Takeaway at the top (2-3 sentences max)

## CRITICAL: Current Year
- The current year is ${new Date().getFullYear()}. ALL references to years MUST use ${new Date().getFullYear()}.
- Do NOT use 2024 or 2025. When you mention a year in titles, headings, statistics, or body text, use ${new Date().getFullYear()}.
- Example: "Complete 2025 Guide" is WRONG. "Complete ${new Date().getFullYear()} Guide" is CORRECT.

## Output Format
Return ONLY valid JSON with this exact structure (no markdown code fences):
{
  "title": "...",
  "seoTitle": "...(50-60 chars, keyword near front)...",
  "seoDescription": "...(140-160 chars, keyword + value prop + CTA)...",
  "excerpt": "...(2-3 sentence summary for blog cards)...",
  "content": "...(full HTML article body — use <h2>, <h3>, <p>, <ul>, <ol>, <li>, <table>, <thead>, <tbody>, <tr>, <th>, <td>, <strong>, <em>, <blockquote> tags)...",
  "tags": ["tag1", "tag2", ...],
  "keywords": ["primary keyword", "secondary keyword 1", ...],
  "readingTime": 8,
  "tldr": "...(2-3 sentence key takeaway)...",
  "faqItems": [
    {"question": "...", "answer": "..."},
    ...5 items
  ]
}`

// ---------------------------------------------------------------------------
// Article generation
// ---------------------------------------------------------------------------

function selectAuthor(topic: TopicSeed): BlogAuthor {
  // Pick author based on topic region/category
  if (topic.targetRegions.includes('Africa') || topic.targetRegions.includes('Nigeria')) {
    return AUTHORS[1] // Amara — Africa specialist
  }
  if (topic.category === 'shipping' || topic.targetRegions.includes('South America')) {
    return AUTHORS[2] // Carlos — logistics
  }
  return AUTHORS[0] // Stefan — general export specialist
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80)
}

function getImageForCategory(category: string): { image: string; imageAlt: string } {
  // Use REAL inventory images from public/images/inventory/
  // Each entry is a folder with 1.jpg inside it
  const images: Record<string, { folder: string; alt: string }[]> = {
    'country-guide': [
      { folder: 'toyota-hilux-2020-2-8-diesel', alt: 'Toyota Hilux ready for export from Germany' },
      { folder: 'toyota-prado-2020', alt: 'Toyota Prado SUV for international export' },
      { folder: 'black-land-cruiser', alt: 'Toyota Land Cruiser for export to Africa' },
      { folder: '2019-toyota-fortuner-66000-km-12200-eur', alt: 'Toyota Fortuner quality-inspected for export' },
      { folder: 'ford-ranger', alt: 'Ford Ranger pickup truck for export' },
      { folder: 'gle-350', alt: 'Mercedes-Benz GLE for international shipping' },
    ],
    'buying-guide': [
      { folder: 'land-cruiser', alt: 'Toyota Land Cruiser — top choice for African roads' },
      { folder: 'toyota-hilux-double-cabin', alt: 'Toyota Hilux Double Cabin in export-ready condition' },
      { folder: 'toyota-rav4-xle-4x4-full-option', alt: 'Toyota RAV4 XLE inspected for export' },
      { folder: 'ford-explorer', alt: 'Ford Explorer SUV available for export from Germany' },
      { folder: 'highlander', alt: 'Toyota Highlander from RosM Autos inventory' },
      { folder: '4runner', alt: 'Toyota 4Runner ready for international shipping' },
    ],
    shipping: [
      { folder: 'toyota-hilux-pickup-2017', alt: 'Toyota Hilux prepared for RoRo shipping' },
      { folder: '2024-ford-ranger-22-000-km-34250-eur', alt: 'Ford Ranger ready for container shipping from Germany' },
      { folder: 'toyota-prado-vxr-4-0l-4wd', alt: 'Toyota Prado loaded for export shipping' },
      { folder: 'isuzu-d-max', alt: 'Isuzu D-Max prepared for international vehicle shipping' },
    ],
    'tractor-guide': [
      { folder: 'massey-ferguson-385-tractor-2025', alt: 'Massey Ferguson 385 farm tractor for export' },
      { folder: 'massey-ferguson-290-4wd-2023', alt: 'Massey Ferguson 290 4WD tractor ready for shipping' },
      { folder: 'massey-ferguson-390-tractor-diesel-mt-4wd', alt: 'Massey Ferguson 390 diesel tractor for African farming' },
      { folder: 'massey-ferguson-290-290', alt: 'Massey Ferguson 290 used farm tractor' },
      { folder: 'massey-ferguson-290-4-0l', alt: 'Massey Ferguson 290 agricultural tractor for export' },
    ],
    'market-insight': [
      { folder: 'toyota-prado-full-option-top-of-the-range', alt: 'Toyota Prado full option — popular export vehicle' },
      { folder: 'toyota-hilux-2019-2-8l', alt: 'Toyota Hilux — high-demand vehicle in African markets' },
      { folder: 'toyota-corolla', alt: 'Toyota Corolla — widely exported sedan from Germany' },
      { folder: 'ford-territory', alt: 'Ford Territory — emerging market vehicle trends' },
    ],
    comparison: [
      { folder: 'toyota-hilux-2020-gr-sport-kit', alt: 'Toyota Hilux GR Sport — vehicle comparison feature' },
      { folder: 'ford-raptor', alt: 'Ford Raptor — pickup truck comparison' },
      { folder: 'toyota-hilux-dc-2-7p', alt: 'Toyota Hilux vs competitors — export pickup comparison' },
      { folder: '4runner-white', alt: 'Toyota 4Runner — SUV comparison for export buyers' },
      { folder: 'nissan-navara', alt: 'Nissan Navara — compared against Toyota Hilux and Ford Ranger' },
    ],
    'how-to': [
      { folder: '2016-toyota-highlander-122-110-km-11475-eur', alt: 'Toyota Highlander — step-by-step export guide' },
      { folder: 'toyota-rav4-2018-xle-2-5l-v4', alt: 'Toyota RAV4 — vehicle import process guide' },
      { folder: '2018-toyota-corolla-153-600-km-5950-eur', alt: 'Toyota Corolla — how to buy from Germany guide' },
      { folder: 'toyota-prado-2020-vxl-v4', alt: 'Toyota Prado — export documentation guide' },
    ],
    'vehicle-review': [
      { folder: 'toyota-prado-2020-vxr-4-0l-4wd', alt: 'Toyota Prado VXR — in-depth vehicle review' },
      { folder: 'toyota-hilux-diesel-2-8-liter', alt: 'Toyota Hilux Diesel — detailed export review' },
      { folder: 'ford-mustang', alt: 'Ford Mustang — vehicle review and export guide' },
      { folder: 'black-highlander', alt: 'Toyota Highlander — comprehensive buyer review' },
    ],
    'import-guide': [
      { folder: 'toyota-hilux-double-cabin-2-8l', alt: 'Toyota Hilux Double Cabin — import guide featured vehicle' },
      { folder: '2017-toyota-hilux-white-28000km-13000-eur', alt: 'Toyota Hilux — vehicle import documentation guide' },
      { folder: 'toyota-rav4-full-option-2-0l', alt: 'Toyota RAV4 — import duty calculation example' },
    ],
    'industry-news': [
      { folder: '2024-2025-toyota-hiace-commuter-6000-euros', alt: 'Toyota HiAce — vehicle export industry news' },
      { folder: 'ford-territory-7500-eur', alt: 'Ford Territory — market update and industry trends' },
      { folder: 'ducati-monster-bike', alt: 'Ducati Monster — expanding vehicle export categories' },
    ],
  }

  const categoryImages = images[category] || images['buying-guide']
  // Shuffle to avoid always picking the same image
  const shuffled = [...categoryImages].sort(() => Math.random() - 0.5)

  // Find the first folder that has an actual image file
  const inventoryDir = path.join(process.cwd(), 'public', 'images', 'inventory')
  for (const candidate of shuffled) {
    const folderPath = path.join(inventoryDir, candidate.folder)
    if (!fs.existsSync(folderPath)) continue

    // Check for 1.* in order of preference
    for (const ext of ['jpg', 'jpeg', 'webp', 'png']) {
      const imgPath = path.join(folderPath, `1.${ext}`)
      if (fs.existsSync(imgPath)) {
        return {
          image: `/images/inventory/${candidate.folder}/1.${ext}`,
          imageAlt: candidate.alt,
        }
      }
    }
  }

  // Fallback — should never happen but just in case
  return {
    image: '/icons/og-image.png',
    imageAlt: 'RosM Autos — Quality vehicles for export from Germany',
  }
}

export async function generateArticle(topic: TopicSeed, category: string): Promise<BlogPost> {
  const provider = getProvider()
  const author = selectAuthor(topic)

  const userPrompt = `Write a comprehensive article about: "${topic.title}"

Primary keyword: "${topic.primaryKeyword}"
Secondary keywords: ${topic.secondaryKeywords.map((k) => `"${k}"`).join(', ')}
Search intent: ${topic.searchIntent}
Target regions: ${topic.targetRegions.join(', ')}

AI query targets (questions this article should directly answer):
${topic.aiQueryTargets.map((q) => `- ${q}`).join('\n')}

IMPORTANT: Today's date is ${new Date().toISOString().split('T')[0]}. The current year is ${new Date().getFullYear()}. ALL year references in the article MUST be ${new Date().getFullYear()} — not 2024, not 2025. This applies to titles, headings, body text, and statistics.

Requirements:
- ${GENERATION_CONFIG.minWordCount}-${GENERATION_CONFIG.maxWordCount} words
- ${GENERATION_CONFIG.faqItemsPerArticle} FAQ items
- Include at least one comparison table if applicable
- Include specific statistics and data points with source attributions
- Mention relevant RosM Autos services naturally (vehicle inspection, shipping, export documentation)
- Reference specific ports, regulations, and agencies by name
- Write as ${author.name}, ${author.title}

Return ONLY the JSON object, no markdown fences or extra text.`

  const raw = await provider.generate(SYSTEM_PROMPT, userPrompt)

  // Parse JSON from response (handle potential markdown fences)
  let jsonStr = raw.trim()
  if (jsonStr.startsWith('```')) {
    jsonStr = jsonStr.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '')
  }

  const parsed = JSON.parse(jsonStr)

  const now = new Date().toISOString()
  const slug = generateSlug(parsed.title || topic.title)
  const { image, imageAlt } = getImageForCategory(category)

  const post: BlogPost = {
    slug,
    title: parsed.title || topic.title,
    seoTitle: parsed.seoTitle || topic.title,
    seoDescription: parsed.seoDescription || parsed.excerpt?.slice(0, 155) || '',
    excerpt: parsed.excerpt || '',
    content: parsed.content || '',
    category: category as BlogPost['category'],
    tags: parsed.tags || topic.secondaryKeywords.slice(0, 5),
    keywords: parsed.keywords || [topic.primaryKeyword, ...topic.secondaryKeywords],
    author,
    publishedAt: now,
    updatedAt: now,
    image,
    imageAlt: imageAlt,
    readingTime: parsed.readingTime || Math.ceil((parsed.content || '').split(/\s+/).length / 250),
    featured: topic.priority === 1,
    faqItems: parsed.faqItems || [],
    tldr: parsed.tldr || parsed.excerpt || '',
  }

  return post
}
