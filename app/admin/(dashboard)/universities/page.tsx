import type { Metadata } from 'next'
import { getAllUniversities } from '@/lib/admin-queries'
import { UniversitiesManager } from '@/components/admin/universities-manager'

export const metadata: Metadata = { title: 'Universities' }

export default async function AdminUniversitiesPage() {
  const items = await getAllUniversities()
  return (
    <div className="mx-auto max-w-6xl">
      <UniversitiesManager items={items} />
    </div>
  )
}
