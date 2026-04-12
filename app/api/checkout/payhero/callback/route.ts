import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma/client'
import { notifyClare } from '@/lib/callmebot/notify'

/**
 * PayHero Payment Callback
 * Called by PayHero after every STK Push attempt.
 * CRITICAL: This endpoint must always return 200 to acknowledge receipt.
 * CRITICAL: Idempotent — duplicate callbacks for paid orders are no-ops.
 */
export async function POST(req: Request) {
  let rawBody = ''

  try {
    rawBody = await req.text()
    console.log('[PayHero Callback] Raw payload:', rawBody)
  } catch (err) {
    console.error('[PayHero Callback] Failed to read body:', err)
    return NextResponse.json({ received: true }, { status: 200 })
  }

  let data: {
    status?: string
    reference?: string
    external_reference?: string
    amount?: number
    provider_reference?: string
    phone_number?: string
    created_at?: string
    [key: string]: unknown
  }

  try {
    data = JSON.parse(rawBody)
  } catch {
    console.error('[PayHero Callback] Invalid JSON in callback body')
    return NextResponse.json({ received: true }, { status: 200 })
  }

  const orderId = data.external_reference ?? data.reference
  const status = data.status
  const paidAmount = typeof data.amount === 'number' ? data.amount : parseFloat(String(data.amount ?? '0'))
  const mpesaRef = data.provider_reference ?? ''
  const phone = data.phone_number ?? ''

  if (!orderId) {
    console.error('[PayHero Callback] Missing external_reference in payload')
    return NextResponse.json({ received: true }, { status: 200 })
  }

  // Log everything to PaymentLog regardless of outcome
  const logEntry = await prisma.paymentLog.create({
    data: {
      orderId: String(orderId),
      reference: data.reference ? String(data.reference) : String(orderId),
      status: status ?? 'UNKNOWN',
      amount: isNaN(paidAmount) ? null : paidAmount,
      mpesaRef: mpesaRef || null,
      phone: phone || null,
      rawPayload: rawBody,
    },
  })

  console.log(`[PayHero Callback] Logged — PaymentLog #${logEntry.id}`)

  // Fetch the order
  const order = await prisma.order.findUnique({
    where: { id: String(orderId) },
    select: {
      id: true,
      guestName: true,
      guestPhone: true,
      totalKes: true,
      paymentStatus: true,
    },
  })

  if (!order) {
    console.error(`[PayHero Callback] Order not found: ${orderId}`)
    return NextResponse.json({ received: true }, { status: 200 })
  }

  // IDEMPOTENCY CHECK — already processed
  if (order.paymentStatus === 'PAID') {
    console.log(`[PayHero Callback] Duplicate callback ignored — Order ${orderId} already PAID`)
    return NextResponse.json({ received: true }, { status: 200 })
  }

  const customerName = order.guestName ?? 'Customer'

  if (status === 'SUCCESS') {
    // AMOUNT MISMATCH CHECK
    const expectedAmount = order.totalKes
    const tolerance = 1 // Allow ±1 KES for rounding
    if (paidAmount < expectedAmount - tolerance) {
      console.error(
        `[PayHero Callback] Amount mismatch — expected KES ${expectedAmount}, received KES ${paidAmount}`
      )

      // Notify Clare but DO NOT mark as paid
      void notifyClare(
        `⚠️ Payment Amount Mismatch!\n` +
        `Order #${order.id}\n` +
        `Expected: KES ${expectedAmount.toFixed(2)}\n` +
        `Received: KES ${paidAmount.toFixed(2)}\n` +
        `M-Pesa Ref: ${mpesaRef}\n` +
        `Phone: ${phone}\n` +
        `Manual verification needed!`
      )

      return NextResponse.json({ received: true }, { status: 200 })
    }

    // All good — mark order as PAID + CONFIRMED in a DB transaction
    await prisma.$transaction([
      prisma.order.update({
        where: { id: order.id },
        data: {
          paymentStatus: 'PAID',
          mpesaRef: mpesaRef || null,
          status: 'CONFIRMED',
        },
      }),
      prisma.orderStatusLog.create({
        data: {
          orderId: order.id,
          status: 'CONFIRMED',
          changedBy: 'payhero_callback',
          note: `Payment confirmed. M-Pesa Ref: ${mpesaRef}`,
        },
      }),
    ])

    console.log(`[PayHero Callback] ✅ Order ${order.id} marked PAID`)

    // Notify Clare
    void notifyClare(
      `✅ Payment Confirmed!\n` +
      `Order #${order.id}\n` +
      `Customer: ${customerName}\n` +
      `Amount: KES ${paidAmount.toFixed(2)}\n` +
      `M-Pesa Ref: ${mpesaRef}\n` +
      `Phone: ${phone}\n` +
      `View: ${process.env.NEXT_PUBLIC_APP_URL}/orders/${order.id}`
    )

    return NextResponse.json({ received: true, success: true }, { status: 200 })
  }

  // FAILED path
  if (status === 'FAILED' || status === 'CANCELLED') {
    console.log(`[PayHero Callback] ❌ Payment failed for Order ${order.id} — status: ${status}`)

    void notifyClare(
      `❌ Payment Failed\n` +
      `Order #${order.id}\n` +
      `Customer: ${customerName} (${order.guestPhone ?? phone})\n` +
      `Status: ${status}\n` +
      `Order still awaiting payment.`
    )
  }

  return NextResponse.json({ received: true }, { status: 200 })
}
