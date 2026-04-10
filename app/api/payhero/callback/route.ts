import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";

/**
 * PayHero Kenya Callback Handler (Webhook)
 */

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    console.log("[PayHero Webhook] Received:", JSON.stringify(payload, null, 2));

    // PayHero payload keys can vary slightly, but standard ones are:
    // status, message, CheckoutRequestID, ExternalReference (Our OrderId)
    const { status, CheckoutRequestID, ExternalReference, receiptNumber } = payload;

    if (!ExternalReference) {
      console.warn("[PayHero Webhook] Missing ExternalReference (Order ID).");
      return NextResponse.json({ success: false, error: "Missing reference" }, { status: 400 });
    }

    const orderId = ExternalReference;

    // 1. Find the order
    const order = await prisma.order.findUnique({
      where: { id: orderId }
    });

    if (!order) {
      console.error(`[PayHero Webhook] Order ${orderId} not found.`);
      return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 });
    }

    // 2. Process based on status
    if (status === "success" || status === "SUCCESS") {
      console.log(`[PayHero Webhook] Success for Order ${orderId}. Reference: ${receiptNumber}`);
      
      await prisma.order.update({
        where: { id: orderId },
        data: {
          paymentStatus: "PAID",
          status: "CONFIRMED", // Auto-confirm order upon payment
          mpesaRef: receiptNumber || order.mpesaRef,
          notes: order.notes + `\n[Webhook: Payment Verified. Receipt: ${receiptNumber}]`
        }
      });

      // Here you could also trigger an SMS or Email notification to Clare
      // e.g., sendOrderNotification(orderId);
      
      return NextResponse.json({ success: true, message: "Order updated successfully" });
    } else {
      console.warn(`[PayHero Webhook] Payment failed or cancelled for Order ${orderId}. Status: ${status}`);
      
      await prisma.order.update({
        where: { id: orderId },
        data: {
          notes: order.notes + `\n[Webhook: Payment Failed. Status: ${status}]`
        }
      });

      return NextResponse.json({ success: true, message: "Handled failure status" });
    }

  } catch (error: any) {
    console.error("[PayHero Webhook] Error:", error.message);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
