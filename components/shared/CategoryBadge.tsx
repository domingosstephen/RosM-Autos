import { cn } from '@/lib/utils'
import type { ProductCategory } from '@/types/product'

const categoryStyles: Record<ProductCategory, string> = {
  automobile: 'bg-info/10 text-info',
  tractor: 'bg-success/10 text-success',
  'electric-bike': 'bg-purple-100 text-purple-700',
}

const categoryLabels: Record<ProductCategory, string> = {
  automobile: 'Automobile',
  tractor: 'Farm Tractor',
  'electric-bike': 'Electric Bike',
}

interface CategoryBadgeProps {
  category: ProductCategory
}

export function CategoryBadge({ category }: CategoryBadgeProps) {
  return (
    <span
      className={cn(
        'text-xs font-semibold px-2.5 py-1 rounded-full',
        categoryStyles[category]
      )}
    >
      {categoryLabels[category]}
    </span>
  )
}
