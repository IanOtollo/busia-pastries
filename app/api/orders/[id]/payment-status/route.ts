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
        paymentStatus: true,
        status: true,
      },
    });

    if (!order) {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      );
    }

    // Map database payment status to what the client expects
    let clientStatus = "PENDING";
    if (order.paymentStatus === "PAID") {
      clientStatus = "COMPLETED";
    }

    return NextResponse.json({
      success: true,
      status: clientStatus,
      orderStatus: order.status,
    });
  } catch (error) {
    console.error("Error fetching payment status:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
