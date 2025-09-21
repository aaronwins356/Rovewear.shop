# Rovewear Shop – Local Development Guide

This project is a Next.js 14 storefront styled with Tailwind CSS. Follow the steps below to clone the repository, configure the required environment variables, and run the site locally for development or QA.

## Prerequisites

- **Node.js 18.17+ or 20.x** (matching the Next.js 14 LTS support matrix)
- **npm 9+** (bundled with the recommended Node.js versions)
- **Git** for cloning the repository

> If you use a version manager (e.g., `nvm`), set the desired Node.js version before installing dependencies.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-org>/Rovewear.shop.git
   cd Rovewear.shop
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Configure Environment Variables

Create a `.env.local` file in the project root. Next.js automatically loads this file in development.

```bash
cp .env.example .env.local # if an example file is provided
```

Ensure the following variables are defined:

| Variable | Description |
| --- | --- |
| `STRIPE_SECRET_KEY` | Required for API routes that create Stripe checkout sessions. |
| `STRIPE_SUCCESS_URL` | Optional. Overrides the default post-checkout success URL. |
| `STRIPE_CANCEL_URL` | Optional. Overrides the default checkout cancel URL. |

Never commit real secrets to version control. In production (e.g., Vercel), configure the same variables in the hosting provider’s dashboard.

## Running the Development Server

Start the local dev server with hot reloading:

```bash
npm run dev
```

Then open [`http://localhost:3000`](http://localhost:3000) in your browser. Next.js will rebuild pages automatically as you edit files in `src/`.

## Additional Scripts

| Command | Purpose |
| --- | --- |
| `npm run lint` | Runs ESLint with the `next/core-web-vitals` ruleset. |
| `npm run typecheck` | Executes `tsc --noEmit` to validate TypeScript types. |
| `npm run build` | Creates an optimized production build. Runs the same checks required by CI. |
| `npm run start` | Serves the production build locally (run `npm run build` first). |

Running all quality gates before opening a pull request is recommended:

```bash
npm run lint && npm run typecheck && npm run build
```

## Project Structure Highlights

- `src/app` – App Router entry points, layouts, and pages.
- `src/components` – Reusable UI components.
- `src/lib` – Shared utilities (e.g., API clients, helpers).
- `src/app/api` – Route handlers for server-side functionality (Stripe checkout, etc.).

## Troubleshooting

- **Port already in use**: stop the process occupying port 3000 or set `PORT=3001 npm run dev` to use another port.
- **Dependency issues**: delete `node_modules` and `package-lock.json`, then reinstall (`npm install`).
- **Environment variables not loading**: ensure `.env.local` exists and restart the dev server after changes.

For additional documentation or questions, create an issue or contact the Rovewear engineering team.
