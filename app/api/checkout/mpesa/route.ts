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

  } catch (error: unknown) {
    console.error("M-Pesa API Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
