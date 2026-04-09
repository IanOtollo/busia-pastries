import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      items, 
      fulfillment, 
      deliveryArea, 
      deliveryLandmark, 
      notes, 
      fullName, 
      email, 
      phone, 
      paymentMethod,
      totalKes,
      subtotalKes,
      deliveryFeeKes,
      displayCurrency
    } = body;

    // Validation
    if (!items || items.length === 0 || !fullName || !phone) {
      return NextResponse.json({ success: false, error: "Missing required order data" }, { status: 400 });
    }

    // 1. Create the Order in Transaction
    const order = await prisma.order.create({
      data: {
        guestName: fullName,
        guestPhone: phone,
        guestEmail: email,
        fulfillment,
        deliveryArea,
        deliveryLandmark,
        notes,
        paymentMethod,
        totalKes,
        subtotalKes,
        deliveryFeeKes,
        displayCurrency,
        displayTotal: totalKes, // Assuming 1:1 for KES, will be updated if currency is UGX in client
        status: "PENDING",
        paymentStatus: "UNPAID",
        items: {
          create: items.map((item: { sanityId: string, productName: string, quantity: number, unitPriceKes: number }) => ({
            sanityId: item.sanityId,
            productName: item.productName,
            quantity: item.quantity,
            unitPriceKes: item.unitPriceKes,
            totalPriceKes: item.unitPriceKes * item.quantity
          }))
        }
      }
    });

    console.log(`[ORDER] Created successfully: ${order.id}`);

    return NextResponse.json({ success: true, data: order });

  } catch (error: unknown) {
    console.error("Order Creation Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
