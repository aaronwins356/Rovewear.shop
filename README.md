# Grounded Living Storefront

Grounded Living is a Next.js 15 + Sanity + Tailwind CSS storefront starter designed for Vercel deployments. The project pairs the App Router with a live Sanity Studio so editorial content and product data can be managed alongside the customer-facing site.

## Requirements

- Node.js 20.18 LTS (matching the `engines` field)
- npm 10+

## Getting Started

The project is configured to install without peer dependency overrides. If you ever need to start from scratch, run the following commands in order:

```bash
# reinstall from scratch
rm -rf node_modules package-lock.json
npm install
npm run dev
```

- `npm run dev` starts the Next.js development server on `http://localhost:3000`.
- `npm run studio` runs the same dev server on port 3333 to focus on Sanity Studio.

## Available Scripts

- `npm run build` – build the production bundle for Vercel.
- `npm run start` – serve the production build locally.
- `npm run lint` – run ESLint using `next/core-web-vitals` rules.

## Environment Variables

Create a `.env.local` file and provide the following values before running the Sanity client or Studio:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-10-01
SANITY_API_TOKEN= # optional, only required for authenticated requests
```

> The project fails fast during compilation if the Sanity project ID is missing to avoid deploying with misconfigured credentials.

## Tailwind CSS v4

Tailwind CSS v4 is configured via `@tailwindcss/postcss` and `tailwind.config.ts`. Global styles live in `app/globals.css` and are automatically applied by the root layout.

## Sanity Studio

The embedded Studio is available at `/studio` in development and production. It uses the shared configuration in `sanity.config.ts` so schema updates and desk structure live alongside the application code.

## Deployment

Deploy directly to Vercel – no custom rewrites are required because the App Router handles routing server-side. Ensure the environment variables above are defined in the Vercel dashboard before triggering a build.
