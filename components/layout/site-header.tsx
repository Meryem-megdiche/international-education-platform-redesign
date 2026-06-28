'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu, Phone, CalendarCheck } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet'
import { Logo } from './logo'
import { mainNav, siteConfig } from '@/lib/site'

export function SiteHeader() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled
          ? 'glass border-b border-border/60 shadow-sm'
          : 'bg-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-18 lg:px-8">
        <Logo />

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Primary"
        >
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors',
                isActive(item.href)
                  ? 'text-primary'
                  : 'text-foreground/70 hover:text-foreground',
              )}
            >
              {item.title}
              {isActive(item.href) && (
                <span className="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-gold" />
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-foreground/80"
          >
            <a href={siteConfig.contact.phoneHref}>
              <Phone className="size-4" />
              {siteConfig.contact.phone}
            </a>
          </Button>
          <Button
            asChild
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Link href="/book">
              <CalendarCheck className="size-4" />
              Book Consultation
            </Link>
          </Button>
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-2 lg:hidden">
          <Button
            asChild
            size="sm"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Link href="/book">Book</Link>
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                aria-label="Open menu"
                className="border-border"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[88%] max-w-sm p-0">
              <SheetHeader className="border-b border-border p-5">
                <SheetTitle className="sr-only">Navigation menu</SheetTitle>
                <Logo />
              </SheetHeader>
              <nav
                className="flex flex-col gap-1 p-4"
                aria-label="Mobile primary"
              >
                {mainNav.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        'rounded-lg px-4 py-3 text-base font-medium transition-colors',
                        isActive(item.href)
                          ? 'bg-secondary text-primary'
                          : 'text-foreground/80 hover:bg-secondary',
                      )}
                    >
                      {item.title}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-auto flex flex-col gap-3 border-t border-border p-5">
                <Button asChild className="w-full">
                  <Link href="/book">Book a Consultation</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <a href={siteConfig.contact.phoneHref}>
                    <Phone className="size-4" />
                    Call Us
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
