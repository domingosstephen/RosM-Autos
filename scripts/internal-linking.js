#!/usr/bin/env node
/**
 * Internal Linking Engine for RosM Autos Blog
 *
 * Reads all blog posts, builds a semantic linking map, and injects
 * contextual <a> links into the HTML content of each post.
 *
 * Rules:
 * - Max 8 internal links per post (to avoid over-optimization)
 * - Never link to self
 * - Never link the same target twice in one post
 * - Never inject links inside <h1>-<h6>, <a>, <strong>, <th> tags
 * - Prefer linking near the top/middle of content (first occurrence)
 * - Also links to key site pages (/inventory, /contact, /shipping, /how-it-works)
 * - Adds relatedSlugs field to each post for improved related posts section
 */

const fs = require('fs')
const path = require('path')

const BLOG_DIR = path.join(__dirname, '..', 'content', 'blog')
const MAX_LINKS_PER_POST = 8
const SITE_PAGES_MAX = 2 // max site page links per post

// ─── Load all posts ──────────────────────────────────────────────────────────
function loadAllPosts() {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.json'))
  return files.map((f) => {
    const data = JSON.parse(fs.readFileSync(path.join(BLOG_DIR, f), 'utf-8'))
    return data
  })
}

// ─── Build the anchor-text → slug mapping ────────────────────────────────────
// Each entry: { anchor: "phrase to match", slug: "target-slug", priority: number }
// Higher priority = more likely to be used when there are many candidates
function buildLinkMap(posts) {
  const linkMap = []

  for (const post of posts) {
    const slug = post.slug
    const cat = post.category

    // Extract meaningful anchor phrases from title
    const titlePhrases = extractTitlePhrases(post.title)
    for (const phrase of titlePhrases) {
      linkMap.push({ anchor: phrase, slug, priority: 3 })
    }

    // Category-specific keyword anchors
    const categoryAnchors = getCategoryAnchors(post)
    for (const anchor of categoryAnchors) {
      linkMap.push({ anchor, slug, priority: 2 })
    }

    // Tag-based anchors (lower priority, more generic)
    for (const tag of post.tags.slice(0, 4)) {
      if (tag.length > 5 && tag.length < 40) {
        linkMap.push({ anchor: tag.toLowerCase(), slug, priority: 1 })
      }
    }
  }

  // Sort by anchor length descending (match longer phrases first)
  linkMap.sort((a, b) => b.anchor.length - a.anchor.length)
  return linkMap
}

function extractTitlePhrases(title) {
  const phrases = []
  const clean = title
    .replace(/[:()\[\]|–—]/g, ' ')
    .replace(/\b(complete|2026|guide|expert)\b/gi, '')
    .replace(/\s+/g, ' ')
    .trim()

  // Full meaningful title phrase (shortened)
  const words = clean.split(' ').filter((w) => w.length > 2)
  if (words.length >= 3) {
    // Take meaningful 3-5 word chunks
    for (let len = Math.min(5, words.length); len >= 3; len--) {
      for (let i = 0; i <= words.length - len; i++) {
        const chunk = words.slice(i, i + len).join(' ')
        if (chunk.length >= 15 && chunk.length <= 60) {
          phrases.push(chunk.toLowerCase())
        }
      }
    }
  }

  return phrases.slice(0, 3) // max 3 phrases per post
}

