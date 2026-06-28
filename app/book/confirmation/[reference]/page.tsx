import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  Briefcase,
  Hash,
  Mail,
  Home,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getAppointmentByReference } from '@/app/actions/booking'
import { formatDisplayDate } from '@/lib/booking'
import { siteConfig, whatsappUrl } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Booking Confirmed',
  robots: { index: false, follow: false },
}

export default async function ConfirmationPage({
  params,
}: {
  params: Promise<{ reference: string }>
}) {
  const { reference } = await params
  const appointment = await getAppointmentByReference(reference)

  if (!appointment) notFound()

  const rows = [
    { icon: Hash, label: 'Reference', value: appointment.reference },
    { icon: Calendar, label: 'Date', value: formatDisplayDate(appointment.appointmentDate) },
    { icon: Clock, label: 'Time', value: appointment.appointmentTime },
    { icon: MapPin, label: 'Destination', value: appointment.destination || 'To be discussed' },
    { icon: Briefcase, label: 'Service', value: appointment.service || 'General Consultation' },
    { icon: Mail, label: 'Confirmation sent to', value: appointment.email },
  ]

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle2 className="h-9 w-9 text-primary" />
          </span>
          <h1 className="mt-6 font-serif text-3xl font-bold text-foreground sm:text-4xl">
            Your consultation is confirmed
          </h1>
          <p className="mt-3 text-pretty text-muted-foreground">
            Thank you, {appointment.name.split(' ')[0]}. We&apos;ve reserved your
            spot and sent a confirmation to your email. Our team looks forward to
            speaking with you.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
          <div className="border-b border-border bg-muted/40 px-6 py-4">
            <h2 className="font-serif text-lg font-semibold text-foreground">
              Appointment Summary
            </h2>
          </div>
          <dl className="divide-y divide-border">
            {rows.map((row) => (
              <div
                key={row.label}
                className="flex items-center gap-4 px-6 py-4"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <row.icon className="h-4 w-4" />
                </span>
                <dt className="text-sm text-muted-foreground">{row.label}</dt>
                <dd className="ml-auto text-right text-sm font-medium text-foreground">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-8 rounded-2xl border border-primary/20 bg-primary/5 p-5 text-sm text-muted-foreground">
          <p>
            Need to reschedule or have a question? Message us on{' '}
            <a
              href={whatsappUrl(
                `Hello, regarding my appointment ${appointment.reference}`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary underline-offset-2 hover:underline"
            >
              WhatsApp
            </a>{' '}
            or call us at{' '}
            <a
              href={siteConfig.contact.phoneHref}
              className="font-medium text-primary underline-offset-2 hover:underline"
            >
              {siteConfig.contact.phone}
            </a>
            .
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild size="lg">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/services">Explore Our Services</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
