import { NextResponse } from "next/server";
import { mpesaInitSchema } from "@/lib/utils/validators";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = mpesaInitSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error.issues[0].message },
        { status: 400 }
      );
    }

    // In a real implementation, we would call the Daraja API here
    
    return NextResponse.json({
      success: true,
      CheckoutRequestID: `ws_CO_${Date.now()}`,
      CustomerMessage: "Success. Request accepted for processing",
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Payment initiation failed" },
      { status: 500 }
    );
  }
}
