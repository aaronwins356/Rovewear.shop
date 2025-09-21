# ROVE Shop

A modern eyewear storefront starter built with React, TypeScript, Vite, and Tailwind CSS. The project is optimised for Vercel
deployments and provides a luxurious, minimal shopping experience out of the box.

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:5173` to explore the storefront.

## Available Scripts

- `npm run dev` – start the Vite dev server.
- `npm run build` – create an optimised production build in `dist`.
- `npm run preview` – preview the production build locally.

## Tech Stack

- React + TypeScript powered by Vite
- Tailwind CSS with the `@tailwindcss/postcss` plugin
- React Router for client-side routing
- Persistent cart state via React context + `localStorage`

## Deploying to Vercel

1. Push this repository to GitHub (or your preferred Git provider).
2. Create a new Vercel project and import the repo.
3. Set the build command to `vite build` and the output directory to `dist`.
4. Configure environment variables (e.g. Stripe credentials) within Vercel – never commit secrets.

Optional: include a `vercel.json` rewrite for Single Page App routing if you need to support non-root paths without server
configuration.

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

## Customising

- Update `src/data/products.json` with your product catalogue.
- Swap placeholder SVGs in `public/products` with product photography.
- Integrate your preferred CMS or e-commerce backend by extending the provided context and pages.

The project is intentionally lean so you can add analytics, marketing integrations, and checkout providers without refactoring
legacy tooling.
