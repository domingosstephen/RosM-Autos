import type { Metadata } from 'next'
import Image from 'next/image'
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
import { SITE_IMAGES } from '@/lib/site-images'

type PageProps = { params: Promise<{ brand: string }> }

export async function generateStaticParams() {
  return automobileBrands.map((b) => ({ brand: b.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { brand: brandSlug } = await params
  const entry = automobileBrands.find((b) => b.slug === brandSlug)
  if (!entry) return {}
  return createPageMetadata({
    title: `${entry.brand} Used Cars for Export | Inspected Vehicles`,
    description: `Browse our inspected used ${entry.brand} vehicles. Quality ${entry.brand} cars and SUVs ready for export.`,
    path: `/inventory/${brandSlug}`,
  })
}

export default async function BrandInventoryPage({ params }: PageProps) {
  const { brand: brandSlug } = await params
  const entry = automobileBrands.find((b) => b.slug === brandSlug)
  if (!entry) notFound()

  const products = getAutomobilesByBrandSlug(brandSlug)
  if (products.length === 0) notFound()

  return (
    <section className="py-12 md:py-16">
      <Container>
        <Breadcrumbs />
        <div className="relative h-64 md:h-80 lg:h-96 rounded-xl overflow-hidden bg-slate-100 mb-10">
          <Image
            src={SITE_IMAGES.inventory}
            alt={`Browse our inspected ${entry.brand} vehicles`}
            fill
            className="object-contain"
            sizes="100vw"
          />
        </div>
        <SectionHeading
          title={`${entry.brand} — Inspected and Ready to Ship`}
          subtitle="Click a vehicle to view full-screen photos and specifications. Same experience on mobile, tablet, and desktop."
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
  )
}
