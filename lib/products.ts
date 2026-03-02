import type { Product, Automobile, Tractor } from '@/types/product'
import usedCarsData from './used-cars-data.json'

// ---------------------------------------------------------------------------
// Used Cars import (from Used Cars folder)
// ---------------------------------------------------------------------------

const usedCarsAutomobiles: Automobile[] = (usedCarsData as { automobiles: Automobile[] }).automobiles.map(
  (a) => ({ ...a, bodyType: a.bodyType || 'SUV', engineSize: a.engineSize || '-' })
)
const usedCarsTractors: Tractor[] = (usedCarsData as { tractors: Tractor[] }).tractors

// ---------------------------------------------------------------------------
// Combined catalogue (no placeholder data — only imported used cars/tractors)
// ---------------------------------------------------------------------------

export const allProducts: Product[] = [
  ...usedCarsAutomobiles,
  ...usedCarsTractors,
]
