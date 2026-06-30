'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import {
  LayoutDashboard,
  CalendarCheck,
  Mail,
  GraduationCap,
  Newspaper,
  Images,
  LogOut,
  ExternalLink,
  Menu,
  X,
} from 'lucide-react'
import { authClient } from '@/lib/auth-client'
import { Logo } from '@/components/layout/logo'
import { cn } from '@/lib/utils'

const links = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/appointments', label: 'Appointments', icon: CalendarCheck },
  { href: '/admin/messages', label: 'Messages', icon: Mail },
  { href: '/admin/universities', label: 'Universities', icon: GraduationCap },
  { href: '/admin/blog', label: 'Blog', icon: Newspaper },
  { href: '/admin/gallery', label: 'Gallery', icon: Images },
]

export function AdminSidebar({ name }: { name: string }) {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  async function handleSignOut() {
    await authClient.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <>
      {/* Mobile top bar */}
      <div className="flex items-center justify-between border-b border-border bg-card px-4 py-3 lg:hidden">
        <Logo />
        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-lg p-2 text-foreground hover:bg-muted"
          aria-label="Toggle menu"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <aside
        className={cn(
          'flex w-full flex-col border-r border-border bg-card lg:w-64 lg:shrink-0',
          open ? 'block' : 'hidden lg:flex',
        )}
      >
        <div className="hidden p-6 lg:block">
          <Logo />
        </div>

        <nav className="flex flex-1 flex-col gap-1 p-4">
          {links.map((link) => {
            const active =
              link.href === '/admin'
                ? pathname === '/admin'
                : pathname.startsWith(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  active
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                )}
              >
                <link.icon className="size-4" />
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="border-t border-border p-4">
          <Link
            href="/"
            target="_blank"
            className="mb-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <ExternalLink className="size-4" />
            View website
          </Link>
          <button
            onClick={handleSignOut}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut className="size-4" />
            Sign out
          </button>
          <p className="mt-3 px-3 text-xs text-muted-foreground">
            Signed in as{' '}
            <span className="font-medium text-foreground">{name}</span>
          </p>
        </div>
      </aside>
    </>
  )
}
