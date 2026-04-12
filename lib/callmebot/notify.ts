/**
 * CallMeBot WhatsApp Notifications — Clare Pastries
 * Sends WhatsApp messages to Clare via the CallMeBot free gateway.
 * IMPORTANT: Failures are logged but NEVER propagate to callers.
 */

const CALLMEBOT_URL = 'https://api.callmebot.com/whatsapp.php'

export async function notifyClare(message: string): Promise<boolean> {
  const phone = process.env.CALLMEBOT_PHONE
  const apikey = process.env.CALLMEBOT_API_KEY

  if (!phone || !apikey) {
    console.warn('[CallMeBot] Not configured — skipping notification')
    return false
  }

  const encoded = encodeURIComponent(message)
  const url = `${CALLMEBOT_URL}?phone=${phone}&text=${encoded}&apikey=${apikey}`

  try {
    const res = await fetch(url, { 
      method: 'GET',
      signal: AbortSignal.timeout(8000) // 8s timeout
    })
    if (!res.ok) {
      const body = await res.text().catch(() => 'unknown')
      console.error(`[CallMeBot] HTTP ${res.status}: ${body}`)
      return false
    }
    console.log('[CallMeBot] Notification sent successfully')
    return true
  } catch (err) {
    console.error('[CallMeBot] Error sending notification:', err)
    return false
  }
}
