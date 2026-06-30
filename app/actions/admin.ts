'use server'

import { db } from '@/lib/db'
import {
  universities,
  blogPosts,
  galleryItems,
  appointments,
  contactMessages,
} from '@/lib/db/schema'
import { assertAdmin } from '@/lib/session'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

/* ---------------- Universities ---------------- */

export async function saveUniversity(formData: FormData) {
  await assertAdmin()
  const id = formData.get('id') ? Number(formData.get('id')) : null
  const name = String(formData.get('name') || '').trim()
  const values = {
    name,
    slug: slugify(name),
    country: String(formData.get('country') || ''),
    city: String(formData.get('city') || ''),
    description: String(formData.get('description') || ''),
    imageUrl: String(formData.get('imageUrl') || '/images/italy.png'),
    tuitionFrom: Number(formData.get('tuitionFrom') || 0),
    programs: String(formData.get('programs') || '')
      .split(',')
      .map((p) => p.trim())
      .filter(Boolean),
    duration: String(formData.get('duration') || ''),
    ranking: String(formData.get('ranking') || ''),
    featured: formData.get('featured') === 'on',
  }

  if (id) {
    await db.update(universities).set(values).where(eq(universities.id, id))
  } else {
    await db.insert(universities).values(values)
  }
  revalidatePath('/admin/universities')
  revalidatePath('/universities')
}

export async function deleteUniversity(id: number) {
  await assertAdmin()
  await db.delete(universities).where(eq(universities.id, id))
  revalidatePath('/admin/universities')
  revalidatePath('/universities')
}

/* ---------------- Blog ---------------- */

export async function saveBlogPost(formData: FormData) {
  await assertAdmin()
  const id = formData.get('id') ? Number(formData.get('id')) : null
  const title = String(formData.get('title') || '').trim()
  const values = {
    title,
    slug: slugify(title),
    excerpt: String(formData.get('excerpt') || ''),
    content: String(formData.get('content') || ''),
    category: String(formData.get('category') || 'News'),
    imageUrl: String(formData.get('imageUrl') || '/images/blog/visa.png'),
    author: String(formData.get('author') || 'Zenith Education'),
    readTime: Number(formData.get('readTime') || 5),
    published: formData.get('published') === 'on',
  }

  if (id) {
    await db.update(blogPosts).set(values).where(eq(blogPosts.id, id))
  } else {
    await db.insert(blogPosts).values(values)
  }
  revalidatePath('/admin/blog')
  revalidatePath('/blog')
}

export async function deleteBlogPost(id: number) {
  await assertAdmin()
  await db.delete(blogPosts).where(eq(blogPosts.id, id))
  revalidatePath('/admin/blog')
  revalidatePath('/blog')
}

/* ---------------- Gallery ---------------- */

export async function saveGalleryItem(formData: FormData) {
  await assertAdmin()
  const id = formData.get('id') ? Number(formData.get('id')) : null
  const url = String(formData.get('url') || '')
  const values = {
    title: String(formData.get('title') || ''),
    category: String(formData.get('category') || 'Campus'),
    type: String(formData.get('type') || 'image'),
    url,
    thumbnailUrl: String(formData.get('thumbnailUrl') || url),
  }

  if (id) {
    await db.update(galleryItems).set(values).where(eq(galleryItems.id, id))
  } else {
    await db.insert(galleryItems).values(values)
  }
  revalidatePath('/admin/gallery')
  revalidatePath('/gallery')
}

export async function deleteGalleryItem(id: number) {
  await assertAdmin()
  await db.delete(galleryItems).where(eq(galleryItems.id, id))
  revalidatePath('/admin/gallery')
  revalidatePath('/gallery')
}

/* ---------------- Appointments & Messages ---------------- */

export async function updateAppointmentStatus(id: number, status: string) {
  await assertAdmin()
  await db
    .update(appointments)
    .set({ status })
    .where(eq(appointments.id, id))
  revalidatePath('/admin/appointments')
}

export async function updateMessageStatus(id: number, status: string) {
  await assertAdmin()
  await db
    .update(contactMessages)
    .set({ status })
    .where(eq(contactMessages.id, id))
  revalidatePath('/admin/messages')
}
