# Rovewear Shop

Rovewear Shop is a Next.js 14 (App Router) storefront starter configured with Tailwind CSS and TypeScript. It ships with placeholder inventory, product storytelling panels, and a newsletter capture component so you can focus on wiring real data sources or connecting a headless CMS.

## Requirements

- Node.js 20.18 LTS (matching the `engines` field)
- npm 10+

## Installation & Scripts

Install dependencies once:

```bash
npm install
```

Available scripts:

- `npm run dev` – start the Next.js development server on <http://localhost:3000> for local iteration.
- `npm run build` – create an optimized production build.
- `npm run start` – serve the production build locally (useful for parity with Vercel).
- `npm run lint` – run ESLint with the `next/core-web-vitals` ruleset.
- `npm run typecheck` – verify TypeScript types without emitting compiled output.

## Project Structure

```
├── public/                     # Static assets served as-is
│   └── products/               # JSON manifest + product artwork
├── src/
│   ├── app/                    # Next.js App Router entry points
│   │   ├── layout.tsx          # Root layout + metadata
│   │   ├── page.tsx            # Homepage assembly
│   │   └── globals.css         # Tailwind entry point + global styles
│   ├── components/             # Reusable UI building blocks
│   └── data/                   # Typed helpers + manifest loader
├── tailwind.config.ts          # Tailwind configuration
├── postcss.config.js           # PostCSS plugins (Tailwind + Autoprefixer)
├── next.config.mjs             # Next.js configuration
├── package.json                # Scripts + dependencies
└── vercel.json                 # Deployment defaults for Vercel
```

## Product Data & Assets

All storefront products load at runtime from `public/products/products.json`. Each entry must provide:

```json
{
  "id": "wayfarer",
  "name": "Wayfarer Frames",
  "description": "Classic silhouettes crafted with plant-based acetate...",
  "price": 185,
  "image": "/products/wayfarer.svg",
  "tags": ["best seller", "handcrafted"]
}
```

- Add or edit inventory by updating `products.json`.
- Place matching imagery (SVGs, PNGs, JPEGs, etc.) inside `public/products/` and reference them by their `/products/<file>` path.
- Runtime fetch errors surface in the UI with a retry button so editors know if the manifest or asset path needs attention.

## Deployment on Vercel

This repository follows Vercel best practices for Next.js projects:

1. Commit changes locally.
2. Push to GitHub (or your connected Git provider).
3. Vercel automatically runs `npm install` and `npm run build`, then serves the `.next/` output.
4. Preview deployments are generated per branch; merge or promote the preview to production when it looks good.

No additional configuration is required—`vercel.json` simply keeps the build command explicit for clarity.

## Tailwind CSS

Tailwind CSS is configured via `tailwind.config.ts`, and class usage is automatically tree-shaken across the `app/`, `components/`, and `src/` directories. Global styles (including the Tailwind directives) live in `src/app/globals.css`.

## Environment Variables

No environment variables are required for the placeholder storefront. Introduce them as you connect APIs (for example, commerce providers or newsletter platforms) and document the values in this section.
