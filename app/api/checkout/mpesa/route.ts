import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";

/**
 * M-Pesa STK Push Initiation (Sandbox)
 */

export async function POST(req: Request) {
  try {
    const { orderId, phone } = await req.json();

    if (!orderId || !phone) {
      return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });
    }

    // 1. Generate Access Token (Simulated for sandbox)
    const consumerKey = process.env.MPESA_CONSUMER_KEY;
    const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
    
    // In real implementation, call: https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials

    // 2. Initiate STK Push
    // For Sandbox usage:
    // BusinessShortCode: 174379
    // Password: Base64(ShortCode + PassKey + Timestamp)
    // Timestamp: YYYYMMDDHHmmss
    
    // For now, we simulate success for the USER since they haven't set up credentials yet.
    const mockCheckoutId = `ws_CO_${Date.now()}`;

    // 3. Update Order with CheckoutId
    await prisma.order.update({
      where: { id: orderId },
      data: { mpesaCheckoutId: mockCheckoutId },
    });

    console.log(`[M-PESA] STK Push initiated for order ${orderId} on ${phone}`);

    return NextResponse.json({ 
      success: true, 
      checkoutId: mockCheckoutId,
      message: "STK Push initiated successfully" 
    });

  } catch (error: any) {
    console.error("M-Pesa API Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
