import { Card } from '@/components/shared/Card'
import { PlaceholderImage } from '@/components/shared/PlaceholderImage'
import { CategoryBadge } from '@/components/shared/CategoryBadge'
import { Badge } from '@/components/shared/Badge'
import { Button } from '@/components/shared/Button'
import { formatPrice, formatNumber } from '@/lib/utils'
import type { Product, Automobile, Tractor, ElectricBike } from '@/types/product'

interface ProductCardProps {
  product: Product
}

function conditionToBadgeVariant(condition: Product['condition']): 'excellent' | 'good' | 'fair' {
  return condition.toLowerCase() as 'excellent' | 'good' | 'fair'
}

function getSpecsLine(product: Product): string {
  switch (product.category) {
    case 'automobile': {
      const auto = product as Automobile
      return `${auto.year} · ${formatNumber(auto.mileage)} km · ${auto.fuelType}`
    }
    case 'tractor': {
      const tractor = product as Tractor
      return `${tractor.year} · ${tractor.horsepower} HP · ${formatNumber(tractor.hoursUsed)} hrs`
    }
    case 'electric-bike': {
      const ebike = product as ElectricBike
      return `${ebike.motorPower} W · ${ebike.range} km · ${ebike.topSpeed} km/h`
    }
  }
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card hoverable padding="none" className="overflow-hidden flex flex-col">
      <PlaceholderImage
        height="h-48"
        label={product.name}
        alt={product.imageAlt}
        className="rounded-none"
      />

      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3">
          <CategoryBadge category={product.category} />
          <Badge variant={conditionToBadgeVariant(product.condition)} />
        </div>

        <h3 className="text-lg font-semibold text-navy line-clamp-2 mb-1">
          {product.name}
        </h3>

        <p className="text-sm text-muted mb-3">
          {getSpecsLine(product)}
        </p>

        <div className="mt-auto">
          <p className="text-2xl font-bold text-cta mb-4">
            {formatPrice(product.price)}
          </p>

          <Button
            variant="primary"
            size="sm"
            fullWidth
            href={`/contact?vehicle=${product.slug}`}
          >
            Get My Quote
          </Button>
        </div>
      </div>
    </Card>
  )
}
