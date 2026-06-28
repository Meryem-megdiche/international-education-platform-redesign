'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Clock, Loader2, CalendarCheck, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import {
  BOOKING_SERVICES,
  BOOKING_DESTINATIONS,
  formatDisplayDate,
} from '@/lib/booking'
import {
  getAvailableSlots,
  createAppointment,
  type SlotInfo,
} from '@/app/actions/booking'
import { BookingCalendar } from './booking-calendar'

export function BookingFlow() {
  const router = useRouter()
  const [date, setDate] = useState<string | null>(null)
  const [time, setTime] = useState<string | null>(null)
  const [slots, setSlots] = useState<SlotInfo[]>([])
  const [loadingSlots, startSlotLoad] = useTransition()
  const [submitting, startSubmit] = useTransition()
  const [error, setError] = useState<string | null>(null)

  function handleSelectDate(key: string) {
    setDate(key)
    setTime(null)
    setError(null)
    startSlotLoad(async () => {
      const result = await getAvailableSlots(key)
      setSlots(result)
    })
  }

  function handleSubmit(formData: FormData) {
    setError(null)
    if (!date || !time) {
      setError('Please select a date and time for your consultation.')
      return
    }
    startSubmit(async () => {
      const result = await createAppointment({
        name: String(formData.get('name') ?? ''),
        email: String(formData.get('email') ?? ''),
        phone: String(formData.get('phone') ?? ''),
        destination: String(formData.get('destination') ?? ''),
        service: String(formData.get('service') ?? ''),
        date,
        time,
        notes: String(formData.get('notes') ?? ''),
      })
      if (result.ok) {
        router.push(`/book/confirmation/${result.reference}`)
      } else {
        setError(result.error)
        if (date) {
          const refreshed = await getAvailableSlots(date)
          setSlots(refreshed)
        }
      }
    })
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Step 1: date + time */}
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
              1
            </span>
            <h2 className="font-serif text-xl font-semibold text-foreground">
              Choose a date &amp; time
            </h2>
          </div>
        </div>

        <BookingCalendar selected={date} onSelect={handleSelectDate} />

        {date && (
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-foreground">
              <Clock className="h-4 w-4 text-primary" />
              Available times for {formatDisplayDate(date)}
            </div>
            {loadingSlots ? (
              <div className="flex items-center gap-2 py-6 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading available slots…
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {slots.map((slot) => (
                  <button
                    key={slot.time}
                    type="button"
                    disabled={!slot.available}
                    onClick={() => setTime(slot.time)}
                    className={cn(
                      'rounded-lg border py-2 text-sm font-medium transition-colors',
                      !slot.available &&
                        'cursor-not-allowed border-border bg-muted text-muted-foreground/40 line-through',
                      slot.available &&
                        time !== slot.time &&
                        'border-border text-foreground hover:border-primary/40 hover:bg-primary/5',
                      time === slot.time &&
                        'border-primary bg-primary text-primary-foreground',
                    )}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Step 2: details */}
      <div>
        <div className="mb-6 flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
            2
          </span>
          <h2 className="font-serif text-xl font-semibold text-foreground">
            Your details
          </h2>
        </div>

        <form action={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full name *</Label>
              <Input id="name" name="name" required placeholder="Your full name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" placeholder="+212 …" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="destination">Destination of interest</Label>
              <select
                id="destination"
                name="destination"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                defaultValue=""
              >
                <option value="" disabled>
                  Select…
                </option>
                {BOOKING_DESTINATIONS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="service">Service</Label>
              <select
                id="service"
                name="service"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                defaultValue=""
              >
                <option value="" disabled>
                  Select…
                </option>
                {BOOKING_SERVICES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (optional)</Label>
            <Textarea
              id="notes"
              name="notes"
              rows={3}
              placeholder="Tell us briefly about your goals…"
            />
          </div>

          {(date || time) && (
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm">
              <p className="font-medium text-foreground">Your selection</p>
              <div className="mt-2 space-y-1 text-muted-foreground">
                <p className="flex items-center gap-2">
                  <CalendarCheck className="h-4 w-4 text-primary" />
                  {date ? formatDisplayDate(date) : 'No date selected'}
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  {time ?? 'No time selected'}
                </p>
              </div>
            </div>
          )}

          {error && (
            <p
              role="alert"
              className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive"
            >
              {error}
            </p>
          )}

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={submitting || !date || !time}
          >
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Confirming…
              </>
            ) : (
              <>
                <Check className="mr-2 h-4 w-4" />
                Confirm Booking
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}
