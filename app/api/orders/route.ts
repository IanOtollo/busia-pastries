import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";
import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "@/lib/redis";
import { z } from "zod";

// Create a new ratelimiter, that allows 5 requests per 1 minute
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "1 m"),
  analytics: true,
});

const orderSchema = z.object({
  items: z.array(z.object({
    sanityId: z.string(),
    productName: z.string(),
    quantity: z.number().int().positive(),
    unitPriceKes: z.number().nonnegative(),
  })).min(1, "Order must have at least one item"),
  fulfillment: z.enum(["DELIVERY", "PICKUP"]),
  deliveryArea: z.string().optional(),
  deliveryLandmark: z.string().optional(),
  notes: z.string().optional(),
  fullName: z.string().min(2, "Name too short to be valid"),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().min(9, "Phone number is too short"),
  paymentMethod: z.enum(["MPESA", "CASH"]),
  totalKes: z.number().nonnegative(),
  subtotalKes: z.number().nonnegative(),
  deliveryFeeKes: z.number().nonnegative(),
  displayCurrency: z.string(),
});

export async function POST(req: Request) {
  try {
    // 0. Rate Limiting Check
    const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";
    
    // Only rate limit if redis is fully configured (i.e., in production/proper dev env)
    if (process.env.UPSTASH_REDIS_REST_URL) {
      const { success } = await ratelimit.limit(`order_${ip}`);
      if (!success) {
        return NextResponse.json({ success: false, error: "Too many requests. Please try again later." }, { status: 429 });
      }
    }

    // 1. Zod Input Validation
    const body = await req.json();
    const parsed = orderSchema.safeParse(body);
    
    if (!parsed.success) {
      return NextResponse.json({ 
        success: false, 
        error: "Invalid request data", 
        details: parsed.error.format() 
      }, { status: 400 });
    }

    const data = parsed.data;

    // 2. Create the Order securely
    const order = await prisma.order.create({
      data: {
        guestName: data.fullName,
        guestPhone: data.phone,
        guestEmail: data.email || null,
        fulfillment: data.fulfillment,
        deliveryArea: data.deliveryArea,
        deliveryLandmark: data.deliveryLandmark,
        notes: data.notes,
        paymentMethod: data.paymentMethod,
        totalKes: data.totalKes,
        subtotalKes: data.subtotalKes,
        deliveryFeeKes: data.deliveryFeeKes,
        displayCurrency: data.displayCurrency,
        displayTotal: data.totalKes, 
        status: "PENDING",
        paymentStatus: "UNPAID",
        items: {
          create: data.items.map((item) => ({
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
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
