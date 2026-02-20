'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Container } from '@/components/shared/Container'
import { cn } from '@/lib/utils'
import {
  SITE_NAME,
  PHONE_NUMBER,
  EMAIL,
  WHATSAPP_LINK,
  SOCIAL_LINKS,
  BUSINESS_HOURS,
} from '@/lib/constants'

const footerLinks = {
  inventory: {
    title: 'Our Products',
    links: [
      { label: 'Used Automobiles', href: '/inventory?category=automobile' },
      { label: 'Farm Tractors', href: '/inventory?category=tractor' },
      { label: 'Electric Bikes', href: '/inventory?category=electric-bike' },
      { label: 'All Inventory', href: '/inventory' },
    ],
  },
  company: {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'How It Works', href: '/how-it-works' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  support: {
    title: 'Support',
    links: [
      { label: 'FAQ', href: '/faq' },
      { label: 'Shipping & Export', href: '/shipping' },
      { label: 'Get a Quote', href: '/contact' },
    ],
  },
}

export function Footer() {
  const [openSection, setOpenSection] = useState<string | null>(null)

  return (
    <footer className="bg-navy text-white" role="contentinfo">
      <Container>
        {/* Main footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-16">
          {/* Brand column */}
          <div>
            <Link href="/" className="text-2xl font-extrabold tracking-tight">
              <span className="text-cta">RosM</span> Autos
            </Link>
            <p className="mt-4 text-white/70 text-sm leading-relaxed">
              Inspected automobiles, farm tractors, and electric bikes shipped from Lubbecke, Germany to 45+ countries. From our yard to your port.
            </p>
            <div className="flex gap-3 mt-6">
              <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" aria-label="Follow RosM Autos on Facebook" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-cta transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Follow RosM Autos on Instagram" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-cta transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
              </a>
              <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" aria-label="Subscribe to RosM Autos on YouTube" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-cta transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>

          {/* Link columns — collapsible on mobile */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key}>
              <button
                onClick={() => setOpenSection(openSection === key ? null : key)}
                className="flex items-center justify-between w-full md:pointer-events-none"
                aria-expanded={openSection === key}
              >
                <h3 className="text-sm font-semibold uppercase tracking-wider text-white/50">
                  {section.title}
                </h3>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={cn(
                    'h-5 w-5 text-white/50 transition-transform md:hidden',
                    openSection === key && 'rotate-180'
                  )}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              <ul
                className={cn(
                  'mt-4 space-y-3',
                  openSection !== key && 'hidden md:block'
                )}
              >
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-cta transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact strip */}
        <div className="border-t border-white/10 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
              <div>
                <p className="text-white/50">Phone</p>
                <a href={`tel:${PHONE_NUMBER}`} className="text-white hover:text-cta transition-colors">{PHONE_NUMBER}</a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </div>
              <div>
                <p className="text-white/50">Email</p>
                <a href={`mailto:${EMAIL}`} className="text-white hover:text-cta transition-colors">{EMAIL}</a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <div>
                <p className="text-white/50">Business Hours</p>
                <p className="text-white text-xs">{BUSINESS_HOURS}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>&copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/faq" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/faq" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}
