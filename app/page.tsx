import { HeroSection } from '@/components/home/HeroSection'
import { TrustSignals } from '@/components/home/TrustSignals'
import { ProductCategories } from '@/components/home/ProductCategories'
import { ValuePropositions } from '@/components/home/ValuePropositions'
import { FeaturedListings } from '@/components/home/FeaturedListings'
import { HowItWorksPreview } from '@/components/home/HowItWorksPreview'
import { RegionsCTA } from '@/components/home/RegionsCTA'
import { TestimonialsSection } from '@/components/home/TestimonialsSection'
import { BottomCTA } from '@/components/home/BottomCTA'
import { speakableSchema } from '@/lib/schema'

export default function HomePage() {
  // SOP §7.3 — Speakable: flags H1 and key answer blocks for GEO/AI recitation
  const speakableJsonLd = speakableSchema(['h1', '[data-speakable]'])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableJsonLd) }} />
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
