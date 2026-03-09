'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SITE_URL } from '@/lib/constants'
import { breadcrumbSchema } from '@/lib/schema'

const pathLabels: Record<string, string> = {
  inventory: 'Available Cars',
  tractors: 'Farm Tractors',
  about: 'About Us',
  'how-it-works': 'How It Works',
  shipping: 'Shipping & Export',
  faq: 'FAQ',
  contact: 'Contact',
  blog: 'Blog',
}

export function Breadcrumbs() {
  const pathname = usePathname()
  if (pathname === '/') return null

  const segments = pathname.split('/').filter(Boolean)
  const items = [
    { name: 'Home', url: SITE_URL },
    ...segments.map((seg, i) => ({
      name: pathLabels[seg] || seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, ' '),
      url: `${SITE_URL}/${segments.slice(0, i + 1).join('/')}`,
    })),
  ]

  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(items)) }}
      />
      <ol className="flex items-center gap-2 text-sm text-muted flex-wrap">
        {items.map((item, i) => (
          <li key={item.url} className="flex items-center gap-2">
            {i > 0 && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            )}
            {i === items.length - 1 ? (
              <span className="text-navy font-medium" aria-current="page">{item.name}</span>
            ) : (
              <Link href={item.url.replace(SITE_URL, '') || '/'} className="hover:text-cta transition-colors">
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
