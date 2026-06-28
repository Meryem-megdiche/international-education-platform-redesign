import type { Metadata } from 'next'
import { Mail, Phone, MapPin, Clock, MessageCircle } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/motion/reveal'
import { ContactForm } from '@/components/contact/contact-form'
import {
  InstagramIcon,
  FacebookIcon,
  LinkedinIcon,
  YoutubeIcon,
} from '@/components/icons/social'
import { siteConfig, whatsappUrl } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Zenith Education. Visit our office, call, email, or message us on WhatsApp to start your study abroad journey in Italy, Russia, or China.',
  alternates: { canonical: '/contact' },
}

const contactCards = [
  {
    icon: Phone,
    label: 'Call Us',
    value: siteConfig.contact.phone,
    href: siteConfig.contact.phoneHref,
  },
  {
    icon: Mail,
    label: 'Email Us',
    value: siteConfig.contact.email,
    href: `mailto:${siteConfig.contact.email}`,
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: 'Chat with an advisor',
    href: whatsappUrl(),
  },
  {
    icon: MapPin,
    label: 'Visit Us',
    value: siteConfig.contact.address,
    href: `https://maps.google.com/?q=${encodeURIComponent(siteConfig.contact.mapsQuery)}`,
  },
]

const socials = [
  { icon: InstagramIcon, href: siteConfig.social.instagram, label: 'Instagram' },
  { icon: FacebookIcon, href: siteConfig.social.facebook, label: 'Facebook' },
  { icon: LinkedinIcon, href: siteConfig.social.linkedin, label: 'LinkedIn' },
  { icon: YoutubeIcon, href: siteConfig.social.youtube, label: 'YouTube' },
]

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's Start Your Journey Together"
        description="Our advisors are ready to answer your questions and guide you toward the right university and destination."
        breadcrumbs={[{ label: 'Contact' }]}
      />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {contactCards.map((card, i) => (
              <Reveal key={card.label} delay={i * 0.08}>
                <a
                  href={card.href}
                  target={card.href.startsWith('http') ? '_blank' : undefined}
                  rel={card.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="group flex h-full flex-col gap-3 rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <card.icon className="h-6 w-6" />
                  </span>
                  <span className="text-sm font-medium text-muted-foreground">
                    {card.label}
                  </span>
                  <span className="font-medium text-pretty text-foreground">
                    {card.value}
                  </span>
                </a>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <Reveal>
                <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
                  <h2 className="font-serif text-2xl font-semibold text-foreground">
                    Send Us a Message
                  </h2>
                  <p className="mt-2 text-muted-foreground">
                    Fill out the form below and our team will respond within one
                    business day.
                  </p>
                  <div className="mt-6">
                    <ContactForm />
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-2">
              <Reveal delay={0.1}>
                <div className="flex h-full flex-col gap-6">
                  <div className="overflow-hidden rounded-3xl border border-border shadow-sm">
                    <iframe
                      title="Office location map"
                      src={`https://www.google.com/maps?q=${encodeURIComponent(siteConfig.contact.mapsQuery)}&output=embed`}
                      className="h-64 w-full border-0"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>

                  <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Clock className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="font-medium text-foreground">Office Hours</p>
                        <p className="text-sm text-muted-foreground">
                          {siteConfig.contact.hours}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 border-t border-border pt-6">
                      <p className="font-medium text-foreground">Follow Us</p>
                      <div className="mt-3 flex gap-3">
                        {socials.map((s) => (
                          <a
                            key={s.label}
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={s.label}
                            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                          >
                            <s.icon className="h-5 w-5" />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
