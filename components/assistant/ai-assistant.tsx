'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport, type UIMessage } from 'ai'
import { motion, AnimatePresence } from 'motion/react'
import { Sparkles, X, Send, Bot, CalendarCheck } from 'lucide-react'
import { cn } from '@/lib/utils'

const SUGGESTED = [
  'How do I apply to study in Italy?',
  'What scholarships are available in China?',
  'Tell me about the Russian student visa',
  'Which country is best for medicine?',
]

function getText(message: UIMessage): string {
  return (
    message.parts
      ?.filter((p): p is { type: 'text'; text: string } => p.type === 'text')
      .map((p) => p.text)
      .join('') ?? ''
  )
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-1 py-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-2 w-2 rounded-full bg-muted-foreground/50"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  )
}

export function AIAssistant() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  })

  const isBusy = status === 'streaming' || status === 'submitted'

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [messages, isBusy])

  function submit(text: string) {
    const trimmed = text.trim()
    if (!trimmed || isBusy) return
    sendMessage({ text: trimmed })
    setInput('')
  }

  return (
    <>
      {/* Launcher */}
      <div className="fixed bottom-5 right-5 z-50">
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close assistant' : 'Open Zenith Assistant'}
          className="group relative flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105"
        >
          {!open && (
            <span className="absolute inset-0 animate-ping rounded-full bg-primary opacity-20" />
          )}
          <AnimatePresence mode="wait">
            {open ? (
              <motion.span
                key="x"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
              >
                <X className="size-6" />
              </motion.span>
            ) : (
              <motion.span
                key="bot"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
              >
                <Sparkles className="size-6" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: 'spring', damping: 24, stiffness: 280 }}
            className="fixed bottom-24 right-5 z-50 flex h-[min(600px,calc(100vh-7rem))] w-[calc(100vw-2.5rem)] max-w-[400px] flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border bg-primary px-4 py-3 text-primary-foreground">
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-full bg-primary-foreground/15">
                  <Bot className="size-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold leading-tight">
                    Zenith Assistant
                  </p>
                  <p className="flex items-center gap-1.5 text-xs text-primary-foreground/80">
                    <span className="size-1.5 rounded-full bg-emerald-400" />
                    Online · replies instantly
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="rounded-full p-1 transition-colors hover:bg-primary-foreground/15"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 space-y-4 overflow-y-auto bg-muted/30 px-4 py-4"
            >
              {messages.length === 0 && (
                <div className="space-y-4">
                  <div className="flex items-start gap-2.5">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Bot className="size-4" />
                    </span>
                    <div className="rounded-2xl rounded-tl-sm bg-card px-4 py-3 text-sm text-foreground shadow-sm">
                      Hello! I&apos;m your Zenith study-abroad assistant. Ask me
                      anything about studying in Italy, Russia, or China — from
                      admissions to visas and scholarships.
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="px-1 text-xs font-medium text-muted-foreground">
                      Suggested questions
                    </p>
                    {SUGGESTED.map((q) => (
                      <button
                        key={q}
                        onClick={() => submit(q)}
                        className="block w-full rounded-xl border border-border bg-card px-3 py-2 text-left text-sm text-foreground transition-colors hover:border-primary/40 hover:bg-primary/5"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((message) => {
                const isUser = message.role === 'user'
                const text = getText(message)
                return (
                  <div
                    key={message.id}
                    className={cn(
                      'flex items-start gap-2.5',
                      isUser && 'flex-row-reverse',
                    )}
                  >
                    {!isUser && (
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Bot className="size-4" />
                      </span>
                    )}
                    <div
                      className={cn(
                        'max-w-[78%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm shadow-sm',
                        isUser
                          ? 'rounded-tr-sm bg-primary text-primary-foreground'
                          : 'rounded-tl-sm bg-card text-foreground',
                      )}
                    >
                      {text || (isUser ? '' : <TypingDots />)}
                    </div>
                  </div>
                )
              })}

              {status === 'submitted' && (
                <div className="flex items-start gap-2.5">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Bot className="size-4" />
                  </span>
                  <div className="rounded-2xl rounded-tl-sm bg-card px-2 py-2 shadow-sm">
                    <TypingDots />
                  </div>
                </div>
              )}
            </div>

            {/* Quick action */}
            <div className="border-t border-border bg-card px-3 pt-2">
              <Link
                href="/book"
                onClick={() => setOpen(false)}
                className="mb-2 flex items-center justify-center gap-2 rounded-xl bg-gold/15 px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-gold/25"
              >
                <CalendarCheck className="size-4 text-gold-foreground" />
                Book a free consultation
              </Link>
            </div>

            {/* Composer */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                submit(input)
              }}
              className="flex items-end gap-2 border-t border-border bg-card p-3"
            >
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    submit(input)
                  }
                }}
                rows={1}
                placeholder="Ask about studying abroad…"
                className="max-h-28 min-h-[40px] flex-1 resize-none rounded-xl border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              />
              <button
                type="submit"
                disabled={!input.trim() || isBusy}
                aria-label="Send message"
                className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
              >
                <Send className="size-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
