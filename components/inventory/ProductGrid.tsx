'use client'

import { ProductCard } from '@/components/inventory/ProductCard'
import { AnimateOnScroll } from '@/components/shared/AnimateOnScroll'
import type { Product } from '@/types/product'

interface ProductGridProps {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 mx-auto mb-4 text-muted"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
        <h3 className="text-xl font-semibold text-navy mb-2">
          No products match your filters
        </h3>
        <p className="text-muted">
          Try selecting a different category or adjusting your search.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product, i) => (
        <AnimateOnScroll key={product.id} animation="fade-up" delay={i * 100}>
          <ProductCard product={product} />
        </AnimateOnScroll>
      ))}
    </div>
  )
}
