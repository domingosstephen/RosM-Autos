import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/shared/Container'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { InventoryClient } from '@/components/inventory/InventoryClient'
import { createPageMetadata } from '@/lib/metadata'
import { productListSchema, speakableSchema } from '@/lib/schema'
import { tractorsOnly } from '@/lib/products'

export const metadata: Metadata = createPageMetadata({
  title: `${tractorsOnly.length} Used Farm Tractors for Export | Inspected & Ready to Ship`,
  description:
    `Browse ${tractorsOnly.length} quality-inspected used farm tractors available for international export from Germany. Click any unit for full-screen photos and specs. Free quote within 24 hours.`,
  path: '/inventory/tractors',
})

export default function TractorsPage() {
  const itemListJsonLd = productListSchema(tractorsOnly, 'Used Farm Tractors for Export')
  const speakableJsonLd = speakableSchema(['h1', '[data-speakable]'])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableJsonLd) }} />

      <section className="py-12 md:py-16">
        <Container>
          <Breadcrumbs />
          <SectionHeading
            title="Farm Tractors — Inspected and Ready to Ship"
            subtitle={`${tractorsOnly.length} used farm tractors available for export. Click any unit to view full-screen photos and specifications.`}
            tag="h1"
            alignment="center"
            className="mb-10"
          />
          <div className="mb-8 flex flex-wrap gap-2">
            <Link
              href="/inventory"
              className="inline-flex items-center gap-2 rounded-lg bg-surface-alt text-slate hover:bg-slate-200 px-4 py-2.5 text-sm font-medium transition-colors"
            >
              ← All inventory
            </Link>
          </div>
          <InventoryClient initialCategory="tractor" hideCategoryTabs />
        </Container>
      </section>
    </>
  )
}
