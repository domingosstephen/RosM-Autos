'use client'

import { Container } from '@/components/shared/Container'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { Button } from '@/components/shared/Button'
import { AnimateOnScroll } from '@/components/shared/AnimateOnScroll'

const regions = [
  {
    name: 'Africa',
    icon: '🌍',
    countries: ['Nigeria', 'Ghana', 'Kenya', 'Tanzania', 'South Africa', 'Cameroon'],
    description: 'We ship to all countries in Africa. Transit: 18–40 days.',
  },
  {
    name: 'South America',
    icon: '🌎',
    countries: ['Brazil', 'Colombia', 'Peru', 'Chile', 'Paraguay', 'Bolivia'],
    description: 'We ship to all countries in South America. Transit: 15–25 days with full customs support.',
  },
  {
    name: 'Eastern Europe',
    icon: '🌏',
    countries: ['Poland', 'Romania', 'Ukraine', 'Georgia', 'Bulgaria', 'Czech Republic'],
    description: 'We ship to all of Eastern Europe. Transit: 10–16 days.',
  },
]

export function RegionsCTA() {
  return (
    <section className="py-16 md:py-24 bg-navy">
      <Container>
        <SectionHeading
          title="Delivering to All Countries in Africa, South America & Eastern Europe"
          subtitle="Established port-to-port routes with full customs clearance and documentation — so your vehicle arrives without delays"
          light
        />
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {regions.map((region, i) => (
            <AnimateOnScroll key={region.name} animation="fade-up" delay={i * 150}>
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
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
            </AnimateOnScroll>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button href="/shipping" variant="primary" size="lg">
            View Routes, Ports &amp; Transit Times
          </Button>
        </div>
      </Container>
    </section>
  )
}
