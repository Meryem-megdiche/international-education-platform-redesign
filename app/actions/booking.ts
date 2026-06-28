'use server'

import { db } from '@/lib/db'
import { appointments } from '@/lib/db/schema'
import { and, eq } from 'drizzle-orm'
import { TIME_SLOTS, generateReference } from '@/lib/booking'

export type SlotInfo = { time: string; available: boolean }

export async function getAvailableSlots(dateKey: string): Promise<SlotInfo[]> {
  if (!dateKey) return TIME_SLOTS.map((time) => ({ time, available: true }))

  const booked = await db
    .select({ time: appointments.appointmentTime })
    .from(appointments)
    .where(
      and(
        eq(appointments.appointmentDate, dateKey),
        eq(appointments.status, 'confirmed'),
      ),
    )

  const takenTimes = new Set(booked.map((b) => b.time))
  return TIME_SLOTS.map((time) => ({
    time,
    available: !takenTimes.has(time),
  }))
}

export type BookingResult =
  | { ok: true; reference: string }
  | { ok: false; error: string }

export async function createAppointment(input: {
  name: string
  email: string
  phone: string
  destination: string
  service: string
  date: string
  time: string
  notes: string
}): Promise<BookingResult> {
  const { name, email, phone, destination, service, date, time, notes } = input

  if (!name?.trim() || !email?.trim() || !date || !time) {
    return { ok: false, error: 'Please complete all required fields.' }
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return { ok: false, error: 'Please enter a valid email address.' }
  }
  if (!(TIME_SLOTS as readonly string[]).includes(time)) {
    return { ok: false, error: 'Invalid time slot selected.' }
  }

  // Guard against double-booking the same slot.
  const existing = await db
    .select({ id: appointments.id })
    .from(appointments)
    .where(
      and(
        eq(appointments.appointmentDate, date),
        eq(appointments.appointmentTime, time),
        eq(appointments.status, 'confirmed'),
      ),
    )

  if (existing.length > 0) {
    return {
      ok: false,
      error: 'That time slot was just booked. Please choose another.',
    }
  }

  const reference = generateReference()

  await db.insert(appointments).values({
    reference,
    name: name.trim(),
    email: email.trim(),
    phone: phone?.trim() ?? '',
    destination: destination ?? '',
    service: service ?? '',
    appointmentDate: date,
    appointmentTime: time,
    notes: notes?.trim() ?? '',
    status: 'confirmed',
  })

  // Email confirmation: when an email provider is connected, send here.
  // The confirmation page also serves as an on-screen confirmation + summary.
  console.log('[v0] Appointment created:', reference, email, date, time)

  return { ok: true, reference }
}

export async function getAppointmentByReference(reference: string) {
  const rows = await db
    .select()
    .from(appointments)
    .where(eq(appointments.reference, reference))
    .limit(1)
  return rows[0] ?? null
}
