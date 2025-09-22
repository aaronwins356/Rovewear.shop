# ROVE Storefront

ROVE is a premium eyewear storefront built with the Next.js App Router, Tailwind CSS, Sanity CMS, and Stripe Checkout. The stack is production-ready for Vercel deployments and includes tooling for automated testing, linting, and type safety.

## Tech stack

- Next.js 15 App Router with TypeScript
- Tailwind CSS 4 with Framer Motion for interactions
- Sanity v4 Studio at `/studio`
- Stripe Checkout integration for payments
- Jest, Testing Library, and Playwright for automated tests
- Dockerfile and Dev Container for Codespaces

## Getting started

1. Install dependencies and start the development server:

   ```bash
   npm install
   npm run dev
   ```

2. Create a `.env.local` file with your Sanity credentials:

   ```bash
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_READ_TOKEN=your_token
   ```

   `SANITY_API_VERSION` is optional—the app defaults to `2024-09-01` if it is not supplied. Never commit real tokens to source control; store them in Vercel Project Settings when deploying.

## Scripts

- `npm run dev` – start the development server
- `npm run build` – create a production build
- `npm run start` – run the production build locally
- `npm run lint` – run ESLint with auto-fix
- `npm run typecheck` – run TypeScript in noEmit mode
- `npm test` – run Jest unit tests
- `npm run test:e2e` – run Playwright end-to-end tests

## Sanity Studio

The studio is exposed at `/studio` and uses the schemas in `src/sanity/schemas`. From the studio you can manage products, categories, marketing content, and site settings such as the homepage hero copy and footer links. Updates propagate to the storefront without code deployments thanks to GROQ queries and ISR-free data fetching. Use the `SANITY_API_READ_TOKEN` to enable draft previews during authenticated sessions.

Product placeholders used for skeleton states remain in `public/products/products.json`, which allows the storefront to render meaningful fallback data before live Sanity content is available.

## Dropshipping integration

`src/lib/dropshipping.ts` provides a typed integration point for forwarding orders to a supplier API (Shopify, WooCommerce, or custom). Extend the placeholder function with real HTTP requests and map Stripe sessions to supplier payloads.

## Testing & CI

GitHub Actions should run `npm run lint`, `npm run typecheck`, `npm test`, and optionally `npm run test:e2e`. Playwright requires the development server running (`npm run dev`) when tests execute.

## Deployment

The project is optimized for Vercel. `vercel.json` mirrors the dashboard configuration so builds succeed without manual tweaks:

- Install Command: `npm install --legacy-peer-deps`
- Build Command: `npm run build`
- Output Directory: `.next`
- Node.js version: `^20.18.0` (inherited from `package.json`)

Docker and Dev Container configuration enable cloud-based development.

When you push changes, Vercel installs dependencies, runs the Next.js build, and deploys the `.next` output directory. Sanity Studio remains available at `/studio` in every environment so your merchandising team can edit products directly in the deployed app.

