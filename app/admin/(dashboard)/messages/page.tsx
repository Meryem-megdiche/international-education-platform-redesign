import type { Metadata } from 'next'
import { getAllMessages } from '@/lib/admin-queries'
import { updateMessageStatus } from '@/app/actions/admin'
import { StatusSelect } from '@/components/admin/status-select'

export const metadata: Metadata = { title: 'Messages' }

export default async function AdminMessagesPage() {
  const messages = await getAllMessages()

  return (
    <div className="mx-auto max-w-5xl">
      <header className="mb-6">
        <h1 className="font-serif text-3xl font-bold text-foreground">
          Messages
        </h1>
        <p className="mt-1 text-muted-foreground">
          {messages.length} contact inquir{messages.length === 1 ? 'y' : 'ies'}.
        </p>
      </header>

      {messages.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-10 text-center text-muted-foreground">
          No messages yet.
        </div>
      ) : (
        <ul className="flex flex-col gap-4">
          {messages.map((m) => (
            <li
              key={m.id}
              className="rounded-xl border border-border bg-card p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-foreground">{m.name}</p>
                  <p className="text-sm text-muted-foreground">
                    <a
                      href={`mailto:${m.email}`}
                      className="hover:text-primary hover:underline"
                    >
                      {m.email}
                    </a>
                    {m.phone && <span> · {m.phone}</span>}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">
                    {new Date(m.createdAt).toLocaleDateString()}
                  </span>
                  <StatusSelect
                    id={m.id}
                    value={m.status}
                    options={['new', 'in-progress', 'resolved']}
                    action={updateMessageStatus}
                  />
                </div>
              </div>
              {(m.subject || m.destination) && (
                <p className="mt-3 text-sm font-medium text-foreground">
                  {m.subject}
                  {m.destination && (
                    <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-xs font-normal text-muted-foreground">
                      {m.destination}
                    </span>
                  )}
                </p>
              )}
              <p className="mt-2 whitespace-pre-wrap text-sm text-muted-foreground">
                {m.message}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
