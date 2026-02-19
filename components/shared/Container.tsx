import { cn } from '@/lib/utils'

const sizeClasses = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-7xl',
  full: 'max-w-[1536px]',
}

interface ContainerProps {
  children: React.ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'full'
}

export function Container({ children, className, size = 'lg' }: ContainerProps) {
  return (
    <div className={cn('mx-auto px-4 sm:px-6 lg:px-8', sizeClasses[size], className)}>
      {children}
    </div>
  )
}
