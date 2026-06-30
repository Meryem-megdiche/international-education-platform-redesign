import type { Metadata } from 'next'
import { getAllBlogPosts } from '@/lib/admin-queries'
import { BlogManager } from '@/components/admin/blog-manager'

export const metadata: Metadata = { title: 'Blog' }

export default async function AdminBlogPage() {
  const items = await getAllBlogPosts()
  return (
    <div className="mx-auto max-w-5xl">
      <BlogManager items={items} />
    </div>
  )
}
