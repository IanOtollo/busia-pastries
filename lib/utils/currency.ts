// Currency utilities — KES ↔ UGX conversion

export type Currency = "KES" | "UGX";

/**
 * Format a price for display in the given currency.
 * @param amountKes - The price in KES
 * @param currency - Target display currency
 * @param rate - KES to UGX exchange rate (fetched from Frankfurter API)
 */
export function formatPrice(
  amountKes: number,
  currency: Currency,
  rate: number = 1
): string {
  if (currency === "UGX") {
    const ugx = Math.round(amountKes * rate);
    return new Intl.NumberFormat("en-UG", {
      style: "currency",
      currency: "UGX",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(ugx);
  }

  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amountKes);
}

/**
 * Convert KES to UGX using the exchange rate.
 */
export function kesToUgx(amountKes: number, rate: number): number {
  return Math.round(amountKes * rate);
}

/**
 * Format a phone number to Safaricom STK Push format (254XXXXXXXXX)
 */
export function normalizeKenyanPhone(phone: string): string {
  const cleaned = phone.replace(/\s|-/g, "");
  if (cleaned.startsWith("+254")) return cleaned.slice(1);
  if (cleaned.startsWith("0")) return `254${cleaned.slice(1)}`;
  if (cleaned.startsWith("254")) return cleaned;
  return cleaned;
}

/**
 * Calculate delivery fee based on fulfillment type.
 * In Phase 1 — flat delivery fee or free pickup.
 */
export function calculateDeliveryFee(
  fulfillment: "DELIVERY" | "PICKUP",
  subtotalKes: number
): number {
  if (fulfillment === "PICKUP") return 0;
  // Free delivery above KES 3,000
  if (subtotalKes >= 3000) return 0;
  return 200; // Flat KES 200 delivery
}
