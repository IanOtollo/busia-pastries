import { NextResponse } from 'next/server'
import { sanityFetch } from '@/lib/sanity/client'
import { ALL_PRODUCTS_QUERY, FEATURED_PRODUCTS_QUERY } from '@/lib/sanity/queries'
import { getCachedData, setCachedData } from '@/lib/redis'
import { SanityProduct } from '@/lib/sanity/types'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const featuredOnly = searchParams.get('featured') === 'true'
  
  const cacheKey = featuredOnly ? 'products:featured' : 'products:all'
  const ttl = 300 // 5 minutes

  try {
    // 1. Try cache
    const cached = await getCachedData<SanityProduct[]>(cacheKey)
    if (cached) {
      return NextResponse.json({ success: true, data: cached, source: 'cache' })
    }

    // 2. Fetch from Sanity
    const query = featuredOnly ? FEATURED_PRODUCTS_QUERY : ALL_PRODUCTS_QUERY
    const data = await sanityFetch<SanityProduct[]>(query)

    // 3. Set cache if data exists
    if (data && data.length > 0) {
      await setCachedData(cacheKey, data, ttl)
    }

    return NextResponse.json({ 
      success: true, 
      data: data || [], 
      source: 'sanity' 
    })
  } catch (error) {
    console.error('Products API Error:', error)
    return NextResponse.json({ 
      success: true, 
      data: [], 
      error: 'Failed to fetch products' 
    })
  }
}
