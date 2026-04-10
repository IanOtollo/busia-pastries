-- ============================================================
-- Busia Pastries — Supabase Realtime Configuration
-- Run this in: Supabase Dashboard → SQL Editor → Run
--
-- Alternatively: Database → Replication → Tables →
--   Toggle ON for "Order" table
-- ============================================================

-- Enable realtime for order tracking
ALTER PUBLICATION supabase_realtime
  ADD TABLE "Order";
