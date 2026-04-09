// M-Pesa Daraja API integration — STK Push (sandbox mode)
// Docs: https://developer.safaricom.co.ke/APIs/MpesaExpressSimulate

const DARAJA_BASE =
  process.env.MPESA_ENVIRONMENT === "production"
    ? "https://api.safaricom.co.ke"
    : "https://sandbox.safaricom.co.ke";

/** Get OAuth token from Daraja */
async function getDarajaToken(): Promise<string> {
  const key = process.env.MPESA_CONSUMER_KEY!;
  const secret = process.env.MPESA_CONSUMER_SECRET!;
  const credentials = Buffer.from(`${key}:${secret}`).toString("base64");

  const res = await fetch(
    `${DARAJA_BASE}/oauth/v1/generate?grant_type=client_credentials`,
    {
      headers: { Authorization: `Basic ${credentials}` },
      next: { revalidate: 3500 }, // token valid for ~1 hour
    }
  );

  if (!res.ok) {
    throw new Error(`Daraja token fetch failed: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  return data.access_token as string;
}

/** Generate Lipa Na M-Pesa password and timestamp */
function generatePassword(): { password: string; timestamp: string } {
  const shortcode = process.env.MPESA_SHORTCODE!;
  const passkey = process.env.MPESA_PASSKEY!;
  const timestamp = new Date()
    .toISOString()
    .replace(/[-T:.Z]/g, "")
    .slice(0, 14);
  const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString(
    "base64"
  );
  return { password, timestamp };
}

export interface StkPushResult {
  CheckoutRequestID: string;
  ResponseCode: string;
  ResponseDescription: string;
  CustomerMessage: string;
  MerchantRequestID: string;
}

/**
 * Initiate STK Push to a customer's phone.
 * @param phone - Safaricom phone in format 254XXXXXXXXX
 * @param amount - Amount in KES (integer)
 * @param orderId - Used as AccountReference
 */
export async function initiateStkPush(
  phone: string,
  amount: number,
  orderId: string
): Promise<StkPushResult> {
  // Sandbox: credentials not configured → return mock
  if (
    !process.env.MPESA_CONSUMER_KEY ||
    process.env.MPESA_CONSUMER_KEY === "your-daraja-consumer-key"
  ) {
    return {
      CheckoutRequestID: `ws_CO_mock_${Date.now()}`,
      ResponseCode: "0",
      ResponseDescription: "Success. Request accepted for processing",
      CustomerMessage: "Success. Request accepted for processing",
      MerchantRequestID: `mock-${Date.now()}`,
    };
  }

  const token = await getDarajaToken();
  const { password, timestamp } = generatePassword();
  const shortcode = process.env.MPESA_SHORTCODE!;
  const callbackUrl = process.env.MPESA_CALLBACK_URL!;

  const body = {
    BusinessShortCode: shortcode,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: Math.ceil(amount), // Must be integer
    PartyA: phone,
    PartyB: shortcode,
    PhoneNumber: phone,
    CallBackURL: callbackUrl,
    AccountReference: `BP-${orderId.slice(-8).toUpperCase()}`,
    TransactionDesc: "Busia Pastries Order",
  };

  const res = await fetch(
    `${DARAJA_BASE}/mpesa/stkpush/v1/processrequest`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`STK Push failed: ${res.status} — ${err}`);
  }

  return res.json() as Promise<StkPushResult>;
}

/** Known Safaricom IP ranges for callback validation */
export const SAFARICOM_IPS = [
  "196.201.214.200",
  "196.201.214.206",
  "196.201.213.114",
  "196.201.214.207",
  "196.201.214.208",
  "196.201.213.44",
  "196.201.212.127",
  "196.201.212.128",
  "196.201.212.129",
  "196.201.212.132",
  "196.201.212.136",
  "196.201.212.138",
  // sandbox — allow any in dev
];

export function isSafaricomIp(ip: string): boolean {
  if (process.env.MPESA_ENVIRONMENT !== "production") return true; // Dev bypass
  return SAFARICOM_IPS.includes(ip);
}
