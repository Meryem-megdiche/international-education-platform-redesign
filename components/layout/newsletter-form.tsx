'use client'

import { useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    // Newsletter subscription is wired to the backend in a later phase.
    setDone(true)
    setEmail('')
  }

  if (done) {
    return (
      <div className="mt-4 flex items-center gap-2 rounded-lg border border-gold/40 bg-gold/10 px-4 py-3 text-sm text-background">
        <Check className="size-4 text-gold" />
        Thanks for subscribing!
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-2">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <div className="flex overflow-hidden rounded-lg border border-background/25 bg-background/10 focus-within:border-gold">
        <Input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          className="border-0 bg-transparent text-background placeholder:text-background/50 focus-visible:ring-0"
        />
        <Button
          type="submit"
          size="icon"
          aria-label="Subscribe"
          className="m-1 shrink-0 bg-gold text-gold-foreground hover:bg-gold/90"
        >
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </form>
  )
}
