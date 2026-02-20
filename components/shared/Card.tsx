import { cn } from '@/lib/utils'

const paddingClasses = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

interface CardProps {
  children: React.ReactNode
  className?: string
  hoverable?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

export function Card({ children, className, hoverable = false, padding = 'md' }: CardProps) {
  return (
    <div
      className={cn(
        'bg-surface rounded-xl shadow-card',
        hoverable && 'hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300',
        paddingClasses[padding],
        className
      )}
    >
      {children}
    </div>
  )
}
