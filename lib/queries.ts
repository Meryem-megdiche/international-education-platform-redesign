import { db } from '@/lib/db'
import { universities, galleryItems, blogPosts } from '@/lib/db/schema'
import { desc, eq } from 'drizzle-orm'

export async function getUniversities() {
  return db.select().from(universities).orderBy(desc(universities.featured))
}

export async function getUniversityBySlug(slug: string) {
  const rows = await db
    .select()
    .from(universities)
    .where(eq(universities.slug, slug))
    .limit(1)
  return rows[0] ?? null
}

export async function getGalleryItems() {
  return db.select().from(galleryItems).orderBy(desc(galleryItems.createdAt))
}

export async function getBlogPosts() {
  return db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.published, true))
    .orderBy(desc(blogPosts.publishedAt))
}

export async function getBlogPostBySlug(slug: string) {
  const rows = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.slug, slug))
    .limit(1)
  return rows[0] ?? null
}
