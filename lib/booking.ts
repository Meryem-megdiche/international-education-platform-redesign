export const TIME_SLOTS = [
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
] as const

export const BOOKING_SERVICES = [
  'Academic Orientation',
  'University Selection',
  'Admission Assistance',
  'Visa Assistance',
  'Scholarship Guidance',
  'General Consultation',
] as const

export const BOOKING_DESTINATIONS = ['Italy', 'Russia', 'China', 'Undecided'] as const

// Convert a Date to a stable YYYY-MM-DD string in local time (no UTC shift).
export function toDateKey(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

// Sunday (0) is closed. All other days are available.
export function isClosedDay(date: Date): boolean {
  return date.getDay() === 0
}

export function isPastDay(date: Date): boolean {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return date < today
}

export function formatDisplayDate(dateKey: string): string {
  const [y, m, d] = dateKey.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function generateReference(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = ''
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)]
  }
  return `ZEN-${code}`
}
