import type { Metadata } from 'next'
import { Container } from '@/components/shared/Container'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { InventoryClient } from '@/components/inventory/InventoryClient'
import { createPageMetadata } from '@/lib/metadata'
import { productListSchema } from '@/lib/schema'
import { allProducts } from '@/lib/products'

export function generateMetadata(): Metadata {
  return createPageMetadata({
    title: 'Used Vehicles, Tractors & Electric Bikes for Export | Browse Our Inventory',
    description:
      'Browse our full inventory of quality-inspected used automobiles, farm tractors, and electric bikes available for international export. Filter by category and find your ideal vehicle.',
    path: '/inventory',
  })
}

export default function InventoryPage() {
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
          <SectionHeading
            title="Our Inventory"
            subtitle="Browse our selection of quality-inspected vehicles, tractors, and electric bikes ready for international export."
            tag="h1"
            alignment="center"
            className="mb-10"
          />
          <InventoryClient />
        </Container>
      </section>
    </>
  )
}
