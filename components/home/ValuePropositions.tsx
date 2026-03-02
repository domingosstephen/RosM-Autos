'use client'

import Image from 'next/image'
import { Container } from '@/components/shared/Container'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { AnimateOnScroll } from '@/components/shared/AnimateOnScroll'
import { SITE_IMAGES } from '@/lib/site-images'

const propositions = [
  {
    title: 'Every Vehicle Inspected — Before You Pay a Cent',
    description:
      'We check engine, transmission, body, electronics, and overall condition before listing any vehicle. You receive photos and a condition summary before you decide. See what you are buying — no guesswork, no nasty surprises at your port.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12l2 2 4-4"/><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/></svg>
    ),
  },
  {
    title: 'From Our Yard to Your Port — We Handle Everything',
    description:
      'Shipping paperwork, export documentation, customs clearance, port-to-port logistics. You pick the vehicle. We manage every step until it reaches your country. Currently delivering to 45+ countries across 3 continents.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
    ),
  },
  {
    title: 'One Quote. Every Cost Included. Zero Surprises.',
    description:
      'Vehicle price, shipping, documentation fees, insurance — all in one upfront quote before you commit. Other exporters add charges after payment. We show you the full number from the start so you can budget with certainty.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
    ),
  },
]

export function ValuePropositions() {
  return (
    <section className="py-16 md:py-24 bg-surface">
      <Container>
        <SectionHeading
          title="Why Buyers Across 45 Countries Trust RosM Autos"
          subtitle="Three promises we have delivered on since 2017 — backed by a 98% satisfaction rate"
        />
        <div className="mt-10 relative h-40 md:h-52 rounded-xl overflow-hidden">
          <Image
            src={SITE_IMAGES.valueProp}
            alt="Trusted international vehicle export — inspected and ready to ship"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {propositions.map((prop, i) => (
            <AnimateOnScroll key={prop.title} animation="fade-up" delay={i * 150}>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-cta/10 text-cta flex items-center justify-center mx-auto animate-bounce-gentle">
                  {prop.icon}
                </div>
                <h3 className="mt-6 text-xl font-bold text-navy">{prop.title}</h3>
                <p className="mt-3 text-slate leading-relaxed">{prop.description}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </Container>
    </section>
  )
}
