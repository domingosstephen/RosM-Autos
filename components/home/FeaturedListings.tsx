import { Container } from '@/components/shared/Container'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { Card } from '@/components/shared/Card'
import { PlaceholderImage } from '@/components/shared/PlaceholderImage'
import { Badge } from '@/components/shared/Badge'
import { CategoryBadge } from '@/components/shared/CategoryBadge'
import { Button } from '@/components/shared/Button'
import { allProducts } from '@/lib/products'
import { formatPrice, formatNumber } from '@/lib/utils'
import type { Product, Automobile, Tractor, ElectricBike } from '@/types/product'

function getSpecs(product: Product): string {
  switch (product.category) {
    case 'automobile': {
      const auto = product as Automobile
      return `${auto.year} · ${formatNumber(auto.mileage)} km · ${auto.fuelType}`
    }
    case 'tractor': {
      const trac = product as Tractor
      return `${trac.year} · ${trac.horsepower} HP · ${formatNumber(trac.hoursUsed)} hrs`
    }
    case 'electric-bike': {
      const bike = product as ElectricBike
      return `${bike.motorPower}W · ${bike.range} km range · ${bike.topSpeed} km/h`
    }
  }
}

function conditionVariant(condition: string): 'excellent' | 'good' | 'fair' {
  return condition.toLowerCase() as 'excellent' | 'good' | 'fair'
}

const featured = allProducts.slice(0, 6)

export function FeaturedListings() {
  return (
    <section className="py-16 md:py-24 bg-surface-alt">
      <Container>
        <SectionHeading
          title="Inspected. Priced. Ready to Ship."
          subtitle="Hand-picked from our current inventory — every unit comes with a full inspection report"
        />
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((product) => (
            <Card key={product.id} hoverable padding="none" className="overflow-hidden">
              <PlaceholderImage
                height="h-48"
                label={product.imagePlaceholder}
                alt={product.imageAlt}
                className="rounded-none"
              />
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <CategoryBadge category={product.category} />
                  <Badge variant={conditionVariant(product.condition)} />
                </div>
                <h3 className="text-lg font-bold text-navy">{product.name}</h3>
                <p className="mt-1 text-sm text-muted">{getSpecs(product)}</p>
                <p className="mt-3 text-2xl font-bold text-cta">{formatPrice(product.price)}</p>
                <div className="mt-4">
                  <Button
                    href={`/contact?vehicle=${product.slug}`}
                    variant="primary"
                    size="sm"
                    fullWidth
                  >
                    Get My Quote
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button href="/inventory" variant="secondary" size="lg">
            See All Available Vehicles
          </Button>
        </div>
      </Container>
    </section>
  )
}
