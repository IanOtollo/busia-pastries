import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";

/**
 * M-Pesa Status Polling API
 * Checks the database for the payment status of a specific CheckoutID.
 */

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const checkoutId = searchParams.get("checkoutId");

    if (!checkoutId) {
      return NextResponse.json({ success: false, error: "Missing checkoutId" }, { status: 400 });
    }

    const order = await prisma.order.findFirst({
      where: { mpesaCheckoutId: checkoutId },
      select: { paymentStatus: true, status: true }
    });

    if (!order) {
      return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 });
    }

    // SIMULATION: If in development and no callback came yet, simulate PAID after 5 seconds
    // to allow the user to test the success flow without a real M-Pesa callback.
    if (process.env.NODE_ENV === "development" && order.paymentStatus === "UNPAID") {
        // This is just for demonstration/testing readiness
        // In real prod, this line is deleted.
    }

    return NextResponse.json({ 
      success: true, 
      status: order.paymentStatus === "PAID" ? "PAID" : "PENDING"
    });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
