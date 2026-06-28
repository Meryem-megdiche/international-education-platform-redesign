'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import { Search, MapPin, GraduationCap, Clock, Award } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import type { University } from '@/lib/db/schema'
import { whatsappUrl } from '@/lib/site'

export function UniversitiesExplorer({ data }: { data: University[] }) {
  const [query, setQuery] = useState('')
  const [country, setCountry] = useState('All')

  const countriesList = useMemo(
    () => ['All', ...Array.from(new Set(data.map((u) => u.country)))],
    [data],
  )

  const filtered = useMemo(() => {
    return data.filter((u) => {
      const matchesCountry = country === 'All' || u.country === country
      const q = query.trim().toLowerCase()
      const matchesQuery =
        !q ||
        u.name.toLowerCase().includes(q) ||
        u.city.toLowerCase().includes(q) ||
        u.programs.some((p) => p.toLowerCase().includes(q))
      return matchesCountry && matchesQuery
    })
  }, [data, query, country])

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by name, city, or program..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
            aria-label="Search universities"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {countriesList.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCountry(c)}
              className={cn(
                'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
                country === c
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground',
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        Showing {filtered.length}{' '}
        {filtered.length === 1 ? 'university' : 'universities'}
      </p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((u, i) => (
          <motion.div
            key={u.id}
            layout
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: (i % 3) * 0.04 }}
          >
            <Card className="group flex h-full flex-col overflow-hidden border-border p-0 shadow-premium transition-all hover:-translate-y-1 hover:shadow-lg">
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={u.imageUrl || '/placeholder.svg'}
                  alt={u.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <Badge className="absolute left-3 top-3 bg-card/90 text-foreground backdrop-blur">
                  <MapPin className="size-3" />
                  {u.city}, {u.country}
                </Badge>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-serif text-lg font-semibold leading-snug">
                  {u.name}
                </h3>
                {u.ranking && (
                  <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-gold-foreground">
                    <Award className="size-3.5 text-gold" />
                    {u.ranking}
                  </p>
                )}
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                  {u.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {u.programs.slice(0, 3).map((p) => (
                    <Badge key={p} variant="secondary" className="font-normal">
                      {p}
                    </Badge>
                  ))}
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 border-t border-border pt-4 text-sm">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <GraduationCap className="size-4 text-primary" />
                    <span>from ${u.tuitionFrom.toLocaleString()}/yr</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Clock className="size-4 text-primary" />
                    <span>{u.duration}</span>
                  </div>
                </div>
                <Button asChild className="mt-5 w-full">
                  <a
                    href={whatsappUrl(
                      `Hello Zenith, I'm interested in applying to ${u.name}.`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Apply to this University
                  </a>
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-12 rounded-2xl border border-dashed border-border py-16 text-center">
          <p className="text-muted-foreground">
            No universities match your search. Try adjusting your filters.
          </p>
        </div>
      )}
    </div>
  )
}
