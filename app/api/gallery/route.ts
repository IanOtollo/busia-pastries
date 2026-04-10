import { NextResponse } from 'next/server'
import { sanityFetch } from '@/lib/sanity/client'
import { GALLERY_QUERY, FEATURED_GALLERY_QUERY } from '@/lib/sanity/queries'
import { getCachedData, setCachedData } from '@/lib/redis'
import { SanityGalleryImage } from '@/lib/sanity/types'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const featuredOnly = searchParams.get('featured') === 'true'
  
  const cacheKey = featuredOnly ? 'gallery:featured' : 'gallery:all'
  const ttl = 600 // 10 minutes

  try {
    const cached = await getCachedData<SanityGalleryImage[]>(cacheKey)
    if (cached) {
      return NextResponse.json({ success: true, data: cached, source: 'cache' })
    }

    const query = featuredOnly ? FEATURED_GALLERY_QUERY : GALLERY_QUERY
    const data = await sanityFetch<SanityGalleryImage[]>(query)

    if (data && data.length > 0) {
      await setCachedData(cacheKey, data, ttl)
    }

    return NextResponse.json({ 
      success: true, 
      data: data || [], 
      source: 'sanity' 
    })
  } catch (error) {
    console.error('Gallery API Error:', error)
    return NextResponse.json({ 
      success: true, 
      data: [], 
      error: 'Failed to fetch gallery' 
    })
  }
}
