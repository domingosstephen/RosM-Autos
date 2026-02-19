import type { Testimonial } from '@/types/testimonial'
import { Card } from './Card'

interface TestimonialCardProps {
  testimonial: Testimonial
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 ${i < rating ? 'text-warning fill-warning' : 'text-slate-300 fill-slate-300'}`}
          viewBox="0 0 24 24"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card padding="md" className="flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <div
          role="img"
          aria-label={testimonial.imageAlt}
          className="w-12 h-12 rounded-full bg-gradient-to-br from-cta/20 to-cta/40 flex items-center justify-center text-cta font-bold text-lg shrink-0"
        >
          {testimonial.name.charAt(0)}
        </div>
        <div>
          <p className="font-semibold text-navy">{testimonial.name}</p>
          <p className="text-sm text-muted">{testimonial.country}</p>
        </div>
      </div>
      <StarRating rating={testimonial.rating} />
      <blockquote className="mt-3 text-slate flex-1">
        <p className="leading-relaxed">&ldquo;{testimonial.text}&rdquo;</p>
      </blockquote>
      <p className="mt-4 text-xs text-muted font-medium">
        Purchased: {testimonial.productType}
      </p>
    </Card>
  )
}
