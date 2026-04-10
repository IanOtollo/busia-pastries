import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";
import axios from "axios";

/**
 * PayHero Kenya STK Push Initiation
 * Supporting NCBA Loop Paybill 714888
 */

export async function POST(req: Request) {
  try {
    const { orderId, phone, amount } = await req.json();

    if (!orderId || !phone || !amount) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    const username = process.env.PAYHERO_API_ID;
    const password = process.env.PAYHERO_API_KEY;
    const channelId = process.env.PAYHERO_CHANNEL_ID;
    const baseUrl = process.env.PAYHERO_API_URL || "https://app.payhero.co.ke/api/v1";

    if (!username || !password || !channelId) {
      console.error("[PayHero] Missing configuration environment variables.");
      return NextResponse.json({ success: false, error: "Payment gateway configuration error" }, { status: 500 });
    }

    // Format phone to 254XXXXXXXXX
    let formattedPhone = phone.replace("+", "");
    if (formattedPhone.startsWith("0")) {
      formattedPhone = "254" + formattedPhone.slice(1);
    }

    const payload = {
      amount: parseFloat(amount),
      phone_number: formattedPhone,
      channel_id: parseInt(channelId),
      provider: "m-pesa",
      external_reference: orderId,
      callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payhero/callback`,
    };

    const auth = Buffer.from(`${username}:${password}`).toString("base64");

    console.log(`[PayHero] Initiating STK Push for Order: ${orderId}, Amount: ${amount}`);

    const response = await axios.post(`${baseUrl}/service/stk_push`, payload, {
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
    });

    if (response.data && response.data.status === "success") {
      const checkoutId = response.data.checkout_request_id || response.data.CheckoutRequestID;

      // Update Order with PayHero Reference
      await prisma.order.update({
        where: { id: orderId },
        data: { 
           mpesaCheckoutId: checkoutId, // Reusing existing field for compatibility
           notes: (await prisma.order.findUnique({ where: { id: orderId } }))?.notes + `\n[PayHero ID: ${checkoutId}]`
        },
      });

      return NextResponse.json({ 
        success: true, 
        checkoutId,
        message: "STK Push initiated successfully" 
      });
    } else {
      console.error("[PayHero] Service Error:", response.data);
      return NextResponse.json({ 
        success: false, 
        error: response.data?.message || "Failed to initiate STK Push" 
      }, { status: 400 });
    }

  } catch (error: any) {
    console.error("[PayHero] API Error:", error.response?.data || error.message);
    const errorMessage = error.response?.data?.message || error.message || "Internal Server Error";
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
