import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { sql } from 'drizzle-orm'
import { db } from '@/lib/db'
import { user } from '@/lib/db/schema'
import { getSession } from '@/lib/session'
import { AdminAuthForm } from '@/components/admin/admin-auth-form'

export const metadata: Metadata = {
  title: 'Admin Setup',
  robots: { index: false, follow: false },
}

export default async function AdminSetupPage() {
  const session = await getSession()
  if (session?.user) redirect('/admin')

  // Locked after first admin: if an account already exists, no more sign-ups.
  const [{ count }] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(user)
  if (count > 0) redirect('/admin/login')

  return <AdminAuthForm mode="sign-up" />
}
