import Link from 'next/link'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import {
  InstagramIcon,
  FacebookIcon,
  LinkedinIcon,
  YoutubeIcon,
} from '@/components/icons/social'
import { Logo } from './logo'
import { NewsletterForm } from './newsletter-form'
import { footerNav, siteConfig } from '@/lib/site'

const socials = [
  { icon: InstagramIcon, href: siteConfig.social.instagram, label: 'Instagram' },
  { icon: FacebookIcon, href: siteConfig.social.facebook, label: 'Facebook' },
  { icon: LinkedinIcon, href: siteConfig.social.linkedin, label: 'LinkedIn' },
  { icon: YoutubeIcon, href: siteConfig.social.youtube, label: 'YouTube' },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-navy text-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-2 lg:col-span-2">
            <Logo invert />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-background/70">
              {siteConfig.description}
            </p>
            <ul className="mt-6 space-y-3 text-sm text-background/80">
              <li className="flex items-center gap-3">
                <MapPin className="size-4 shrink-0 text-gold" />
                {siteConfig.contact.address}
              </li>
              <li className="flex items-center gap-3">
                <Phone className="size-4 shrink-0 text-gold" />
                <a
                  href={siteConfig.contact.phoneHref}
                  className="hover:text-background"
                >
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-4 shrink-0 text-gold" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="hover:text-background"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="size-4 shrink-0 text-gold" />
                {siteConfig.contact.hours}
              </li>
            </ul>
          </div>

          <FooterColumn title="Quick Links" links={footerNav.quickLinks} />
          <FooterColumn title="Destinations" links={footerNav.countries} />
          <FooterColumn title="Company" links={footerNav.legal} />

          <div className="col-span-2 lg:col-span-1">
            <h3 className="text-sm font-semibold tracking-wide text-background">
              Newsletter
            </h3>
            <p className="mt-4 text-sm text-background/70">
              Get study-abroad tips, scholarships, and deadlines.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-6 border-t border-background/15 pt-8 sm:flex-row">
          <p className="text-sm text-background/60">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
            reserved.
          </p>
          <div className="flex items-center gap-3">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex size-9 items-center justify-center rounded-full border border-background/20 text-background/70 transition-colors hover:border-gold hover:text-gold"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({
  title,
  links,
}: {
  title: string
  links: { title: string; href: string }[]
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold tracking-wide text-background">
        {title}
      </h3>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-background/70 transition-colors hover:text-gold"
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
