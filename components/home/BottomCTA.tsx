import { CTABanner } from '@/components/shared/CTABanner'

export function BottomCTA() {
  return (
    <CTABanner
      headline="Ready to Find Your Next Vehicle?"
      subtext="Browse our inventory of quality-inspected automobiles, tractors, and electric bikes. Get a free quote today."
      primaryCTA={{ label: 'Browse Inventory', href: '/inventory' }}
      secondaryCTA={{ label: 'Contact Us', href: '/contact' }}
      variant="accent"
    />
  )
}