function getCategoryAnchors(post) {
  const slug = post.slug
  const title = post.title.toLowerCase()
  const anchors = []

  // Country-guide specific anchors
  if (post.category === 'country-guide') {
    if (title.includes('nigeria')) anchors.push('importing a used car to nigeria', 'nigeria import duties', 'vehicle import nigeria')
    if (title.includes('kenya')) anchors.push('importing a vehicle to kenya', 'kenya vehicle import', 'import duty kenya')
    if (title.includes('ghana')) anchors.push('importing a car to ghana', 'ghana import duties', 'vehicle import ghana', 'Tema port clearance')
    if (title.includes('tanzania')) anchors.push('importing a car to tanzania', 'tanzania import duties', 'vehicle import tanzania')
    if (title.includes('cameroon')) anchors.push('importing a car to cameroon', 'cameroon import duties', 'Douala port')
    if (title.includes('uganda')) anchors.push('importing a vehicle to uganda', 'uganda vehicle import', 'import duty uganda')
    if (title.includes('brazil')) anchors.push('importing a car to brazil', 'brazil vehicle import')
    if (title.includes('romania')) anchors.push('importing a car to romania', 'romania vehicle import')
    if (title.includes('honda cr-v') || title.includes('honda')) anchors.push('Honda CR-V import Nigeria')
    if (title.includes('volkswagen') || title.includes('golf')) anchors.push('Volkswagen Golf import Kenya')
    if (title.includes('toyota prado')) anchors.push('Toyota Prado import Ghana', 'Prado import duty Ghana')
  }

  // Shipping anchors
  if (post.category === 'shipping') {
    if (title.includes('roro') || title.includes('container')) anchors.push('RoRo vs container shipping', 'container shipping for cars', 'RoRo shipping')
    if (title.includes('cost') || title.includes('how much')) anchors.push('shipping cost Germany to Africa', 'car shipping costs')
    if (title.includes('documentation') || title.includes('export doc')) anchors.push('vehicle export documentation', 'export documents Germany')
    if (title.includes('hamburg') || title.includes('bremen')) anchors.push('Hamburg vs Bremen ports', 'best German export port')
    if (title.includes('insurance')) anchors.push('vehicle shipping insurance', 'marine cargo insurance', 'transit insurance')
    if (title.includes('damaged') || title.includes('damage')) anchors.push('car damaged during shipping', 'shipping damage claim')
  }

  // Buying-guide anchors
  if (post.category === 'buying-guide') {
    if (title.includes('pickup')) anchors.push('best pickup trucks for export', 'export pickup trucks')
    if (title.includes('suv')) anchors.push('best SUVs for export', 'used SUVs under €10,000')
    if (title.includes('inspect')) anchors.push('inspect a used car before buying', 'vehicle inspection checklist')
    if (title.includes('scam') || title.includes('avoid')) anchors.push('avoid import scams', 'used car import scams')
    if (title.includes('financ')) anchors.push('financing a used car import', 'car import financing options')
    if (title.includes('auction')) anchors.push('German auto auctions', 'car auction bidding')
    if (title.includes('verification') || title.includes('verify') || title.includes('history')) anchors.push('verify vehicle history', 'vehicle history check Germany')
    if (title.includes('inspection report') || title.includes('trust')) anchors.push('German vehicle inspection reports', 'TÜV inspection reports')
    if (title.includes('hilux') && title.includes('land cruiser')) anchors.push('Hilux vs Land Cruiser', 'Toyota Hilux or Land Cruiser')
    if (title.includes('sprinter')) anchors.push('Mercedes Sprinter for export', 'Sprinter Africa market')
    if (title.includes('durable') || title.includes('reliable')) anchors.push('most durable cars for African roads', 'reliable cars for Africa')
  }

  // Tractor-guide anchors
  if (post.category === 'tractor-guide') {
    if (title.includes('john deere') && title.includes('massey ferguson')) anchors.push('John Deere vs Massey Ferguson', 'best tractors for Africa')
    if (title.includes('inspection') || title.includes('checklist')) anchors.push('tractor inspection checklist', 'used tractor inspection')
    if (title.includes('best used farm')) anchors.push('best used farm tractors', 'farm tractors for export to Africa')
  }

  // Comparison anchors
  if (post.category === 'comparison') {
    if (title.includes('germany vs japan')) anchors.push('buying from Germany vs Japan', 'Germany or Japan for car export')
    if (title.includes('diesel') && title.includes('petrol')) anchors.push('diesel vs petrol for export', 'fuel type for export')
    if (title.includes('hilux') && title.includes('ranger')) anchors.push('Hilux vs Ranger vs Navara', 'best export pickup truck')
    if (title.includes('mercedes') && title.includes('bmw')) anchors.push('Mercedes vs BMW for export', 'luxury car export Kenya')
    if (title.includes('best countries')) anchors.push('best countries to buy used cars', 'used car export markets')
  }

  // How-to anchors
  if (post.category === 'how-to') {
    if (title.includes('calculate') || title.includes('total import cost')) anchors.push('calculate total import cost', 'import cost calculator')
    if (title.includes('hidden cost')) anchors.push('hidden costs importing a car', 'hidden import fees')
    if (title.includes('buy') && title.includes('online')) anchors.push('buy a used car from Germany online', 'buying cars online from Germany')
    if (title.includes('customs') || title.includes('clear customs')) anchors.push('clear customs for imported vehicle', 'customs clearance guide')
    if (title.includes('register') && title.includes('nigeria')) anchors.push('register imported car Nigeria', 'FRSC vehicle registration')
    if (title.includes('container clearance') || title.includes('tema')) anchors.push('container clearance Tema port', 'clearing vehicles at Tema')
    if (title.includes('tractor') && title.includes('document')) anchors.push('tractor import documents', 'documents to import a tractor')
  }

  // Market-insight anchors
  if (post.category === 'market-insight') {
    if (title.includes('electric bike')) anchors.push('electric bikes Africa market', 'e-bike market Africa')
    if (title.includes('market trend')) anchors.push('used car market trends Africa', 'African automotive market')
  }

  return anchors
}

