import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/constants'

/**
 * robots.txt
 *
 * SOP §3.1.1  — All monetised content crawlable by default.
 * SOP §7.3    — AI crawlers (GPTBot, Google-Extended, PerplexityBot, ClaudeBot)
 *               must NOT be blocked so the site can be cited by AI engines
 *               (Google AI Overviews, ChatGPT Search, Perplexity, Bing Copilot).
 *               Bytespider (ByteDance/TikTok) is also allowed for broader reach.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Standard crawlers — allow everything except API routes
      {
        userAgent: '*',
        allow: '/',
        disallow: '/api/',
      },

      // OpenAI GPTBot — ChatGPT Search & training (SOP §7.3)
      {
        userAgent: 'GPTBot',
        allow: '/',
      },

      // Google-Extended — feeds Google AI Overviews and Gemini (SOP §7.3)
      {
        userAgent: 'Google-Extended',
        allow: '/',
      },

      // PerplexityBot — high-value AI citation surface (SOP §7.3)
      {
        userAgent: 'PerplexityBot',
        allow: '/',
      },

      // ClaudeBot — Anthropic / Claude Search (SOP §7.3)
      {
        userAgent: 'ClaudeBot',
        allow: '/',
      },

      // Bytespider — ByteDance/TikTok search (SOP §7.3 — assessed as allow)
      {
        userAgent: 'Bytespider',
        allow: '/',
      },

      // Applebot — Apple Intelligence / Siri / Spotlight
      {
        userAgent: 'Applebot',
        allow: '/',
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
