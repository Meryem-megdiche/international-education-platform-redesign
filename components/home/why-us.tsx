import Image from 'next/image'
import { CheckCircle2, ShieldCheck, Globe2, HeartHandshake } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion/reveal'

const reasons = [
  {
    icon: ShieldCheck,
    title: 'Proven Track Record',
    description:
      'A 98% visa success rate and thousands of students placed in top universities worldwide.',
  },
  {
    icon: Globe2,
    title: 'Local & Global Expertise',
    description:
      'Deep relationships with 200+ partner universities across Italy, Russia, and China.',
  },
  {
    icon: HeartHandshake,
    title: 'End-to-End Support',
    description:
      'One dedicated advisor guides you from your first question to your graduation day.',
  },
  {
    icon: CheckCircle2,
    title: 'Transparent & Trustworthy',
    description:
      'No hidden fees, no false promises — just honest, professional guidance you can rely on.',
  },
]

export function WhyUs() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <Reveal className="relative order-2 lg:order-1">
          <div className="overflow-hidden rounded-[2rem] shadow-premium ring-1 ring-border">
            <Image
              src="/images/hero-students.png"
              alt="Advisors guiding students through their study-abroad journey"
              width={640}
              height={520}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-4 hidden rounded-2xl bg-gold px-6 py-5 text-gold-foreground shadow-premium sm:block">
            <p className="font-heading text-3xl font-bold">12+</p>
            <p className="text-sm font-medium">Years guiding students</p>
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <SectionHeading
            align="left"
            eyebrow="Why Zenith Education"
            title="A Partner You Can Trust With Your Future"
          />
          <StaggerGroup className="mt-10 grid gap-6 sm:grid-cols-2">
            {reasons.map((r) => (
              <StaggerItem key={r.title}>
                <div className="flex flex-col gap-3">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <r.icon className="size-5" />
                  </span>
                  <h3 className="font-heading text-lg font-semibold text-foreground">
                    {r.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {r.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  )
}
