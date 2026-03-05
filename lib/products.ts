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
