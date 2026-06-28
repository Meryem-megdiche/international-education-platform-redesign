import type { Metadata } from 'next'
import Link from 'next/link'
import { MessageCircleQuestion } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { faqs } from '@/lib/content'
import { siteConfig, whatsappUrl } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description:
    'Answers to the most common questions about studying abroad in Italy, Russia, and China — costs, visas, scholarships, language, timelines, and post-arrival support.',
  alternates: { canonical: '/faq' },
}

const extraFaqs = [
  {
    question: 'Can you help if I have a low GPA?',
    answer:
      'Yes. We match your profile with universities and programs that fit your academic background, and we strengthen your application with a compelling motivation letter and supporting documents.',
  },
  {
    question: 'Do you assist with accommodation and arrival?',
    answer:
      'Absolutely. We help secure student housing before departure and provide airport pickup plus post-arrival support to help you settle in smoothly.',
  },
  {
    question: 'When should I start the application process?',
    answer:
      'We recommend starting 4 to 8 months before your intended intake to allow enough time for document preparation, admissions, and visa processing.',
  },
]

export default function FaqPage() {
  const allFaqs = [...faqs, ...extraFaqs]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allFaqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero
        eyebrow="Help Center"
        title="Frequently asked questions"
        description="Everything you need to know about studying abroad with Zenith Education. Can't find your answer? Our team is one message away."
        breadcrumbs={[{ name: 'FAQ', href: '/faq' }]}
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[1fr_320px]">
          <div>
            <Accordion className="w-full space-y-3">
              {allFaqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="rounded-2xl border border-border bg-card px-5 shadow-sm"
                >
                  <AccordionTrigger className="text-left text-base font-semibold text-foreground hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-pretty leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-border bg-secondary/50 p-6 text-center">
              <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <MessageCircleQuestion className="size-6" aria-hidden />
              </span>
              <h2 className="mt-4 font-serif text-xl font-semibold text-foreground">
                Still have questions?
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Our advisors are happy to help you with any question about your
                study-abroad journey.
              </p>
              <div className="mt-5 flex flex-col gap-3">
                <Button asChild>
                  <Link href="/book">Book a Free Consultation</Link>
                </Button>
                <Button asChild variant="outline" className="bg-transparent">
                  <a
                    href={whatsappUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Chat on WhatsApp
                  </a>
                </Button>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-sm text-primary underline-offset-4 hover:underline"
                >
                  {siteConfig.contact.email}
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}
