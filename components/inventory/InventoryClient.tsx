'use client'

import { useState, useMemo, useEffect } from 'react'
import { CTABanner } from '@/components/shared/CTABanner'
import { CategoryTabs } from '@/components/inventory/CategoryTabs'
import { ProductGrid } from '@/components/inventory/ProductGrid'
import { allProducts } from '@/lib/products'
import type { ProductCategory } from '@/types/product'

type CategoryFilter = ProductCategory | 'all'

interface InventoryClientProps {
  initialCategory?: CategoryFilter
}

export function InventoryClient({ initialCategory = 'all' }: InventoryClientProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>(initialCategory)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    setActiveCategory(initialCategory)
  }, [initialCategory])

  const filteredProducts = useMemo(() => {
    let products = allProducts

    if (activeCategory !== 'all') {
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
  }, [activeCategory, searchQuery])

  return (
    <>
      <div className="mb-8">
        <CategoryTabs activeCategory={activeCategory} onChange={setActiveCategory} />
      </div>

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
