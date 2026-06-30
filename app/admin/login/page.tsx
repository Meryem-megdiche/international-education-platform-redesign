import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { sql } from 'drizzle-orm'
import { db } from '@/lib/db'
import { user } from '@/lib/db/schema'
import { getSession } from '@/lib/session'
import { AdminAuthForm } from '@/components/admin/admin-auth-form'

export const metadata: Metadata = {
  title: 'Admin Sign In',
  robots: { index: false, follow: false },
}

export default async function AdminLoginPage() {
  const session = await getSession()
  if (session?.user) redirect('/admin')

  // If no admin exists yet, send the user to first-time setup.
  const [{ count }] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(user)
  if (count === 0) redirect('/admin/setup')

  return <AdminAuthForm mode="sign-in" />
}
