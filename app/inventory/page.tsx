import type { Metadata } from 'next'
import Image from 'next/image'
import { Container } from '@/components/shared/Container'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { InventoryClient } from '@/components/inventory/InventoryClient'
import { createPageMetadata } from '@/lib/metadata'
import { productListSchema } from '@/lib/schema'
import { allProducts } from '@/lib/products'
import { SITE_IMAGES } from '@/lib/site-images'
import type { ProductCategory } from '@/types/product'

type InventoryPageProps = { searchParams: Promise<{ category?: string }> }

export function generateMetadata(): Metadata {
  return createPageMetadata({
    title: 'Used Vehicles, Tractors & Electric Bikes for Export | Browse Our Inventory',
    description:
      'Browse our full inventory of quality-inspected used automobiles, farm tractors, and electric bikes available for international export. Filter by category and find your ideal vehicle.',
    path: '/inventory',
  })
}

const VALID_CATEGORIES: ProductCategory[] = ['automobile', 'tractor', 'electric-bike']

export default async function InventoryPage({ searchParams }: InventoryPageProps) {
  const params = await searchParams
  const categoryParam = params.category
  const initialCategory =
    categoryParam && VALID_CATEGORIES.includes(categoryParam as ProductCategory)
      ? (categoryParam as ProductCategory)
      : 'all'

  const jsonLd = productListSchema(allProducts)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="py-12 md:py-16">
        <Container>
          <Breadcrumbs />
          <div className="relative h-44 md:h-56 rounded-xl overflow-hidden mb-10">
            <Image
              src={SITE_IMAGES.inventory}
              alt="Browse our inspected inventory — automobiles, tractors, ready to ship"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
          <SectionHeading
            title="Inspected and Ready to Ship — Pick Your Vehicle"
            subtitle="Every unit below has been inspected and photographed. Filter by category, search by name, and get a quote within 24 hours."
            tag="h1"
            alignment="center"
            className="mb-10"
          />
          <InventoryClient initialCategory={initialCategory} />
        </Container>
      </section>
    </>
  )
}
