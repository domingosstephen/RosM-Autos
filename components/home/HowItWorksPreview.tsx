import { Container } from '@/components/shared/Container'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { Button } from '@/components/shared/Button'

const steps = [
  {
    number: '1',
    title: 'Browse & Select',
    description:
      'Explore our online catalog of automobiles, tractors, and electric bikes. Use filters to find exactly what you need for your market.',
  },
  {
    number: '2',
    title: 'We Inspect & Quote',
    description:
      'Receive a detailed inspection report with photos and a transparent quote including vehicle price, shipping, and all export costs.',
  },
  {
    number: '3',
    title: 'Pay & We Ship',
    description:
      'Complete secure payment and we handle everything else — documentation, shipping, customs clearance, and delivery to your port.',
  },
]

export function HowItWorksPreview() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading
          title="How It Works"
          subtitle="Three simple steps to your new vehicle or equipment"
        />
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={step.number} className="text-center relative">
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-6 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5 bg-border" />
              )}
              <div className="w-12 h-12 rounded-full bg-cta text-white text-xl font-bold flex items-center justify-center mx-auto relative z-10">
                {step.number}
              </div>
              <h3 className="mt-5 text-lg font-bold text-navy">{step.title}</h3>
              <p className="mt-2 text-slate leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button href="/how-it-works" variant="secondary" size="md">
            See Full Process
          </Button>
        </div>
      </Container>
    </section>
  )
}
