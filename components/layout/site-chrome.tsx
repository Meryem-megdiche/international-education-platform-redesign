'use client'

import { usePathname } from 'next/navigation'
import { Suspense } from 'react'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { WhatsAppButton } from '@/components/layout/whatsapp-button'
import { AIAssistant } from '@/components/assistant/ai-assistant'

/**
 * Renders the public site chrome (header, footer, WhatsApp, AI assistant)
 * around page content — except on admin routes, which have their own layout.
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith('/admin')

  if (isAdmin) return <>{children}</>

  return (
    <>
      <Suspense fallback={null}>
        <SiteHeader />
      </Suspense>
      {children}
      <SiteFooter />
      <WhatsAppButton />
      <AIAssistant />
    </>
  )
}
