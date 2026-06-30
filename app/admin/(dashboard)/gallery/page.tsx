import type { Metadata } from 'next'
import { getAllGalleryItems } from '@/lib/admin-queries'
import { GalleryManager } from '@/components/admin/gallery-manager'

export const metadata: Metadata = { title: 'Gallery' }

export default async function AdminGalleryPage() {
  const items = await getAllGalleryItems()
  return (
    <div className="mx-auto max-w-6xl">
      <GalleryManager items={items} />
    </div>
  )
}