// ─── Site page links (to main pages, not blog) ──────────────────────────────
const SITE_PAGE_LINKS = [
  { anchor: 'browse our inventory', url: '/inventory', contexts: ['buying', 'vehicle', 'car', 'truck', 'suv', 'tractor'] },
  { anchor: 'get a free quote', url: '/contact', contexts: ['price', 'cost', 'buy', 'purchase', 'order'] },
  { anchor: 'contact our team', url: '/contact', contexts: ['help', 'question', 'assist', 'support'] },
  { anchor: 'shipping and export process', url: '/shipping', contexts: ['ship', 'freight', 'port', 'deliver', 'transit'] },
  { anchor: 'how the buying process works', url: '/how-it-works', contexts: ['step', 'process', 'procedure', 'how to buy'] },
  { anchor: 'view our available vehicles', url: '/inventory', contexts: ['available', 'stock', 'inventory', 'selection'] },
  { anchor: 'our farm tractors', url: '/inventory/tractors', contexts: ['tractor', 'farm', 'agricultural'] },
  { anchor: 'frequently asked questions', url: '/faq', contexts: ['question', 'common', 'faq', 'ask'] },
]

// ─── Compute related slugs for each post ────────────────────────────────────
function computeRelatedSlugs(currentPost, allPosts) {
  const scores = []

  for (const other of allPosts) {
    if (other.slug === currentPost.slug) continue

    let score = 0

    // Same category = base relevance
    if (other.category === currentPost.category) score += 3

    // Tag overlap
    const currentTags = new Set(currentPost.tags.map((t) => t.toLowerCase()))
    const otherTags = other.tags.map((t) => t.toLowerCase())
    for (const tag of otherTags) {
      if (currentTags.has(tag)) score += 2
    }

    // Keyword overlap
    const currentKw = new Set(currentPost.keywords.map((k) => k.toLowerCase()))
    const otherKw = other.keywords.map((k) => k.toLowerCase())
    for (const kw of otherKw) {
      if (currentKw.has(kw)) score += 1
    }

    // Country overlap in title (both about same country)
    const countries = ['nigeria', 'kenya', 'ghana', 'tanzania', 'cameroon', 'uganda', 'brazil', 'romania', 'africa']
    for (const c of countries) {
      if (currentPost.title.toLowerCase().includes(c) && other.title.toLowerCase().includes(c)) {
        score += 3
      }
    }

    // Vehicle overlap (both about same vehicle)
    const vehicles = ['hilux', 'land cruiser', 'prado', 'ranger', 'navara', 'sprinter', 'cr-v', 'golf', 'mercedes', 'bmw', 'john deere', 'massey ferguson']
    for (const v of vehicles) {
      if (currentPost.title.toLowerCase().includes(v) && other.title.toLowerCase().includes(v)) {
        score += 4
      }
    }

    if (score > 0) {
      scores.push({ slug: other.slug, score })
    }
  }

  // Sort by score desc, take top 5
  scores.sort((a, b) => b.score - a.score)
  return scores.slice(0, 5).map((s) => s.slug)
}

