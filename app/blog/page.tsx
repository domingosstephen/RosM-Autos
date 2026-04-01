import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { createPageMetadata } from '@/lib/metadata'
import { getAllPosts } from '@/lib/blog'
import { blogListSchema } from '@/lib/blog/schema'
import { BLOG_CATEGORIES } from '@/types/blog'
import { Container } from '@/components/shared/Container'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { Card } from '@/components/shared/Card'
import { CTABanner } from '@/components/shared/CTABanner'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { AnimateOnScroll } from '@/components/shared/AnimateOnScroll'

export const metadata: Metadata = createPageMetadata({
  title: 'Blog | Used Vehicle Export Tips & Market Insights',
  description:
    'Tips, market updates, and expert advice for international vehicle buyers. Learn about importing used cars, tractors, and electric bikes to Africa, South America, and Eastern Europe.',
  path: '/blog',
})

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <>
      {/* Blog list schema */}
      {posts.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListSchema(posts)) }}
        />
      )}

      <Container>
        <Breadcrumbs />
      </Container>

      <section className="py-16 md:py-24">
        <Container>
          <SectionHeading
            title="Guides, Market Data, and Import Tips for International Buyers"
            subtitle="Actionable advice on import duties, shipping routes, vehicle selection, and market trends — based on real export data"
            tag="h1"
          />

          {posts.length > 0 ? (
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, i) => (
                <AnimateOnScroll key={post.slug} animation="fade-up" delay={i * 100}>
                  <Link href={`/blog/${post.slug}`} className="block group">
                    <Card hoverable padding="none" className="overflow-hidden flex flex-col h-full">
                      <div className="relative h-44 w-full bg-slate-200">
                        <Image
                          src={
                            post.image.startsWith('http') ? post.image : post.image
                          }
                          alt={post.imageAlt}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          unoptimized
                        />
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <span className="text-xs font-semibold text-cta uppercase tracking-wider">
                          {BLOG_CATEGORIES[post.category]?.label || post.category}
                        </span>
                        <h2 className="mt-2 text-lg font-bold text-navy leading-snug group-hover:text-cta transition-colors">
                          {post.title}
                        </h2>
                        <p className="mt-2 text-sm text-slate leading-relaxed flex-1 line-clamp-3">
                          {post.excerpt}
                        </p>
                        <div className="mt-4 flex items-center justify-between text-xs text-muted">
                          <time dateTime={post.publishedAt}>
                            {new Date(post.publishedAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </time>
                          <span>{post.readingTime} min read</span>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </AnimateOnScroll>
              ))}
            </div>
          ) : (
            <div className="mt-12 text-center">
              <p className="text-muted">
                Our first articles are being prepared. Follow us on social media for updates.
              </p>
            </div>
          )}
        </Container>
      </section>

      <CTABanner
        headline="Ready to Buy? Start with Our Inventory"
        subtext="Explore our quality-inspected vehicles or get a free quote."
        primaryCTA={{ label: 'Explore the Inventory', href: '/inventory' }}
        secondaryCTA={{ label: 'Get a Free Quote', href: '/contact' }}
        variant="light"
      />
    </>
  )
}
