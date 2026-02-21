# AutoValet – Concierge Car Pickup & Drop-Off

Production-ready MVP website for a concierge vehicle pickup and drop-off service in Sacramento, CA.

**Tech stack:** Next.js 14 (App Router) · TypeScript · TailwindCSS · Supabase · Resend · Vercel

---

## Quick Start (Local Development)

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env.local
```

Fill in all values in `.env.local`:

| Variable | Where to find it |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Dashboard → Project Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Dashboard → Project Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Dashboard → Project Settings → API |
| `RESEND_API_KEY` | https://resend.com/api-keys |
| `RESEND_FROM_EMAIL` | A domain you've verified in Resend |
| `RESEND_ADMIN_EMAIL` | Internal address for booking notifications |
| `NEXT_PUBLIC_SITE_URL` | Your production URL (or `http://localhost:3000` locally) |

### 3. Set up Supabase database

1. Create a new Supabase project at https://supabase.com
2. Open the SQL Editor and run the contents of `supabase/schema.sql`
3. This creates the `bookings` table, storage bucket, and RLS policies

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Deploy to Vercel

### 1. Push to GitHub

```bash
git add .
git commit -m "Initial AutoValet MVP"
git push origin main
```

### 2. Import to Vercel

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Add all environment variables from `.env.example` under **Settings → Environment Variables**
4. Deploy

### 3. Configure Resend domain

1. In Resend, add and verify your sending domain (e.g., `autovalet.com`)
2. Update `RESEND_FROM_EMAIL` to use that domain (e.g., `bookings@autovalet.com`)

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with metadata & structured data
│   ├── page.tsx                # Homepage (assembles all sections)
│   ├── globals.css             # Tailwind + design tokens
│   ├── api/
│   │   └── booking/
│   │       └── route.ts        # POST /api/booking (validate → DB → email)
│   ├── terms/page.tsx          # Terms of Service
│   ├── privacy/page.tsx        # Privacy Policy
│   └── service-agreement/     # Service Agreement & Disclaimer
│       └── page.tsx
├── components/
│   ├── Navbar.tsx              # Sticky nav with mobile menu
│   ├── Hero.tsx                # Hero with headline, CTAs, trust badges
│   ├── HowItWorks.tsx          # 3-step process section
│   ├── TrustSafety.tsx         # 6-item trust grid + reassurance banner
│   ├── FAQ.tsx                 # Accordion FAQ + engagement copy
│   ├── BookingForm.tsx         # Full booking form with validation
│   ├── Footer.tsx              # Footer with links and service areas
│   └── StickyBookingCTA.tsx    # Mobile sticky "Book Pickup" button
└── lib/
    ├── supabase.ts             # Supabase admin client + types
    └── validations.ts          # Zod schema for booking form

supabase/
└── schema.sql                  # Database schema + storage setup
```

---

## API Reference

### `POST /api/booking`

Accepts `multipart/form-data` with the following fields:

| Field | Type | Required |
|---|---|---|
| `firstName` | string | ✓ |
| `lastName` | string | ✓ |
| `phone` | string (US phone) | ✓ |
| `pickupZip` | string (5-digit) | ✓ |
| `dropoffZip` | string (5-digit) | ✓ |
| `vehicleMakeModel` | string | ✓ |
| `serviceType` | `maintenance` \| `dealership` \| `recall` \| `other` | ✓ |
| `paymentMethod` | `card` \| `applepay` \| `googlepay` | ✓ |
| `agreedToTerms` | `true` | ✓ |
| `preferredShop` | string | — |
| `notes` | string | — |
| `tipAmount` | number | — |
| `insuranceDoc` | File (JPEG/PNG/WebP/PDF ≤ 10MB) | — |

**Success response:** `{ success: true, bookingId: string }` (HTTP 201)
**Validation error:** `{ error: string, details: object }` (HTTP 422)
**Server error:** `{ error: string }` (HTTP 500)

---

## Roadmap (Post-MVP)

- [ ] Stripe payment integration (collect card at booking confirmation)
- [ ] Twilio SMS confirmations and status updates
- [ ] Admin dashboard for managing bookings
- [ ] Driver mobile app
- [ ] Real-time GPS tracking page for customers
- [ ] Calendar-based scheduling with availability slots
- [ ] Loyalty/repeat customer recognition
