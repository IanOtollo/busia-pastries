import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma/client'
import { initiateSTKPush } from '@/lib/payhero/client'
import { Ratelimit } from '@upstash/ratelimit'
import { redis } from '@/lib/redis'
import { z } from 'zod'

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '1 m'),
  analytics: true,
})

const kenyaPhoneRegex = /^2547\d{8}$/
const ugandaPhoneRegex = /^2567\d{8}$/

const schema = z.object({
  phone: z.string().min(1, 'Phone required'),
  orderId: z.string().min(1, 'Order ID required'),
})

export async function POST(req: Request) {
  // Rate limit
  const ip = req.headers.get('x-forwarded-for') ?? '127.0.0.1'
  if (process.env.UPSTASH_REDIS_REST_URL) {
    const { success } = await ratelimit.limit(`payhero_${ip}`)
    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please try again in a minute.' },
        { status: 429 }
      )
    }
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request body' }, { status: 400 })
  }

  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: 'Missing required fields', details: parsed.error.format() },
      { status: 400 }
    )
  }

  const { phone, orderId } = parsed.data

  // Validate phone format
  if (!kenyaPhoneRegex.test(phone) && !ugandaPhoneRegex.test(phone)) {
    return NextResponse.json(
      { success: false, error: 'Invalid phone number. Use Kenya (2547XXXXXXXX) or Uganda (2567XXXXXXXX) format.' },
      { status: 400 }
    )
  }

  // Fetch and verify order
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { items: true },
  })

  if (!order) {
    return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 })
  }

  if (order.paymentStatus === 'PAID') {
    return NextResponse.json({ success: false, error: 'This order has already been paid.' }, { status: 409 })
  }

  // Initiate STK Push
  const customerName = order.guestName ?? 'Customer'
  const result = await initiateSTKPush({
    phone,
    amount: order.totalKes,
    orderId: order.id,
    customerName,
  })

  if (!result.success) {
    return NextResponse.json({ success: false, error: result.error ?? 'Payment initiation failed' }, { status: 502 })
  }

  // Save PayHero reference
  await prisma.order.update({
    where: { id: orderId },
    data: { mpesaCheckoutId: result.reference },
  })

  return NextResponse.json({ success: true, reference: result.reference })
}
