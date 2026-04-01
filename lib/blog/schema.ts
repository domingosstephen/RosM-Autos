/**
 * Blog-specific JSON-LD schemas for SEO, AEO, and GEO.
 */

import { SITE_NAME, SITE_URL } from '@/lib/constants'
import type { BlogPost } from '@/types/blog'

/**
 * BlogPosting schema — the most important schema for blog SEO + AI citation.
 */
export function blogPostingSchema(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${SITE_URL}/blog/${post.slug}#article`,
    headline: post.seoTitle,
    description: post.seoDescription,
    image: post.image.startsWith('http') ? post.image : `${SITE_URL}${post.image}`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    wordCount: post.content.replace(/<[^>]*>/g, '').split(/\s+/).length,
    timeRequired: `PT${post.readingTime}M`,
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.title,
      description: post.author.bio,
      worksFor: {
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL,
      },
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/icons/logo.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${post.slug}`,
    },
    keywords: post.keywords.join(', '),
    articleSection: post.category,
    inLanguage: 'en',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: {
      '@type': 'Thing',
      name: post.tags[0] || post.category,
    },
    // Speakable for GEO — mark TLDR and headings as speakable
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '.article-tldr', '[data-speakable]'],
    },
  }
}

/**
 * FAQ schema for inline FAQ sections within blog posts.
 */
export function blogFaqSchema(faqItems: { question: string; answer: string }[]) {
  if (!faqItems || faqItems.length === 0) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

/**
 * BreadcrumbList for blog posts.
 */
export function blogBreadcrumbSchema(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `${SITE_URL}/blog/${post.slug}`,
      },
    ],
  }
}

/**
 * ItemList schema for the blog index page.
 */
export function blogListSchema(posts: BlogPost[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'RosM Autos Blog — Vehicle Export Guides & Market Insights',
    description:
      'Expert guides on importing used cars, tractors, and electric bikes from Germany to Africa, South America, and Eastern Europe.',
    numberOfItems: posts.length,
    url: `${SITE_URL}/blog`,
    itemListElement: posts.slice(0, 20).map((post, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'BlogPosting',
        headline: post.title,
        url: `${SITE_URL}/blog/${post.slug}`,
        datePublished: post.publishedAt,
        image: post.image.startsWith('http') ? post.image : `${SITE_URL}${post.image}`,
        author: {
          '@type': 'Person',
          name: post.author.name,
        },
      },
    })),
  }
}
