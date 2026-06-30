import Link from 'next/link'
import {
  CalendarCheck,
  Mail,
  GraduationCap,
  Newspaper,
  Images,
  ArrowRight,
} from 'lucide-react'
import {
  getAdminStats,
  getAllAppointments,
  getAllMessages,
} from '@/lib/admin-queries'

export default async function AdminDashboardPage() {
  const [stats, appointments, messages] = await Promise.all([
    getAdminStats(),
    getAllAppointments(),
    getAllMessages(),
  ])

  const recentAppointments = appointments.slice(0, 5)
  const recentMessages = messages.slice(0, 5)

  const cards = [
    {
      label: 'Appointments',
      value: stats.appointments,
      icon: CalendarCheck,
      href: '/admin/appointments',
    },
    {
      label: 'Messages',
      value: stats.messages,
      icon: Mail,
      href: '/admin/messages',
    },
    {
      label: 'Universities',
      value: stats.universities,
      icon: GraduationCap,
      href: '/admin/universities',
    },
    {
      label: 'Blog Posts',
      value: stats.blogPosts,
      icon: Newspaper,
      href: '/admin/blog',
    },
    {
      label: 'Gallery Items',
      value: stats.galleryItems,
      icon: Images,
      href: '/admin/gallery',
    },
  ]

  return (
    <div className="mx-auto max-w-6xl">
      <header className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-foreground">
          Dashboard
        </h1>
        <p className="mt-1 text-muted-foreground">
          Overview of your education platform.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="group rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-md"
          >
            <c.icon className="size-5 text-primary" />
            <p className="mt-3 text-3xl font-bold text-foreground">{c.value}</p>
            <p className="text-sm text-muted-foreground">{c.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-serif text-lg font-bold text-foreground">
              Recent Appointments
            </h2>
            <Link
              href="/admin/appointments"
              className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              View all <ArrowRight className="size-3.5" />
            </Link>
          </div>
          {recentAppointments.length === 0 ? (
            <p className="text-sm text-muted-foreground">No appointments yet.</p>
          ) : (
            <ul className="divide-y divide-border">
              {recentAppointments.map((a) => (
                <li
                  key={a.id}
                  className="flex items-center justify-between py-3"
                >
                  <div>
                    <p className="font-medium text-foreground">{a.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {a.appointmentDate} at {a.appointmentTime}
                    </p>
                  </div>
                  <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium capitalize text-primary">
                    {a.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-serif text-lg font-bold text-foreground">
              Recent Messages
            </h2>
            <Link
              href="/admin/messages"
              className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              View all <ArrowRight className="size-3.5" />
            </Link>
          </div>
          {recentMessages.length === 0 ? (
            <p className="text-sm text-muted-foreground">No messages yet.</p>
          ) : (
            <ul className="divide-y divide-border">
              {recentMessages.map((m) => (
                <li key={m.id} className="py-3">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-foreground">{m.name}</p>
                    <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium capitalize text-muted-foreground">
                      {m.status}
                    </span>
                  </div>
                  <p className="truncate text-sm text-muted-foreground">
                    {m.subject || m.message}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  )
}
