import { Redis } from '@upstash/redis'

// Only instantiate when env vars are present to avoid module-load crash on Vercel
export const redis = (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN)
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  : (null as unknown as Redis); // typed as Redis but never used without the guard check

export async function getCachedData<T>(key: string): Promise<T | null> {
  try {
    if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
      return null
    }
    return await redis.get<T>(key)
  } catch (error) {
    console.error(`Redis get error for key ${key}:`, error)
    return null
  }
}

export async function setCachedData(key: string, data: unknown, ttlSeconds: number): Promise<void> {
  try {
    if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
      return
    }
    await redis.set(key, data, { ex: ttlSeconds })
  } catch (error) {
    console.error(`Redis set error for key ${key}:`, error)
  }
}
