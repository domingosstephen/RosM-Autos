import { cn } from '@/lib/utils'
import { Container } from './Container'
import { Button } from './Button'

interface CTABannerProps {
  headline: string
  subtext?: string
  primaryCTA: { label: string; href: string }
  secondaryCTA?: { label: string; href: string }
  variant?: 'light' | 'dark' | 'accent'
}

const variantClasses = {
  light: 'bg-surface-alt',
  dark: 'bg-navy',
  accent: 'bg-cta',
}

export function CTABanner({
  headline,
  subtext,
  primaryCTA,
  secondaryCTA,
  variant = 'light',
}: CTABannerProps) {
  const isDark = variant === 'dark' || variant === 'accent'

  return (
    <section className={cn('py-16 md:py-20', variantClasses[variant])}>
      <Container className="text-center">
        <h2 className={cn('text-2xl md:text-4xl font-bold', isDark ? 'text-white' : 'text-navy')}>
          {headline}
        </h2>
        {subtext && (
          <p className={cn('mt-4 text-lg max-w-2xl mx-auto', isDark ? 'text-white/80' : 'text-muted')}>
            {subtext}
          </p>
        )}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            href={primaryCTA.href}
            variant={variant === 'accent' ? 'secondary' : 'primary'}
            size="lg"
            className={variant === 'accent' ? 'border-white text-white hover:bg-white hover:text-cta' : ''}
          >
            {primaryCTA.label}
          </Button>
          {secondaryCTA && (
            <Button
              href={secondaryCTA.href}
              variant="ghost"
              size="lg"
              className={isDark ? 'text-white hover:bg-white/10' : ''}
            >
              {secondaryCTA.label}
            </Button>
          )}
        </div>
      </Container>
    </section>
  )
}
