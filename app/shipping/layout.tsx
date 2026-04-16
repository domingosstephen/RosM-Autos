import type { Metadata } from 'next'
import { createPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = createPageMetadata({
  title: 'Shipping to Africa, South America & Eastern Europe | Costs & Transit Times',
  description:
    'RoRo and container shipping for used vehicles, tractors, and e-bikes from Germany. View costs, transit times, ports served, and full documentation support.',
  path: '/shipping',
})

export default function ShippingLayout({ children }: { children: React.ReactNode }) {
  return children
}
