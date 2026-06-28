import { SectionHeading } from '@/components/section-heading'
import { StaggerGroup, StaggerItem } from '@/components/motion/reveal'
import { processSteps } from '@/lib/content'

export function ProcessTimeline() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="How It Works"
          title="Your Journey to Studying Abroad"
          description="A clear, guided process that takes the guesswork out of studying overseas — we handle the complexity so you can focus on your future."
        />

        <StaggerGroup className="relative mt-16 grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((step) => (
            <StaggerItem key={step.step}>
              <div className="relative flex h-full flex-col gap-3 rounded-2xl border border-border bg-card p-7 shadow-sm">
                <span className="font-heading text-5xl font-bold text-gold/30">
                  {step.step}
                </span>
                <h3 className="font-heading text-xl font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
