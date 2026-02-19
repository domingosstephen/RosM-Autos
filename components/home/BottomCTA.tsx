import { CTABanner } from '@/components/shared/CTABanner'

export function BottomCTA() {
  return (
    <CTABanner
      headline="Your Next Vehicle Is Inspected and Ready to Ship"
      subtext="Explore our current inventory. Pick a vehicle. Get a transparent quote within 24 hours — no obligation, no hidden fees."
      primaryCTA={{ label: 'Explore the Inventory', href: '/inventory' }}
      secondaryCTA={{ label: 'Get a Free Quote', href: '/contact' }}
      variant="accent"
    />
  )
}
