import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";
import { auth } from "@/auth";
import { createOrderSchema } from "@/lib/utils/validators";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const session = await auth();
    const body = await req.json();

    // Validate request body
    const result = createOrderSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const {
      items,
      displayTotal,
      fulfillment,
      deliveryAddress,
      notes,
      guestName,
      guestEmail,
      guestPhone,
    } = result.data;

    // Generate a secure tracking token for guest orders
    const trackingToken = crypto.randomBytes(32).toString("hex");

    // Create order with items in a transaction
    const order = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          userId: session?.user?.id || null, // Link to user if logged in
          guestName,
          guestEmail,
          guestPhone,
          totalKes: displayTotal, 
          subtotalKes: displayTotal, 
          displayTotal, // Ensure mapped to Prisma schema
          deliveryFeeKes: 0,
          fulfillment: fulfillment as "DELIVERY" | "PICKUP",
          deliveryAddress,
          notes,
          status: "PENDING",
          paymentStatus: "UNPAID",
          trackingToken,
          items: {
            create: items.map((item) => ({
              sanityId: item.sanityId,
              productName: item.productName,
              quantity: item.quantity,
              unitPriceKes: item.unitPriceKes,
              totalPriceKes: item.quantity * item.unitPriceKes,
            })),
          },
        },
      });

      return newOrder;
    });

    return NextResponse.json(
      { 
        success: true, 
        orderId: order.id, 
        trackingToken: order.trackingToken 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create order. Please try again." },
      { status: 500 }
    );
  }
}
