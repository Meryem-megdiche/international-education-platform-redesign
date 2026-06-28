import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/motion/reveal'
import { Button } from '@/components/ui/button'
import { countries } from '@/lib/countries'

export const metadata: Metadata = {
  title: 'Study Destinations',
  description:
    'Explore our study-abroad destinations — Italy, Russia, and China. Compare education systems, tuition fees, living costs, and visa processes.',
  alternates: { canonical: '/countries' },
}

export default function CountriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Destinations"
        title="Choose where your future begins"
        description="Three exceptional destinations, each offering world-class education, rich culture, and life-changing opportunities."
        breadcrumbs={[{ name: 'Countries', href: '/countries' }]}
      />

      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid gap-8">
          {countries.map((country, i) => (
            <Reveal key={country.slug} delay={i * 0.05}>
              <article className="grid overflow-hidden rounded-3xl border border-border bg-card shadow-premium lg:grid-cols-2">
                <div className="relative min-h-64 overflow-hidden">
                  <Image
                    src={country.image || '/placeholder.svg'}
                    alt={`Study in ${country.name}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="p-8 md:p-10">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl" aria-hidden>
                      {country.flag}
                    </span>
                    <h2 className="font-serif text-2xl font-semibold md:text-3xl">
                      Study in {country.name}
                    </h2>
                  </div>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    {country.tagline}
                  </p>
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    {country.highlights.map((h) => (
                      <div
                        key={h.label}
                        className="rounded-xl border border-border bg-secondary/40 p-3"
                      >
                        <p className="text-xs text-muted-foreground">{h.label}</p>
                        <p className="mt-0.5 font-semibold text-primary">
                          {h.value}
                        </p>
                      </div>
                    ))}
                  </div>
                  <Button asChild className="mt-7 group">
                    <Link href={`/countries/${country.slug}`}>
                      Explore {country.name}
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
