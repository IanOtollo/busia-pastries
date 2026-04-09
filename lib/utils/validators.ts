import { z } from "zod";

// ── Phone validation ──────────────────────────────────────
export const kenyaPhoneSchema = z
  .string()
  .regex(/^(\+254|254|0)[17]\d{8}$/, "Enter a valid Kenyan phone number");

export const ugandaPhoneSchema = z
  .string()
  .regex(/^(\+256|256|0)[37]\d{8}$/, "Enter a valid Ugandan phone number");

export const phoneSchema = z
  .string()
  .min(9, "Phone number is required")
  .refine(
    (val) =>
      kenyaPhoneSchema.safeParse(val).success ||
      ugandaPhoneSchema.safeParse(val).success,
    "Enter a valid Kenyan (+254) or Ugandan (+256) phone number"
  );

// ── Order schemas ────────────────────────────────────────
export const orderItemSchema = z.object({
  sanityId: z.string().min(1),
  productName: z.string().min(1),
  quantity: z.number().int().min(1).max(50),
  unitPriceKes: z.number().positive(),
});

export const createOrderSchema = z.object({
  // Customer info (guest or logged in)
  guestName: z.string().min(2, "Name is required").optional(),
  guestEmail: z.string().email("Invalid email").optional().or(z.literal("")),
  guestPhone: phoneSchema.optional(),

  // Cart
  items: z.array(orderItemSchema).min(1, "Your cart is empty"),

  // Fulfillment
  fulfillment: z.enum(["DELIVERY", "PICKUP"]),
  deliveryAddress: z.string().optional(),
  notes: z.string().max(500).optional(),

  // Currency display
  currency: z.enum(["KES", "UGX"]).default("KES"),
  displayTotal: z.number().positive(),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;

// ── Review schema ────────────────────────────────────────
export const createReviewSchema = z.object({
  sanityId: z.string().min(1),
  orderId: z.string().optional(),
  rating: z.number().int().min(1).max(5),
  body: z
    .string()
    .min(10, "Review must be at least 10 characters")
    .max(1000, "Review must be under 1,000 characters"),
});

export type CreateReviewInput = z.infer<typeof createReviewSchema>;

// ── Auth schemas ─────────────────────────────────────────
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: phoneSchema.optional(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;

// ── M-Pesa schema ────────────────────────────────────────
export const mpesaInitSchema = z.object({
  orderId: z.string().min(1),
  phone: z
    .string()
    .regex(
      /^254[17]\d{8}$/,
      "Phone must be in format 254XXXXXXXXX (Kenyan number)"
    ),
  amount: z.number().int().positive().max(300000),
});

export type MpesaInitInput = z.infer<typeof mpesaInitSchema>;

// ── Contact form schema ──────────────────────────────────
export const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  subject: z.string().min(3, "Subject is required"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000),
});

export type ContactInput = z.infer<typeof contactSchema>;
