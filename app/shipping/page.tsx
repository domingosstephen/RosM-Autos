'use client'

import { useState } from 'react'
import { Container } from '@/components/shared/Container'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { Card } from '@/components/shared/Card'
import { CTABanner } from '@/components/shared/CTABanner'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { shippingRegions } from '@/lib/regions'
import { cn } from '@/lib/utils'

export default function ShippingPage() {
  const [activeRegion, setActiveRegion] = useState('africa')
  const region = shippingRegions.find((r) => r.id === activeRegion)!

  return (
    <>
      <Container>
        <Breadcrumbs />
      </Container>

      <section className="py-16 md:py-24">
        <Container>
          <SectionHeading
            title="2,500+ Vehicles Shipped to 45+ Countries — Here Is How"
            subtitle="Our logistics team has managed thousands of port-to-port deliveries across 3 continents. Every shipment is tracked, insured, and fully documented."
            tag="h1"
          />

          <p className="mt-6 text-center text-slate max-w-3xl mx-auto leading-relaxed">
            <strong className="text-navy">Automobiles and tractors</strong> ship via RoRo (Roll-on/Roll-off) or container.{' '}
            <strong className="text-navy">Electric bikes</strong> ship via consolidated container or air freight for faster delivery. Every route includes marine cargo insurance.
          </p>

          {/* Region Tabs */}
          <div className="mt-12 flex justify-center gap-2 flex-wrap">
            {shippingRegions.map((r) => (
              <button
                key={r.id}
                onClick={() => setActiveRegion(r.id)}
                className={cn(
                  'px-6 py-3 rounded-lg font-medium transition-colors min-h-[44px]',
                  activeRegion === r.id
                    ? 'bg-cta text-white'
                    : 'bg-surface-alt text-slate hover:bg-border'
                )}
              >
                {r.name}
              </button>
            ))}
          </div>

          {/* Region Content */}
          <div className="mt-10">
            <Card padding="lg">
              <h2 className="text-2xl font-bold text-navy">{region.name}</h2>
              <p className="mt-2 text-slate leading-relaxed">{region.description}</p>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Ports */}
                <div>
                  <h3 className="text-lg font-semibold text-navy mb-4 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cta" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    Destination Ports
                  </h3>
                  <div className="space-y-3">
                    {region.ports.map((port) => (
                      <div key={port.name} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                        <div>
                          <p className="font-medium text-navy text-sm">{port.name}</p>
                          <p className="text-xs text-muted">{port.country}</p>
                        </div>
                        <span className="text-sm text-cta font-medium">{port.transitTime}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Details */}
                <div>
                  <h3 className="text-lg font-semibold text-navy mb-4 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cta" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                    Required Documents
                  </h3>
                  <ul className="space-y-2">
                    {region.documents.map((doc) => (
                      <li key={doc} className="flex items-start gap-2 text-sm text-slate">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-success mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        {doc}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 p-4 bg-surface-alt rounded-lg">
                    <p className="text-sm font-semibold text-navy">Estimated Cost Range</p>
                    <p className="text-2xl font-bold text-cta mt-1">{region.costRange}</p>
                    <p className="text-xs text-muted mt-1">Per vehicle, varies by size and method</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-cta-light rounded-lg border border-cta/20">
                <p className="text-sm text-slate leading-relaxed">
                  <strong className="text-navy">Important:</strong> {region.notes}
                </p>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* Shipping FAQ */}
      <section className="py-16 md:py-20 bg-surface-alt">
        <Container size="md">
          <SectionHeading title="Shipping Questions — Answered" />
          <div className="mt-10 space-y-4">
            {[
              { q: 'How long does shipping take?', a: 'Transit times vary by destination: 10-16 days to Eastern Europe, 15-25 days to South America, and 18-40 days to Africa. We provide exact timelines in your quote.' },
              { q: 'What shipping methods do you offer?', a: 'We offer RoRo (Roll-on/Roll-off) and container shipping for automobiles and tractors. Electric bikes ship via consolidated container or air freight for faster delivery.' },
              { q: 'Is my vehicle insured during shipping?', a: 'Yes, all shipments include marine cargo insurance. We provide the insurance certificate as part of your export documentation package.' },
              { q: 'Can I track my shipment?', a: 'Absolutely. Once your vehicle is loaded, we provide tracking details so you can monitor the journey from departure port to arrival at your destination.' },
              { q: 'Do you handle customs clearance?', a: 'We handle all export-side customs clearance. For import customs at your destination, we provide all required documentation and can connect you with trusted local clearing agents.' },
            ].map((item) => (
              <Card key={item.q} padding="md">
                <h3 className="font-semibold text-navy">{item.q}</h3>
                <p className="mt-2 text-sm text-slate leading-relaxed">{item.a}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <CTABanner
        headline="Get Your Shipping Quote in 24 Hours"
        subtext="Tell us what you want to buy and your destination port. We will send you a complete quote — vehicle, shipping, documentation, and insurance — all in one number."
        primaryCTA={{ label: 'Get My Shipping Quote', href: '/contact' }}
        secondaryCTA={{ label: 'Explore the Inventory', href: '/inventory' }}
        variant="accent"
      />
    </>
  )
}
