import { db } from '@/lib/db'
import {
  universities,
  blogPosts,
  galleryItems,
  appointments,
  contactMessages,
} from '@/lib/db/schema'
import { desc, sql } from 'drizzle-orm'

export async function getAdminStats() {
  const [[a], [m], [u], [b], [g]] = await Promise.all([
    db.select({ c: sql<number>`count(*)::int` }).from(appointments),
    db.select({ c: sql<number>`count(*)::int` }).from(contactMessages),
    db.select({ c: sql<number>`count(*)::int` }).from(universities),
    db.select({ c: sql<number>`count(*)::int` }).from(blogPosts),
    db.select({ c: sql<number>`count(*)::int` }).from(galleryItems),
  ])
  return {
    appointments: a.c,
    messages: m.c,
    universities: u.c,
    blogPosts: b.c,
    galleryItems: g.c,
  }
}

export async function getAllAppointments() {
  return db.select().from(appointments).orderBy(desc(appointments.createdAt))
}

export async function getAllMessages() {
  return db
    .select()
    .from(contactMessages)
    .orderBy(desc(contactMessages.createdAt))
}

export async function getAllUniversities() {
  return db.select().from(universities).orderBy(desc(universities.createdAt))
}

export async function getAllBlogPosts() {
  return db.select().from(blogPosts).orderBy(desc(blogPosts.publishedAt))
}

export async function getAllGalleryItems() {
  return db.select().from(galleryItems).orderBy(desc(galleryItems.createdAt))
}
