'use client'

import { cn } from '@/lib/utils'
import { useInView } from '@/hooks/useInView'

type Animation = 'fade-up' | 'fade-in' | 'fade-in-left' | 'fade-in-right' | 'scale-in'

const animationClasses: Record<Animation, string> = {
  'fade-up': 'animate-fade-up',
  'fade-in': 'animate-fade-in',
  'fade-in-left': 'animate-fade-in-left',
  'fade-in-right': 'animate-fade-in-right',
  'scale-in': 'animate-scale-in',
}

interface AnimateOnScrollProps {
  children: React.ReactNode
  animation?: Animation
  delay?: number
  className?: string
}

export function AnimateOnScroll({
  children,
  animation = 'fade-up',
  delay = 0,
  className,
}: AnimateOnScrollProps) {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.15, triggerOnce: true })

  return (
    <div
      ref={ref}
      className={cn(
        isInView ? animationClasses[animation] : 'opacity-0',
        className
      )}
      style={delay > 0 ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}
