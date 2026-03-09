import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/shared/Container'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { InventoryClient } from '@/components/inventory/InventoryClient'
import { createPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = createPageMetadata({
  title: 'Used Farm Tractors for Export | Inspected Tractors',
  description:
    'Browse our inspected used farm tractors ready for export. Quality tractors from leading brands, shipped to your port.',
  path: '/inventory/tractors',
})

export default function TractorsPage() {
  return (
    <section className="py-12 md:py-16">
      <Container>
        <Breadcrumbs />
        <SectionHeading
          title="Farm Tractors — Inspected and Ready to Ship"
          subtitle="Every tractor below has been inspected and photographed. Click a unit to view full-screen photos and specifications."
          tag="h1"
          alignment="center"
          className="mb-10"
        />
        <div className="mb-8 flex flex-wrap gap-2">
          <Link
            href="/inventory"
            className="inline-flex items-center gap-2 rounded-lg bg-surface-alt text-slate hover:bg-slate-200 px-4 py-2.5 text-sm font-medium transition-colors"
          >
            ← All inventory
          </Link>
        </div>
        <InventoryClient initialCategory="tractor" hideCategoryTabs />
      </Container>
    </section>
  )
}
