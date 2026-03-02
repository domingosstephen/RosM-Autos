import type { Metadata } from 'next'
import Image from 'next/image'
import { createPageMetadata } from '@/lib/metadata'
import { Container } from '@/components/shared/Container'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { Card } from '@/components/shared/Card'
import { Button } from '@/components/shared/Button'
import { CTABanner } from '@/components/shared/CTABanner'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { AnimateOnScroll } from '@/components/shared/AnimateOnScroll'
import { STATS } from '@/lib/constants'
import { SITE_IMAGES } from '@/lib/site-images'

export const metadata: Metadata = createPageMetadata({
  title: 'About RosM Autos | Trusted International Used Vehicle Dealer',
  description:
    'Learn about RosM Autos — your trusted source for quality-inspected used automobiles, farm tractors, and electric bikes. Serving international buyers in Africa, South America, and Eastern Europe.',
  path: '/about',
})

const advantages = [
  {
    title: 'Every Vehicle Inspected and Photographed',
    description: 'Engine, transmission, body, electronics, tires, interior — we inspect every vehicle and send you photos with a condition summary before you pay. You see what you are buying upfront.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12l2 2 4-4"/><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/></svg>
    ),
  },
  {
    title: 'End-to-End Export — Purchase to Port',
    description: 'We manage shipping logistics, export paperwork, customs clearance, and insurance for every order. You choose the vehicle — we handle the rest across 45+ countries on 3 continents.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="6" width="22" height="12" rx="2"/><path d="M1 10h22"/></svg>
    ),
  },
  {
    title: 'One Quote, Zero Hidden Charges',
    description: 'Vehicle price, shipping, documentation, insurance — itemized in one quote before you commit. Other exporters add costs after payment. We do not.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
    ),
  },
  {
    title: 'WhatsApp Support — Under 2-Hour Response Time',
    description: 'Our multilingual team responds on WhatsApp, phone, and email within 2 hours during business hours. We walk you through every step, from picking a vehicle to clearing customs at your port.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
    ),
  },
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
            <AnimateOnScroll animation="fade-in-left">
              <div>
                <SectionHeading title="Our Story" alignment="left" tag="h1" />
                <div className="mt-6 space-y-4 text-slate leading-relaxed">
                  <p>
                    <strong className="text-navy">The problem is real:</strong> international vehicle buyers lose thousands every year to dealers who misrepresent condition, hide fees, and disappear after payment. When you are buying from another continent, one bad purchase can derail your business for months.
                  </p>
                  <p>
                    RosM Autos was founded in Lübbecke, Germany to fix this. Over {STATS.yearsInBusiness} years, we have shipped automobiles, tractors, and electric bikes to buyers in {STATS.countriesServed} countries — built on one non-negotiable principle: <strong className="text-navy">what we show you is what arrives at your port.</strong>
                  </p>
                  <p>
                    Every unit is inspected and photographed before listing. Every quote includes vehicle price, shipping, documentation, and insurance — no surprise charges. Every shipment is tracked from our yard to your port. Our {STATS.satisfactionRate} satisfaction rate is not a marketing number — it is what happens when you deliver on your promises, every time.
                  </p>
                </div>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fade-in-right">
              <div className="relative h-[380px] w-full rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={SITE_IMAGES.about}
                  alt="RosM Autos — inspected vehicles and equipment ready for international export"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </AnimateOnScroll>
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="bg-navy py-14">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: STATS.responseTime, label: 'Quote Response' },
              { value: STATS.countriesServed, label: 'Countries Served' },
              { value: STATS.yearsInBusiness, label: 'Years in Business' },
              { value: STATS.satisfactionRate, label: 'Satisfaction Rate' },
            ].map((stat, i) => (
              <AnimateOnScroll key={stat.label} animation="fade-up" delay={i * 150}>
                <div>
                  <p className="text-3xl md:text-4xl font-extrabold text-white">{stat.value}</p>
                  <p className="mt-1 text-sm text-white/60">{stat.label}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </Container>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24">
        <Container>
          <SectionHeading
            title="What Makes RosM Autos Different"
            subtitle="Four standards we hold ourselves to — and the reason buyers come back"
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            {advantages.map((adv, i) => (
              <AnimateOnScroll key={adv.title} animation="fade-up" delay={i * 150}>
                <Card padding="md" className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-cta/10 text-cta flex items-center justify-center shrink-0">
                    {adv.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-navy">{adv.title}</h3>
                    <p className="mt-2 text-slate leading-relaxed">{adv.description}</p>
                  </div>
                </Card>
              </AnimateOnScroll>
            ))}
          </div>
        </Container>
      </section>

      <CTABanner
        headline="Have a Question? Get an Answer Within 24 Hours"
        subtext="Tell us what vehicle or equipment you need and where you want it delivered. We will send you a transparent quote — no obligation."
        primaryCTA={{ label: 'Get a Free Quote', href: '/contact' }}
        secondaryCTA={{ label: 'Explore the Inventory', href: '/inventory' }}
        variant="dark"
      />
    </>
  )
}
