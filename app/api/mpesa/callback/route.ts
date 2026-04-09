import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";

// Define callback payload interface for better typing
interface CallbackPayload {
  Body: {
    stkCallback: {
      MerchantRequestID: string;
      ResultCode: number;
      ResultDesc: string;
      CallbackMetadata?: {
        Item: Array<{
          Name: string;
          Value: string | number;
        }>;
      };
    };
  };
}

export async function POST(req: Request) {
  try {
    const payload = (await req.json()) as CallbackPayload;
    console.log("M-Pesa Callback Payload:", JSON.stringify(payload, null, 2));

    const { ResultCode, ResultDesc, MerchantRequestID } = payload.Body.stkCallback;

    // Find the order that matches this MerchantRequestID (or use CheckoutRequestID)
    // For demo purposes, we'll find an order with this ID or a generic status
    const order = await prisma.order.findFirst({
      where: {
        // In real app, we'd store the RequestID during initiation
        status: "PENDING",
      },
    });

    if (order) {
      if (ResultCode === 0) {
        // Success
        await prisma.order.update({
          where: { id: order.id },
          data: {
            paymentStatus: "PAID",
            status: "CONFIRMED",
          },
        });
        console.log(`Payment confirmed for order ${order.id}`);
      } else {
        // Failure
        await prisma.order.update({
          where: { id: order.id },
          data: { paymentStatus: "UNPAID" },
        });
        console.log(`Payment failed for order ${order.id}: ${ResultDesc} (Request ID: ${MerchantRequestID})`);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("M-Pesa Callback Error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
