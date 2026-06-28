import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Playfair_Display } from 'next/font/google'
import { Suspense } from 'react'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { WhatsAppButton } from '@/components/layout/whatsapp-button'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})
const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
})

const siteUrl = 'https://www.zenithedu.example'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Zenith Education — Study in Italy, Russia & China',
    template: '%s | Zenith Education',
  },
  description:
    'Zenith Education is a premier international education agency helping students from North Africa and the Middle East study abroad in Italy, Russia, and China. Expert guidance on admissions, visas, scholarships, and more.',
  keywords: [
    'study abroad',
    'study in Italy',
    'study in Russia',
    'study in China',
    'international education agency',
    'student visa assistance',
    'university admissions',
    'scholarships',
  ],
  authors: [{ name: 'Zenith Education' }],
  creator: 'Zenith Education',
  generator: 'v0.app',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Zenith Education',
    title: 'Zenith Education — Study in Italy, Russia & China',
    description:
      'Your trusted partner for studying abroad in Italy, Russia, and China. Expert admissions, visa, and scholarship guidance.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zenith Education — Study in Italy, Russia & China',
    description:
      'Your trusted partner for studying abroad in Italy, Russia, and China.',
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#1a3a8f',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        <Suspense fallback={null}>
          <SiteHeader />
        </Suspense>
        {children}
        <SiteFooter />
        <WhatsAppButton />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
