import { Container } from '@/components/shared/Container'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { TestimonialCard } from '@/components/shared/TestimonialCard'
import { testimonials } from '@/lib/testimonials'

export function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading
          title="What Our Customers Say"
          subtitle="Real experiences from international buyers across three continents"
        />
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </Container>
    </section>
  )
}
