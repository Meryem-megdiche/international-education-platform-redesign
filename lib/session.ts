import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export async function getSession() {
  return auth.api.getSession({ headers: await headers() })
}

/** Require an authenticated admin; redirect to login otherwise. */
export async function requireAdmin() {
  const session = await getSession()
  if (!session?.user) redirect('/admin/login')
  return session.user
}

/** Throw for server actions that must be admin-only. */
export async function assertAdmin() {
  const session = await getSession()
  if (!session?.user) throw new Error('Unauthorized')
  return session.user
}
