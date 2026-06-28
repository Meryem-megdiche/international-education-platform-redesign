import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  Target,
  Eye,
  Heart,
  ShieldCheck,
  Globe2,
  Users,
  Award,
  TrendingUp,
} from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/motion/reveal'
import { SectionHeading } from '@/components/section-heading'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Zenith Education — a premier international education agency helping students from North Africa and the Middle East study in Italy, Russia, and China.',
  alternates: { canonical: '/about' },
}

const values = [
  {
    icon: ShieldCheck,
    title: 'Integrity',
    description:
      'Transparent advice and honest guidance at every step — no hidden fees, ever.',
  },
  {
    icon: Heart,
    title: 'Student First',
    description:
      'Your goals drive every decision we make. Your success is our success.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description:
      'We hold ourselves to the highest professional standards in everything we do.',
  },
  {
    icon: Globe2,
    title: 'Global Mindset',
    description:
      'Deep expertise across three continents and dozens of partner universities.',
  },
]

const stats = [
  { icon: Users, value: '5,000+', label: 'Students Placed' },
  { icon: Globe2, value: '3', label: 'Study Destinations' },
  { icon: Award, value: '120+', label: 'Partner Universities' },
  { icon: TrendingUp, value: '98%', label: 'Visa Approval Rate' },
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Zenith"
        title="Guiding ambitious students to a world-class future"
        description="For over a decade, we have helped thousands of students from North Africa and the Middle East turn their dream of studying abroad into reality."
        breadcrumbs={[{ name: 'About', href: '/about' }]}
      />

      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative">
              <div className="overflow-hidden rounded-3xl shadow-premium">
                <Image
                  src="/images/gallery/consultation.png"
                  alt="A Zenith Education advisor guiding a student"
                  width={720}
                  height={560}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-2 hidden rounded-2xl border border-border bg-card p-5 shadow-premium sm:block">
                <p className="font-serif text-3xl font-semibold text-primary">
                  12+
                </p>
                <p className="text-sm text-muted-foreground">Years of expertise</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <span className="inline-flex items-center rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold-foreground">
              Our Story
            </span>
            <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-balance md:text-4xl">
              A trusted partner on your study-abroad journey
            </h2>
            <div className="mt-5 space-y-4 leading-relaxed text-muted-foreground">
              <p>
                {siteConfig.name} was founded with a simple belief: that every
                ambitious student deserves access to a world-class education,
                regardless of where they come from.
              </p>
              <p>
                What began as a small advisory practice has grown into a leading
                international education agency, with dedicated specialists,
                official university partnerships, and a 98% visa approval rate
                across Italy, Russia, and China.
              </p>
              <p>
                We handle every detail — from choosing the right program to
                settling into your new home abroad — so you can focus on what
                matters most: your future.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/book">Book a Free Consultation</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/services">Explore Our Services</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-border bg-secondary/40 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.05}>
                <div className="rounded-2xl border border-border bg-card p-6 text-center shadow-premium">
                  <s.icon className="mx-auto size-7 text-gold" />
                  <p className="mt-3 font-serif text-3xl font-semibold text-primary">
                    {s.value}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal>
            <Card className="h-full border-border p-8 shadow-premium">
              <Target className="size-8 text-primary" />
              <h3 className="mt-4 font-serif text-2xl font-semibold">
                Our Mission
              </h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                To empower students from North Africa and the Middle East with
                expert guidance, trusted university partnerships, and unwavering
                support — making world-class education accessible, simple, and
                successful.
              </p>
            </Card>
          </Reveal>
          <Reveal delay={0.1}>
            <Card className="h-full border-border p-8 shadow-premium">
              <Eye className="size-8 text-primary" />
              <h3 className="mt-4 font-serif text-2xl font-semibold">
                Our Vision
              </h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                To be the most trusted international education agency in the
                region, recognized for our integrity, results, and the
                life-changing opportunities we create for every student we serve.
              </p>
            </Card>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border bg-secondary/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <SectionHeading
            eyebrow="Our Values"
            title="The principles that guide everything we do"
            description="These core values shape how we work with every student, every day."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.05}>
                <Card className="h-full border-border p-6 shadow-premium transition-shadow hover:shadow-lg">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <v.icon className="size-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {v.description}
                  </p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
