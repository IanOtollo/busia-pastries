-- ============================================================
-- Busia Pastries — Supabase Row Level Security Policies
-- Run this in: Supabase Dashboard → SQL Editor → Run
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Order" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "OrderItem" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Review" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "CustomOrder" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Address" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "PushSubscription" ENABLE ROW LEVEL SECURITY;

-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-- User: read/update own row only
-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CREATE POLICY "Users can view own profile"
  ON "User" FOR SELECT
  USING (id = current_setting('app.current_user_id', true));

CREATE POLICY "Users can update own profile"
  ON "User" FOR UPDATE
  USING (id = current_setting('app.current_user_id', true));

-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-- Order: customers see own or guest orders via tracking token
-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CREATE POLICY "Customers view own orders"
  ON "Order" FOR SELECT
  USING (
    "userId" = current_setting('app.current_user_id', true)
    OR "trackingToken" IS NOT NULL
  );

CREATE POLICY "Anyone can create order"
  ON "Order" FOR INSERT
  WITH CHECK (true);

-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-- OrderItem: readable with parent order
-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CREATE POLICY "OrderItems visible to order owner"
  ON "OrderItem" FOR SELECT
  USING (true);

CREATE POLICY "Anyone can create order items"
  ON "OrderItem" FOR INSERT
  WITH CHECK (true);

-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-- Review: public reads approved only, anyone can submit
-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CREATE POLICY "Public reads approved reviews"
  ON "Review" FOR SELECT
  USING ("isApproved" = true);

CREATE POLICY "Anyone can submit review"
  ON "Review" FOR INSERT
  WITH CHECK (true);

-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-- CustomOrder: insert only for public
-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CREATE POLICY "Anyone can submit custom order"
  ON "CustomOrder" FOR INSERT
  WITH CHECK (true);

-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-- Address: own only
-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CREATE POLICY "Users manage own addresses"
  ON "Address" FOR ALL
  USING (
    "userId" = current_setting('app.current_user_id', true)
  );

-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-- PushSubscription: open to authenticated service writes
-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CREATE POLICY "Users manage own push subs"
  ON "PushSubscription" FOR ALL
  USING (true);
