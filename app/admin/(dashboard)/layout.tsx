import type { Metadata } from 'next'
import { requireAdmin } from '@/lib/session'
import { AdminSidebar } from '@/components/admin/admin-sidebar'

export const metadata: Metadata = {
  title: { default: 'Admin', template: '%s | Zenith Admin' },
  robots: { index: false, follow: false },
}

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const admin = await requireAdmin()

  return (
    <div className="flex min-h-svh flex-col bg-muted/30 lg:flex-row">
      <AdminSidebar name={admin.name ?? admin.email ?? 'Admin'} />
      <main className="flex-1 overflow-x-hidden p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  )
}
