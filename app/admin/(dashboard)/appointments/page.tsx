import type { Metadata } from 'next'
import { getAllAppointments } from '@/lib/admin-queries'
import { updateAppointmentStatus } from '@/app/actions/admin'
import { StatusSelect } from '@/components/admin/status-select'

export const metadata: Metadata = { title: 'Appointments' }

export default async function AdminAppointmentsPage() {
  const appointments = await getAllAppointments()

  return (
    <div className="mx-auto max-w-6xl">
      <header className="mb-6">
        <h1 className="font-serif text-3xl font-bold text-foreground">
          Appointments
        </h1>
        <p className="mt-1 text-muted-foreground">
          {appointments.length} consultation
          {appointments.length === 1 ? '' : 's'} booked.
        </p>
      </header>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted/50 text-left text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Reference</th>
                <th className="px-4 py-3 font-medium">Student</th>
                <th className="px-4 py-3 font-medium">Date &amp; Time</th>
                <th className="px-4 py-3 font-medium">Interest</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {appointments.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-10 text-center text-muted-foreground"
                  >
                    No appointments yet.
                  </td>
                </tr>
              ) : (
                appointments.map((a) => (
                  <tr key={a.id} className="hover:bg-muted/30">
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                      {a.reference}
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-foreground">{a.name}</p>
                      <p className="text-xs text-muted-foreground">{a.email}</p>
                      {a.phone && (
                        <p className="text-xs text-muted-foreground">
                          {a.phone}
                        </p>
                      )}
                    </td>
                    <td className="px-4 py-3 text-foreground">
                      {a.appointmentDate}
                      <span className="block text-xs text-muted-foreground">
                        {a.appointmentTime}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {a.destination || '—'}
                      {a.service && (
                        <span className="block text-xs">{a.service}</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <StatusSelect
                        id={a.id}
                        value={a.status}
                        options={['confirmed', 'completed', 'cancelled']}
                        action={updateAppointmentStatus}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
