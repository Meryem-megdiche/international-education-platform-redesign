import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  GraduationCap,
  ClipboardList,
  Stamp,
  Wallet,
  Home as HomeIcon,
  Sparkles,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/motion/reveal'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { countries, getCountry } from '@/lib/countries'
import { siteConfig, whatsappUrl } from '@/lib/site'

export function generateStaticParams() {
  return countries.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const country = getCountry(slug)
  if (!country) return {}
  return {
    title: `Study in ${country.name}`,
    description: `${country.tagline} Discover the education system, admission requirements, visa process, tuition, and living costs for studying in ${country.name}.`,
    alternates: { canonical: `/countries/${country.slug}` },
    openGraph: {
      title: `Study in ${country.name} | ${siteConfig.name}`,
      description: country.tagline,
      images: [country.image],
    },
  }
}

export default async function CountryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const country = getCountry(slug)
  if (!country) notFound()

  return (
    <>
      <PageHero
        eyebrow={`${country.flag} Destination`}
        title={`Study in ${country.name}`}
        description={country.tagline}
        breadcrumbs={[
          { name: 'Countries', href: '/countries' },
          { name: country.name, href: `/countries/${country.slug}` },
        ]}
      />

      <section className="container mx-auto px-4 py-16 md:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="overflow-hidden rounded-3xl shadow-premium">
              <Image
                src={country.image || '/placeholder.svg'}
                alt={`Study in ${country.name}`}
                width={720}
                height={540}
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-serif text-3xl font-semibold tracking-tight md:text-4xl">
              An overview
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              {country.overview}
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4">
              {country.highlights.map((h) => (
                <div
                  key={h.label}
                  className="rounded-xl border border-border bg-secondary/40 p-4"
                >
                  <p className="text-xs text-muted-foreground">{h.label}</p>
                  <p className="mt-1 font-serif text-xl font-semibold text-primary">
                    {h.value}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border bg-secondary/30 py-16 md:py-20">
        <div className="container mx-auto grid gap-6 px-4 md:grid-cols-2">
          <Reveal>
            <Card className="h-full border-border p-8 shadow-premium">
              <GraduationCap className="size-8 text-primary" />
              <h3 className="mt-4 font-serif text-2xl font-semibold">
                Education System
              </h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {country.educationSystem}
              </p>
            </Card>
          </Reveal>
          <Reveal delay={0.1}>
            <Card className="h-full border-border p-8 shadow-premium">
              <ClipboardList className="size-8 text-primary" />
              <h3 className="mt-4 font-serif text-2xl font-semibold">
                Admission Requirements
              </h3>
              <ul className="mt-4 space-y-2.5">
                {country.admissionRequirements.map((req) => (
                  <li key={req} className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-gold" />
                    <span className="text-sm text-muted-foreground">{req}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <Stamp className="mx-auto size-8 text-gold" />
          <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight md:text-4xl">
            The visa process
          </h2>
          <p className="mt-3 text-muted-foreground">
            We guide you through every step with a 98% approval rate.
          </p>
        </div>
        <div className="mx-auto mt-12 max-w-4xl">
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {country.visaProcess.map((v, i) => (
              <Reveal key={v.step} delay={i * 0.05}>
                <li className="h-full rounded-2xl border border-border bg-card p-5 shadow-premium">
                  <span className="flex size-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                    {i + 1}
                  </span>
                  <h3 className="mt-3 font-semibold">{v.step}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {v.detail}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-border bg-secondary/30 py-16 md:py-20">
        <div className="container mx-auto grid gap-6 px-4 md:grid-cols-3">
          <Reveal>
            <Card className="h-full border-border p-7 shadow-premium">
              <Wallet className="size-7 text-primary" />
              <h3 className="mt-4 text-lg font-semibold">Tuition Fees</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {country.tuition}
              </p>
            </Card>
          </Reveal>
          <Reveal delay={0.05}>
            <Card className="h-full border-border p-7 shadow-premium">
              <Sparkles className="size-7 text-primary" />
              <h3 className="mt-4 text-lg font-semibold">Living Costs</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {country.livingCosts}
              </p>
            </Card>
          </Reveal>
          <Reveal delay={0.1}>
            <Card className="h-full border-border p-7 shadow-premium">
              <HomeIcon className="size-7 text-primary" />
              <h3 className="mt-4 text-lg font-semibold">Accommodation</h3>
              <ul className="mt-3 space-y-2">
                {country.accommodation.map((a) => (
                  <li key={a} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-gold" />
                    <span className="text-sm text-muted-foreground">{a}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <h2 className="font-serif text-3xl font-semibold tracking-tight md:text-4xl">
              Student life in {country.name}
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              {country.studentLife}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-serif text-2xl font-semibold tracking-tight">
              Frequently asked questions
            </h2>
            <Accordion className="mt-4 w-full">
              {country.faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left text-base font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border bg-primary py-16 text-primary-foreground md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-balance md:text-4xl">
            Ready to start your journey to {country.name}?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">
            Book a free consultation and let our experts build your personalized
            roadmap to studying in {country.name}.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" variant="secondary">
              <Link href="/book">Book a Free Consultation</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
            >
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                Chat on WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