// ─── Inject links into HTML content ─────────────────────────────────────────
function injectInternalLinks(post, linkMap, allPosts) {
  let content = post.content
  const usedTargets = new Set()
  let linkCount = 0

  // First: inject blog post links
  for (const entry of linkMap) {
    if (linkCount >= MAX_LINKS_PER_POST - SITE_PAGES_MAX) break
    if (entry.slug === post.slug) continue
    if (usedTargets.has(entry.slug)) continue

    const anchor = entry.anchor
    if (anchor.length < 8) continue // skip very short anchors

    // Build a regex that matches the anchor text NOT inside a tag
    // We look for the text outside of HTML tags, not within <a>, <h1-h6>, <strong>, <th>
    const result = insertLinkSafely(content, anchor, `/blog/${entry.slug}`)
    if (result.changed) {
      content = result.content
      usedTargets.add(entry.slug)
      linkCount++
    }
  }

  // Second: inject site page links (max 2 per post)
  let siteLinksAdded = 0
  for (const siteLink of SITE_PAGE_LINKS) {
    if (siteLinksAdded >= SITE_PAGES_MAX) break
    if (linkCount >= MAX_LINKS_PER_POST) break

    // Check if content context is relevant
    const contentLower = content.toLowerCase()
    const isRelevant = siteLink.contexts.some((ctx) => contentLower.includes(ctx))
    if (!isRelevant) continue

    // Check if this URL is already linked
    if (content.includes(`href="${siteLink.url}"`)) continue

    const result = insertLinkSafely(content, siteLink.anchor, siteLink.url)
    if (result.changed) {
      content = result.content
      siteLinksAdded++
      linkCount++
    }
  }

  return content
}

/**
 * Insert a link into HTML content safely:
 * - Only replaces the FIRST occurrence
 * - Does NOT replace inside <a>, <h1>-<h6>, <strong>, <th>, <button> tags
 * - Does NOT replace inside existing link text
 * - Case-insensitive match
 */
