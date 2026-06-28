import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, ArrowRight } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/motion/reveal'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getBlogPosts } from '@/lib/queries'

export const metadata: Metadata = {
  title: 'Blog & Insights',
  description:
    'Expert articles on studying abroad — visa guides, scholarship tips, destination insights, and application advice for Italy, Russia, and China.',
  alternates: { canonical: '/blog' },
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

export default async function BlogPage() {
  const posts = await getBlogPosts()
  const [featured, ...rest] = posts

  return (
    <>
      <PageHero
        eyebrow="Blog & Insights"
        title="Expert advice for your study-abroad journey"
        description="Guides, tips, and insights from our education specialists to help you make confident decisions every step of the way."
        breadcrumbs={[{ name: 'Blog', href: '/blog' }]}
      />

      <section className="container mx-auto px-4 py-16 md:py-20">
        {featured && (
          <Reveal>
            <Link href={`/blog/${featured.slug}`} className="group block">
              <article className="grid overflow-hidden rounded-3xl border border-border bg-card shadow-premium lg:grid-cols-2">
                <div className="relative min-h-72 overflow-hidden">
                  <Image
                    src={featured.imageUrl || '/placeholder.svg'}
                    alt={featured.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                  <Badge className="absolute left-4 top-4 bg-gold text-gold-foreground">
                    Featured
                  </Badge>
                </div>
                <div className="flex flex-col justify-center p-8 md:p-10">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Badge variant="secondary">{featured.category}</Badge>
                    <span className="flex items-center gap-1">
                      <Clock className="size-3.5" />
                      {featured.readTime} min read
                    </span>
                  </div>
                  <h2 className="mt-4 font-serif text-2xl font-semibold leading-snug text-balance md:text-3xl">
                    {featured.title}
                  </h2>
                  <p className="mt-3 leading-relaxed text-muted-foreground">
                    {featured.excerpt}
                  </p>
                  <div className="mt-6 flex items-center gap-2 font-medium text-primary">
                    Read article
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </article>
            </Link>
          </Reveal>
        )}

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post, i) => (
            <Reveal key={post.id} delay={(i % 3) * 0.05}>
              <Link href={`/blog/${post.slug}`} className="group block h-full">
                <Card className="flex h-full flex-col overflow-hidden border-border p-0 shadow-premium transition-all hover:-translate-y-1 hover:shadow-lg">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.imageUrl || '/placeholder.svg'}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <Badge variant="secondary">{post.category}</Badge>
                      <span className="flex items-center gap-1">
                        <Clock className="size-3" />
                        {post.readTime} min
                      </span>
                    </div>
                    <h3 className="mt-3 font-serif text-lg font-semibold leading-snug">
                      {post.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {post.excerpt}
                    </p>
                    <p className="mt-4 text-xs text-muted-foreground">
                      {formatDate(post.publishedAt)}
                    </p>
                  </div>
                </Card>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
