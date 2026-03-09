import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/shared/Container'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { CTABanner } from '@/components/shared/CTABanner'
import { createPageMetadata } from '@/lib/metadata'
import { productListSchema } from '@/lib/schema'
import { allProducts, automobileBrands } from '@/lib/products'
import { SITE_IMAGES } from '@/lib/site-images'

export function generateMetadata(): Metadata {
  return createPageMetadata({
    title: 'Used Vehicles, Tractors & Electric Bikes for Export | Browse by Brand',
    description:
      'Browse our inventory by brand — Toyota, Mercedes-Benz, Ford, Nissan and more, or view farm tractors. Every vehicle inspected and ready for export.',
    path: '/inventory',
  })
}

export default async function InventoryPage() {
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
          <div className="relative h-64 md:h-80 lg:h-96 rounded-xl overflow-hidden bg-slate-100 mb-10">
            <Image
              src={SITE_IMAGES.inventory}
              alt="Browse our inspected inventory — automobiles, tractors, ready to ship"
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
          <SectionHeading
            title="Inspected and Ready to Ship — Pick a Brand"
            subtitle="Cars are listed by brand. Choose a brand or farm tractors to see available vehicles. Click any vehicle for full-screen photos and specifications."
            tag="h1"
            alignment="center"
            className="mb-10"
          />

          {/* Cars only on brand pages; tractors on their own page — no mixed "Automobiles" list */}
          <div className="mb-12">
            <h2 className="text-lg font-semibold text-navy mb-4 md:mb-6">Browse by brand</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
              {automobileBrands.map(({ brand, slug }) => (
                <Link
                  key={slug}
                  href={`/inventory/${slug}`}
                  className="flex flex-col items-center justify-center min-h-[88px] md:min-h-[100px] rounded-xl bg-surface-alt hover:bg-cta-light border border-border hover:border-cta/30 text-navy font-medium text-sm md:text-base text-center px-3 py-4 transition-colors focus:outline-none focus:ring-2 focus:ring-cta/50"
                >
                  {brand}
                </Link>
              ))}
              <Link
                href="/inventory/tractors"
                className="flex flex-col items-center justify-center min-h-[88px] md:min-h-[100px] rounded-xl bg-surface-alt hover:bg-cta-light border border-border hover:border-cta/30 text-navy font-medium text-sm md:text-base text-center px-3 py-4 transition-colors focus:outline-none focus:ring-2 focus:ring-cta/50"
              >
                Farm Tractors
              </Link>
            </div>
          </div>

          <CTABanner
            headline="Can't Find What You're Looking For?"
            subtext="Tell us what vehicle you need and we'll source it for you. Our team has access to a wide network of quality-inspected vehicles."
            primaryCTA={{ label: 'Contact Us', href: '/contact' }}
            variant="dark"
          />
        </Container>
      </section>
    </>
  )
}
