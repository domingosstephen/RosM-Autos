import type { Metadata } from 'next'
import { createPageMetadata } from '@/lib/metadata'
import { Container } from '@/components/shared/Container'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { Card } from '@/components/shared/Card'
import { PlaceholderImage } from '@/components/shared/PlaceholderImage'
import { Button } from '@/components/shared/Button'
import { CTABanner } from '@/components/shared/CTABanner'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { STATS } from '@/lib/constants'

export const metadata: Metadata = createPageMetadata({
  title: 'About RosM Autos | Trusted International Used Vehicle Dealer',
  description:
    'Learn about RosM Autos — your trusted source for quality-inspected used automobiles, farm tractors, and electric bikes. Serving international buyers in Africa, South America, and Eastern Europe.',
  path: '/about',
})

const advantages = [
  {
    title: '150-Point Inspection',
    description: 'Every vehicle and piece of equipment undergoes our rigorous multi-point inspection. We check mechanical, electrical, structural, and cosmetic condition before listing.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12l2 2 4-4"/><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/></svg>
    ),
  },
  {
    title: 'Full Export Service',
    description: 'From purchase to port delivery — we manage shipping logistics, export documentation, and customs clearance for every order across three continents.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="6" width="22" height="12" rx="2"/><path d="M1 10h22"/></svg>
    ),
  },
  {
    title: 'Transparent Pricing',
    description: 'No hidden fees, no surprise charges. Every quote includes the vehicle price, shipping cost, and documentation fees — what you see is what you pay.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
    ),
  },
  {
    title: 'Dedicated Support',
    description: 'Our multilingual team is available via WhatsApp, phone, and email. We guide you through every step — from browsing to receiving your vehicle at port.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
    ),
  },
]

const team = [
  { name: 'Managing Director', role: 'Founder & CEO', alt: 'Portrait of RosM Autos founder and CEO overseeing international vehicle export operations' },
  { name: 'Head of Sales', role: 'Sales Director', alt: 'Portrait of RosM Autos sales director managing international client relationships' },
  { name: 'Logistics Manager', role: 'Shipping & Export', alt: 'Portrait of RosM Autos logistics manager coordinating global vehicle shipments' },
  { name: 'Lead Inspector', role: 'Vehicle Inspection', alt: 'Portrait of RosM Autos lead vehicle inspector conducting quality assessments' },
]

export default function AboutPage() {
  return (
    <>
      <Container>
        <Breadcrumbs />
      </Container>

      {/* Company Story */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading title="Our Story" alignment="left" tag="h1" />
              <div className="mt-6 space-y-4 text-slate leading-relaxed">
                <p>
                  In the international used vehicle market, trust is hard to come by. Too many buyers
                  have been burned by dishonest dealers, undisclosed defects, and shipments that never
                  arrive. The distance makes accountability feel impossible.
                </p>
                <p>
                  RosM Autos was founded to change that. With over {STATS.yearsInBusiness} years in
                  international automobile, tractor, and equipment trade, we built our reputation on
                  one principle: deliver exactly what we promise.
                </p>
                <p>
                  Every vehicle and piece of equipment we sell undergoes our comprehensive inspection
                  process. Every quote is transparent. Every shipment is tracked. We serve buyers in
                  over {STATS.countriesServed} countries across Africa, South America, and Eastern
                  Europe — and our {STATS.satisfactionRate} satisfaction rate speaks for itself.
                </p>
              </div>
            </div>
            <PlaceholderImage
              height="h-[380px]"
              label="RosM Autos Headquarters & Vehicle Yard"
              alt="RosM Autos headquarters showing vehicle inspection yard with automobiles, tractors, and equipment ready for international export"
            />
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="bg-navy py-14">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: STATS.vehiclesSold, label: 'Units Sold' },
              { value: STATS.countriesServed, label: 'Countries Served' },
              { value: STATS.yearsInBusiness, label: 'Years in Business' },
              { value: STATS.satisfactionRate, label: 'Satisfaction Rate' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl md:text-4xl font-extrabold text-white">{stat.value}</p>
                <p className="mt-1 text-sm text-white/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24">
        <Container>
          <SectionHeading
            title="Why Choose RosM Autos"
            subtitle="The standards that set us apart from other international vehicle exporters"
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            {advantages.map((adv) => (
              <Card key={adv.title} padding="md" className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-cta/10 text-cta flex items-center justify-center shrink-0">
                  {adv.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-navy">{adv.title}</h3>
                  <p className="mt-2 text-slate leading-relaxed">{adv.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Team */}
      <section className="py-16 md:py-24 bg-surface-alt">
        <Container>
          <SectionHeading
            title="Our Team"
            subtitle="Experienced professionals dedicated to your satisfaction"
          />
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.role} className="text-center">
                <PlaceholderImage
                  height="h-48"
                  label={member.name}
                  alt={member.alt}
                  className="rounded-xl mx-auto"
                />
                <h3 className="mt-4 font-bold text-navy">{member.name}</h3>
                <p className="text-sm text-muted">{member.role}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTABanner
        headline="Have Questions? Let&apos;s Talk"
        subtext="Our team is ready to help you find the right vehicle or equipment for your needs."
        primaryCTA={{ label: 'Contact Our Team', href: '/contact' }}
        secondaryCTA={{ label: 'Browse Inventory', href: '/inventory' }}
        variant="dark"
      />
    </>
  )
}
