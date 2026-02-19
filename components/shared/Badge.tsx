import { cn } from '@/lib/utils'

const variantClasses = {
  excellent: 'bg-success/10 text-success',
  good: 'bg-warning/10 text-warning',
  fair: 'bg-error/10 text-error',
}

const variantLabels = {
  excellent: 'Excellent',
  good: 'Good',
  fair: 'Fair',
}

interface BadgeProps {
  variant: 'excellent' | 'good' | 'fair'
  text?: string
}

export function Badge({ variant, text }: BadgeProps) {
  return (
    <span
      className={cn(
        'text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide',
        variantClasses[variant]
      )}
    >
      {text || variantLabels[variant]}
    </span>
  )
}
