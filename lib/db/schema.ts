import {
  pgTable,
  serial,
  text,
  integer,
  boolean,
  timestamp,
} from 'drizzle-orm/pg-core'

export const universities = pgTable('universities', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  country: text('country').notNull(),
  city: text('city').notNull(),
  description: text('description').notNull(),
  imageUrl: text('image_url').notNull(),
  tuitionFrom: integer('tuition_from').notNull().default(0),
  programs: text('programs').array().notNull().default([]),
  duration: text('duration').notNull().default(''),
  ranking: text('ranking').notNull().default(''),
  featured: boolean('featured').notNull().default(false),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const galleryItems = pgTable('gallery_items', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  category: text('category').notNull(),
  type: text('type').notNull().default('image'),
  url: text('url').notNull(),
  thumbnailUrl: text('thumbnail_url').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const blogPosts = pgTable('blog_posts', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  excerpt: text('excerpt').notNull(),
  content: text('content').notNull(),
  category: text('category').notNull(),
  imageUrl: text('image_url').notNull(),
  author: text('author').notNull().default('Zenith Education'),
  readTime: integer('read_time').notNull().default(5),
  published: boolean('published').notNull().default(true),
  publishedAt: timestamp('published_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const contactMessages = pgTable('contact_messages', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull().default(''),
  subject: text('subject').notNull().default(''),
  message: text('message').notNull(),
  destination: text('destination').notNull().default(''),
  status: text('status').notNull().default('new'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const appointments = pgTable('appointments', {
  id: serial('id').primaryKey(),
  reference: text('reference').notNull().unique(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull().default(''),
  destination: text('destination').notNull().default(''),
  service: text('service').notNull().default(''),
  appointmentDate: text('appointment_date').notNull(),
  appointmentTime: text('appointment_time').notNull(),
  notes: text('notes').notNull().default(''),
  status: text('status').notNull().default('confirmed'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export type University = typeof universities.$inferSelect
export type GalleryItem = typeof galleryItems.$inferSelect
export type BlogPost = typeof blogPosts.$inferSelect
export type ContactMessage = typeof contactMessages.$inferSelect
export type Appointment = typeof appointments.$inferSelect
