'use client'

import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { toDateKey, isClosedDay, isPastDay } from '@/lib/booking'

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export function BookingCalendar({
  selected,
  onSelect,
}: {
  selected: string | null
  onSelect: (dateKey: string) => void
}) {
  const today = new Date()
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [viewYear, setViewYear] = useState(today.getFullYear())

  const { cells, monthLabel } = useMemo(() => {
    const firstDay = new Date(viewYear, viewMonth, 1)
    const startOffset = firstDay.getDay()
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
    const cells: (Date | null)[] = []
    for (let i = 0; i < startOffset; i++) cells.push(null)
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push(new Date(viewYear, viewMonth, d))
    }
    const monthLabel = firstDay.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    })
    return { cells, monthLabel }
  }, [viewMonth, viewYear])

  const canGoPrev =
    viewYear > today.getFullYear() ||
    (viewYear === today.getFullYear() && viewMonth > today.getMonth())

  function changeMonth(delta: number) {
    let m = viewMonth + delta
    let y = viewYear
    if (m < 0) {
      m = 11
      y--
    } else if (m > 11) {
      m = 0
      y++
    }
    setViewMonth(m)
    setViewYear(y)
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => changeMonth(-1)}
          disabled={!canGoPrev}
          aria-label="Previous month"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="font-serif text-lg font-semibold text-foreground">
          {monthLabel}
        </span>
        <button
          type="button"
          onClick={() => changeMonth(1)}
          aria-label="Next month"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-muted"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="mb-2 grid grid-cols-7 gap-1">
        {WEEKDAYS.map((d) => (
          <div
            key={d}
            className="py-1 text-center text-xs font-medium text-muted-foreground"
          >
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((date, i) => {
          if (!date) return <div key={`empty-${i}`} />
          const key = toDateKey(date)
          const disabled = isPastDay(date) || isClosedDay(date)
          const isSelected = key === selected
          return (
            <button
              key={key}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(key)}
              className={cn(
                'flex h-10 items-center justify-center rounded-lg text-sm font-medium transition-colors',
                disabled &&
                  'cursor-not-allowed text-muted-foreground/30 line-through',
                !disabled &&
                  !isSelected &&
                  'text-foreground hover:bg-primary/10 hover:text-primary',
                isSelected &&
                  'bg-primary text-primary-foreground shadow-sm hover:bg-primary',
              )}
            >
              {date.getDate()}
            </button>
          )
        })}
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        Sundays and past dates are unavailable.
      </p>
    </div>
  )
}
