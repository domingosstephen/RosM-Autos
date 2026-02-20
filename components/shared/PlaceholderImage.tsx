import { cn } from '@/lib/utils'

interface PlaceholderImageProps {
  width?: string
  height?: string
  label: string
  alt: string
  className?: string
}

export function PlaceholderImage({
  width = 'w-full',
  height = 'h-48',
  label,
  alt,
  className,
}: PlaceholderImageProps) {
  return (
    <div
      role="img"
      aria-label={alt}
      className={cn(
        'bg-gradient-to-br from-slate-200 to-slate-300 rounded-lg flex items-center justify-center relative overflow-hidden',
        width,
        height,
        className
      )}
    >
      {/* Shimmer overlay */}
      <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      <div className="text-center px-4 relative z-10">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto mb-2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
        </svg>
        <span className="text-slate-500 font-medium text-sm">{label}</span>
      </div>
    </div>
  )
}
