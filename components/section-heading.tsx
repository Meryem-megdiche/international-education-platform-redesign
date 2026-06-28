import { cn } from '@/lib/utils'
import { Reveal } from '@/components/motion/reveal'

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
}: {
  eyebrow?: string
  title: string
  description?: string
  align?: 'center' | 'left'
  className?: string
}) {
  return (
    <Reveal
      className={cn(
        'flex flex-col gap-4',
        align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl',
        className,
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            'inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-primary',
            align === 'center' && 'justify-center',
          )}
        >
          <span className="h-px w-6 bg-gold" />
          {eyebrow}
        </span>
      )}
      <h2 className="text-balance text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {description && (
        <p className="text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
      )}
    </Reveal>
  )
}
