import { Container } from '@/components/shared/Container'
import { STATS } from '@/lib/constants'

const stats = [
  { value: STATS.responseTime, label: 'Quote Response' },
  { value: STATS.countriesServed, label: 'Countries Served' },
  { value: STATS.yearsInBusiness, label: 'Years Experience' },
  { value: STATS.satisfactionRate, label: 'Client Satisfaction' },
]

export function TrustSignals() {
  return (
    <section className="bg-surface-alt py-10 md:py-14 border-y border-border">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl md:text-4xl font-extrabold text-navy">{stat.value}</p>
              <p className="mt-1 text-sm text-muted font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
