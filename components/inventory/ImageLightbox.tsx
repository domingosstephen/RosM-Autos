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
  /** Key-value specs shown in full-screen (e.g. Mileage, Fuel type, Gearbox) */
  specs?: Record<string, string>
}

export function ImageLightbox({
  images,
  initialIndex,
  alt,
  name,
  onClose,
  specs = {},
}: ImageLightboxProps) {
  const [index, setIndex] = useState(initialIndex)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [showSpecs, setShowSpecs] = useState(false)
  const hasSpecs = Object.keys(specs).length > 0

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
      className="fixed inset-0 z-50 flex flex-col bg-black min-h-[100dvh] min-h-[100vh]"
      style={{ minHeight: '100dvh' }}
      role="dialog"
      aria-modal="true"
      aria-label={`${name} — full size image gallery`}
    >
      <div
        className="absolute inset-0 z-0"
        onClick={onClose}
        aria-hidden
      />

      <div className="absolute inset-0 flex flex-col pointer-events-none z-[1] min-h-[100dvh] min-h-[100vh]">
        {/* Header: close + counter — touch-friendly (min 44px), safe area on notched devices */}
        <div className="flex items-center justify-between px-4 py-3 shrink-0 pointer-events-auto min-h-[56px] sm:min-h-0 sm:py-3 pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] pt-[max(0.75rem,env(safe-area-inset-top))]">
          <div className="text-white/90 text-sm font-medium bg-black/40 px-3 py-2 sm:py-1.5 rounded-full">
            {index + 1} / {images.length} photos
          </div>
          <div className="flex items-center gap-2">
            {hasSpecs && (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setShowSpecs((s) => !s) }}
                className={cn(
                  'min-h-[44px] min-w-[44px] inline-flex items-center justify-center px-3 py-2 sm:py-1.5 rounded-full text-sm font-medium transition-colors',
                  showSpecs ? 'bg-white/20 text-white' : 'bg-white/10 text-white/90 hover:bg-white/20'
                )}
              >
                {showSpecs ? 'Hide specs' : 'View specs'}
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="w-12 h-12 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Close gallery"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Scroll hint — visible on mobile/tablet, compact on desktop */}
        {images.length > 1 && (
          <div className="flex items-center justify-center gap-2 py-2 text-white/95 text-xs sm:text-sm font-medium bg-black/30 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
            <span className="hidden sm:inline">Swipe or use arrows to scroll through photos</span>
            <span className="sm:hidden">Swipe for more photos</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </div>
        )}

        {/* Image area — fills whole screen; same experience on mobile, tablet, desktop */}
        <div
          className="flex-1 flex items-center justify-center min-h-0 overflow-hidden touch-pan-y pointer-events-auto relative w-full"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="absolute inset-0 flex items-center justify-center p-2 sm:p-4">
            <Image
              key={currentSrc}
              src={currentSrc}
              alt={`${alt} — photo ${index + 1} of ${images.length}`}
              width={1920}
              height={1080}
              className="w-full h-full max-w-full max-h-full object-contain select-none"
              sizes="100vw"
              priority
              draggable={false}
              style={{ touchAction: 'pan-y' }}
            />
          </div>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); goTo(index - 1) }}
                className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 w-12 h-12 min-w-[48px] min-h-[48px] rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 text-white flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 pointer-events-auto"
                aria-label="Previous photo"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); goTo(index + 1) }}
                className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 w-12 h-12 min-w-[48px] min-h-[48px] rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 text-white flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 pointer-events-auto"
                aria-label="Next photo"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Thumbnail strip — horizontal scroll on mobile, centered on desktop */}
        {images.length > 1 && images.length <= 24 && (
          <div className="shrink-0 overflow-x-auto py-3 px-2 sm:px-4 bg-black/40 pointer-events-auto flex gap-2 justify-start md:justify-center pb-[max(0.75rem,env(safe-area-inset-bottom))]">
            {images.map((src, i) => (
              <button
                key={i}
                type="button"
                onClick={(e) => { e.stopPropagation(); setIndex(i) }}
                className={cn(
                  'relative w-14 h-14 shrink-0 rounded overflow-hidden border-2 transition-all focus:outline-none focus:ring-2 focus:ring-white/80',
                  i === index ? 'border-white opacity-100 scale-105' : 'border-white/30 opacity-70 hover:opacity-90'
                )}
                aria-label={`Go to photo ${i + 1}`}
                aria-current={i === index ? 'true' : undefined}
              >
                <Image src={src} alt="" fill className="object-cover" sizes="56px" />
              </button>
            ))}
          </div>
        )}

        {/* Specs panel — full-width, scrollable; same experience on all devices */}
        {hasSpecs && showSpecs && (
          <div className="shrink-0 max-h-[45vh] sm:max-h-[40vh] overflow-y-auto pointer-events-auto bg-black/80 border-t border-white/10 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <div className="p-4 sm:p-5">
              <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Specifications</h3>
              <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-x-4 gap-y-2 text-sm">
                {Object.entries(specs).map(([key, value]) => (
                  <div key={key} className="flex flex-col sm:flex-row sm:gap-2">
                    <dt className="text-white/70 shrink-0">{key}</dt>
                    <dd className="text-white break-words">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        )}

        {/* Dot indicators (when no thumbnails) */}
        {images.length > 1 && images.length > 24 && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 flex-wrap px-4 pointer-events-auto">
            {images.slice(0, 20).map((_, i) => (
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
