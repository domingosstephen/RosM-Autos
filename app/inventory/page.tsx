import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/shared/Container'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { CTABanner } from '@/components/shared/CTABanner'
import { createPageMetadata } from '@/lib/metadata'
import { productListSchema } from '@/lib/schema'
import { allProducts, automobileBrands, tractorsSampleImage } from '@/lib/products'

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
          <SectionHeading
            title="Inspected and Ready to Ship — Pick a Brand"
            subtitle="Cars are listed by brand. Choose a brand or farm tractors to see available vehicles. Click any vehicle for full-screen photos and specifications."
            tag="h1"
            alignment="center"
            className="mb-10"
          />

          {/* Browse by brand — each card shows a sample image + brand name */}
          <div className="mb-12">
            <h2 className="text-lg font-semibold text-navy mb-4 md:mb-6">Browse by brand</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
              {automobileBrands.map(({ brand, slug, sampleImage }) => (
                <Link
                  key={slug}
                  href={`/inventory/${slug}`}
                  className="group relative flex flex-col rounded-xl overflow-hidden border border-border hover:border-cta/40 focus:outline-none focus:ring-2 focus:ring-cta/50 min-h-[140px] sm:min-h-[160px] md:min-h-[180px]"
                >
                  <div className="absolute inset-0">
                    <Image
                      src={sampleImage}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  </div>
                  <span className="relative mt-auto p-3 text-white font-semibold text-sm md:text-base text-center drop-shadow-lg">
                    {brand}
                  </span>
                </Link>
              ))}
              <Link
                href="/inventory/tractors"
                className="group relative flex flex-col rounded-xl overflow-hidden border border-border hover:border-cta/40 focus:outline-none focus:ring-2 focus:ring-cta/50 min-h-[140px] sm:min-h-[160px] md:min-h-[180px]"
              >
                <div className="absolute inset-0">
                  <Image
                    src={tractorsSampleImage}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                </div>
                <span className="relative mt-auto p-3 text-white font-semibold text-sm md:text-base text-center drop-shadow-lg">
                  Farm Tractors
                </span>
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
