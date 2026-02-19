'use client'

import { cn } from '@/lib/utils'
import type { ProductCategory } from '@/types/product'

type CategoryFilter = ProductCategory | 'all'

interface CategoryTabsProps {
  activeCategory: CategoryFilter
  onChange: (category: CategoryFilter) => void
}

const tabs: { value: CategoryFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'automobile', label: 'Automobiles' },
  { value: 'tractor', label: 'Farm Tractors' },
  { value: 'electric-bike', label: 'Electric Bikes' },
]

export function CategoryTabs({ activeCategory, onChange }: CategoryTabsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          type="button"
          onClick={() => onChange(tab.value)}
          className={cn(
            'min-h-[44px] whitespace-nowrap rounded-lg px-5 py-2.5 font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-cta/30',
            activeCategory === tab.value
              ? 'bg-cta text-white'
              : 'bg-surface text-slate hover:bg-surface-alt'
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
