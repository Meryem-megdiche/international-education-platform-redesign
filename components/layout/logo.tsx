import Link from 'next/link'
import { cn } from '@/lib/utils'
import { siteConfig } from '@/lib/site'

export function Logo({
  className,
  invert = false,
}: {
  className?: string
  invert?: boolean
}) {
  return (
    <Link
      href="/"
      className={cn('flex items-center gap-2.5', className)}
      aria-label={`${siteConfig.name} home`}
    >
      <span
        className={cn(
          'relative flex size-9 items-center justify-center rounded-xl shadow-sm',
          invert ? 'bg-background' : 'bg-primary',
        )}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="size-5"
          aria-hidden="true"
        >
          <path
            d="M12 2 2 8l10 6 8-4.8V15h2V8L12 2Z"
            fill={invert ? 'var(--primary)' : 'var(--gold)'}
          />
          <path
            d="M5 11.5V15c0 1.7 3.1 3.5 7 3.5s7-1.8 7-3.5v-3.5l-7 4.2-7-4.2Z"
            fill={invert ? 'var(--primary)' : 'white'}
            fillOpacity={invert ? 0.85 : 0.92}
          />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'font-heading text-lg font-bold tracking-tight',
            invert ? 'text-background' : 'text-foreground',
          )}
        >
          Zenith
        </span>
        <span
          className={cn(
            'text-[10px] font-medium uppercase tracking-[0.2em]',
            invert ? 'text-background/70' : 'text-muted-foreground',
          )}
        >
          Education
        </span>
      </span>
    </Link>
  )
}
