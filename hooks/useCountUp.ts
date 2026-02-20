'use client'

import { useEffect, useRef, useState } from 'react'

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

interface UseCountUpOptions {
  end: number
  duration?: number
}

export function useCountUp({ end, duration = 2000 }: UseCountUpOptions) {
  const [value, setValue] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Start counting when element comes into view
  useEffect(() => {
    const element = ref.current
    if (!element) return
    if (typeof IntersectionObserver === 'undefined') {
      setValue(end)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true)
          observer.unobserve(element)
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(element)
    return () => observer.unobserve(element)
  }, [end, hasStarted])

  // Animate the count
  useEffect(() => {
    if (!hasStarted) return

    let startTime: number | null = null
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = easeOutCubic(progress)

      setValue(Math.round(easedProgress * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [hasStarted, end, duration])

  return { value, ref }
}
