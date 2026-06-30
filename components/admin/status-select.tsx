'use client'

import { useTransition } from 'react'
import { cn } from '@/lib/utils'

export function StatusSelect({
  id,
  value,
  options,
  action,
}: {
  id: number
  value: string
  options: string[]
  action: (id: number, status: string) => Promise<void>
}) {
  const [pending, startTransition] = useTransition()

  return (
    <select
      value={value}
      disabled={pending}
      onChange={(e) => {
        const next = e.target.value
        startTransition(() => action(id, next))
      }}
      className={cn(
        'rounded-lg border border-border bg-background px-2.5 py-1 text-xs font-medium capitalize text-foreground',
        'focus:outline-none focus:ring-2 focus:ring-ring',
        pending && 'opacity-50',
      )}
    >
      {options.map((o) => (
        <option key={o} value={o} className="capitalize">
          {o}
        </option>
      ))}
    </select>
  )
}
