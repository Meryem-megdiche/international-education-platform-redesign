import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Compass,
  FileText,
  Wallet,
  Home,
  Plane,
  GraduationCap,
  CheckCircle2,
} from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Student Guide — Studying Abroad Step by Step',
  description:
    'A complete guide for students planning to study abroad in Italy, Russia, or China: choosing a program, budgeting, accommodation, arrival, and thriving on campus.',
  alternates: { canonical: '/student-guide' },
}

const sections = [
  {
    id: 'choosing',
    icon: Compass,
    title: '1. Choosing the Right Program',
    body: 'Start by reflecting on your career goals, preferred language of study, and budget. Consider program rankings, accreditation, and the city you would like to live in. Our advisors help you build a shortlist of programs that genuinely match your profile.',
    points: [
      'Define your field of study and long-term goals',
      'Compare tuition, living costs, and scholarships',
      'Check language requirements and program duration',
    ],
  },
  {
    id: 'documents',
    icon: FileText,
    title: '2. Preparing Your Documents',
    body: 'A complete, well-organized application is the foundation of a successful admission. Gather and translate your academic records early, and have them legalized where required.',
    points: [
      'Academic transcripts and diplomas',
      'Passport valid for your full study period',
      'Motivation letter and recommendation letters',
      'Language certificates (IELTS, TOEFL, or local tests)',
    ],
  },
  {
    id: 'budget',
    icon: Wallet,
    title: '3. Budgeting & Finances',
    body: 'Plan for tuition, accommodation, food, transport, insurance, and personal expenses. Many destinations offer affordable living and scholarships that significantly reduce your costs.',
    points: [
      'Estimate annual tuition and living costs',
      'Apply for scholarships and grants early',
      'Open a local student bank account on arrival',
    ],
  },
  {
    id: 'accommodation',
    icon: Home,
    title: '4. Finding Accommodation',
    body: 'Secure your housing before you travel. Options range from university dormitories to shared private apartments. We help you find safe, affordable housing close to campus.',
    points: [
      'University dormitories (most affordable)',
      'Shared student apartments',
      'Private studios for more independence',
    ],
  },
  {
    id: 'arrival',
    icon: Plane,
    title: '5. Arrival & Settling In',
    body: 'From the moment you land, our local support helps you register with authorities, obtain your residence permit, and navigate your first weeks with confidence.',
    points: [
      'Airport pickup and transfer',
      'University registration and enrollment',
      'Residence permit and local registration',
    ],
  },
  {
    id: 'thriving',
    icon: GraduationCap,
    title: '6. Thriving on Campus',
    body: 'Make the most of your experience by joining student communities, attending events, and seeking academic support when needed. Your journey is about more than a degree.',
    points: [
      'Join clubs and student associations',
      'Build a study routine and seek mentorship',
      'Explore internships and career opportunities',
    ],
  },
]

export default function StudentGuidePage() {
  return (
    <main>
      <PageHero
        eyebrow="Student Guide"
        title="Your step-by-step guide to studying abroad"
        description="Everything you need to know to plan, prepare, and succeed — from choosing a program to thriving on campus."
        breadcrumbs={[{ name: 'Student Guide', href: '/student-guide' }]}
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[260px_1fr]">
          {/* Table of contents */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              On this page
            </p>
            <nav className="mt-4 flex flex-col gap-2">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {s.title}
                </a>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <div className="space-y-12">
            {sections.map((s) => (
              <article key={s.id} id={s.id} className="scroll-mt-28">
                <div className="flex items-center gap-3">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <s.icon className="size-5" aria-hidden />
                  </span>
                  <h2 className="font-serif text-2xl font-semibold text-foreground">
                    {s.title}
                  </h2>
                </div>
                <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
                  {s.body}
                </p>
                <ul className="mt-4 space-y-2">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5">
                      <CheckCircle2
                        className="mt-0.5 size-5 shrink-0 text-gold"
                        aria-hidden
                      />
                      <span className="text-foreground">{p}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}

            <div className="rounded-2xl border border-border bg-secondary/50 p-8 text-center">
              <h2 className="font-serif text-2xl font-semibold text-foreground">
                Ready to begin your journey?
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-pretty leading-relaxed text-muted-foreground">
                Let our advisors guide you through every step. Book your free
                consultation today.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-4">
                <Button asChild size="lg">
                  <Link href="/book">Book a Free Consultation</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-transparent">
                  <Link href="/visa-guide">Read the Visa Guide</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
