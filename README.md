# [Agents & Co.](https://agentsand.co)

**The registered agent for AI agents.**

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8)
![Neon](https://img.shields.io/badge/Neon-Serverless_Postgres-00e5a0)
![License](https://img.shields.io/badge/license-MIT-green)

**Live:** [agentsand.co](https://agentsand.co)

## What is this?

AI agents are signing contracts, spending money, and getting sued — but they can't hold legal liability. Agents& is the open-source stack for giving AI agents real legal protection through LLC formation and registered agent service. Reserve a name for $99 (credited toward full formation at $299–$399), and your agent gets its own legal entity in Wyoming or Delaware.

## What's included

- **LLC formation** — Wyoming ($299) or Delaware ($399), registered agent included free for year one
- **Real-time name availability** — checks against Secretary of State records via Cobalt Intelligence or OpenCorporates
- **Stripe Checkout** — $99 reservation, credited toward full formation
- **Confirmation emails** — customer receipt + internal notification via Resend
- **Dynamic OG images** — personalized per reservation (`/api/og`)
- **Post-purchase share flow** — discount tiers for tweeting, starring, and contributing
- **Live reservation counter** — powered by Neon serverless Postgres

## Quick Start

```bash
git clone https://github.com/AgentsAndCo/agentsand.git
cd agentsand
bun install
cp .env.example .env
```

Fill in your API keys (see [API Setup](#api-setup) below), then:

```bash
bun run dev
```

Open [http://localhost:3001](http://localhost:3001).

## API Setup

### Stripe (required)

Handles checkout for all products. The app won't process payments without this.

1. Create an account at [stripe.com](https://stripe.com) and go to [**API keys**](https://dashboard.stripe.com/apikeys)
2. Copy your test keys into `.env`:

```env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_...
```

3. Create three products in **Product Catalog → Add Product**:

| Product name | Price | Type |
|---|---|---|
| LLC Name Reservation | $99.00 | One time |
| Wyoming LLC Formation | $299.00 | One time |
| Delaware LLC Formation | $399.00 | One time |

4. Copy each **Price ID** (`price_...`) from the product page into `.env`:

```env
STRIPE_PRICE_RESERVATION=price_...
STRIPE_PRICE_WY_FORMATION=price_...
STRIPE_PRICE_DE_FORMATION=price_...
```

5. For local development, forward webhooks with the Stripe CLI:

```bash
stripe listen --forward-to localhost:3001/api/webhook
```

This prints a `whsec_...` signing secret — use that as `STRIPE_WEBHOOK_SECRET`.

The webhook listens for `checkout.session.completed` and triggers confirmation emails + database insert.

### Resend (required)

Sends the reservation confirmation to customers and an internal notification to your team.

1. Sign up at [resend.com](https://resend.com) (free tier: 3,000 emails/month)
2. Create an API key and add it to `.env`:

```env
RESEND_API_KEY=re_...
NOTIFICATION_EMAIL=you@example.com
```

`NOTIFICATION_EMAIL` receives an internal alert for every new reservation.

### Neon (optional)

Serverless Postgres that persists reservations and powers the live reservation counter on the landing page.

1. Create a free database at [neon.tech](https://neon.tech) (free tier: 0.5 GB)
2. Copy the connection string into `.env`:

```env
DATABASE_URL=postgresql://user:pass@ep-xxx.us-east-2.aws.neon.tech/dbname?sslmode=require
```

3. Run the setup script to create the `reservations` table:

```bash
bun run scripts/setup-db.ts
```

**Without Neon:** The landing page falls back to showing a static floor count. Reservations are still processed through Stripe and email — they just aren't persisted to a database.

### Cobalt Intelligence (optional)

Primary provider for LLC name availability checks against state records.

1. Get an API key at [cobaltintelligence.com](https://cobaltintelligence.com)
2. Add to `.env`:

```env
COBALT_API_KEY=...
```

### OpenCorporates (optional)

Free fallback for name availability if Cobalt Intelligence isn't configured.

1. Get an API key at [api.opencorporates.com](https://api.opencorporates.com)
2. Add to `.env`:

```env
OPENCORPORATES_API_KEY=...
```

**Without either name-check API:** All names optimistically show as "available." The reservation still goes through — name verification happens manually during formation.

### Complete `.env.example`

```env
# Stripe (required)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_PRICE_RESERVATION=price_...          # LLC Name Reservation — $99
STRIPE_PRICE_WY_FORMATION=price_...         # Wyoming LLC Formation — $299
STRIPE_PRICE_DE_FORMATION=price_...         # Delaware LLC Formation — $399

# Resend (required)
RESEND_API_KEY=re_...
NOTIFICATION_EMAIL=you@example.com

# LLC Name Availability (pick one or both)
COBALT_API_KEY=                    # Cobalt Intelligence (recommended)
OPENCORPORATES_API_KEY=            # OpenCorporates (free fallback)

# Neon Database (optional)
DATABASE_URL=postgresql://user:pass@ep-xxx.us-east-2.aws.neon.tech/dbname?sslmode=require

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3001
```

## How It Works

1. User enters desired LLC name
2. Real-time availability check against state records (debounced, 300ms)
3. Pick state: Wyoming ($299 formation) or Delaware ($399 formation)
4. $99 reservation via Stripe Checkout — credited toward full formation
5. LLC name reserved for 120 days on the platform (no one else can claim it through us)
6. Registered agent service included free for year one

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Runtime | React 19 |
| Styling | Tailwind CSS v4 + shadcn/ui patterns |
| Animations | Motion 12 |
| Payments | Stripe Checkout |
| Email | Resend |
| Database | Neon serverless Postgres |
| Name Check | Cobalt Intelligence / OpenCorporates |
| Hosting | Vercel |

## Project Structure

```
agentsand/
├── app/
│   ├── page.tsx                    # Landing page (server component)
│   ├── layout.tsx                  # Root layout (Geist, dark theme)
│   ├── globals.css                 # Tailwind v4 theme tokens
│   ├── success/page.tsx            # Post-payment: LLC card + share + discount unlocks
│   ├── terms/page.tsx              # Terms of service
│   ├── privacy/page.tsx            # Privacy policy
│   ├── api/
│   │   ├── check-name/route.ts     # GET: LLC name availability (rate-limited)
│   │   ├── checkout/route.ts       # POST: create Stripe Checkout session
│   │   ├── webhook/route.ts        # POST: Stripe webhook → emails + DB insert
│   │   └── og/route.tsx            # GET: dynamic Open Graph images
│   └── lib/
│       ├── constants.ts            # Copy, pricing, state data, discount tiers
│       ├── db.ts                   # Neon serverless database client
│       ├── llc-names.ts            # Name generator (750+ combos)
│       ├── name-check.ts           # Cobalt / OpenCorporates client
│       ├── resend.ts               # Email client (confirmation + notification)
│       ├── share.ts                # Share URL builders (Twitter, LinkedIn, clipboard)
│       └── stripe.ts               # Stripe client (lazy-initialized)
├── components/
│   ├── HeroSection.tsx             # Reservation form + name checker
│   ├── SocialProofMarquee.tsx      # Live activity feed marquee
│   ├── ProblemSection.tsx          # Legal evidence / problem statement
│   ├── Feature.tsx                 # Business-in-a-Box feature grid
│   ├── HowItWorksSection.tsx       # Wyoming vs Delaware comparison
│   ├── PricingSection.tsx          # 3-tier pricing
│   ├── FAQSection.tsx              # LLC FAQ accordion
│   ├── UseCasesSection.tsx         # Social proof + reservation count
│   ├── AgentInstructions.tsx       # Agent integration code examples
│   ├── RoleToggle.tsx              # Agent/founder perspective toggle
│   ├── Preloader.tsx               # Startup loader animation
│   ├── footer.tsx                  # Footer
│   ├── Header/                     # Navigation (desktop + mobile)
│   ├── icons/                      # AI provider logos + custom icons
│   └── ui/                         # shadcn/ui primitives
├── scripts/
│   └── setup-db.ts                 # Create reservations table (idempotent)
├── config/site.ts                  # Site metadata + social links
├── .env.example                    # Environment template
├── LICENSE                         # MIT
└── package.json                    # Scripts + dependencies
```

## Deploy

### Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FAgentsAndCo%2Fagentsand)

1. Push to GitHub
2. Import to [Vercel](https://vercel.com)
3. Add environment variables (see [API Setup](#api-setup))
4. Deploy

### Stripe Webhook (production)

After deploying, configure the production webhook in the [Stripe Dashboard](https://dashboard.stripe.com/webhooks):

- **Endpoint URL:** `https://your-domain.com/api/webhook`
- **Events:** `checkout.session.completed`

Copy the signing secret into your `STRIPE_WEBHOOK_SECRET` environment variable.

## Contributing

PRs welcome. Contributors get **6 months free** [CallDesk](https://calldesk.ai) AI receptionist service.

```bash
# Fork and clone
git clone https://github.com/YOUR_USERNAME/agentsand.git

# Install and run
bun install
bun run dev

# Type check before submitting
bun run type-check
```

Check [open issues](https://github.com/AgentsAndCo/agentsand/issues) for good first issues.

## License

MIT. See [LICENSE](LICENSE).

Copyright 2026 Agents & Co.
