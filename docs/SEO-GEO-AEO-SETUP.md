# Step-by-Step: SEO, GEO & AEO Setup for RosM Autos

This guide walks you through setting up **SEO** (Search Engine Optimization), **GEO** (Generative Engine Optimization for AI search), and **AEO** (Answer Engine Optimization for featured snippets and voice/AI answers) for your Next.js site.

---

## What’s Already in Place

Your codebase already includes:

- **SEO:** Per-page metadata (title, description, canonical), Open Graph & Twitter cards, `robots.txt`, XML sitemap, JSON-LD (Organization, WebSite, LocalBusiness, Product, BreadcrumbList, FAQPage, HowTo).
- **GEO:** `robots.txt` allows GPTBot, Google-Extended, PerplexityBot, ClaudeBot, Bytespider, Applebot. Speakable schema and keyword coverage for AI-style queries.
- **AEO:** FAQPage and HowTo schema, Speakable schema, and keywords aimed at “People Also Ask” style queries.

The steps below focus on **configuration, verification, and content checks** so everything works in production.

---

## Part 1 — SEO Setup

### Step 1.1: Set production URL and environment

1. Confirm **production URL** in `lib/constants.ts`:
   - `SITE_URL` should be `https://www.rosm-autos.com` (or your live domain). No trailing slash.
2. After deploy, ensure the site is served over **HTTPS** and that redirects (e.g. `www` → non-`www` or vice versa) match the URL you use in `SITE_URL`.

### Step 1.2: Get verification codes and add them to metadata

