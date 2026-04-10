import { prisma } from '@/lib/prisma/client'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { accepted } = await req.json()
    const userAgent = req.headers.get('user-agent')

    await prisma.consentLog.create({
      data: {
        accepted,
        userAgent
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Consent logging error:', error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
