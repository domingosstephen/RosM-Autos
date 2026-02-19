'use client'

import { useState, useEffect, useCallback } from 'react'

export function useExitIntent(threshold = 10) {
  const [showExitIntent, setShowExitIntent] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)

  const handleMouseLeave = useCallback(
    (e: MouseEvent) => {
      if (hasTriggered) return
      if (e.clientY <= threshold) {
        setShowExitIntent(true)
        setHasTriggered(true)
      }
    },
    [hasTriggered, threshold]
  )

  const close = useCallback(() => {
    setShowExitIntent(false)
  }, [])

  useEffect(() => {
    document.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [handleMouseLeave])

  return { showExitIntent, close }
}
