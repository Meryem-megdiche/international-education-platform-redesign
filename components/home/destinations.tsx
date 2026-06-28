import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, GraduationCap, Wallet } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { StaggerGroup, StaggerItem } from '@/components/motion/reveal'

const destinations = [
  {
    name: 'Italy',
    href: '/countries/italy',
    image: '/images/italy.png',
    blurb:
      'Historic universities, globally ranked programs, and affordable tuition in the heart of Europe.',
    universities: '90+ universities',
    tuition: 'From €900/year',
  },
  {
    name: 'Russia',
    href: '/countries/russia',
    image: '/images/russia.png',
    blurb:
      'World leaders in medicine, engineering, and the sciences with generous state scholarships.',
    universities: '60+ universities',
    tuition: 'From $2,500/year',
  },
  {
    name: 'China',
    href: '/countries/china',
    image: '/images/china.png',
    blurb:
      'Cutting-edge research, modern campuses, and a growing hub for international students.',
    universities: '50+ universities',
    tuition: 'From $3,000/year',
  },
]

export function Destinations() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Study Destinations"
          title="Choose Your Future Campus"
          description="We specialize in three of the world's most rewarding study destinations, each offering exceptional academics and unforgettable experiences."
        />

        <StaggerGroup className="mt-14 grid gap-6 md:grid-cols-3">
          {destinations.map((d) => (
            <StaggerItem key={d.name}>
              <Link
                href={d.href}
                className="group block h-full overflow-hidden rounded-3xl bg-card shadow-premium ring-1 ring-border transition-all duration-300 hover:-translate-y-1.5 hover:ring-primary/30"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={d.image}
                    alt={`Study in ${d.name}`}
                    width={520}
                    height={360}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/10 to-transparent" />
                  <h3 className="absolute bottom-4 left-5 font-heading text-2xl font-bold text-background">
                    {d.name}
                  </h3>
                </div>
                <div className="flex flex-col gap-4 p-6">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {d.blurb}
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <span className="flex items-center gap-2 text-foreground">
                      <GraduationCap className="size-4 text-primary" />
                      {d.universities}
                    </span>
                    <span className="flex items-center gap-2 text-foreground">
                      <Wallet className="size-4 text-primary" />
                      {d.tuition}
                    </span>
                  </div>
                  <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    Explore {d.name}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
