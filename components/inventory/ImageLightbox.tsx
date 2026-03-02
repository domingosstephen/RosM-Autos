'use client'

import { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

const SWIPE_THRESHOLD = 50

interface ImageLightboxProps {
  images: string[]
  initialIndex: number
  alt: string
  name: string
  onClose: () => void
}

export function ImageLightbox({
  images,
  initialIndex,
  alt,
  name,
  onClose,
}: ImageLightboxProps) {
  const [index, setIndex] = useState(initialIndex)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const goTo = useCallback(
    (i: number) => {
      if (i < 0) setIndex(images.length - 1)
      else if (i >= images.length) setIndex(0)
      else setIndex(i)
    },
    [images.length]
  )

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }, [])

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0]?.clientX ?? null)
  }, [])

  const onTouchEnd = useCallback(() => {
    if (touchStart == null || touchEnd == null) return
    const diff = touchStart - touchEnd
    if (Math.abs(diff) > SWIPE_THRESHOLD) {
      if (diff > 0) goTo(index + 1)
      else goTo(index - 1)
    }
    setTouchStart(null)
    setTouchEnd(null)
  }, [touchStart, touchEnd, index, goTo])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') goTo(index - 1)
      if (e.key === 'ArrowRight') goTo(index + 1)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose, index, goTo])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const currentSrc = images[index]

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-black/95"
      role="dialog"
      aria-modal="true"
      aria-label={`${name} — full size image gallery`}
    >
      {/* Backdrop — click to close; interactive elements use pointer-events-auto */}
      <div
        className="absolute inset-0 z-0"
        onClick={onClose}
        aria-hidden
      />

      <div className="absolute inset-0 flex flex-col pointer-events-none z-[1]">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 pointer-events-auto"
          aria-label="Close gallery"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Counter */}
        <div className="absolute top-4 left-4 text-white/90 text-sm font-medium bg-black/40 px-3 py-1.5 rounded-full pointer-events-none">
          {index + 1} / {images.length}
        </div>

        {/* Image area — full resolution, swipeable; click here does not close */}
        <div
          className="flex-1 flex items-center justify-center min-h-0 overflow-hidden touch-pan-y pointer-events-auto"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <Image
              key={currentSrc}
              src={currentSrc}
              alt={`${alt} — photo ${index + 1} of ${images.length}`}
              width={1920}
              height={1080}
              className="max-w-full max-h-full w-auto h-auto object-contain select-none"
              sizes="100vw"
              priority
              draggable={false}
              style={{ touchAction: 'pan-y' }}
            />
          </div>
        </div>

        {/* Prev / Next arrows */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); goTo(index - 1) }}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 pointer-events-auto"
              aria-label="Previous photo"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); goTo(index + 1) }}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 pointer-events-auto"
              aria-label="Next photo"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </>
        )}

        {/* Dot indicators */}
        {images.length > 1 && images.length <= 20 && (
          <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 flex-wrap px-4 pointer-events-auto">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={(e) => { e.stopPropagation(); setIndex(i) }}
                className={cn(
                  'w-2.5 h-2.5 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white/80',
                  i === index ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/70'
                )}
                aria-label={`Go to photo ${i + 1}`}
                aria-current={i === index ? 'true' : undefined}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
