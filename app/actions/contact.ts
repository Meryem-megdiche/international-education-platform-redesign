'use server'

import { db } from '@/lib/db'
import { contactMessages } from '@/lib/db/schema'

export type ContactState = {
  ok: boolean
  message: string
} | null

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = String(formData.get('name') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim()
  const phone = String(formData.get('phone') ?? '').trim()
  const subject = String(formData.get('subject') ?? '').trim()
  const message = String(formData.get('message') ?? '').trim()
  const destination = String(formData.get('destination') ?? '').trim()

  if (!name || !email || !message) {
    return { ok: false, message: 'Please fill in your name, email, and message.' }
  }

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  if (!emailValid) {
    return { ok: false, message: 'Please enter a valid email address.' }
  }

  try {
    await db.insert(contactMessages).values({
      name,
      email,
      phone,
      subject,
      message,
      destination,
    })
    return {
      ok: true,
      message:
        'Thank you! Your message has been received. Our team will get back to you within 24 hours.',
    }
  } catch {
    return {
      ok: false,
      message: 'Something went wrong. Please try again or contact us on WhatsApp.',
    }
  }
}
