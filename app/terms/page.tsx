import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description:
    'The terms and conditions governing the use of Zenith Education services.',
  alternates: { canonical: '/terms' },
}

const sections = [
  {
    title: 'Acceptance of Terms',
    body: 'By using our website and services, you agree to be bound by these Terms & Conditions. If you do not agree, please refrain from using our services.',
  },
  {
    title: 'Our Services',
    body: 'Zenith Education provides international education consulting, including university selection, application assistance, visa guidance, and related support services. We strive to provide accurate guidance, but final admission and visa decisions rest with the respective institutions and authorities.',
  },
  {
    title: 'Client Responsibilities',
    body: 'You agree to provide accurate and complete information, submit required documents on time, and comply with the requirements of the universities and authorities involved in your application.',
  },
  {
    title: 'Fees & Payments',
    body: 'Initial consultations are free. Service fees, where applicable, will be clearly communicated and agreed upon in advance. Fees are non-refundable once services have commenced, unless otherwise stated in writing.',
  },
  {
    title: 'Limitation of Liability',
    body: 'While we work diligently on your behalf, we cannot guarantee admission, scholarships, or visa approval, as these depend on third-party decisions. Zenith Education is not liable for outcomes beyond our reasonable control.',
  },
  {
    title: 'Contact Us',
    body: `For any questions regarding these terms, please contact us at ${siteConfig.contact.email} or ${siteConfig.contact.phone}.`,
  },
]

export default function TermsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Legal"
        title="Terms & Conditions"
        description="Please read these terms carefully before using our services."
        breadcrumbs={[{ name: 'Terms & Conditions', href: '/terms' }]}
      />
      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-3xl px-4">
          <p className="text-sm text-muted-foreground">
            Last updated: January 2026
          </p>
          <div className="mt-8 space-y-10">
            {sections.map((s) => (
              <div key={s.title}>
                <h2 className="font-serif text-2xl font-semibold text-foreground">
                  {s.title}
                </h2>
                <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
