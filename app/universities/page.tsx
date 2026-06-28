import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import { UniversitiesExplorer } from '@/components/universities/universities-explorer'
import { getUniversities } from '@/lib/queries'

export const metadata: Metadata = {
  title: 'Partner Universities',
  description:
    'Browse our network of 120+ partner universities across Italy, Russia, and China. Filter by country and explore programs, tuition fees, and study duration.',
  alternates: { canonical: '/universities' },
}

export default async function UniversitiesPage() {
  const universities = await getUniversities()

  return (
    <>
      <PageHero
        eyebrow="Partner Universities"
        title="Explore our partner universities"
        description="Discover top-ranked universities across our three destinations. Search by program, compare tuition, and apply with our full support."
        breadcrumbs={[{ name: 'Universities', href: '/universities' }]}
      />
      <section className="container mx-auto px-4 py-16 md:py-20">
        <UniversitiesExplorer data={universities} />
      </section>
    </>
  )
}
