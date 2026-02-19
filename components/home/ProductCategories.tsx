import { Container } from '@/components/shared/Container'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { Card } from '@/components/shared/Card'
import { PlaceholderImage } from '@/components/shared/PlaceholderImage'
import { Button } from '@/components/shared/Button'

const categories = [
  {
    title: 'Used Automobiles',
    description:
      'Toyota Hilux, Land Cruiser, Corolla. Honda CR-V, Civic. Nissan Patrol, X-Trail. Mercedes Sprinter. BMW X3. VW Amarok. Every unit is inspected — engine, transmission, body, and electronics checked and photographed before sale.',
    image: 'Automobiles – Sedans, SUVs, Trucks',
    alt: 'Quality used automobiles including sedans, SUVs, and pickup trucks available for international export from RosM Autos',
    href: '/inventory?category=automobile',
    cta: 'See Available Cars & Trucks',
  },
  {
    title: 'Farm Tractors',
    description:
      'John Deere 5075E, Kubota M7060, Massey Ferguson 4707, New Holland T4.75. Inspected for engine hours, hydraulic pressure, PTO function, and structural integrity — with a full condition report before you buy.',
    image: 'Farm Tractors – Various Brands',
    alt: 'Used farm tractors from John Deere, Kubota, and Massey Ferguson inspected and ready for export to Africa and South America',
    href: '/inventory?category=tractor',
    cta: 'See Available Tractors',
  },
  {
    title: 'Electric Bikes',
    description:
      'City commuters, cargo haulers, and mountain e-bikes with verified battery health and confirmed range specs. Motors from 250W to 1,000W. Shipped via container or air freight for fast delivery.',
    image: 'Electric Bikes – City, Cargo, Mountain',
    alt: 'Electric bikes including city commuters, cargo bikes, and mountain e-bikes available for international purchase from RosM Autos',
    href: '/inventory?category=electric-bike',
    cta: 'See Available E-Bikes',
  },
]

export function ProductCategories() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading
          title="Vehicles and Equipment, Inspected and Ready to Ship"
          subtitle="Three product categories, one transparent process — choose what your market needs"
        />
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <Card key={cat.title} hoverable padding="none" className="overflow-hidden">
              <PlaceholderImage
                height="h-48"
                label={cat.image}
                alt={cat.alt}
                className="rounded-none"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-navy">{cat.title}</h3>
                <p className="mt-2 text-slate leading-relaxed">{cat.description}</p>
                <div className="mt-6">
                  <Button href={cat.href} variant="secondary" size="sm">
                    {cat.cta}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}
