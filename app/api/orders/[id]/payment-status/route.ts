import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        status: true,
        paymentStatus: true,
        updatedAt: true,
        totalKes: true,
        guestName: true,
        guestPhone: true,
        deliveryArea: true,
        items: {
          select: {
            productName: true,
            quantity: true,
            unitPriceKes: true,
          },
        },
      },
    });

    if (!order) {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      );
    }


    return NextResponse.json({
      success: true,
      data: {
        status: order.status,
        paymentStatus: order.paymentStatus,
        updatedAt: order.updatedAt,
        totalKes: order.totalKes,
        guestName: order.guestName,
        guestPhone: order.guestPhone,
        deliveryArea: order.deliveryArea,
        items: order.items,
      },
    });
  } catch (error) {
    console.error("Error fetching payment status:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
