import type { Metadata } from 'next'
import { createPageMetadata } from '@/lib/metadata'
import { localBusinessSchema } from '@/lib/schema'
import { WHATSAPP_LINK, PHONE_NUMBER, EMAIL, SALES_EMAIL } from '@/lib/constants'
import { Container } from '@/components/shared/Container'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { Button } from '@/components/shared/Button'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { InquiryForm } from '@/components/contact/InquiryForm'
import { ContactInfo } from '@/components/contact/ContactInfo'
import { MapPlaceholder } from '@/components/contact/MapPlaceholder'

export const metadata: Metadata = createPageMetadata({
  title: 'Contact RosM Autos | Get a Quote | WhatsApp, Phone, Email',
  description:
    'Get in touch with RosM Autos for a free quote on quality used vehicles, tractors, and electric bikes. Reach us via WhatsApp, phone, or email. We respond within 24 hours.',
  path: '/contact',
})

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema()),
        }}
      />

      <Container>
        <Breadcrumbs />
      </Container>

      <section className="pt-8 pb-12 md:pt-12 md:pb-16">
        <Container>
          <SectionHeading
            title="Get Your Free Quote — No Obligation"
            subtitle="Tell us what you need and where you want it delivered. We respond within 24 hours with a transparent quote covering vehicle, shipping, and all fees."
            tag="h1"
          />
        </Container>
      </section>

      {/* Form + Contact Info two-column grid */}
      <section className="pb-16 md:pb-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3">
              <InquiryForm />
            </div>
            <div className="lg:col-span-2">
              <ContactInfo />
            </div>
          </div>
        </Container>
      </section>

      {/* Map placeholder */}
      <section className="pb-16 md:pb-20">
        <Container>
          <MapPlaceholder />
        </Container>
      </section>

      {/* Quick-action buttons strip */}
      <section className="pb-16 md:pb-24">
        <Container>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              href={WHATSAPP_LINK}
              variant="whatsapp"
              size="lg"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                </svg>
              }
            >
              WhatsApp Us
            </Button>

            <Button
              href={`tel:${PHONE_NUMBER}`}
              variant="primary"
              size="lg"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              }
            >
              Call Us Now
            </Button>

            <Button
              href={`mailto:${EMAIL}`}
              variant="secondary"
              size="lg"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              }
            >
              Send Email
            </Button>
          </div>
        </Container>
      </section>
    </>
  )
}
