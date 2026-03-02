'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Container } from '@/components/shared/Container'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { Card } from '@/components/shared/Card'
import { CTABanner } from '@/components/shared/CTABanner'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { AnimateOnScroll } from '@/components/shared/AnimateOnScroll'
import { faqCategories, allFaqItems } from '@/lib/faq-data'
import { faqSchema } from '@/lib/schema'
import { SITE_IMAGES } from '@/lib/site-images'
import { cn } from '@/lib/utils'

function FAQAccordionItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 text-left min-h-[48px] gap-4"
        aria-expanded={isOpen}
      >
        <span className="font-medium text-navy">{question}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={cn('h-5 w-5 text-muted shrink-0 transition-transform', isOpen && 'rotate-180')}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {isOpen && (
        <div className="pb-4 text-slate leading-relaxed text-sm">
          {answer}
        </div>
      )}
    </div>
  )
}

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const filteredCategories = faqCategories
    .filter((cat) => !activeCategory || cat.id === activeCategory)
    .map((cat) => ({
      ...cat,
      items: cat.items.filter(
        (item) =>
          !searchQuery ||
          item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.answer.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((cat) => cat.items.length > 0)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(allFaqItems)) }}
      />

      <Container>
        <Breadcrumbs />
      </Container>

      {/* FAQ hero image */}
      <section className="pt-6 pb-4">
        <Container size="md">
          <div className="relative h-40 md:h-52 rounded-xl overflow-hidden">
            <Image
              src={SITE_IMAGES.faq}
              alt="Quality inspected vehicles — your questions answered"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 672px"
            />
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container size="md">
          <SectionHeading
            title="Your Questions, Answered"
            subtitle="54 answers covering buying, payment, inspections, shipping, customs, tractors, and e-bikes. Still have a question? We respond within 24 hours."
            tag="h1"
          />

          {/* Search */}
          <div className="mt-10 relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-border focus:border-cta focus:ring-2 focus:ring-cta/20 outline-none transition text-base"
            />
          </div>

          {/* Category filter chips */}
          <div className="mt-6 flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory(null)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-colors',
                !activeCategory ? 'bg-cta text-white' : 'bg-surface-alt text-slate hover:bg-border'
              )}
            >
              All Categories
            </button>
            {faqCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id === activeCategory ? null : cat.id)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-colors',
                  activeCategory === cat.id ? 'bg-cta text-white' : 'bg-surface-alt text-slate hover:bg-border'
                )}
              >
                {cat.title}
              </button>
            ))}
          </div>

          {/* FAQ Categories */}
          <div className="mt-10 space-y-8">
            {filteredCategories.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted text-lg">No questions match your search.</p>
                <button
                  onClick={() => { setSearchQuery(''); setActiveCategory(null) }}
                  className="mt-4 text-cta font-medium hover:underline"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              filteredCategories.map((category, i) => (
                <AnimateOnScroll key={category.id} animation="fade-up" delay={i * 150}>
                  <div>
                    <h2 className="text-xl font-bold text-navy mb-4">{category.title}</h2>
                    <Card padding="sm">
                      {category.items.map((item) => (
                        <FAQAccordionItem
                          key={item.question}
                          question={item.question}
                          answer={item.answer}
                        />
                      ))}
                    </Card>
                  </div>
                </AnimateOnScroll>
              ))
            )}
          </div>
        </Container>
      </section>

      <CTABanner
        headline="Did Not Find Your Answer?"
        subtext="Message us on WhatsApp, call, or email. We respond within 24 hours — and our team speaks your language."
        primaryCTA={{ label: 'Ask Us Directly', href: '/contact' }}
        variant="dark"
      />
    </>
  )
}
