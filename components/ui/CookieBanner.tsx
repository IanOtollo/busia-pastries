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
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:max-w-md z-[100]"
        >
          <div className="bg-cp-surface border border-cp-border shadow-xl rounded-2xl p-6 md:p-8 backdrop-blur-md bg-opacity-95 dark:bg-opacity-90">
            <div className="flex items-start gap-4">
              <div className="bg-cp-accent bg-opacity-10 p-2.5 rounded-xl">
                <ShieldCheck className="w-6 h-6 text-cp-accent" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-cp-text mb-2">Tasteful Personalization?</h3>
                <p className="text-sm text-cp-text-muted leading-relaxed mb-6">
                  Clare uses cookies to remember your favorite bakes and preferred currency. We never share your data—just the love for pastries.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => handleConsent(true)}
                    className="flex-1 bg-cp-cta text-cp-cta-text px-6 py-2.5 rounded-xl font-semibold text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    Accept All
                  </button>
                  <button
                    onClick={() => handleConsent(false)}
                    className="flex-1 bg-cp-surface-2 text-cp-text px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-opacity-80 transition-all flex items-center justify-center gap-2 border border-cp-border"
                  >
                    <X className="w-4 h-4" />
                    Necessary
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
