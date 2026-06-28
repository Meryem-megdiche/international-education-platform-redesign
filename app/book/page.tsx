import type { Metadata } from 'next'
import { Phone, ShieldCheck, Clock3 } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { BookingFlow } from '@/components/booking/booking-flow'

export const metadata: Metadata = {
  title: 'Book a Free Consultation',
  description:
    'Schedule a free one-on-one consultation with a Zenith Education advisor. Choose a date and time that works for you and start your study abroad journey.',
  alternates: { canonical: '/book' },
}

const perks = [
  { icon: ShieldCheck, text: '100% free, no-obligation session' },
  { icon: Clock3, text: '30-minute personalized advice' },
  { icon: Phone, text: 'Available by phone or in person' },
]

export default function BookPage() {
  return (
    <>
      <PageHero
        eyebrow="Book Consultation"
        title="Schedule Your Free Consultation"
        description="Pick a time that suits you. Our expert advisors will guide you through your options for Italy, Russia, and China."
        breadcrumbs={[{ label: 'Book Consultation' }]}
      />

      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-wrap justify-center gap-4">
            {perks.map((perk) => (
              <div
                key={perk.text}
                className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground"
              >
                <perk.icon className="h-4 w-4 text-primary" />
                {perk.text}
              </div>
            ))}
          </div>

          <div className="rounded-3xl border border-border bg-card/50 p-6 shadow-sm sm:p-8 lg:p-10">
            <BookingFlow />
          </div>
        </div>
      </section>
    </>
  )
}
