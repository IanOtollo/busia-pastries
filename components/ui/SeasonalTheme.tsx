'use client'

import { useEffect, useState } from 'react'

type Season = 'default' | 'valentine' | 'easter' | 'halloween' | 'christmas' | 'newyear'

export function SeasonalTheme() {
  const [season, setSeason] = useState<Season>('default')

  useEffect(() => {
    const getSeason = (): Season => {
      const now = new Date()
      const month = now.getMonth() + 1
      const day = now.getDate()

      // Valentine's: Feb 12 - Feb 15
      if (month === 2 && day >= 12 && day <= 15) return 'valentine'
      
      // Easter: (Simple approximation for now or specific dates for 2026)
      // Easter 2026 is April 5. Range: April 1 - April 7
      if (month === 4 && day >= 1 && day <= 7) return 'easter'

      // Halloween: Oct 28 - Oct 31
      if (month === 10 && day >= 28) return 'halloween'

      // Christmas: Dec 20 - Dec 26
      if (month === 12 && day >= 20 && day <= 26) return 'christmas'

      // New Year: Dec 30 - Jan 2
      if ((month === 12 && day >= 30) || (month === 1 && day <= 2)) return 'newyear'

      return 'default'
    }

    const currentSeason = getSeason()
    setSeason(currentSeason)
    document.documentElement.setAttribute('data-season', currentSeason)
  }, [])

  return null // This is a headless logic component
}
