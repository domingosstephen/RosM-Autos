'use client'

import { WHATSAPP_LINK, PHONE_NUMBER } from '@/lib/constants'
import { useScrollPosition } from '@/hooks/useScrollPosition'

export function StickyMobileCTA() {
  const { scrollY } = useScrollPosition()
  const isVisible = scrollY > 500

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 bg-surface border-t border-border shadow-sticky md:hidden transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="grid grid-cols-2 divide-x divide-border">
        <a
          href={`tel:${PHONE_NUMBER}`}
          className="flex items-center justify-center gap-2 py-3.5 text-navy font-semibold text-sm hover:bg-surface-alt transition-colors"
          aria-label="Call RosM Autos"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cta" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
          Call Now
        </a>
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-3.5 text-white font-semibold text-sm bg-whatsapp hover:bg-whatsapp-hover transition-colors"
          aria-label="Chat on WhatsApp"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 0 0 .611.611l4.458-1.495A11.952 11.952 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.37 0-4.567-.696-6.42-1.888l-.146-.092-3.525 1.181 1.181-3.525-.092-.146A9.935 9.935 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
          </svg>
          WhatsApp
        </a>
      </div>
    </div>
  )
}
