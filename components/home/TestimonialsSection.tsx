'use client'

import { Container } from '@/components/shared/Container'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { TestimonialCard } from '@/components/shared/TestimonialCard'
import { AnimateOnScroll } from '@/components/shared/AnimateOnScroll'
import { testimonials } from '@/lib/testimonials'

export function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading
          title="Don&apos;t Take Our Word for It — Hear from Our Buyers"
          subtitle="Real feedback from fleet operators, farmers, and importers in Nigeria, Brazil, Ukraine, Ghana, Colombia, and Kenya"
        />
        <div className="mt-12 flex gap-4 overflow-x-auto scroll-snap-x pb-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 md:overflow-visible md:pb-0">
          {testimonials.map((testimonial, i) => (
            <AnimateOnScroll key={testimonial.id} animation="fade-up" delay={i * 100} className="min-w-[300px] snap-start md:min-w-0">
              <TestimonialCard testimonial={testimonial} />
            </AnimateOnScroll>
          ))}
        </div>
      </Container>
    </section>
  )
}
