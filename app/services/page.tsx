import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/motion/reveal'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { services } from '@/lib/content'
import { processSteps } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Our Services',
  description:
    'From academic orientation and university selection to visa assistance, accommodation, and post-arrival support — Zenith Education offers end-to-end study-abroad services.',
  alternates: { canonical: '/services' },
}

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="What We Offer"
        title="End-to-end support for your entire journey"
        description="Twenty-one dedicated services covering every step — from your first consultation to your first day on campus and well beyond."
        breadcrumbs={[{ name: 'Services', href: '/services' }]}
      />

      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={(i % 3) * 0.05}>
              <Card className="group h-full border-border p-6 shadow-premium transition-all hover:-translate-y-1 hover:shadow-lg">
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <service.icon className="size-6" />
                </div>
                <h2 className="mt-5 text-lg font-semibold">{service.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-secondary/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-semibold tracking-tight text-balance md:text-4xl">
              How our process works
            </h2>
            <p className="mt-4 text-muted-foreground">
              A clear, proven path from your first conversation to your arrival
              abroad.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {processSteps.map((step, i) => (
              <Reveal key={step.step} delay={(i % 3) * 0.05}>
                <Card className="h-full border-border p-6 shadow-premium">
                  <span className="font-serif text-3xl font-semibold text-gold">
                    {step.step}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </Card>
              </Reveal>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/book">Start Your Application</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">Talk to an Advisor</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
