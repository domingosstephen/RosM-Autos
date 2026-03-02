'use client'

import { useMemo } from 'react'
import Image from 'next/image'
import { Container } from '@/components/shared/Container'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { Card } from '@/components/shared/Card'
import { PlaceholderImage } from '@/components/shared/PlaceholderImage'
import { Button } from '@/components/shared/Button'
import { AnimateOnScroll } from '@/components/shared/AnimateOnScroll'
import { allProducts } from '@/lib/products'
import type { Product } from '@/types/product'

/** Pick one item so the section shows a real vehicle; deterministic to avoid hydration mismatch. */
function pickOne<T>(arr: T[]): T | null {
  if (arr.length === 0) return null
  return arr[0]
}

function getMainImage(product: Product): string | undefined {
  return product.image ?? product.images?.[0]
}

export function ProductCategories() {
  const { automobile, tractor } = useMemo(() => {
    const automobiles = allProducts.filter((p) => p.category === 'automobile')
    const tractors = allProducts.filter((p) => p.category === 'tractor')
    return {
      automobile: pickOne(automobiles),
      tractor: pickOne(tractors),
    }
  }, [])

  const categories = useMemo(
    () => [
      {
        title: 'Used Automobiles',
        description:
          'Toyota Hilux, Land Cruiser, Corolla. Honda CR-V, Civic. Nissan Patrol, X-Trail. Mercedes Sprinter. BMW X3. VW Amarok. Every unit is inspected — engine, transmission, body, and electronics checked and photographed before sale.',
        href: '/inventory?category=automobile',
        cta: 'See Available Cars & Trucks',
        product: automobile,
        alt: 'Quality used automobiles including sedans, SUVs, and pickup trucks available for international export from RosM Autos',
      },
      {
        title: 'Farm Tractors',
        description:
          'John Deere 5075E, Kubota M7060, Massey Ferguson 4707, New Holland T4.75. Inspected for engine hours, hydraulic pressure, PTO function, and structural integrity — with a full condition report before you buy.',
        href: '/inventory?category=tractor',
        cta: 'See Available Tractors',
        product: tractor,
        alt: 'Used farm tractors from John Deere, Kubota, and Massey Ferguson inspected and ready for export to Africa and South America',
      },
    ],
    [automobile, tractor]
  )

  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading
          title="Vehicles and Equipment, Inspected and Ready to Ship"
          subtitle="Two product categories, one transparent process — choose what your market needs"
        />
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((cat, i) => (
            <AnimateOnScroll key={cat.title} animation="fade-up" delay={i * 150}>
              <Card hoverable padding="none" className="overflow-hidden">
                <div className="relative w-full h-48 bg-slate-200">
                  {cat.product && getMainImage(cat.product) ? (
                    <Image
                      src={getMainImage(cat.product)!}
                      alt={cat.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  ) : (
                    <PlaceholderImage
                      height="h-48"
                      label={cat.title}
                      alt={cat.alt}
                      className="rounded-none absolute inset-0"
                    />
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-navy">{cat.title}</h3>
                  <p className="mt-2 text-slate leading-relaxed">{cat.description}</p>
                  <div className="mt-6">
                    <Button href={cat.href} variant="secondary" size="sm">
                      {cat.cta}
                    </Button>
                  </div>
                </div>
              </Card>
            </AnimateOnScroll>
          ))}
        </div>
      </Container>
    </section>
  )
}
