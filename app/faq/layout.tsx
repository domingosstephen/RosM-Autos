import type { Metadata } from 'next'
import { createPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = createPageMetadata({
  title: 'FAQ | Common Questions About Buying & Exporting Used Vehicles',
  description:
    'Get answers to 50+ questions about buying used cars, tractors, and e-bikes from Germany. Covers payment, shipping, customs, vehicle condition, and more.',
  path: '/faq',
})

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return children
}
