'use client'

import { useState, useMemo, useEffect } from 'react'
import { CTABanner } from '@/components/shared/CTABanner'
import { CategoryTabs } from '@/components/inventory/CategoryTabs'
import { ProductGrid } from '@/components/inventory/ProductGrid'
import { allProducts } from '@/lib/products'
import type { Product, ProductCategory } from '@/types/product'

type CategoryFilter = ProductCategory | 'all'

interface InventoryClientProps {
  initialCategory?: CategoryFilter
  /** When set, use this list instead of allProducts (e.g. for a brand page). Search still applies. */
  productsOverride?: Product[]
  /** Hide category tabs (e.g. on brand or tractors page where list is already filtered). */
  hideCategoryTabs?: boolean
}

export function InventoryClient({
  initialCategory = 'all',
  productsOverride,
  hideCategoryTabs = false,
}: InventoryClientProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>(initialCategory)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    setActiveCategory(initialCategory)
  }, [initialCategory])

  const filteredProducts = useMemo(() => {
    let products = productsOverride ?? allProducts

    if (!productsOverride && activeCategory !== 'all') {
      products = products.filter((p) => p.category === activeCategory)
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.model.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      )
    }

    return products
  }, [activeCategory, searchQuery, productsOverride])

  return (
    <>
      {!hideCategoryTabs && (
        <div className="mb-8">
          <CategoryTabs activeCategory={activeCategory} onChange={setActiveCategory} />
        </div>
      )}

      <ProductGrid products={filteredProducts} />

      <div className="mt-16">
        <CTABanner
          headline="Can't Find What You're Looking For?"
          subtext="Tell us what vehicle you need and we'll source it for you. Our team has access to a wide network of quality-inspected vehicles."
          primaryCTA={{ label: 'Contact Us', href: '/contact' }}
          variant="dark"
        />
      </div>
    </>
  )
}
