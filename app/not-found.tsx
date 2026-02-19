import { Container } from '@/components/shared/Container'
import { Button } from '@/components/shared/Button'

export default function NotFound() {
  return (
    <section className="py-24 md:py-32">
      <Container className="text-center">
        <p className="text-6xl md:text-8xl font-extrabold text-cta">404</p>
        <h1 className="mt-4 text-2xl md:text-4xl font-bold text-navy">Page Not Found</h1>
        <p className="mt-4 text-lg text-muted max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href="/" variant="primary" size="lg">
            Go to Homepage
          </Button>
          <Button href="/inventory" variant="secondary" size="lg">
            Browse Inventory
          </Button>
        </div>
      </Container>
    </section>
  )
}
