import type { Metadata } from 'next'
import { createPageMetadata } from '@/lib/metadata'
import { Container } from '@/components/shared/Container'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { Button } from '@/components/shared/Button'
import { CTABanner } from '@/components/shared/CTABanner'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { howToSchema } from '@/lib/schema'

export const metadata: Metadata = createPageMetadata({
  title: 'How to Buy a Used Vehicle for Export | Step-by-Step Guide',
  description:
    'Learn how to buy a quality-inspected used automobile, farm tractor, or electric bike from RosM Autos. Six simple steps from browsing to receiving your vehicle at your nearest port.',
  path: '/how-it-works',
})

const steps = [
  {
    number: '1',
    title: 'Tell Us What You Need',
    description: 'Explore our online catalog of inspected automobiles, farm tractors, and electric bikes. Filter by category, price, and condition — or message us directly on WhatsApp with your requirements.',
    details: 'Our inventory is updated weekly. If we do not have what you need, tell us — we source specific makes and models on request.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
    ),
  },
  {
    number: '2',
    title: 'Get a Transparent Quote',
    description: 'Tell us your destination country. We calculate vehicle price, shipping, documentation, and insurance — all in one clear quote with zero hidden fees.',
    details: 'Request quotes for multiple vehicles at once. Fleet buyers (3+ units) get priority pricing.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
    ),
  },
  {
    number: '3',
    title: 'Review Photos and Condition Details',
    description: 'Receive photos and a condition summary covering engine, transmission, body, electronics, and interior (for cars) or PTO, hydraulics, and structural integrity (for tractors). You see what you are buying before you pay.',
    details: 'We inspect every vehicle before listing. Any known issues — cosmetic or mechanical — are disclosed upfront.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12l2 2 4-4"/><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/></svg>
    ),
  },
  {
    number: '4',
    title: 'Pay Securely',
    description: 'Complete payment through verified bank transfer or wire payment. You receive full transaction confirmation immediately — no payment is processed until you approve the vehicle condition and quote.',
    details: 'Flexible payment terms available for qualifying fleet buyers. Ask our team for details.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
    ),
  },
  {
    number: '5',
    title: 'We Ship It — You Track It',
    description: 'Our logistics team handles export documentation, port-to-port shipping, and customs coordination. RoRo and container options available. You get a tracking link the moment your vehicle is loaded.',
    details: 'Automobiles and tractors ship via RoRo or container. Electric bikes go via consolidated container or air freight for faster delivery.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="6" width="22" height="12" rx="2"/><path d="M1 10h22"/></svg>
    ),
  },
  {
    number: '6',
    title: 'Receive Your Vehicle at Port',
    description: 'Your vehicle arrives at your nearest port in the condition described and photographed before purchase. We provide all import documentation and can connect you with trusted local clearing agents.',
    details: 'Transit times: 10–16 days to Eastern Europe, 15–25 days to South America, 18–40 days to Africa.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
    ),
  },
]

export default function HowItWorksPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema()) }}
      />

      <Container>
        <Breadcrumbs />
      </Container>

      <section className="py-16 md:py-24">
        <Container size="md">
          <SectionHeading
            title="From Picking a Vehicle to Receiving It at Your Port — in 6 Steps"
            subtitle="No middlemen, no guesswork. Here is exactly what happens after you contact us."
            tag="h1"
          />

          <div className="mt-16 space-y-12">
            {steps.map((step, i) => (
              <div key={step.number} className="flex gap-6">
                {/* Step indicator */}
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-12 h-12 rounded-full bg-cta text-white text-xl font-bold flex items-center justify-center">
                    {step.number}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-0.5 flex-1 bg-border mt-3" />
                  )}
                </div>

                {/* Content */}
                <div className="pb-8">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-cta">{step.icon}</span>
                    <h2 className="text-xl font-bold text-navy">{step.title}</h2>
                  </div>
                  <p className="text-slate leading-relaxed">{step.description}</p>
                  <p className="mt-2 text-sm text-muted italic">{step.details}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button href="/inventory" variant="primary" size="lg">
              See What Is Available Now
            </Button>
          </div>
        </Container>
      </section>

      {/* What's Included */}
      <section className="py-16 md:py-20 bg-surface-alt">
        <Container size="md">
          <SectionHeading title="Included with Every Purchase — No Extra Cost" />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Vehicle inspection with photos and condition summary',
              'Full disclosure of any known issues',
              'Single transparent quote — zero hidden fees',
              'All export paperwork and documentation',
              'Port-to-port shipping from Germany',
              'Customs clearance coordination at both ends',
              'Real-time shipment tracking link',
              'WhatsApp support from inquiry to delivery',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 py-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-success shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-slate">{item}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTABanner
        headline="Ready to Get Started? Pick Your Vehicle."
        subtext="Explore our current inventory or tell us what you need — we will send you a transparent quote within 24 hours."
        primaryCTA={{ label: 'Explore the Inventory', href: '/inventory' }}
        secondaryCTA={{ label: 'Get a Free Quote', href: '/contact' }}
        variant="dark"
      />
    </>
  )
}
