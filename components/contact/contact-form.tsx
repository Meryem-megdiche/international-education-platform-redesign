'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import { submitContact, type ContactState } from '@/app/actions/contact'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" size="lg" className="w-full" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="size-4 animate-spin" />
          Sending...
        </>
      ) : (
        'Send Message'
      )}
    </Button>
  )
}

export function ContactForm() {
  const [state, formAction] = useActionState<ContactState, FormData>(
    submitContact,
    null,
  )

  return (
    <form action={formAction} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input id="name" name="name" placeholder="Your name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            required
          />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone / WhatsApp</Label>
          <Input id="phone" name="phone" placeholder="+212 6 00 00 00 00" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="destination">Preferred Destination</Label>
          <select
            id="destination"
            name="destination"
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            defaultValue=""
          >
            <option value="">Select a destination</option>
            <option value="Italy">Italy</option>
            <option value="Russia">Russia</option>
            <option value="China">China</option>
            <option value="Undecided">Not sure yet</option>
          </select>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="subject">Subject</Label>
        <Input
          id="subject"
          name="subject"
          placeholder="How can we help you?"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message *</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Tell us about your study-abroad goals..."
          rows={5}
          required
        />
      </div>

      {state && (
        <div
          className={`flex items-start gap-2.5 rounded-xl border p-4 text-sm ${
            state.ok
              ? 'border-primary/20 bg-primary/5 text-foreground'
              : 'border-destructive/30 bg-destructive/5 text-destructive'
          }`}
          role="status"
        >
          {state.ok ? (
            <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
          ) : (
            <AlertCircle className="mt-0.5 size-5 shrink-0" />
          )}
          <p>{state.message}</p>
        </div>
      )}

      <SubmitButton />
    </form>
  )
}
