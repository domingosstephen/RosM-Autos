import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  title: string
  subtitle?: string
  alignment?: 'left' | 'center'
  tag?: 'h1' | 'h2' | 'h3'
  className?: string
  light?: boolean
}

const tagClasses = {
  h1: 'text-3xl md:text-5xl font-extrabold',
  h2: 'text-2xl md:text-4xl font-bold',
  h3: 'text-xl md:text-3xl font-semibold',
}

export function SectionHeading({
  title,
  subtitle,
  alignment = 'center',
  tag = 'h2',
  className,
  light,
}: SectionHeadingProps) {
  const Tag = tag

  return (
    <div className={cn(alignment === 'center' ? 'text-center' : 'text-left', className)}>
      <Tag className={cn(tagClasses[tag], light ? 'text-white' : 'text-navy')}>
        {title}
      </Tag>
      {/* Decorative accent bar */}
      <div
        className={cn(
          'mt-4 h-[3px] w-12 rounded-full bg-cta',
          alignment === 'center' ? 'mx-auto' : ''
        )}
        aria-hidden="true"
      />
      {subtitle && (
        <p className={cn('mt-4 text-lg max-w-2xl', alignment === 'center' && 'mx-auto', light ? 'text-white/70' : 'text-muted')}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
