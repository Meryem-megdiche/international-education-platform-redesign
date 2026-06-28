import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import { GalleryGrid } from '@/components/gallery/gallery-grid'
import { getGalleryItems } from '@/lib/queries'

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'Explore moments from our students journeys — graduation ceremonies, campus life, consultations, and events across Italy, Russia, and China.',
  alternates: { canonical: '/gallery' },
}

export default async function GalleryPage() {
  const items = await getGalleryItems()

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Moments that define our students journeys"
        description="A glimpse into the experiences, celebrations, and milestones of the students we have proudly supported."
        breadcrumbs={[{ name: 'Gallery', href: '/gallery' }]}
      />
      <section className="container mx-auto px-4 py-16 md:py-20">
        <GalleryGrid items={items} />
      </section>
    </>
  )
}
