import { Star, Quote } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { StaggerGroup, StaggerItem } from '@/components/motion/reveal'
import { testimonials } from '@/lib/content'

export function Testimonials() {
  const featured = testimonials.slice(0, 6)

  return (
    <section className="bg-secondary/50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Success Stories"
          title="Students We're Proud Of"
          description="Real journeys from students who trusted Zenith Education to turn their study-abroad dreams into reality."
        />

        <StaggerGroup className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((t) => (
            <StaggerItem key={t.name}>
              <figure className="flex h-full flex-col gap-4 rounded-2xl bg-card p-7 shadow-premium ring-1 ring-border">
                <div className="flex items-center justify-between">
                  <Quote className="size-8 text-gold/40" />
                  <div className="flex gap-0.5" aria-label={`${t.rating} out of 5 stars`}>
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="size-4 fill-gold text-gold" />
                    ))}
                  </div>
                </div>
                <blockquote className="flex-1 text-sm leading-relaxed text-foreground">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="flex items-center gap-3 border-t border-border pt-4">
                  <span className="flex size-11 items-center justify-center rounded-full bg-primary font-heading text-base font-semibold text-primary-foreground">
                    {t.name.charAt(0)}
                  </span>
                  <span className="flex flex-col">
                    <span className="text-sm font-semibold text-foreground">
                      {t.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {t.program} &middot; {t.country}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
