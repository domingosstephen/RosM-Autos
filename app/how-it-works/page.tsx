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
    title: 'Browse Our Inventory',
    description: 'Explore our online catalog of quality-inspected automobiles, farm tractors, and electric bikes. Use category filters, price range, and condition ratings to find exactly what you need.',
    details: 'Our inventory is updated regularly. Can\'t find what you\'re looking for? Contact us with your requirements and we\'ll source it for you.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
    ),
  },
  {
    number: '2',
    title: 'Select Your Vehicle',
    description: 'Choose the vehicle or equipment that fits your needs and request a detailed quote. Tell us your destination country so we can calculate shipping and customs costs.',
    details: 'You can request quotes for multiple vehicles at once. Bulk order discounts are available for fleet purchases.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
    ),
  },
  {
    number: '3',
    title: 'Review Inspection Report',
    description: 'Receive a comprehensive inspection report with detailed photos and condition assessment. For automobiles, this covers engine, transmission, body, interior, and electronics. For tractors, it includes PTO, hydraulics, and structural integrity.',
    details: 'Our 150-point inspection is conducted by certified mechanics. You review everything before committing to purchase.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12l2 2 4-4"/><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/></svg>
    ),
  },
  {
    number: '4',
    title: 'Complete Secure Payment',
    description: 'Pay securely through our verified payment channels. We accept bank transfers, wire payments, and other secure methods. Full transaction confirmation is provided immediately.',
    details: 'We offer flexible payment terms for qualifying buyers. Contact our team to discuss your options.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
    ),
  },
  {
    number: '5',
    title: 'We Handle Shipping',
    description: 'Our logistics team manages port-to-port shipping, export documentation, and coordinates customs clearance for your destination country. RoRo and container options available.',
    details: 'Shipping methods vary by product: automobiles and tractors ship via RoRo or container, electric bikes via consolidated container or air freight.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="6" width="22" height="12" rx="2"/><path d="M1 10h22"/></svg>
    ),
  },
  {
    number: '6',
    title: 'Receive Your Vehicle',
    description: 'Your vehicle arrives at your nearest port. We provide tracking throughout the journey and assist with local import procedures and documentation to ensure smooth customs clearance.',
    details: 'Transit times vary by destination: 10-40 days depending on your port. We connect you with local clearing agents if needed.',
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
            title="Buying a Vehicle for Export Has Never Been This Simple"
            subtitle="Six clear steps from browsing to receiving your vehicle at your nearest port. We handle the hard parts."
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
              Start Browsing Our Inventory
            </Button>
          </div>
        </Container>
      </section>

      {/* What's Included */}
      <section className="py-16 md:py-20 bg-surface-alt">
        <Container size="md">
          <SectionHeading title="What&apos;s Included With Every Purchase" />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Comprehensive 150-point inspection report',
              'Detailed vehicle photographs',
              'Transparent quote with no hidden fees',
              'Export documentation and paperwork',
              'Port-to-port shipping coordination',
              'Customs clearance assistance',
              'Real-time shipment tracking',
              'Dedicated customer support throughout',
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
        headline="Ready to Start?"
        subtext="Browse our inventory of quality-inspected vehicles and equipment, or contact us for a personalized quote."
        primaryCTA={{ label: 'Browse Inventory', href: '/inventory' }}
        secondaryCTA={{ label: 'Contact Us', href: '/contact' }}
        variant="dark"
      />
    </>
  )
}