function insertLinkSafely(html, anchorText, href) {
  // Split HTML into "inside tag" and "outside tag" segments
  // We only modify text outside of tags
  const segments = []
  let inTag = false
  let current = ''
  let tagStack = []

  // Simple parser: track whether we're inside forbidden elements
  const forbiddenTags = ['a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong', 'th', 'button', 'script']

  let i = 0
  while (i < html.length) {
    if (html[i] === '<') {
      // Found a tag
      const tagEnd = html.indexOf('>', i)
      if (tagEnd === -1) {
        current += html[i]
        i++
        continue
      }
      const tagContent = html.substring(i, tagEnd + 1)

      // Check if opening or closing tag
      const closingMatch = tagContent.match(/^<\/(\w+)/)
      const openingMatch = tagContent.match(/^<(\w+)/)

      if (closingMatch) {
        const tagName = closingMatch[1].toLowerCase()
        if (forbiddenTags.includes(tagName)) {
          tagStack = tagStack.filter((t) => t !== tagName)
        }
      } else if (openingMatch) {
        const tagName = openingMatch[1].toLowerCase()
        if (forbiddenTags.includes(tagName) && !tagContent.endsWith('/>')) {
          tagStack.push(tagName)
        }
      }

      current += tagContent
      i = tagEnd + 1
      continue
    }

    // We're in text content
    if (tagStack.length > 0) {
      // Inside a forbidden element — don't modify
      current += html[i]
      i++
      continue
    }

    // Outside forbidden elements — check for anchor text match
    const remaining = html.substring(i)
    const regex = new RegExp(`^${escapeRegex(anchorText)}`, 'i')
    const match = remaining.match(regex)

    if (match) {
      // Ensure we're matching at a word boundary (not mid-word)
      const charBefore = i > 0 ? html[i - 1] : ' '
      const charAfter = html[i + match[0].length] || ' '
      const isBoundaryBefore = /[\s,.:;!?()>"'\-\/]/.test(charBefore) || charBefore === '>'
      const isBoundaryAfter = /[\s,.:;!?()<"'\-\/]/.test(charAfter) || charAfter === '<'

      if (isBoundaryBefore && isBoundaryAfter) {
        const linkHtml = `<a href="${href}">${match[0]}</a>`
        current += linkHtml
        i += match[0].length
        // Return immediately — only first occurrence
        current += html.substring(i)
        return { content: current, changed: true }
      }
    }

    current += html[i]
    i++
  }

  return { content: current, changed: false }
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// ─── Strip existing internal links (clean slate) ────────────────────────────
function stripExistingInternalLinks(html) {
  // Remove <a href="/blog/...">text</a> → text  (keep the text, remove the link)
  // Also remove <a href="/inventory">text</a> etc.
  return html.replace(/<a\s+href="\/(blog|inventory|contact|shipping|how-it-works|faq)[^"]*"[^>]*>(.*?)<\/a>/gi, '$2')
}

// ─── Main ────────────────────────────────────────────────────────────────────
function main() {
  const posts = loadAllPosts()
  console.log(`Loaded ${posts.length} blog posts`)

  const linkMap = buildLinkMap(posts)
  console.log(`Built link map with ${linkMap.length} anchor entries`)

  let totalLinksInjected = 0
  let postsModified = 0

  for (const post of posts) {
    const originalContent = post.content

    // Strip any existing internal links first (clean slate)
    let cleanContent = stripExistingInternalLinks(originalContent)

    // Inject fresh internal links
    const newContent = injectInternalLinks({ ...post, content: cleanContent }, linkMap, posts)

    // Compute related slugs
    const relatedSlugs = computeRelatedSlugs(post, posts)

    // Count how many links were added
    const newLinkCount = (newContent.match(/<a href="\//g) || []).length
    const oldLinkCount = (cleanContent.match(/<a href="\//g) || []).length
    const addedLinks = newLinkCount - oldLinkCount

    if (addedLinks > 0 || JSON.stringify(relatedSlugs) !== JSON.stringify(post.relatedSlugs)) {
      post.content = newContent
      post.relatedSlugs = relatedSlugs

      // Write back to file
      const filePath = path.join(BLOG_DIR, `${post.slug}.json`)
      fs.writeFileSync(filePath, JSON.stringify(post, null, 2) + '\n')

      totalLinksInjected += addedLinks
      postsModified++
      console.log(`  ✓ ${post.slug}: +${addedLinks} links, ${relatedSlugs.length} related`)
    } else {
      // Still save relatedSlugs if different
      if (JSON.stringify(relatedSlugs) !== JSON.stringify(post.relatedSlugs)) {
        post.relatedSlugs = relatedSlugs
        const filePath = path.join(BLOG_DIR, `${post.slug}.json`)
        fs.writeFileSync(filePath, JSON.stringify(post, null, 2) + '\n')
        postsModified++
        console.log(`  ○ ${post.slug}: 0 links, ${relatedSlugs.length} related (slugs only)`)
      } else {
        console.log(`  - ${post.slug}: no changes needed`)
      }
    }
  }

  console.log(`\nDone! Modified ${postsModified}/${posts.length} posts, injected ${totalLinksInjected} total internal links`)
}

main()
