import { Container } from '@/components/shared/Container'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { Button } from '@/components/shared/Button'

const regions = [
  {
    name: 'Africa',
    icon: '🌍',
    countries: ['Nigeria', 'Ghana', 'Kenya', 'Tanzania', 'South Africa', 'Cameroon'],
    description: 'Serving 20+ African nations through major West, East, and Southern ports.',
  },
  {
    name: 'South America',
    icon: '🌎',
    countries: ['Brazil', 'Colombia', 'Peru', 'Chile', 'Paraguay', 'Bolivia'],
    description: 'Direct shipping routes to major South American ports with customs support.',
  },
  {
    name: 'Eastern Europe',
    icon: '🌏',
    countries: ['Poland', 'Romania', 'Ukraine', 'Georgia', 'Bulgaria', 'Czech Republic'],
    description: 'EU and non-EU delivery through Baltic and Black Sea ports.',
  },
]

export function RegionsCTA() {
  return (
    <section className="py-16 md:py-24 bg-navy">
      <Container>
        <SectionHeading
          title="We Ship Worldwide"
          subtitle="Established shipping routes to three continents with full customs and documentation support"
          light
        />
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {regions.map((region) => (
            <div key={region.name} className="bg-white/5 rounded-xl p-6 border border-white/10">
              <span className="text-4xl" role="img" aria-label={region.name}>{region.icon}</span>
              <h3 className="mt-4 text-xl font-bold text-white">{region.name}</h3>
              <p className="mt-2 text-white/60 text-sm">{region.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {region.countries.map((country) => (
                  <span key={country} className="text-xs bg-white/10 text-white/80 px-2.5 py-1 rounded-full">
                    {country}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button href="/shipping" variant="primary" size="lg">
            See All Shipping Destinations
          </Button>
        </div>
      </Container>
    </section>
  )
}
