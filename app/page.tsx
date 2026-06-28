import { Hero } from '@/components/home/hero'
import { Stats } from '@/components/home/stats'
import { Destinations } from '@/components/home/destinations'
import { ServicesPreview } from '@/components/home/services-preview'
import { WhyUs } from '@/components/home/why-us'
import { ProcessTimeline } from '@/components/home/process-timeline'
import { Testimonials } from '@/components/home/testimonials'
import { FaqSection } from '@/components/home/faq-section'
import { CtaSection } from '@/components/home/cta-section'
import { siteConfig } from '@/lib/site'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  email: siteConfig.contact.email,
  telephone: siteConfig.contact.phone,
  address: {
    '@type': 'PostalAddress',
    streetAddress: siteConfig.contact.address,
    addressLocality: 'Casablanca',
    addressCountry: 'MA',
  },
  areaServed: ['North Africa', 'Middle East'],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '1280',
  },
}

export default function HomePage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <Stats />
      <Destinations />
      <ServicesPreview />
      <WhyUs />
      <ProcessTimeline />
      <Testimonials />
      <FaqSection />
      <CtaSection />
    </main>
  )
}
