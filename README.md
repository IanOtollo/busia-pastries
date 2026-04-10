# Clare Pastries

Artisan Bakery in Busia, Kenya.

A production-grade artisan pastry e-commerce platform built with **Next.js 15**, **Sanity CMS**, **Supabase PostgreSQL**, and **M-Pesa** payments.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router, React 19) |
| CMS | Sanity Studio v5 |
| Database | Supabase PostgreSQL (via Prisma ORM) |
| Auth | NextAuth v5 (JWT + Credentials) |
| Payments | M-Pesa Daraja STK Push |
| Realtime | Supabase Realtime (order tracking) |
| Cache | Upstash Redis (rate limiting) |
| Email | Resend |
| Deployment | Vercel |

---

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Environment Variables

Copy `.env.local.example` to `.env.local` and fill in:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Database (Supabase connection strings)
DATABASE_URL=postgresql://postgres:[password]@db.[ref].supabase.co:5432/postgres
DIRECT_URL=postgresql://postgres:[password]@db.[ref].supabase.co:5432/postgres

# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=

# Auth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=

# M-Pesa (Safaricom Daraja)
MPESA_CONSUMER_KEY=
MPESA_CONSUMER_SECRET=
MPESA_SHORTCODE=
MPESA_PASSKEY=
MPESA_CALLBACK_URL=

# Upstash Redis
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

---

## 🚀 Database Setup (After First Deploy)

### Step 1 — Apply Database Schema

Run from your terminal (requires network access to Supabase):

```bash
npm run db:push
```

Or paste the contents of `prisma/migrations/001_init/migration.sql` into:
> **Supabase Dashboard → SQL Editor → Run**

### Step 2 — Enable Row Level Security

Copy the contents of `supabase/rls.sql` and paste into:
> **Supabase Dashboard → SQL Editor → Run**

This enables RLS on all tables and sets up access policies.

### Step 3 — Enable Realtime for Order Tracking

**Option A** — Via SQL Editor:

Copy the contents of `supabase/realtime.sql` and paste into:
> **Supabase Dashboard → SQL Editor → Run**

**Option B** — Via Dashboard UI:
> **Database → Replication → Tables → Toggle ON for "Order"**

### Step 4 — Verify Tables

> **Supabase Dashboard → Table Editor**

You should see all 7 tables:
- `User`
- `Order`
- `OrderItem`
- `CustomOrder`
- `Review`
- `Address`
- `PushSubscription`

---

## Database Scripts

```bash
# Push schema changes without migration history (fast for initial setup)
npm run db:push

# Apply existing migrations (production-safe)
npm run db:migrate

# Open Prisma Studio (visual DB browser)
npm run db:studio
```

---

## Sanity Studio

Access the CMS at `/studio` after deployment.

---

## Deployment

Push to `main` branch — Vercel auto-deploys.

Ensure all environment variables are set in the Vercel Dashboard.
