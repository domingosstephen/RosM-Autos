import type { Metadata } from 'next'
import Image from 'next/image'
import { createPageMetadata } from '@/lib/metadata'
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

const blogPosts = [
  {
    title: 'Top 10 Vehicles for African Roads: Durability Rankings',
    excerpt: 'Which vehicles hold up best on African roads? We rank the most reliable makes and models based on our export data and customer feedback from across the continent.',
    category: 'Buying Guide',
    date: 'Coming Soon',
    alt: 'Article about the most durable vehicles for African road conditions including Land Cruiser and other SUVs',
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80',
  },
  {
    title: 'Import Duty Guide: What to Expect When Importing to Nigeria',
    excerpt: 'A comprehensive breakdown of import duties, levies, and fees when importing a used vehicle to Nigeria. Updated with current ECOWAS trade regulations.',
    category: 'Import Guide',
    date: 'Coming Soon',
    alt: 'Guide to Nigerian vehicle import duties and customs regulations for used car buyers',
    image: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=800&q=80',
  },
  {
    title: 'RoRo vs. Container Shipping: Which Is Right for Your Vehicle?',
    excerpt: 'Understanding the pros and cons of Roll-on/Roll-off versus container shipping for used vehicles, tractors, and equipment.',
    category: 'Shipping',
    date: 'Coming Soon',
    alt: 'Comparison of RoRo and container shipping methods for international vehicle export',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80',
  },
  {
    title: 'Used Farm Tractors: What to Look for Before You Buy',
    excerpt: 'Essential checklist for evaluating used farm tractors including engine hours, PTO condition, hydraulic systems, and tire wear indicators.',
    category: 'Buying Guide',
    date: 'Coming Soon',
    alt: 'Buyers guide for evaluating used farm tractors before purchase including inspection checklist',
    image: 'https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=800&q=80',
  },
  {
    title: 'Electric Bikes in Africa: The Growing Market Opportunity',
    excerpt: 'How electric bikes are transforming transportation across Africa. Market trends, charging infrastructure, and the most popular models for the continent.',
    category: 'Market Insight',
    date: 'Coming Soon',
    alt: 'Overview of the growing electric bike market in Africa and transportation trends',
    image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800&q=80',
  },
  {
    title: 'How to Clear Customs in 5 Common Destination Countries',
    excerpt: 'Step-by-step customs clearance guides for Ghana, Kenya, Brazil, Colombia, and Poland. Required documents, timelines, and tips from our logistics team.',
    category: 'Import Guide',
    date: 'Coming Soon',
    alt: 'Customs clearance guide for importing vehicles to Ghana, Kenya, Brazil, Colombia, and Poland',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80',
  },
]

export default function BlogPage() {
  return (
    <>
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

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post, i) => (
              <AnimateOnScroll key={post.title} animation="fade-up" delay={i * 150}>
                <Card hoverable padding="none" className="overflow-hidden flex flex-col">
                  <div className="relative h-44 w-full bg-slate-200">
                    <Image
                      src={post.image}
                      alt={post.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <span className="text-xs font-semibold text-cta uppercase tracking-wider">
                      {post.category}
                    </span>
                    <h2 className="mt-2 text-lg font-bold text-navy leading-snug">
                      {post.title}
                    </h2>
                    <p className="mt-2 text-sm text-slate leading-relaxed flex-1">
                      {post.excerpt}
                    </p>
                    <p className="mt-4 text-xs text-muted font-medium">{post.date}</p>
                  </div>
                </Card>
              </AnimateOnScroll>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted">
              More articles coming soon. Follow us on social media for updates.
            </p>
          </div>
        </Container>
      </section>

      <CTABanner
        headline="Ready to Buy? Start with Our Inventory"
        subtext="Articles are coming soon. In the meantime, explore our inspected vehicles or get a free quote."
        primaryCTA={{ label: 'Explore the Inventory', href: '/inventory' }}
        secondaryCTA={{ label: 'Get a Free Quote', href: '/contact' }}
        variant="light"
      />
    </>
  )
}
