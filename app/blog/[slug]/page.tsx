import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getPostBySlug, getAllSlugs, getRelatedPosts } from '@/lib/blog'
import { blogPostingSchema, blogFaqSchema, blogBreadcrumbSchema } from '@/lib/blog/schema'
import { SITE_URL, SITE_NAME } from '@/lib/constants'
import { BLOG_CATEGORIES } from '@/types/blog'
import { Container } from '@/components/shared/Container'
import { CTABanner } from '@/components/shared/CTABanner'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}

  const imageUrl = post.image.startsWith('http') ? post.image : `${SITE_URL}${post.image}`

  return {
    title: `${post.seoTitle} | ${SITE_NAME}`,
    description: post.seoDescription,
    keywords: post.keywords,
    authors: [{ name: post.author.name }],
    alternates: { canonical: `${SITE_URL}/blog/${post.slug}` },
    openGraph: {
      title: post.seoTitle,
      description: post.seoDescription,
      url: `${SITE_URL}/blog/${post.slug}`,
      siteName: SITE_NAME,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      section: BLOG_CATEGORIES[post.category]?.label,
      tags: post.tags,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: post.imageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seoTitle,
      description: post.seoDescription,
      images: [imageUrl],
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const relatedPosts = getRelatedPosts(slug, 3)
  const postSchema = blogPostingSchema(post)
  const breadcrumbSchema = blogBreadcrumbSchema(post)
  const faqSchema = post.faqItems ? blogFaqSchema(post.faqItems) : null

  const categoryInfo = BLOG_CATEGORIES[post.category]
  const imageUrl = post.image.startsWith('http') ? post.image : post.image

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(postSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <article className="py-8 md:py-16">
        <Container>
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted">
            <ol className="flex items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-navy transition-colors">Home</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/blog" className="hover:text-navy transition-colors">Blog</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-navy font-medium truncate max-w-xs">{post.title}</li>
            </ol>
          </nav>

          {/* Article Header */}
          <header className="max-w-3xl mx-auto text-center mb-10">
            <span className="inline-block text-xs font-semibold text-cta uppercase tracking-wider mb-3">
              {categoryInfo?.label || post.category}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy leading-tight">
              {post.title}
            </h1>
            <p className="mt-4 text-lg text-slate max-w-2xl mx-auto">{post.excerpt}</p>

            {/* Author & Meta */}
            <div className="mt-6 flex items-center justify-center gap-4 text-sm text-muted">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-navy/10 flex items-center justify-center text-navy font-bold text-xs">
                  {post.author.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div className="text-left">
                  <p className="font-medium text-navy">{post.author.name}</p>
                  <p className="text-xs">{post.author.title}</p>
                </div>
              </div>
              <span aria-hidden="true">|</span>
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <span aria-hidden="true">|</span>
              <span>{post.readingTime} min read</span>
            </div>

            {/* Last Updated for freshness signal */}
            {post.updatedAt !== post.publishedAt && (
              <p className="mt-2 text-xs text-muted">
                Last updated:{' '}
                <time dateTime={post.updatedAt}>
                  {new Date(post.updatedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </p>
            )}
          </header>

          {/* Featured Image */}
          <div className="relative w-full max-w-4xl mx-auto aspect-[2/1] rounded-xl overflow-hidden mb-12 bg-slate-200">
            <Image
              src={imageUrl}
              alt={post.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 900px"
              priority
            />
          </div>

          {/* TLDR / Key Takeaway for AI extraction */}
          {post.tldr && (
            <div
              className="article-tldr max-w-3xl mx-auto mb-10 p-5 bg-blue-50 border-l-4 border-cta rounded-r-lg"
              data-speakable
            >
              <p className="font-semibold text-navy text-sm uppercase tracking-wider mb-1">
                Key Takeaway
              </p>
              <p className="text-slate leading-relaxed">{post.tldr}</p>
            </div>
          )}

          {/* Article Body */}
          <div
            className="prose prose-lg prose-slate max-w-3xl mx-auto
              prose-headings:text-navy prose-headings:font-bold
              prose-a:text-cta prose-a:no-underline hover:prose-a:underline
              prose-img:rounded-lg prose-strong:text-navy
              prose-table:border-collapse prose-th:bg-navy/5 prose-th:p-3 prose-td:p-3
              prose-th:text-left prose-th:font-semibold prose-th:text-navy
              prose-tr:border-b prose-tr:border-slate-200"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* FAQ Section (AEO) */}
          {post.faqItems && post.faqItems.length > 0 && (
            <section className="max-w-3xl mx-auto mt-16" data-speakable>
              <h2 className="text-2xl font-bold text-navy mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {post.faqItems.map((faq, i) => (
                  <div key={i} className="border border-slate-200 rounded-lg p-5">
                    <h3 className="font-semibold text-navy">{faq.question}</h3>
                    <p className="mt-2 text-slate leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="max-w-3xl mx-auto mt-10 pt-6 border-t border-slate-200">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium text-muted bg-slate-100 px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Author Bio (E-E-A-T) */}
          <div className="max-w-3xl mx-auto mt-10 p-6 bg-slate-50 rounded-xl">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-navy/10 flex items-center justify-center text-navy font-bold flex-shrink-0">
                {post.author.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <div>
                <p className="font-bold text-navy">{post.author.name}</p>
                <p className="text-sm text-muted">{post.author.title}</p>
                <p className="mt-2 text-sm text-slate leading-relaxed">{post.author.bio}</p>
              </div>
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section className="max-w-4xl mx-auto mt-16">
              <h2 className="text-2xl font-bold text-navy mb-6">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}`}
                    className="group block rounded-xl overflow-hidden border border-slate-200 hover:shadow-lg transition-shadow"
                  >
                    <div className="relative h-36 bg-slate-200">
                      <Image
                        src={
                          related.image.startsWith('http') ? related.image : related.image
                        }
                        alt={related.imageAlt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-4">
                      <span className="text-xs font-semibold text-cta uppercase tracking-wider">
                        {BLOG_CATEGORIES[related.category]?.label}
                      </span>
                      <h3 className="mt-1 font-bold text-navy group-hover:text-cta transition-colors line-clamp-2">
                        {related.title}
                      </h3>
                      <p className="mt-1 text-xs text-muted">
                        {new Date(related.publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </Container>
      </article>

      <CTABanner
        headline="Ready to Buy a Quality-Inspected Vehicle?"
        subtext="Browse our inventory of used cars, tractors, and electric bikes ready for export from Germany."
        primaryCTA={{ label: 'Explore Inventory', href: '/inventory' }}
        secondaryCTA={{ label: 'Get a Free Quote', href: '/contact' }}
        variant="light"
      />
    </>
  )
}
