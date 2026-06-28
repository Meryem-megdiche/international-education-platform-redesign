import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Clock, ArrowLeft, ArrowRight } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/motion/reveal'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getBlogPosts, getBlogPostBySlug } from '@/lib/queries'
import { siteConfig } from '@/lib/site'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      images: [post.imageUrl],
      publishedTime: new Date(post.publishedAt).toISOString(),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.imageUrl],
    },
  }
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  if (!post) notFound()

  const all = await getBlogPosts()
  const related = all.filter((p) => p.slug !== post.slug).slice(0, 3)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: `${siteConfig.url}${post.imageUrl}`,
    author: { '@type': 'Organization', name: post.author },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
    datePublished: new Date(post.publishedAt).toISOString(),
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
  }

  // Render simple markdown-ish content (## headings and paragraphs)
  const blocks = post.content.split('\n').filter((l) => l.trim())

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero
        eyebrow={post.category}
        title={post.title}
        breadcrumbs={[
          { name: 'Blog', href: '/blog' },
          { name: post.title, href: `/blog/${post.slug}` },
        ]}
      />

      <article className="container mx-auto px-4 py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span>{post.author}</span>
            <span aria-hidden>•</span>
            <span>{formatDate(post.publishedAt)}</span>
            <span aria-hidden>•</span>
            <span className="flex items-center gap-1">
              <Clock className="size-3.5" />
              {post.readTime} min read
            </span>
          </div>

          <div className="mt-6 overflow-hidden rounded-3xl shadow-premium">
            <Image
              src={post.imageUrl || '/placeholder.svg'}
              alt={post.title}
              width={1200}
              height={700}
              className="h-auto w-full object-cover"
              priority
            />
          </div>

          <div className="mt-10 space-y-5 text-base leading-relaxed text-foreground/90">
            <p className="text-lg font-medium text-foreground">{post.excerpt}</p>
            {blocks.map((block, i) =>
              block.startsWith('## ') ? (
                <h2
                  key={i}
                  className="pt-2 font-serif text-2xl font-semibold text-foreground"
                >
                  {block.replace('## ', '')}
                </h2>
              ) : (
                <p key={i} className="text-muted-foreground">
                  {block}
                </p>
              ),
            )}
          </div>

          <div className="mt-12 rounded-2xl border border-border bg-secondary/40 p-6 text-center shadow-premium md:p-8">
            <h2 className="font-serif text-2xl font-semibold">
              Ready to take the next step?
            </h2>
            <p className="mt-2 text-muted-foreground">
              Book a free consultation with our education experts today.
            </p>
            <Button asChild size="lg" className="mt-5">
              <Link href="/book">Book a Free Consultation</Link>
            </Button>
          </div>

          <div className="mt-10">
            <Button asChild variant="ghost">
              <Link href="/blog">
                <ArrowLeft className="size-4" />
                Back to all articles
              </Link>
            </Button>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="border-t border-border bg-secondary/30 py-16">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-2xl font-semibold tracking-tight">
              Related articles
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <Reveal key={p.id} delay={i * 0.05}>
                  <Link href={`/blog/${p.slug}`} className="group block h-full">
                    <Card className="flex h-full flex-col overflow-hidden border-border p-0 shadow-premium transition-all hover:-translate-y-1 hover:shadow-lg">
                      <div className="relative h-44 overflow-hidden">
                        <Image
                          src={p.imageUrl || '/placeholder.svg'}
                          alt={p.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                      <div className="flex flex-1 flex-col p-5">
                        <Badge variant="secondary" className="w-fit">
                          {p.category}
                        </Badge>
                        <h3 className="mt-3 font-serif text-base font-semibold leading-snug">
                          {p.title}
                        </h3>
                        <span className="mt-4 flex items-center gap-1.5 text-sm font-medium text-primary">
                          Read more
                          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </Card>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
