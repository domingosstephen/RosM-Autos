import type { Product, Automobile, Tractor } from '@/types/product'
import usedCarsData from './used-cars-data.json'

// ---------------------------------------------------------------------------
// Used Cars import (from Used Cars folder)
// ---------------------------------------------------------------------------

/** Normalize specs from JSON so every value is string (fixes union-type inference from varying keys). */
function normalizeSpecs(specs: unknown): Record<string, string> | undefined {
  if (!specs || typeof specs !== 'object' || Array.isArray(specs)) return undefined
  const out: Record<string, string> = {}
  for (const [k, v] of Object.entries(specs)) {
    if (typeof k === 'string' && typeof v === 'string') out[k] = v
  }
  return Object.keys(out).length ? out : undefined
}

type UsedCarsJson = { automobiles: unknown[]; tractors: Tractor[] }
const data = usedCarsData as UsedCarsJson

const usedCarsAutomobiles: Automobile[] = data.automobiles.map((a) => {
  const row = a as Record<string, unknown>
  return {
    ...row,
    bodyType: (row.bodyType as Automobile['bodyType']) || 'SUV',
    engineSize: typeof row.engineSize === 'string' ? row.engineSize : '-',
    specs: normalizeSpecs(row.specs),
  } as Automobile
})
const usedCarsTractors: Tractor[] = data.tractors

// ---------------------------------------------------------------------------
// Combined catalogue (no placeholder data — only imported used cars/tractors)
// ---------------------------------------------------------------------------

export const allProducts: Product[] = [
  ...usedCarsAutomobiles,
  ...usedCarsTractors,
]

// ---------------------------------------------------------------------------
// Brand / category helpers for separate pages (Mercedes, Toyota, Tractors, etc.)
// ---------------------------------------------------------------------------

/** Slug for URL: lowercase, hyphenated (e.g. Mercedes-Benz -> mercedes-benz) */
export function brandToSlug(brand: string): string {
  return brand
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/^-|-$/g, '') || 'other'
}

/** All unique automobile brands, sorted, with slug and sample image for routing / UI */
export const automobileBrands = (() => {
  const set = new Set(usedCarsAutomobiles.map((a) => a.brand))
  return Array.from(set)
    .sort((a, b) => a.localeCompare(b))
    .map((brand) => {
      const firstCar = usedCarsAutomobiles.find((a) => a.brand === brand)
      const sampleImage =
        firstCar?.images?.[0] ?? firstCar?.image ?? '/images/placeholders/automobile.svg'
      return { brand, slug: brandToSlug(brand), sampleImage }
    })
})()

/** Automobiles for a given brand (by slug) */
export function getAutomobilesByBrandSlug(brandSlug: string): Automobile[] {
  const entry = automobileBrands.find((b) => b.slug === brandSlug)
  if (!entry) return []
  return usedCarsAutomobiles.filter((a) => a.brand === entry.brand)
}

/** All tractors for the tractors page */
export const tractorsOnly: Tractor[] = usedCarsTractors

/** Sample image for the tractors category card on inventory hub */
export const tractorsSampleImage: string =
  usedCarsTractors[0]?.images?.[0] ?? usedCarsTractors[0]?.image ?? '/images/placeholders/tractor.svg'

/** Known inventory segment slugs: brand slugs + 'tractors' */
export const inventorySegmentSlugs = [
  ...automobileBrands.map((b) => b.slug),
  'tractors',
] as const
