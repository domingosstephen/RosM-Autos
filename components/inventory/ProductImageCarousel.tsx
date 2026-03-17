'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import { PlaceholderImage } from '@/components/shared/PlaceholderImage'
import { ImageLightbox } from '@/components/inventory/ImageLightbox'
import { cn } from '@/lib/utils'

interface ProductImageCarouselProps {
  /** All gallery images; when length > 1, carousel with swipe/arrows/dots is shown */
  images?: string[]
  /** Single image fallback when images array is not set */
  singleImage?: string
  alt: string
  name: string
  height?: string
  className?: string
  sizes?: string
  /** Specs shown in full-screen lightbox (e.g. Mileage, Fuel type) */
  specs?: Record<string, string>
}

const SWIPE_THRESHOLD = 50

export function ProductImageCarousel({
  images,
  singleImage,
  alt,
  name,
  height = 'h-48',
  className,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  specs,
}: ProductImageCarouselProps) {
  const list = images?.length ? images : singleImage ? [singleImage] : []
  const [index, setIndex] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const goTo = useCallback(
    (i: number) => {
      if (list.length <= 1) return
      setIndex((prev) => {
        if (i < 0) return list.length - 1
        if (i >= list.length) return 0
        return i
      })
    },
    [list.length]
  )

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }, [])

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }, [])

  const onTouchEnd = useCallback(() => {
    if (touchStart == null || touchEnd == null || list.length <= 1) return
    const diff = touchStart - touchEnd
    if (Math.abs(diff) > SWIPE_THRESHOLD) {
      if (diff > 0) goTo(index + 1)
      else goTo(index - 1)
    }
    setTouchStart(null)
    setTouchEnd(null)
  }, [touchStart, touchEnd, index, goTo, list.length])

  if (list.length === 0) {
    return (
      <div className={cn('relative w-full bg-slate-200', height, className)}>
        <PlaceholderImage
          height={height}
          label={name}
          alt={alt}
          className="rounded-none absolute inset-0"
        />
      </div>
    )
  }

  const showCarousel = list.length > 1

  return (
    <>
      <div
        className={cn('relative w-full bg-slate-200 overflow-hidden cursor-pointer', height, className)}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onClick={() => list.length > 0 && setLightboxOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); list.length > 0 && setLightboxOpen(true) } }}
        aria-label={`View ${name} photos in full size`}
      >
        {list.map((src, i) => (
          <div
            key={src}
            className={cn(
              'absolute inset-0 transition-opacity duration-300 ease-out',
              i === index ? 'opacity-100 z-0' : 'opacity-0 pointer-events-none z-0'
            )}
          >
            <Image
              src={src}
              alt={`${alt} — photo ${i + 1} of ${list.length}`}
              fill
              className="object-cover"
              sizes={sizes}
              unoptimized
            />
          </div>
        ))}

      {/* Prev / Next arrows — visible when multiple images */}
      {showCarousel && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              goTo(index - 1)
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Previous photo"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              goTo(index + 1)
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Next photo"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </>
      )}

      {/* Dot indicators */}
      {showCarousel && (
        <div className="absolute bottom-2 left-0 right-0 z-20 flex justify-center gap-1.5">
          {list.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setIndex(i)
              }}
              className={cn(
                'w-2 h-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white/80',
                i === index ? 'bg-white scale-125' : 'bg-white/60 hover:bg-white/80'
              )}
              aria-label={`Go to photo ${i + 1}`}
              aria-current={i === index ? 'true' : undefined}
            />
          ))}
        </div>
      )}

      {/* Clear hint: scroll through photos */}
      {showCarousel && (
        <div className="absolute top-2 left-0 right-0 z-10 flex justify-center pointer-events-none">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-black/50 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/20">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
            Scroll through {list.length} photos
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </span>
        </div>
      )}

      {/* Click to open full screen (photos + specs) */}
      <div className="absolute bottom-2 right-2 z-10 pointer-events-none">
        <span className="text-xs font-semibold text-white bg-black/50 px-2.5 py-1 rounded-full backdrop-blur-sm border border-white/20">
          Click for full screen
        </span>
      </div>
    </div>

    {lightboxOpen && list.length > 0 && (
      <ImageLightbox
        images={list}
        initialIndex={index}
        alt={alt}
        name={name}
        onClose={() => setLightboxOpen(false)}
        specs={specs}
      />
    )}
    </>
  )
}
