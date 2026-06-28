import type { Metadata } from 'next'
import Link from 'next/link'
import { Stamp, FileCheck2, Clock, CheckCircle2, ShieldCheck } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/motion/reveal'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Student Visa Guide — Italy, Russia & China',
  description:
    'A complete student visa guide for Italy, Russia, and China. Learn the requirements, documents, processing times, and tips to secure your study visa with a 98% success rate.',
  alternates: { canonical: '/visa-guide' },
}

const generalSteps = [
  {
    icon: FileCheck2,
    title: 'Receive your acceptance letter',
    text: 'Your official university admission letter is the cornerstone of every student visa application.',
  },
  {
    icon: Stamp,
    title: 'Prepare your visa file',
    text: 'Gather financial proof, insurance, accommodation details, and legalized documents.',
  },
  {
    icon: Clock,
    title: 'Submit & attend your interview',
    text: 'Apply at the consulate, attend your interview, and provide biometrics where required.',
  },
  {
    icon: ShieldCheck,
    title: 'Travel & register',
    text: 'After approval, travel to your host country and complete your residence registration.',
  },
]

const countryVisas = [
  {
    country: 'Italy',
    type: 'Type D National Visa (Study)',
    processing: '2 – 6 weeks',
    requirements: [
      'University enrollment / pre-enrollment confirmation',
      'Proof of financial means (~€6,000+ per year)',
      'Valid health insurance covering Italy',
      'Proof of accommodation in Italy',
      'Completed visa application and biometrics',
    ],
  },
  {
    country: 'Russia',
    type: 'Student Visa (Invitation-based)',
    processing: '3 – 5 weeks',
    requirements: [
      'Official invitation letter from the university',
      'Valid passport and visa application form',
      'HIV test certificate (negative)',
      'Medical insurance valid in Russia',
      'Passport-size photographs',
    ],
  },
  {
    country: 'China',
    type: 'X1 / X2 Student Visa',
    processing: '1 – 4 weeks',
    requirements: [
      'JW201 or JW202 admission form',
      'University admission notice',
      'Valid passport and completed application',
      'Foreigner Physical Examination Form (for X1)',
      'Proof of financial support',
    ],
  },
]

export default function VisaGuidePage() {
  return (
    <main>
      <PageHero
        eyebrow="Visa Guide"
        title="Your complete student visa guide"
        description="Clear, country-specific guidance to help you secure your student visa with confidence — backed by our 98% approval rate."
        breadcrumbs={[{ name: 'Visa Guide', href: '/visa-guide' }]}
      />

      {/* General process */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <SectionHeading
            eyebrow="The Process"
            title="How the student visa process works"
            description="While each country has its own requirements, the journey follows four key stages."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {generalSteps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.05}>
                <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <s.icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 font-semibold text-foreground">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {s.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Country requirements */}
      <section className="border-t border-border bg-secondary/40 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <SectionHeading
            eyebrow="By Destination"
            title="Visa requirements by country"
            description="A breakdown of the student visa type, processing time, and key documents for each destination."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {countryVisas.map((c, i) => (
              <Reveal key={c.country} delay={i * 0.05}>
                <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-xl font-semibold text-foreground">
                      {c.country}
                    </h3>
                    <span className="inline-flex items-center gap-1 rounded-full bg-gold/15 px-3 py-1 text-xs font-medium text-gold-foreground">
                      <Clock className="size-3.5" aria-hidden />
                      {c.processing}
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-medium text-primary">
                    {c.type}
                  </p>
                  <ul className="mt-4 space-y-2.5 border-t border-border pt-4">
                    {c.requirements.map((r) => (
                      <li key={r} className="flex items-start gap-2.5 text-sm">
                        <CheckCircle2
                          className="mt-0.5 size-4 shrink-0 text-gold"
                          aria-hidden
                        />
                        <span className="text-foreground">{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted-foreground">
            Requirements can change based on your nationality and the consulate.
            Our visa specialists keep your file fully up to date and compliant.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16 text-primary-foreground md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl font-semibold text-balance md:text-4xl">
            Let us handle your visa with confidence
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty leading-relaxed text-primary-foreground/80">
            Our visa specialists prepare your file, coach you for the interview,
            and guide you to approval. Book your free consultation today.
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
              <Link href="/student-guide">Read the Student Guide</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
