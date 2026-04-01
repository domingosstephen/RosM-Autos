/**
 * Article Generator — Uses AI to create SEO/AEO/GEO-optimized blog posts.
 *
 * Supports both Anthropic (Claude) and OpenAI APIs.
 * Set ANTHROPIC_API_KEY or OPENAI_API_KEY in environment.
 */

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
  // Curated Unsplash images by category (direct links, no API needed)
  const images: Record<string, { url: string; alt: string }[]> = {
    'country-guide': [
      { url: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200&q=80', alt: 'Vehicles on road in Africa' },
      { url: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=1200&q=80', alt: 'Port with shipping containers' },
      { url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&q=80', alt: 'Customs and border checkpoint' },
    ],
    'buying-guide': [
      { url: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1200&q=80', alt: 'Used car lot with vehicles' },
      { url: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?w=1200&q=80', alt: 'Vehicle inspection process' },
      { url: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1200&q=80', alt: 'SUV on road' },
    ],
    shipping: [
      { url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&q=80', alt: 'Cargo ship at port' },
      { url: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5eb19?w=1200&q=80', alt: 'Container shipping terminal' },
    ],
    'tractor-guide': [
      { url: 'https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=1200&q=80', alt: 'Farm tractor in field' },
      { url: 'https://images.unsplash.com/photo-1530267981375-f0de937f5f13?w=1200&q=80', alt: 'Agricultural tractor working' },
    ],
    'market-insight': [
      { url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80', alt: 'Market data and analytics' },
      { url: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200&q=80', alt: 'Vehicle market trends' },
    ],
    comparison: [
      { url: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1200&q=80', alt: 'Vehicles side by side comparison' },
      { url: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1200&q=80', alt: 'Multiple vehicles for comparison' },
    ],
    'how-to': [
      { url: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80', alt: 'Documentation and paperwork process' },
      { url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80', alt: 'Step by step guide illustration' },
    ],
  }

  const categoryImages = images[category] || images['buying-guide']
  const selected = categoryImages[Math.floor(Math.random() * categoryImages.length)]
  return { image: selected.url, imageAlt: selected.alt }
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
