import React from "react";
import { prisma } from "@/lib/prisma/client";
import { OrderTrackingClient } from "@/components/order/OrderTrackingClient";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  return {
    title: `Track Order #${params.id.slice(-6).toUpperCase()} | Busia Pastries`,
  };
}

export default async function OrderPage({ params }: { params: { id: string } }) {
  // Fetch initial order state server-side
  let order: any = null;
  
  try {
    order = await prisma.order.findUnique({
      where: { id: params.id },
      include: { items: true },
    });
  } catch (error) {
    console.error("Order fetch error:", error);
  }

  if (!order) {
    return (
      <div className="min-h-screen pt-40 pb-20 text-center">
         <div className="container mx-auto px-4">
            <h1 className="font-display text-4xl font-bold">Order Not Found</h1>
            <p className="mt-4 text-bp-text-muted">We couldn&apos;t find the baking journey for this order ID.</p>
         </div>
      </div>
    );
  }

  return <OrderTrackingClient initialOrder={order} />;
}
