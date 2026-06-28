import { Breadcrumbs, type Crumb } from '@/components/breadcrumbs'

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
}: {
  eyebrow?: string
  title: string
  description?: string
  breadcrumbs: Crumb[]
}) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-secondary/40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            'radial-gradient(60rem 30rem at 80% -10%, color-mix(in oklch, var(--primary) 12%, transparent), transparent), radial-gradient(40rem 20rem at 0% 110%, color-mix(in oklch, var(--gold) 14%, transparent), transparent)',
        }}
      />
      <div className="container relative mx-auto px-4 py-12 md:py-16">
        <Breadcrumbs items={breadcrumbs} />
        <div className="mt-6 max-w-3xl">
          {eyebrow && (
            <span className="inline-flex items-center rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold-foreground">
              {eyebrow}
            </span>
          )}
          <h1 className="mt-4 font-serif text-4xl font-semibold tracking-tight text-balance text-foreground md:text-5xl">
            {title}
          </h1>
          {description && (
            <p className="mt-4 text-lg leading-relaxed text-pretty text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
