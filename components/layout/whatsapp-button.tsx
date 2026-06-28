'use client'

import { useEffect, useState } from 'react'
import { MessageCircle, X } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { whatsappUrl, siteConfig } from '@/lib/site'

export function WhatsAppButton() {
  const [showTip, setShowTip] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShowTip(true), 2500)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="fixed bottom-5 left-5 z-50 flex items-center gap-3">
      <a
        href={whatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="group relative flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30" />
        <MessageCircle className="size-7" />
      </a>

      <AnimatePresence>
        {showTip && (
          <motion.div
            initial={{ opacity: 0, x: -8, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -8, scale: 0.95 }}
            className="relative hidden rounded-2xl bg-card px-4 py-2.5 text-sm font-medium text-foreground shadow-premium sm:block"
          >
            <button
              onClick={() => setShowTip(false)}
              aria-label="Dismiss"
              className="absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-border"
            >
              <X className="size-3" />
            </button>
            Need help? Chat with {siteConfig.shortName} now
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
