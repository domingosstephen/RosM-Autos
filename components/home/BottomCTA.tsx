'use client'

import { CTABanner } from '@/components/shared/CTABanner'
import { AnimateOnScroll } from '@/components/shared/AnimateOnScroll'

export function BottomCTA() {
  return (
    <AnimateOnScroll animation="scale-in">
      <CTABanner
        headline="Your Next Vehicle Is Inspected and Ready to Ship"
        subtext="Explore our current inventory. Pick a vehicle. Get a transparent quote within 24 hours — no obligation, no hidden fees."
        primaryCTA={{ label: 'Explore the Inventory', href: '/inventory' }}
        secondaryCTA={{ label: 'Get a Free Quote', href: '/contact' }}
        variant="accent"
      />
    </AnimateOnScroll>
  )
}
