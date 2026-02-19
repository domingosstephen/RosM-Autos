import { HeroSection } from '@/components/home/HeroSection'
import { TrustSignals } from '@/components/home/TrustSignals'
import { ProductCategories } from '@/components/home/ProductCategories'
import { ValuePropositions } from '@/components/home/ValuePropositions'
import { FeaturedListings } from '@/components/home/FeaturedListings'
import { HowItWorksPreview } from '@/components/home/HowItWorksPreview'
import { RegionsCTA } from '@/components/home/RegionsCTA'
import { TestimonialsSection } from '@/components/home/TestimonialsSection'
import { BottomCTA } from '@/components/home/BottomCTA'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustSignals />
      <ProductCategories />
      <ValuePropositions />
      <FeaturedListings />
      <HowItWorksPreview />
      <RegionsCTA />
      <TestimonialsSection />
      <BottomCTA />
    </>
  )
}
