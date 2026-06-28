import type { Metadata } from 'next'
import Link from 'next/link'
import { Star, Quote } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/motion/reveal'
import { Button } from '@/components/ui/button'
import { testimonials } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Student Testimonials & Success Stories',
  description:
    'Read real success stories from students across North Africa and the Middle East who are now studying in Italy, Russia, and China with Zenith Education.',
  alternates: { canonical: '/testimonials' },
}

const stats = [
  { value: '5,000+', label: 'Students Placed' },
  { value: '200+', label: 'Partner Universities' },
  { value: '98%', label: 'Visa Success Rate' },
  { value: '4.9/5', label: 'Average Rating' },
]

export default function TestimonialsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Success Stories"
        title="Students who turned ambition into achievement"
        description="Thousands of students have trusted Zenith Education to guide them abroad. Here are some of their journeys."
        breadcrumbs={[{ name: 'Testimonials', href: '/testimonials' }]}
      />

      <section className="border-b border-border bg-card">
        <div className="container mx-auto grid grid-cols-2 gap-6 px-4 py-12 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-serif text-3xl font-semibold text-primary md:text-4xl">
                {s.value}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <SectionHeading
            eyebrow="In Their Words"
            title="Hear from our students"
            description="Honest reflections from students now thriving on campuses around the world."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.05}>
                <figure className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                  <Quote className="size-8 text-gold" aria-hidden />
                  <div
                    className="mt-3 flex gap-0.5"
                    aria-label={`${t.rating} out of 5 stars`}
                  >
                    {Array.from({ length: t.rating }).map((_, idx) => (
                      <Star
                        key={idx}
                        className="size-4 fill-gold text-gold"
                        aria-hidden
                      />
                    ))}
                  </div>
                  <blockquote className="mt-4 flex-1 text-pretty leading-relaxed text-foreground">
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-6 border-t border-border pt-4">
                    <p className="font-semibold text-foreground">{t.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {t.program} · {t.country}
                    </p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary py-16 text-primary-foreground md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl font-semibold text-balance md:text-4xl">
            Your success story starts here
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty leading-relaxed text-primary-foreground/80">
            Book a free consultation and take the first step toward studying
            abroad with a team that has helped thousands succeed.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-gold text-gold-foreground hover:bg-gold/90"
            >
              <Link href="/book">Book a Free Consultation</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Link href="/universities">Explore Universities</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
