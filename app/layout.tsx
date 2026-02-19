import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppFab } from '@/components/layout/WhatsAppFab'
import { StickyMobileCTA } from '@/components/layout/StickyMobileCTA'
import { defaultMetadata } from '@/lib/metadata'
import { organizationSchema, websiteSchema, localBusinessSchema } from '@/lib/schema'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = defaultMetadata

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/icons/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema()),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <Header />
        <main className="flex-1 pb-16 md:pb-0">
          {children}
        </main>
        <Footer />
        <WhatsAppFab />
        <StickyMobileCTA />
      </body>
    </html>
  )
}
