import { Container } from '@/components/shared/Container'
import { Button } from '@/components/shared/Button'
import { PlaceholderImage } from '@/components/shared/PlaceholderImage'
import { WHATSAPP_LINK } from '@/lib/constants'

export function HeroSection() {
  return (
    <section className="bg-navy relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-light/50 to-navy opacity-90" />
      <Container className="relative py-16 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Copy side */}
          <div>
            <p className="text-cta font-semibold text-sm uppercase tracking-wider mb-4">
              Germany&apos;s Trusted Vehicle Export Partner Since 2017
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              Stop Losing Money on Vehicles You&apos;ve{' '}
              <span className="text-cta">Never Inspected</span>
            </h1>
            <p className="mt-6 text-lg text-white/70 leading-relaxed">
              International buyers lose thousands every year to undisclosed defects, phantom shipping fees, and dealers who disappear after payment. One bad purchase can set your business back months.
            </p>
            <p className="mt-4 text-white/90 leading-relaxed">
              <strong className="text-white">RosM Autos</strong> ships inspected automobiles, farm tractors, and electric bikes from Lübbecke, Germany to 45+ countries — with photos, condition details, and every cost quoted upfront before you commit.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button href="/inventory" variant="primary" size="lg">
                Explore Our Inspected Inventory
              </Button>
              <Button href={WHATSAPP_LINK} variant="whatsapp" size="lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 0 0 .611.611l4.458-1.495A11.952 11.952 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.37 0-4.567-.696-6.42-1.888l-.146-.092-3.525 1.181 1.181-3.525-.092-.146A9.935 9.935 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
                Get a Free Quote on WhatsApp
              </Button>
            </div>
            <div className="mt-8 flex items-center gap-6 text-white/60 text-sm">
              <span className="flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                Inspected with Photos Before Sale
              </span>
              <span className="flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                Door-to-Port Delivery to 45+ Countries
              </span>
              <span className="flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                Zero Hidden Fees — Guaranteed
              </span>
            </div>
          </div>

          {/* Image placeholder side */}
          <div className="hidden lg:block">
            <PlaceholderImage
              height="h-[420px]"
              label="Quality Used Vehicles Ready for Export"
              alt="Collection of quality-inspected used automobiles, farm tractors, and electric bikes available for international export from RosM Autos"
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