1. **Google Search Console**
   - Go to [Google Search Console](https://search.google.com/search-console).
   - Add property: **URL prefix** → enter `https://www.rosm-autos.com`.
   - Choose **HTML tag** verification. Copy the `content` value (e.g. `4eb14543200fea69` — you already have `google4eb14543200fea69.html` in `public/`, so you may have used file verification; if so, skip adding the meta tag).
   - If you prefer **meta tag** verification: open `lib/metadata.ts`, uncomment the `verification` block in `defaultMetadata`, and set:
     - `google: 'YOUR_GOOGLE_VERIFICATION_CODE'` (the `content` value from the HTML tag).

2. **Bing Webmaster Tools**
   - Go to [Bing Webmaster Tools](https://www.bing.com/webmasters).
   - Add your site and get the **HTML meta tag** verification code.
   - In `lib/metadata.ts`, set `verification.bing: 'YOUR_BING_CODE'`.

3. **Yandex** (optional, for Eastern European visibility)
   - In [Yandex Webmaster](https://webmaster.yandex.com/), add the site and get the verification meta tag.
   - In `lib/metadata.ts`, set `verification.yandex: 'YOUR_YANDEX_CODE'`.

**Example** (in `lib/metadata.ts`):

```ts
verification: {
  google: 'your-google-content-value',
  yandex: 'your-yandex-content-value',
  other: { 'msvalidate.01': 'your-bing-value' }, // Bing often uses this key
},
```

Redeploy after changing `defaultMetadata`.

### Step 1.3: Submit sitemap and request indexing

1. In **Google Search Console**: **Sitemaps** → submit `https://www.rosm-autos.com/sitemap.xml`.
2. In **Bing Webmaster**: **Sitemaps** → submit the same URL.
3. Optionally use **URL Inspection** (Google) or **URL Submission** (Bing) for key pages (home, /inventory, /how-it-works, /contact) and request indexing.

### Step 1.4: Default Open Graph image

- Ensure `public/icons/og-image.png` exists and is **1200×630 px**.
- If missing, add a branded image; it’s used as the default in `createPageMetadata()` in `lib/metadata.ts`.

### Step 1.5: Check core pages have metadata

- Every important page should export `metadata` or `generateMetadata` using `createPageMetadata()` (title, description, path, optional `ogImage`). You already do this for inventory, about, contact, blog, how-it-works, etc. When adding new pages, keep using the same pattern.

---

## Part 2 — GEO (Generative Engine Optimization) Setup

GEO is about being **discoverable and citable** by AI engines (e.g. ChatGPT, Perplexity, Google AI Overviews). Your `app/robots.ts` already allows the main AI crawlers.

### Step 2.1: Confirm AI crawlers are allowed

- Open `app/robots.ts`. You should see `allow: '/'` for:
  - `GPTBot` (OpenAI)
  - `Google-Extended` (Google AI)
  - `PerplexityBot`
  - `ClaudeBot`
  - `Bytespider`, `Applebot`
- Do **not** add `Disallow: /` for these if you want the site to be used by AI search.

### Step 2.2: Keep content “citation-friendly”

- Prefer **clear, concise answers** in the first 1–2 sentences after a heading (especially on FAQ, How it works, Shipping).
- Use **descriptive H2/H3** that match how people ask questions (e.g. “How do I pay for a car?”, “What shipping options do you offer?”).
- Keep **one main topic per page** and use your existing keywords (in `lib/metadata.ts`) for themes like “used cars for export”, “buy car Nigeria from Germany”, “how to import used car from Germany”.

### Step 2.3: Speakable schema (already used)

- Speakable is already output on the homepage and inventory pages via `speakableSchema(['h1', '[data-speakable]'])`.
- To mark extra “answer” blocks for AI/voice, add the attribute to the wrapping element, e.g. `<div data-speakable>…</div>` around short, direct answers on key pages (e.g. how-it-works, FAQ intro).

### Step 2.4: Optional — Declare site for AI crawlers

- No extra technical step is required; allowing crawlers and having clear, factual content is the main lever. You can later submit the site to any “add your site” forms that search engines or AI products provide.

---

## Part 3 — AEO (Answer Engine Optimization) Setup

AEO helps your content appear as **direct answers** in search (featured snippets, voice, and AI answers). Your structured data and content structure already support this.

### Step 3.1: FAQPage schema (already on FAQ page)

- `app/faq/page.tsx` injects `faqSchema(allFaqItems)` as JSON-LD. No change needed; just keep **questions in natural language** and **answers concise** (a short paragraph or bullet list) in `lib/faq-data.ts`.

### Step 3.2: HowTo schema on “How it works”

- **Already done:** `app/how-it-works/page.tsx` outputs `howToSchema()` as JSON-LD. The visible steps on the page align with the schema. No code change needed; when you edit the steps in the page, keep them in sync with the steps in `lib/schema.ts` (`howToSchema`) so snippets stay accurate.

### Step 3.3: Speakable on FAQ and How it works

- For **FAQ**: Consider adding a **server-rendered** block that outputs Speakable JSON-LD for the FAQ page URL and points to the same selectors (`h1`, `[data-speakable]`). If the FAQ page has a short intro paragraph that answers “What is RosM Autos?” or “How can I contact you?”, wrap it in an element with `data-speakable`.
- For **How it works**: Add `speakableSchema(['h1', '.steps-section'])` (or a class you use for the steps) and output it on that page so step titles and short descriptions can be used for voice/AI.

### Step 3.4: Content format for snippets

- **One clear answer per question** on the FAQ page.
- Use **lists or short paragraphs** (2–4 sentences) for steps or definitions.
- **First sentence** of each answer should directly address the question; this improves chances of being used as a snippet or AI quote.

### Step 3.5: Product and Breadcrumb schema

- Product pages already use `productSchema(product)` and breadcrumbs use `breadcrumbSchema()`. Keep using them on every product and category page so search and answer engines understand structure and offerings.

---

## Quick checklist

| Task | Where | Status |
|------|--------|--------|
| `SITE_URL` correct in production | `lib/constants.ts` | Verify |
| Google Search Console verification | `lib/metadata.ts` or HTML file | Add / verify |
| Bing verification | `lib/metadata.ts` | Add |
| Sitemap submitted (Google + Bing) | Search Console / Bing | Do after deploy |
| OG default image 1200×630 | `public/icons/og-image.png` | Verify |
| AI crawlers allowed | `app/robots.ts` | Done |
| FAQPage JSON-LD on FAQ | `app/faq/page.tsx` | Done |
| HowTo JSON-LD on How it works | `app/how-it-works/page.tsx` | Done |
| Speakable on key pages | Home, inventory, FAQ, how-it-works | Add on FAQ/how-it-works if desired |
| New pages use `createPageMetadata` | Any new route | Keep doing |

---

## Summary

1. **SEO:** Set production URL → add Google/Bing (and optionally Yandex) verification in `lib/metadata.ts` → submit sitemap in Search Console and Bing → ensure OG image exists and all key pages have metadata.
2. **GEO:** Keep AI crawlers allowed in `robots.txt`, keep content clear and citation-friendly, use Speakable and `data-speakable` where it helps.
3. **AEO:** FAQPage and HowTo schema are already in place. Optionally add Speakable on FAQ and How it works; keep answers concise and first-sentence direct.

After deployment, allow a few days for re-crawling and re-indexing, then check Search Console and Bing for coverage and any issues.
