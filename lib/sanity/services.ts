import { sanityFetch } from '@/lib/sanity/client'
import { SITE_SETTINGS_QUERY } from '@/lib/sanity/queries'
import { getCachedData, setCachedData } from '@/lib/redis'
import { SiteSettings } from '@/lib/sanity/types'

export const defaultSettings: SiteSettings = {
  businessName: 'Clare Pastries',
  phone: '+254724848228',
  location: 'Busia Town, Kenya',
  deliveryFeeKes: 100,
  deliveryEstimate: '45–90 minutes',
  pickupEstimate: '30–60 minutes',
  announcementBanner: {
    enabled: false,
    message: '',
    bgColor: '#2A1A0E'
  }
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const cacheKey = 'site:settings'
  const ttl = 1800 // 30 minutes

  try {
    const cached = await getCachedData<SiteSettings>(cacheKey)
    if (cached) return cached

    const data = await sanityFetch<SiteSettings>(SITE_SETTINGS_QUERY)
    
    // Merge with defaults if some fields are missing
    const finalData = data ? { ...defaultSettings, ...data } : defaultSettings

    if (data) {
      await setCachedData(cacheKey, finalData, ttl)
    }

    return finalData
  } catch (error) {
    console.error('getSiteSettings Error:', error)
    return defaultSettings
  }
}
