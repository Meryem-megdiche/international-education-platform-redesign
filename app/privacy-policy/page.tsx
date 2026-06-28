import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Zenith Education collects, uses, and protects your personal information.',
  alternates: { canonical: '/privacy-policy' },
}

const sections = [
  {
    title: 'Information We Collect',
    body: 'We collect information you provide directly to us, such as your name, email address, phone number, academic background, and any details you share when booking a consultation or submitting an inquiry.',
  },
  {
    title: 'How We Use Your Information',
    body: 'We use your information to provide our education consulting services, respond to your inquiries, process consultation bookings, send relevant updates, and improve our services. We never sell your personal data to third parties.',
  },
  {
    title: 'Information Sharing',
    body: 'We may share your information with partner universities and institutions strictly for the purpose of processing your applications, and only with your consent. We require all partners to handle your data responsibly.',
  },
  {
    title: 'Data Security',
    body: 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.',
  },
  {
    title: 'Your Rights',
    body: 'You have the right to access, correct, or request deletion of your personal data at any time. To exercise these rights, please contact us using the details below.',
  },
  {
    title: 'Contact Us',
    body: `If you have any questions about this Privacy Policy, please contact us at ${siteConfig.contact.email} or ${siteConfig.contact.phone}.`,
  },
]

export default function PrivacyPolicyPage() {
  return (
    <main>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="Your privacy matters to us. This policy explains how we handle your personal information."
        breadcrumbs={[{ name: 'Privacy Policy', href: '/privacy-policy' }]}
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
