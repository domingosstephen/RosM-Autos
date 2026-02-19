import { Container } from '@/components/shared/Container'
import { SectionHeading } from '@/components/shared/SectionHeading'

const propositions = [
  {
    title: 'Every Unit, Thoroughly Inspected',
    description:
      'Every vehicle and piece of equipment undergoes our comprehensive 150-point inspection process. You receive a detailed report with photos before you commit to buying. No surprises, no guesswork.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12l2 2 4-4"/><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/></svg>
    ),
  },
  {
    title: 'Complete Export Service',
    description:
      'We handle everything from purchase to port delivery. Shipping, documentation, customs clearance — you focus on choosing the right product, we handle all the logistics across three continents.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
    ),
  },
  {
    title: 'Fair, Transparent Pricing',
    description:
      'The price you see is the price you pay. No hidden fees, no surprise charges at checkout. We provide transparent quotes that include all costs upfront so you can plan your budget with confidence.',
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
          title="Why International Buyers Choose RosM Autos"
          subtitle="We built our business on three promises — and we deliver on every one"
        />
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {propositions.map((prop) => (
            <div key={prop.title} className="text-center">
              <div className="w-16 h-16 rounded-full bg-cta/10 text-cta flex items-center justify-center mx-auto">
                {prop.icon}
              </div>
              <h3 className="mt-6 text-xl font-bold text-navy">{prop.title}</h3>
              <p className="mt-3 text-slate leading-relaxed">{prop.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
