import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Container } from '@/components/shared/Container'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { InventoryClient } from '@/components/inventory/InventoryClient'
import {
  automobileBrands,
  getAutomobilesByBrandSlug,
} from '@/lib/products'
import { createPageMetadata } from '@/lib/metadata'
import { productListSchema, speakableSchema } from '@/lib/schema'

type PageProps = { params: Promise<{ brand: string }> }

export async function generateStaticParams() {
  return automobileBrands.map((b) => ({ brand: b.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { brand: brandSlug } = await params
  const entry = automobileBrands.find((b) => b.slug === brandSlug)
  if (!entry) return {}
  const count = getAutomobilesByBrandSlug(brandSlug).length
  return createPageMetadata({
    title: `${count} Used ${entry.brand} Cars for Export | Inspected & Ready to Ship`,
    description: `Browse ${count} inspected used ${entry.brand} vehicles available for international export from Germany. Click any car to see full-screen photos and specifications. Free quote within 24 hours.`,
    path: `/inventory/${brandSlug}`,
  })
}

export default async function BrandInventoryPage({ params }: PageProps) {
  const { brand: brandSlug } = await params
  const entry = automobileBrands.find((b) => b.slug === brandSlug)
  if (!entry) notFound()

  const products = getAutomobilesByBrandSlug(brandSlug)
  if (products.length === 0) notFound()

  // SOP §3.3 — brand-specific ItemList schema for car listings
  const itemListJsonLd = productListSchema(products, `Used ${entry.brand} Vehicles for Export`)
  // SOP §7.3 — Speakable flags H1 for AI engine recitation (GEO)
  const speakableJsonLd = speakableSchema(['h1', '[data-speakable]'])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableJsonLd) }} />

      <section className="py-12 md:py-16">
        <Container>
          <Breadcrumbs />
          <SectionHeading
            title={`${entry.brand} — Inspected and Ready to Ship`}
            subtitle={`${products.length} used ${entry.brand} vehicles available for export from Germany. Click any vehicle to view full-screen photos and full specifications.`}
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
          <InventoryClient
            productsOverride={products}
            hideCategoryTabs
          />
        </Container>
      </section>
    </>
  )
}
