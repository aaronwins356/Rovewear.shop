# Rovewear Shop

Rovewear Shop is a Vite + React + TypeScript storefront starter configured for Tailwind CSS v4 and Vercel deployments. The app includes curated placeholder inventory and product insight panels so you can focus on wiring real data sources or connecting a headless CMS.

## Requirements

- Node.js 20.18 LTS (matching the `engines` field)
- npm 10+

## Installation & Scripts

Install dependencies once:

```bash
npm install
```

Available scripts:

- `npm run dev` – start the Vite development server on <http://localhost:5173> for local iteration.
- `npm run build` – create a production build in `dist/`.
- `npm run preview` – serve the production build locally to verify before deploying.
- `npm run lint` – run ESLint across TypeScript and JavaScript sources.

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

## Project Structure

```
├── index.html            # Vite entry document
├── public/               # Static assets served as-is
│   └── products/         # JSON manifest + product artwork
├── src/
│   ├── App.tsx           # Application shell
│   ├── components/       # Reusable UI building blocks
│   ├── data/products.ts  # Typed helpers + manifest loader
│   └── styles/index.css  # Tailwind entry point + global styles
├── tailwind.config.ts    # Tailwind v4 configuration
├── postcss.config.js     # Tailwind/PostCSS plugins
└── vite.config.ts        # Vite build + dev server settings
```

## Deployment on Vercel

A `vercel.json` file instructs Vercel to run `npm run build`, serve the `dist/` directory, and rewrite all routes to the SPA entry point. The typical workflow is:

1. Commit changes locally.
2. Push to GitHub.
3. Vercel automatically builds a preview deployment for the branch.
4. Merge or promote the preview to production when it looks good.

No manual ZIP uploads or environment tweaks are required—Vercel picks up the repo as-is.

## Tailwind CSS v4

Tailwind CSS v4 is enabled via the official `@tailwindcss/postcss` plugin. Styles are imported once in `src/styles/index.css`, and `tailwind.config.ts` scans `index.html` plus every component in `src/` to tree-shake unused classes.

## Clean Reinstall

If dependencies drift or you need to start fresh in Codespaces, a local terminal, or another cloud IDE, run:

```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

## Environment Variables

No environment variables are required for the placeholder storefront. Introduce them as you connect APIs (for example, payment gateways) and document the values in this section.
