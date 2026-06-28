'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, animate } from 'motion/react'

type Stat = {
  value: number
  suffix?: string
  label: string
}

const stats: Stat[] = [
  { value: 5000, suffix: '+', label: 'Students Placed' },
  { value: 200, suffix: '+', label: 'Partner Universities' },
  { value: 98, suffix: '%', label: 'Visa Success Rate' },
  { value: 12, suffix: '+', label: 'Years of Experience' },
]

function Counter({ value, suffix }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration: 1.6,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, value])

  return (
    <span ref={ref}>
      {display.toLocaleString()}
      {suffix}
    </span>
  )
}

export function Stats() {
  return (
    <section className="bg-primary py-14 text-primary-foreground lg:py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="flex flex-col items-center text-center"
          >
            <span className="font-heading text-4xl font-bold text-gold sm:text-5xl">
              <Counter value={stat.value} suffix={stat.suffix} />
            </span>
            <span className="mt-2 text-sm font-medium text-primary-foreground/80 sm:text-base">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
