'use client'

import { Container } from '@/components/shared/Container'
import { useCountUp } from '@/hooks/useCountUp'

const stats = [
  { value: 24, suffix: 'h', label: 'Quote Response' },
  { value: 45, suffix: '+', label: 'Countries Served' },
  { value: 8, suffix: '+', label: 'Years Experience' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
]

function AnimatedStat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { value: count, ref } = useCountUp({ end: value, duration: 2000 })

  return (
    <div ref={ref}>
      <p className="text-3xl md:text-4xl font-extrabold text-navy">
        {count}{suffix}
      </p>
      <p className="mt-1 text-sm text-muted font-medium">{label}</p>
    </div>
  )
}

export function TrustSignals() {
  return (
    <section className="bg-surface-alt py-10 md:py-14 border-y border-border">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <AnimatedStat key={stat.label} {...stat} />
          ))}
        </div>
      </Container>
    </section>
  )
}
