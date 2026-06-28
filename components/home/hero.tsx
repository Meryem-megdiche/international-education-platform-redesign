'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import {
  CalendarCheck,
  FileText,
  MessageCircle,
  Star,
  GraduationCap,
  ShieldCheck,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { whatsappUrl } from '@/lib/site'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.21, 0.47, 0.32, 0.98] },
  }),
}

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-mesh">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:pb-24 lg:pt-20">
        {/* Copy */}
        <div className="flex flex-col items-start">
          <motion.span
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-sm font-medium text-gold-foreground"
          >
            <Star className="size-3.5 fill-gold text-gold" />
            Trusted by 5,000+ students across MENA
          </motion.span>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-6 text-balance text-4xl font-bold leading-[1.05] text-foreground sm:text-5xl lg:text-6xl"
          >
            Your Gateway to{' '}
            <span className="bg-[linear-gradient(120deg,oklch(0.72_0.13_75),oklch(0.6_0.13_65))] bg-clip-text text-transparent">
              World-Class
            </span>{' '}
            Education Abroad
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground"
          >
            From your first consultation to your arrival on campus, Zenith
            Education guides students from North Africa and the Middle East to
            top universities in Italy, Russia, and China.
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
          >
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Link href="/book">
                <CalendarCheck className="size-5" />
                Book a Consultation
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary/30 text-primary hover:bg-primary/5"
            >
              <Link href="/book?type=application">
                <FileText className="size-5" />
                Start Application
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="text-foreground hover:bg-secondary"
            >
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="size-5 text-[#25D366]" />
                WhatsApp
              </a>
            </Button>
          </motion.div>

          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
          >
            <Trust icon={GraduationCap} label="200+ Partner Universities" />
            <Trust icon={ShieldCheck} label="98% Visa Success Rate" />
            <Trust icon={Star} label="4.9/5 Student Rating" />
          </motion.div>
        </div>

        {/* Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-[2rem] shadow-premium ring-1 ring-border">
            <Image
              src="/images/hero-students.png"
              alt="International students walking together on a university campus"
              width={720}
              height={820}
              priority
              className="h-full w-full object-cover"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="absolute -left-4 bottom-10 hidden rounded-2xl bg-card p-4 shadow-premium ring-1 ring-border sm:block"
          >
            <p className="text-xs font-medium text-muted-foreground">
              Visa Approved
            </p>
            <p className="mt-1 font-heading text-2xl font-bold text-primary">
              98%
            </p>
            <p className="text-xs text-muted-foreground">success rate</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.6 }}
            className="absolute -right-3 top-10 hidden rounded-2xl bg-primary p-4 text-primary-foreground shadow-premium sm:block"
          >
            <div className="flex items-center gap-2">
              <GraduationCap className="size-5 text-gold" />
              <div>
                <p className="font-heading text-xl font-bold leading-none">
                  5,000+
                </p>
                <p className="mt-1 text-xs text-primary-foreground/80">
                  students placed
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function Trust({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
}) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="size-5 text-primary" />
      <span className="text-sm font-medium text-foreground">{label}</span>
    </div>
  )
}
