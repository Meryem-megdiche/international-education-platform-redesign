import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/motion/reveal'
import { faqs } from '@/lib/content'

export function FaqSection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Questions & Answers"
            title="Frequently Asked Questions"
            description="Everything you need to know before starting your journey. Can't find your answer? Our advisors are one message away."
          />
          <Button asChild className="mt-8" variant="outline">
            <Link href="/faq">
              See all FAQs
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        <Reveal>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left text-base font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  )
}
