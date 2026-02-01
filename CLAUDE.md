# CLAUDE.md

## Project Overview

agentsand.co — "The registered agent for AI agents." Open-source (MIT) Next.js 16 app for LLC name reservation. Part of the CallDesk monorepo at `apps/agentsand/`.

## Development Commands

```bash
# From monorepo root
bun run dev:agentsand          # Start dev server on port 3001

# From apps/agentsand/
bun run dev                    # Start dev server (Turbopack, port 3001)
bun run build                  # Production build
bun run type-check             # TypeScript checking
```

Dev server: http://localhost:3001

## Architecture

Single-page landing with API routes for Stripe Checkout and LLC name checking.

### Pages
- `app/page.tsx` — Landing page (server component, composes sections)
- `app/success/page.tsx` — Post-payment: LLC name card, share buttons, discount unlocks
- `app/terms/page.tsx` — Terms of service
- `app/privacy/page.tsx` — Privacy policy

### API Routes
- `GET /api/check-name?name=...&state=WY` — LLC name availability via Cobalt Intelligence / OpenCorporates
- `POST /api/checkout` — Create Stripe Checkout session ($99)
- `POST /api/webhook` — Stripe webhook → Resend notification + confirmation emails

### Lib (`app/lib/`)
- `stripe.ts` — Lazy-initialized Stripe client (`getStripe()`)
- `resend.ts` — Lazy-initialized Resend client (`getResend()`)
- `name-check.ts` — Cobalt Intelligence API with OpenCorporates fallback
- `llc-names.ts` — Name generator (30 adj x 25 noun = 750 combos)
- `constants.ts` — All copy, pricing, state data, discount tiers
- `share.ts` — Twitter intent, LinkedIn, clipboard, Web Share API

### Components
Landing page sections (render order on `app/page.tsx`):
1. `HeroSection` — Reservation form with real-time name check + marquee
2. `Feature` — Business-in-a-Box 2x2 grid
3. `HowItWorksSection` — Wyoming vs Delaware comparison
4. `PricingSection` — 3-tier pricing ($99/$299/$399)
5. `FAQSection` — LLC FAQ accordion
6. `UseCasesSection` — Trust/social proof

### UI Foundation
Built on a professional template with:
- shadcn/ui patterns (Radix UI + CVA)
- Tailwind CSS v4 with `@theme` directive
- `next-themes` (defaultTheme="dark")
- Motion library for animations
- Geist font

### Key Patterns
- Accent color: `#A8F1F7` (cyan)
- Dashed borders: `border-dashed border-black/5 dark:border-white/10`
- Tight tracking: `tracking-tighter`
- Subtle backgrounds: `bg-black/2`, `bg-black/3`, `bg-white/5`
- Badge pattern: horizontal lines + pill with text
- Lazy client initialization for Stripe/Resend (avoids build-time errors)

## Environment Variables

See `.env.example` for full list. Required: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `RESEND_API_KEY`, `NOTIFICATION_EMAIL`.
