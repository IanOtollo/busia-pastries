import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // 1. Create in Database
    const customOrder = await prisma.customOrder.create({
      data: {
        fullName: data.fullName,
        phone: data.phone,
        email: data.email || null,
        occasion: data.occasion,
        description: data.type,
        flavors: data.flavors || null,
        servings: data.servings,
        preferredDate: data.preferredDate ? new Date(data.preferredDate) : null,
        fulfillment: data.fulfillment,
        deliveryArea: data.location || null,
        budgetRange: data.budgetRange,
        notes: data.notes || null,
      }
    });

    // 2. Notify Michael via Email (Resend)
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "Busia Pastries <orders@busiapastries.co.ke>", // Requires verified domain
        to: "michael@busiapastries.co.ke", // Michael's email from spec
        subject: `New Custom Order Request - ${data.fullName}`,
        html: `
          <h1>New Bespoke Request</h1>
          <p><strong>Customer:</strong> ${data.fullName}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          <p><strong>Occasion:</strong> ${data.occasion}</p>
          <p><strong>Description:</strong> ${data.type}</p>
          <p><strong>Preferred Date:</strong> ${data.preferredDate}</p>
          <p><strong>Budget:</strong> ${data.budgetRange}</p>
          <hr />
          <p>Log in to the dashboard to manage this request.</p>
        `,
      });
    }

    return NextResponse.json({ success: true, data: customOrder });

  } catch (error: unknown) {
    console.error("Custom Order API Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
