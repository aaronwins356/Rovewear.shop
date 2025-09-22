# Rovewear Shop

Rovewear Shop is a Vite + React + TypeScript storefront starter configured for Tailwind CSS v4 and Vercel deployments. The app includes curated placeholder inventory and product insight panels so you can focus on wiring real data sources or connecting a headless CMS.

## Requirements

- Node.js 20.18 LTS (matching the `engines` field)
- npm 10+

## Clean Reinstall

If dependencies ever drift or you need to start fresh in Codespaces, a local terminal, or another cloud IDE, run these commands in order:

```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

- `npm run dev` starts the Vite development server on <http://localhost:3000>.
- `npm run build` bundles the app for production into `dist/`.
- `npm run preview` serves the built bundle locally for final verification.

## Project Structure

```
├── index.html            # Vite entry document
├── public/               # Static assets (placeholder product imagery)
├── public/
│   └── products/
│       ├── products.json # Placeholder inventory served with the built site
│       └── *.svg         # Product illustrations referenced by components
├── src/
│   ├── App.tsx           # Application shell
│   ├── components/       # Reusable UI building blocks
│   ├── data/products.ts  # Typed helpers for the JSON manifest
│   └── styles/index.css  # Tailwind entry point + global styles
├── tailwind.config.ts    # Tailwind v4 configuration
└── vite.config.ts        # Vite build + dev server settings
```

The `public/products/` directory retains the placeholder imagery and the `products.json` manifest consumed by the storefront. Components load this static JSON file at runtime, so you can swap in a CMS, REST API, or e-commerce SDK later without rewriting UI components.

## Deployment

The included `vercel.json` configures Vercel to run `npm run build` (which maps to `vite build`) and serve the `dist/` directory. A single-page-app fallback ensures direct URL visits resolve correctly after client-side routing is introduced.

Pushes to `main` (or any branch connected to Vercel) trigger automatic builds—no manual uploads or file copies are required.

## Tailwind CSS v4

Tailwind CSS v4 is enabled through the `@tailwindcss/postcss` plugin. Styles are imported once in `src/styles/index.css`, and the `content` array in `tailwind.config.ts` scans the Vite entry document plus every component in `src/` to tree-shake unused classes.

## Codespaces / Devcontainers

A `.devcontainer/devcontainer.json` file pins the Node.js version and recommends VS Code extensions so you can open the project remotely with consistent tooling.

## Environment Variables

No environment variables are required for the placeholder storefront. Introduce them as you connect APIs (for example, payment gateways) and document the values in this section.
