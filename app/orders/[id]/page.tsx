import React from "react";
import { prisma } from "@/lib/prisma/client";
import { OrderTrackingClient } from "@/components/order/OrderTrackingClient";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Track Order #${id.slice(-6).toUpperCase()} | Clare Pastries`,
  };
}

export default async function OrderPage({ params }: { params: Promise<{ id: string }> }) {
  // Wait for params in Next.js 15
  const { id } = await params;

  // Fetch initial order state server-side
  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: true },
  });

  if (!order) {
    return (
      <div className="min-h-screen pt-40 pb-20 text-center bg-cp-bg">
         <div className="container mx-auto px-4">
            <h1 className="font-display text-4xl font-bold text-cp-text">Order Not Found</h1>
            <p className="mt-4 text-cp-text-muted">We couldn&apos;t find the baking journey for this order ID.</p>
         </div>
      </div>
    );
  }

  // Type transformation to match Client props and resolve Prisma nullability
  const formattedOrder = {
    id: order.id,
    status: order.status,
    fulfillment: order.fulfillment,
    deliveryArea: order.deliveryArea ?? undefined,
    deliveryLandmark: order.deliveryLandmark ?? undefined,
    guestName: order.guestName ?? undefined,
    guestPhone: order.guestPhone ?? undefined,
    totalKes: order.totalKes,
    items: order.items.map(item => ({
      productName: item.productName,
      quantity: item.quantity,
      unitPriceKes: item.unitPriceKes
    }))
  };

  return <OrderTrackingClient initialOrder={formattedOrder} />;
}
