'use client'

import { Container } from '@/components/shared/Container'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { Button } from '@/components/shared/Button'
import { AnimateOnScroll } from '@/components/shared/AnimateOnScroll'

const steps = [
  {
    number: '1',
    title: 'Pick Your Vehicle',
    description:
      'Tell us what you need — or explore our inventory of inspected automobiles, tractors, and e-bikes. Filter by category, budget, and condition.',
  },
  {
    number: '2',
    title: 'Get Photos, Condition Details & Quote',
    description:
      'Receive photos and a condition summary of your vehicle, plus a single transparent quote covering vehicle price, shipping, and all fees.',
  },
  {
    number: '3',
    title: 'We Deliver to Your Port',
    description:
      'Pay securely. We manage the paperwork, customs clearance, and shipping. Track your vehicle from Germany to your nearest port.',
  },
]

export function HowItWorksPreview() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading
          title="From Germany to Your Port in 3 Steps"
          subtitle="No middlemen, no confusion — here is exactly how the process works"
        />
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <AnimateOnScroll key={step.number} animation="fade-up" delay={i * 150}>
              <div className="text-center relative">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5 bg-border" />
                )}
                <div className="w-12 h-12 rounded-full bg-cta text-white text-xl font-bold flex items-center justify-center mx-auto relative z-10 animate-bounce-gentle">
                  {step.number}
                </div>
                <h3 className="mt-5 text-lg font-bold text-navy">{step.title}</h3>
                <p className="mt-2 text-slate leading-relaxed">{step.description}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button href="/how-it-works" variant="secondary" size="md">
            See the Full 6-Step Process
          </Button>
        </div>
      </Container>
    </section>
  )
}
