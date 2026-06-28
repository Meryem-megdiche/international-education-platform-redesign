import Link from 'next/link'
import { CalendarCheck, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Reveal } from '@/components/motion/reveal'
import { whatsappUrl } from '@/lib/site'

export function CtaSection() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <Reveal className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-primary px-6 py-16 text-center text-primary-foreground shadow-premium sm:px-12 lg:py-20">
          <div className="bg-mesh pointer-events-none absolute inset-0 opacity-40" />
          <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6">
            <h2 className="text-balance font-heading text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              Ready to Begin Your Study-Abroad Journey?
            </h2>
            <p className="text-pretty text-lg text-primary-foreground/85">
              Book your free consultation today and take the first step toward a
              world-class education in Italy, Russia, or China.
            </p>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-gold text-gold-foreground hover:bg-gold/90"
              >
                <Link href="/book">
                  <CalendarCheck className="size-5" />
                  Book Free Consultation
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
              >
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="size-5" />
                  Chat on WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
