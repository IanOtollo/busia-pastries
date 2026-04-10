import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface OrderConfirmationEmailProps {
  to: string;
  customerName: string;
  orderId: string;
  trackingToken: string;
  items: Array<{ productName: string; quantity: number; totalPriceKes: number }>;
  totalKes: number;
  fulfillment: "DELIVERY" | "PICKUP";
  deliveryAddress?: string;
}

export async function sendOrderConfirmationEmail({
  to,
  customerName,
  orderId,
  trackingToken,
  items,
  totalKes,
  fulfillment,
  deliveryAddress,
}: OrderConfirmationEmailProps) {
  if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === "re_...") {
    console.log("[Resend] Email skipped — no API key configured.");
    return;
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const trackingUrl = `${appUrl}/orders/${orderId}?token=${trackingToken}`;

  const itemsHtml = items
    .map(
      (item) =>
        `<tr>
          <td style="padding:8px 0; border-bottom:1px solid #E2D9CC;">${item.productName} × ${item.quantity}</td>
          <td style="padding:8px 0; border-bottom:1px solid #E2D9CC; text-align:right;">KES ${item.totalPriceKes.toLocaleString()}</td>
        </tr>`
    )
    .join("");

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body style="margin:0;padding:0;background:#FAF7F2;font-family:'DM Sans',Arial,sans-serif;">
  <div style="max-width:560px;margin:40px auto;background:#FFFFFF;border-radius:12px;overflow:hidden;box-shadow:0 2px 16px rgba(0,0,0,0.06);">
    
    <!-- Header -->
    <div style="background:#2C1810;padding:32px 40px;text-align:center;">
      <h1 style="margin:0;color:#FAF7F2;font-size:24px;font-weight:400;letter-spacing:0.5px;">
        Clare Pastries
      </h1>
      <p style="margin:8px 0 0;color:#B8892A;font-size:13px;letter-spacing:1px;text-transform:uppercase;">
        Order Confirmed
      </p>
    </div>

    <!-- Body -->
    <div style="padding:40px;">
      <p style="color:#1C1612;font-size:16px;margin:0 0 24px;">
        Hi ${customerName},<br><br>
        Thank you for your order! Clare is already preparing it fresh for you with so much love.
      </p>

      <!-- Order ID -->
      <div style="background:#F0EBE1;border-radius:8px;padding:16px;margin-bottom:24px;text-align:center;">
        <p style="margin:0;color:#7A6E64;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Order Reference</p>
        <p style="margin:4px 0 0;color:#1C1612;font-size:20px;font-family:monospace;font-weight:600;">${orderId.slice(-8).toUpperCase()}</p>
      </div>

      <!-- Items -->
      <table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
        <thead>
          <tr>
            <th style="text-align:left;padding:0 0 8px;color:#7A6E64;font-size:12px;text-transform:uppercase;letter-spacing:0.5px;border-bottom:2px solid #E2D9CC;">Item</th>
            <th style="text-align:right;padding:0 0 8px;color:#7A6E64;font-size:12px;text-transform:uppercase;letter-spacing:0.5px;border-bottom:2px solid #E2D9CC;">Price</th>
          </tr>
        </thead>
        <tbody>${itemsHtml}</tbody>
        <tfoot>
          <tr>
            <td style="padding:12px 0 0;font-weight:600;color:#1C1612;">Total</td>
            <td style="padding:12px 0 0;font-weight:600;color:#1C1612;text-align:right;">KES ${totalKes.toLocaleString()}</td>
          </tr>
        </tfoot>
      </table>

      <!-- Fulfillment -->
      <div style="background:#F0EBE1;border-radius:8px;padding:16px;margin-bottom:24px;">
        <p style="margin:0;color:#7A6E64;font-size:12px;text-transform:uppercase;letter-spacing:1px;">${fulfillment === "DELIVERY" ? "Delivery Address" : "Pickup"}</p>
        <p style="margin:4px 0 0;color:#1C1612;font-size:14px;">
          ${fulfillment === "DELIVERY" ? deliveryAddress || "—" : "In-store pickup — we'll notify you when it's ready."}
        </p>
      </div>

      <!-- Track CTA -->
      <div style="text-align:center;margin-bottom:32px;">
        <a href="${trackingUrl}" style="display:inline-block;background:#2C1810;color:#FAF7F2;text-decoration:none;padding:14px 32px;border-radius:8px;font-size:14px;font-weight:500;letter-spacing:0.3px;">
          Track Your Order →
        </a>
      </div>

      <p style="color:#7A6E64;font-size:13px;text-align:center;margin:0;">
        Questions? Reply to this email or contact us via WhatsApp.
      </p>
    </div>

    <!-- Footer -->
    <div style="background:#F0EBE1;padding:24px 40px;text-align:center;">
      <p style="margin:0;color:#7A6E64;font-size:12px;">
        Clare Pastries · Busia Town, Kenya<br>
        &copy; 2026 Clare Pastries. All rights reserved.
      </p>
    </div>
  </div>
</body>
</html>`;

  await resend.emails.send({
    from: "Clare Pastries <orders@clarepastries.co.ke>",
    to,
    subject: `Order Confirmed — #${orderId.slice(-8).toUpperCase()}`,
    html,
  });
}
