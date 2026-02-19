import { Container } from '@/components/shared/Container'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { TestimonialCard } from '@/components/shared/TestimonialCard'
import { testimonials } from '@/lib/testimonials'

export function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading
          title="Don&apos;t Take Our Word for It — Hear from Our Buyers"
          subtitle="Real feedback from fleet operators, farmers, and importers in Nigeria, Brazil, Ukraine, Ghana, Colombia, and Kenya"
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
