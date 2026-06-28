'use client'

import { useMemo, useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import { X, ChevronLeft, ChevronRight, Play } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { GalleryItem } from '@/lib/db/schema'

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [category, setCategory] = useState('All')
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(items.map((i) => i.category)))],
    [items],
  )

  const filtered = useMemo(
    () =>
      category === 'All'
        ? items
        : items.filter((i) => i.category === category),
    [items, category],
  )

  const close = useCallback(() => setActiveIndex(null), [])
  const next = useCallback(
    () =>
      setActiveIndex((i) =>
        i === null ? i : (i + 1) % filtered.length,
      ),
    [filtered.length],
  )
  const prev = useCallback(
    () =>
      setActiveIndex((i) =>
        i === null ? i : (i - 1 + filtered.length) % filtered.length,
      ),
    [filtered.length],
  )

  useEffect(() => {
    if (activeIndex === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [activeIndex, close, next, prev])

  const active = activeIndex === null ? null : filtered[activeIndex]

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            className={cn(
              'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
              category === c
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground',
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {filtered.map((item, i) => (
          <motion.button
            key={item.id}
            layout
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: (i % 4) * 0.04 }}
            onClick={() => setActiveIndex(i)}
            className={cn(
              'group relative overflow-hidden rounded-2xl border border-border shadow-premium focus:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              i % 5 === 0 ? 'row-span-2 aspect-[3/4]' : 'aspect-square',
            )}
            aria-label={`View ${item.title}`}
          >
            <Image
              src={item.thumbnailUrl || '/placeholder.svg'}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="absolute inset-x-0 bottom-0 translate-y-2 p-4 text-left opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
              <p className="text-xs font-medium uppercase tracking-wide text-gold">
                {item.category}
              </p>
              <p className="text-sm font-semibold text-white">{item.title}</p>
            </div>
            {item.type === 'video' && (
              <span className="absolute left-1/2 top-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-primary">
                <Play className="size-5 fill-current" />
              </span>
            )}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/90 p-4 backdrop-blur-sm"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
          >
            <button
              onClick={close}
              className="absolute right-4 top-4 flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              aria-label="Close"
            >
              <X className="size-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                prev()
              }}
              className="absolute left-4 flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              aria-label="Previous"
            >
              <ChevronLeft className="size-6" />
            </button>
            <motion.div
              key={active.id}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative max-h-[85vh] w-full max-w-4xl overflow-hidden rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={active.url || '/placeholder.svg'}
                alt={active.title}
                width={1280}
                height={860}
                className="h-auto max-h-[85vh] w-full object-contain"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/80 to-transparent p-5">
                <p className="text-xs font-medium uppercase tracking-wide text-gold">
                  {active.category}
                </p>
                <p className="text-lg font-semibold text-white">
                  {active.title}
                </p>
              </div>
            </motion.div>
            <button
              onClick={(e) => {
                e.stopPropagation()
                next()
              }}
              className="absolute right-4 flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              aria-label="Next"
            >
              <ChevronRight className="size-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
