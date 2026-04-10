import { NextResponse } from 'next/server'
import { sanityFetch } from '@/lib/sanity/client'
import { SITE_SETTINGS_QUERY } from '@/lib/sanity/queries'
import { getCachedData, setCachedData } from '@/lib/redis'
import { SiteSettings } from '@/lib/sanity/types'

export async function GET() {
  const cacheKey = 'site:settings'
  const ttl = 1800 // 30 minutes

  // Default fallback settings
  const defaultSettings: SiteSettings = {
    businessName: 'Clare Pastries',
    phone: '+254724848228',
    location: 'Busia Town, Kenya',
    deliveryFeeKes: 100,
    deliveryEstimate: '45–90 minutes',
    pickupEstimate: '30–60 minutes',
    announcementBanner: {
      enabled: false,
      message: '',
      bgColor: '#1c1612'
    }
  }

  try {
    const cached = await getCachedData<SiteSettings>(cacheKey)
    if (cached) {
      return NextResponse.json({ success: true, data: cached, source: 'cache' })
    }

    const data = await sanityFetch<SiteSettings>(SITE_SETTINGS_QUERY)
    
    // Merge with defaults if some fields are missing
    const finalData = data ? { ...defaultSettings, ...data } : defaultSettings

    if (data) {
      await setCachedData(cacheKey, finalData, ttl)
    }

    return NextResponse.json({ 
      success: true, 
      data: finalData, 
      source: data ? 'sanity' : 'default' 
    })
  } catch (error) {
    console.error('Settings API Error:', error)
    return NextResponse.json({ 
      success: true, 
      data: defaultSettings,
      error: 'Failed to fetch settings' 
    })
  }
}
