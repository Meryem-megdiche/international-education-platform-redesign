import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { siteConfig } from '@/lib/site'

export type Crumb = { name: string; href: string }

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all: Crumb[] = [{ name: 'Home', href: '/' }, ...items]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: all.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${siteConfig.url}${item.href}`,
    })),
  }

  return (
    <nav aria-label="Breadcrumb" className="w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
        {all.map((item, i) => {
          const last = i === all.length - 1
          return (
            <li key={item.href} className="flex items-center gap-1">
              {last ? (
                <span className="font-medium text-foreground" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="transition-colors hover:text-primary"
                >
                  {item.name}
                </Link>
              )}
              {!last && (
                <ChevronRight className="size-3.5 text-muted-foreground/60" />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
