# RosM Autos — Automated Blog Engine

## Overview

An automated content generation system that produces 1-5 SEO/AEO/GEO-optimized blog posts daily. Includes AI-powered topic research, an approval queue, and full control over every aspect of publishing.

---

## Architecture

```
scripts/blog-engine/
├── config.ts            # Seed topic clusters, keywords, competitors, authors
├── control.json         # ⬅ YOUR CONTROL PANEL (pause, article count, category toggles)
├── topic-selector.ts    # Picks best topics based on scoring + control.json
├── generator.ts         # AI-powered article generation (Claude or GPT-4o)
├── publisher.ts         # Writes posts to /content/blog/ as JSON
├── researcher.ts        # ⬅ AI topic research (keyword, competitor, question, regional)
├── published.json       # Tracks published topics (prevents duplicates)
├── pending-topics.json  # Research queue: pending → approved → rejected
└── addon-topics.json    # Approved researched topics (auto-created by --sync)
└── run.ts               # Main CLI entry point

content/blog/
└── {slug}.json          # Generated blog posts (read by Next.js at build time)

app/blog/
├── page.tsx             # Blog index (reads from content/blog/)
└── [slug]/page.tsx      # Individual post pages with full SEO schema

.github/workflows/
├── daily-blog.yml       # Daily generation (6 AM UTC) + manual triggers
└── weekly-research.yml  # Auto-research when topics run low (Mondays 5 AM)
```

---

## Quick Start

### 1. Set your API key

```bash
cp .env.example .env
# Add: ANTHROPIC_API_KEY=sk-ant-...
# OR:  OPENAI_API_KEY=sk-...
```

### 2. Generate articles locally

```bash
npx tsx scripts/blog-engine/run.ts --dry-run     # Preview (no API call)
npx tsx scripts/blog-engine/run.ts               # Generate 3 articles
npx tsx scripts/blog-engine/run.ts --count 5     # Generate 5 articles
npx tsx scripts/blog-engine/run.ts --stats        # Coverage dashboard
```

### 3. Enable daily automation

1. Push repo to GitHub
2. Add `ANTHROPIC_API_KEY` to **Settings > Secrets and variables > Actions > New repository secret**
3. Workflow runs daily at 6:00 AM UTC
4. Trigger manually anytime from the **Actions** tab

---

## Control Panel: `control.json`

This is your main control file. Edit it to change how the engine behaves:

```json
{
  "engine": {
    "enabled": true,       // Set false to PAUSE all generation
    "articlesPerDay": 3    // 1-5 articles per run
  },
  "categories": {
    "country-guide":  { "enabled": true,  "maxPerWeek": 5, "priority": "high" },
    "buying-guide":   { "enabled": true,  "maxPerWeek": 3, "priority": "high" },
    "shipping":       { "enabled": true,  "maxPerWeek": 2, "priority": "medium" },
    "comparison":     { "enabled": true,  "maxPerWeek": 3, "priority": "high" },
    "tractor-guide":  { "enabled": true,  "maxPerWeek": 2, "priority": "medium" },
    "market-insight": { "enabled": true,  "maxPerWeek": 2, "priority": "low" },
    ...
  },
  "research": {
    "competitorSites": ["https://www.beforward.jp/blog", ...],
    "targetRegions": ["Nigeria", "Ghana", "Kenya", ...]
  }
}
```

### What you can control

| Setting | What it does |
|---------|-------------|
| `engine.enabled` | `false` = pause everything. No articles generated. |
| `engine.articlesPerDay` | 1-5 articles per automated run |
| `categories.X.enabled` | `false` = skip this category entirely |
| `categories.X.priority` | `high`/`medium`/`low` — affects topic scoring |
| `categories.X.maxPerWeek` | Cap articles per category per week |
| `research.targetRegions` | Countries the researcher creates guides for |
| `research.competitorSites` | URLs analyzed for content gaps |

---

## Topic Research

The researcher discovers new topics using 4 AI-powered strategies:

| Strategy | What it does |
|----------|-------------|
| `keyword` | Expands existing keywords into new long-tail topics |
| `competitor` | Analyzes competitor blogs for topics you haven't covered |
| `question` | Mines real questions from forums, PAA, AI queries |
| `regional` | Creates country-specific guides for uncovered regions |

### Research workflow

```bash
# 1. Run research (discovers topics, adds to pending queue)
npx tsx scripts/blog-engine/researcher.ts

# 2. Review what was found
npx tsx scripts/blog-engine/researcher.ts --list

# 3. Approve topics you want (by index number from --list)
npx tsx scripts/blog-engine/researcher.ts --approve 0 1 3 5

# Or approve everything at once
npx tsx scripts/blog-engine/researcher.ts --approve-all

# Reject topics you don't want
npx tsx scripts/blog-engine/researcher.ts --reject 2 4

# 4. Sync approved topics into the generation pipeline
npx tsx scripts/blog-engine/researcher.ts --sync

# 5. Run a specific strategy only
npx tsx scripts/blog-engine/researcher.ts --strategy competitor
```

### Approval flow

```
Research → Pending Queue → You Review → Approve/Reject → Sync → Generation Pipeline
```

If you want fully autonomous operation, the weekly-research.yml workflow auto-approves everything. To switch to manual approval, just don't use the weekly workflow — run researcher locally and approve what you want.

---

## GitHub Actions: Manual Triggers

Go to **Actions > Daily Blog Generation > Run workflow** and choose:

| Action | What happens |
|--------|-------------|
| `generate` | Generate articles from approved topics |
| `research` | Discover new topics (adds to pending queue) |
| `research-and-approve` | Discover + auto-approve + add to pipeline |
| `dry-run` | Show what would be generated (no files created) |
| `stats` | Show topic coverage dashboard |

You also pick the article count (1-5) and research strategy.

---

## Automation Schedule

| Workflow | When | What |
|----------|------|------|
| `daily-blog.yml` | Daily 6:00 AM UTC | Generates 3 articles, commits, pushes |
| `weekly-research.yml` | Monday 5:00 AM UTC | If topics < 20, runs research + auto-approve |

Both can be triggered manually anytime.

---

## Adding Topics Manually

Two ways:

### Option A: Edit config.ts directly (permanent seed topics)

```ts
// In scripts/blog-engine/config.ts, add to the appropriate cluster:
{
  title: 'Your Article Title',
  primaryKeyword: 'main keyword target',
  secondaryKeywords: ['keyword 2', 'keyword 3'],
  searchIntent: 'informational',
  targetRegions: ['Nigeria'],
  priority: 1,
  aiQueryTargets: ['Question this article should answer?'],
}
```

### Option B: Use the researcher (researched + approved topics)

Run `researcher.ts` to discover topics, approve them, and sync. These go into `addon-topics.json` and are picked up automatically.

---

## Content Pipeline Status

At 3 articles/day:

| Seed topics | Duration | After that |
|------------|----------|-----------|
| 34 initial | ~12 days | Weekly research kicks in automatically |
| +20-30/week (research) | Indefinite | Self-sustaining pipeline |

The weekly research workflow ensures you never run out. When topics drop below 20, it automatically discovers and approves new ones.

---

## Monitoring

| What | How |
|------|-----|
| Topic coverage | `npx tsx scripts/blog-engine/run.ts --stats` |
| Pending research | `npx tsx scripts/blog-engine/researcher.ts --list` |
| Build health | Check GitHub Actions for failed builds |
| SEO indexing | Google Search Console > Sitemaps + Coverage |
| AI visibility | Monthly manual check in ChatGPT, Perplexity, Google |
