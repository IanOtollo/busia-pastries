/**
 * PayHero Payment Client — Clare Pastries
 * https://backend.payhero.co.ke/api/v2
 * Paybill: 714888 | Account: 257457
 */

const PAYHERO_BASE = 'https://backend.payhero.co.ke/api/v2'

function getAuthHeader(): string {
  const username = process.env.PAYHERO_API_USERNAME
  const secret = process.env.PAYHERO_API_SECRET
  if (!username || !secret) {
    throw new Error('PayHero credentials not configured')
  }
  return `Basic ${Buffer.from(`${username}:${secret}`).toString('base64')}`
}

export interface STKPushResult {
  success: boolean
  reference?: string
  error?: string
}

export async function initiateSTKPush({
  phone,
  amount,
  orderId,
  customerName,
}: {
  phone: string
  amount: number
  orderId: string
  customerName: string
}): Promise<STKPushResult> {
  const channelId = process.env.PAYHERO_CHANNEL_ID
  const appUrl = process.env.NEXT_PUBLIC_APP_URL

  if (!channelId || !appUrl) {
    console.error('[PayHero] Missing PAYHERO_CHANNEL_ID or NEXT_PUBLIC_APP_URL')
    return { success: false, error: 'Payment gateway not configured' }
  }

  try {
    const response = await fetch(`${PAYHERO_BASE}/payments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getAuthHeader(),
      },
      body: JSON.stringify({
        amount: Math.round(amount),
        phone_number: phone,
        channel_id: parseInt(channelId),
        provider: 'm-pesa',
        external_reference: orderId,
        customer_name: customerName,
        callback_url: `${appUrl}/api/checkout/payhero/callback`,
      }),
      signal: AbortSignal.timeout(15000),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('[PayHero] STK Push error:', data)
      return { success: false, error: data.message || 'Payment initiation failed' }
    }

    const reference =
      data.reference ||
      data.CheckoutRequestID ||
      data.checkout_request_id ||
      data.id

    console.log(`[PayHero] STK Push initiated — ref: ${reference}, order: ${orderId}`)
    return { success: true, reference: String(reference) }
  } catch (err) {
    console.error('[PayHero] STK Push network error:', err)
    return { success: false, error: 'Network error — please try again' }
  }
}

export interface PaymentVerifyResult {
  paid: boolean
  amount?: number
  mpesaRef?: string
  status?: string
}

export async function verifyPayment(reference: string): Promise<PaymentVerifyResult> {
  try {
    const response = await fetch(
      `${PAYHERO_BASE}/transaction-status?reference=${encodeURIComponent(reference)}`,
      {
        headers: { Authorization: getAuthHeader() },
        signal: AbortSignal.timeout(10000),
      }
    )

    const data = await response.json()

    return {
      paid: data.status === 'SUCCESS',
      amount: data.amount,
      mpesaRef: data.provider_reference,
      status: data.status,
    }
  } catch (err) {
    console.error('[PayHero] Verify payment error:', err)
    return { paid: false }
  }
}
