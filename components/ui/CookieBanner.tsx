'use client'

import { useState, useEffect } from 'react'
import { Check, X, ShieldCheck } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function CookieBanner() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cp-cookie-consent')
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 2000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleConsent = async (accepted: boolean) => {
    localStorage.setItem('cp-cookie-consent', accepted ? 'accepted' : 'declined')
    setShow(false)

    try {
      await fetch('/api/consent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accepted })
      })
    } catch (error) {
           console.error('Failed to log consent', error)
    }
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:max-w-sm z-[100]"
        >
          <div className="bg-cp-surface border border-cp-border shadow-xl rounded-xl p-4 md:p-5 backdrop-blur-md bg-opacity-95 dark:bg-opacity-90 relative pr-10">
            {/* Dismiss X Button */}
            <button 
              onClick={() => setShow(false)} 
              className="absolute top-3 right-3 p-1.5 text-cp-text-muted hover:text-cp-text hover:bg-cp-border/50 rounded-full transition-colors"
              aria-label="Dismiss cookie notice"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-start gap-3">
              <div className="bg-cp-accent bg-opacity-10 p-2 rounded-lg hidden sm:block">
                <ShieldCheck className="w-4 h-4 text-cp-accent" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-cp-text mb-1 relative pr-4">Personalization?</h3>
                <p className="text-xs text-cp-text-muted leading-relaxed mb-3">
                  We use cookies for preferences. No data shared.
                </p>
                <div className="flex flex-row gap-2">
                  <button
                    onClick={() => handleConsent(true)}
                    className="flex-1 bg-cp-cta text-cp-cta-text px-3 py-2 rounded-lg font-bold text-[11px] uppercase tracking-wider hover:opacity-90 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Check className="w-3.5 h-3.5" />
                    Accept
                  </button>
                  <button
                    onClick={() => handleConsent(false)}
                    className="flex-1 bg-cp-surface-2 text-cp-text px-3 py-2 rounded-lg font-bold text-[11px] uppercase tracking-wider hover:bg-opacity-80 transition-all border border-cp-border"
                  >
                    Decline
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
