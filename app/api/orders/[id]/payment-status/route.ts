import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma/client'
import { verifyPayment } from '@/lib/payhero/client'

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const order = await prisma.order.findUnique({
      where: { id },
      select: {
        paymentStatus: true,
        status: true,
        mpesaCheckoutId: true,
        mpesaRef: true,
      },
    })

    if (!order) {
      return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 })
    }

    // Already paid — return immediately
    if (order.paymentStatus === 'PAID') {
      return NextResponse.json({
        success: true,
        paid: true,
        status: order.status,
        mpesaRef: order.mpesaRef,
      })
    }

    // If we have a PayHero reference, poll live status
    if (order.mpesaCheckoutId) {
      const result = await verifyPayment(order.mpesaCheckoutId)

      if (result.paid) {
        await prisma.$transaction([
          prisma.order.update({
            where: { id },
            data: {
              paymentStatus: 'PAID',
              status: 'CONFIRMED',
              mpesaRef: result.mpesaRef ?? null,
            },
          }),
          prisma.orderStatusLog.create({
            data: {
              orderId: id,
              status: 'CONFIRMED',
              changedBy: 'payment_status_poll',
              note: `Payment verified via polling. M-Pesa Ref: ${result.mpesaRef ?? 'unknown'}`,
            },
          }),
        ])

        return NextResponse.json({
          success: true,
          paid: true,
          status: 'CONFIRMED',
          mpesaRef: result.mpesaRef,
        })
      }
    }

    return NextResponse.json({ success: true, paid: false, status: order.status })
  } catch (error: unknown) {
    console.error('[payment-status] Error:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
