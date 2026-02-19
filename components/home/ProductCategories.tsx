import { Container } from '@/components/shared/Container'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { Card } from '@/components/shared/Card'
import { PlaceholderImage } from '@/components/shared/PlaceholderImage'
import { Button } from '@/components/shared/Button'

const categories = [
  {
    title: 'Used Automobiles',
    description:
      'From reliable sedans to rugged SUVs and pickup trucks. Every vehicle passes our 150-point inspection before listing. Toyota, Honda, Nissan, Mercedes, BMW, and more.',
    image: 'Automobiles – Sedans, SUVs, Trucks',
    alt: 'Quality used automobiles including sedans, SUVs, and pickup trucks available for international export from RosM Autos',
    href: '/inventory?category=automobile',
  },
  {
    title: 'Farm Tractors',
    description:
      'Quality farm tractors from trusted brands like John Deere, Kubota, and Massey Ferguson. Inspected for engine, hydraulics, PTO, and structural integrity.',
    image: 'Farm Tractors – Various Brands',
    alt: 'Used farm tractors from John Deere, Kubota, and Massey Ferguson inspected and ready for export to Africa and South America',
    href: '/inventory?category=tractor',
  },
  {
    title: 'Electric Bikes',
    description:
      'Modern electric bikes for city commuting, cargo hauling, and off-road adventures. Battery health verified and charging specifications confirmed.',
    image: 'Electric Bikes – City, Cargo, Mountain',
    alt: 'Electric bikes including city commuters, cargo bikes, and mountain e-bikes available for international purchase from RosM Autos',
    href: '/inventory?category=electric-bike',
  },
]

export function ProductCategories() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading
          title="What We Offer"
          subtitle="Three categories of quality products, one trusted source for international buyers"
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
                    Browse {cat.title}
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
