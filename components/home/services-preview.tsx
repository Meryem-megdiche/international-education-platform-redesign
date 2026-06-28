import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SectionHeading } from '@/components/section-heading'
import { StaggerGroup, StaggerItem } from '@/components/motion/reveal'
import { services } from '@/lib/content'

export function ServicesPreview() {
  const featured = services.slice(0, 8)

  return (
    <section className="bg-secondary/50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="What We Offer"
          title="Complete Support, Every Step of the Way"
          description="From your first consultation to your graduation day, we provide a full suite of services designed around your success."
        />

        <StaggerGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((service) => (
            <StaggerItem key={service.title}>
              <div className="group flex h-full flex-col gap-4 rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-premium">
                <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <service.icon className="size-6" />
                </span>
                <h3 className="font-heading text-lg font-semibold text-foreground">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <div className="mt-12 flex justify-center">
          <Button asChild size="lg" variant="outline">
            <Link href="/services">
              View All 21 Services
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
