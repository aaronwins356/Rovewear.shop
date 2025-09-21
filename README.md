# ROVEwear Shop – React + Tailwind storefront

This repository contains the ROVE eyewear storefront built with Create React App (TypeScript), Tailwind CSS, and a lightweight custom router tailored for Vercel deployments. The project ships with a fully mocked product catalog, cart management via React Context, cinematic motion via Framer Motion, and a deploy-ready Stripe Checkout integration (test mode).

## Prerequisites

- **Node.js 18+**
- **npm 9+**
- **Git**

If you use a Node version manager such as `nvm`, set the correct Node.js version before installing dependencies.

## Installation

```bash
git clone https://github.com/<your-org>/Rovewear.shop.git
cd Rovewear.shop
npm install
```

> If your environment restricts access to the public npm registry, mirror packages locally or configure an internal proxy before running `npm install`.

## Environment Variables

Create a `.env` file in the project root (CRA automatically loads it) and populate the following variables. Never commit real secrets to version control.

| Variable | Description |
| --- | --- |
| `REACT_APP_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key used in the browser when redirecting to Checkout. |
| `STRIPE_SECRET_KEY` | Secret key consumed by the Vercel API function to create Checkout Sessions. |
| `CLIENT_URL` | Optional. Overrides the base URL used for Stripe success/cancel redirects (defaults to `http://localhost:3000`). |

On Vercel, configure the same variables through the dashboard.

## Available Scripts

| Command | Purpose |
| --- | --- |
| `npm start` | Starts the local development server on [http://localhost:3000](http://localhost:3000) with hot reloading. |
| `npm run build` | Produces a production build inside the `build/` directory. |
| `npm test` | Runs the default Create React App test runner (Jest) in watch mode. |
| `npm run lint` | Runs ESLint on all TypeScript source files. |
| `npm run typecheck` | Executes `tsc --noEmit` to validate TypeScript types. |

Run all quality checks before opening a pull request:

```bash
npm run lint && npm run typecheck && npm run build
```

## Project Structure

```
Rovewear.shop/
├── api/                         # Vercel serverless functions (Stripe Checkout session)
├── public/                      # Static assets and placeholder product imagery
├── src/
│   ├── components/              # Reusable UI components (Hero, NavBar, ProductCard, etc.)
│   ├── context/                 # Cart context and providers
│   ├── data/                    # Placeholder product catalog (JSON)
│   ├── pages/                   # Page-level React components mapped by the router
│   ├── router/                  # Custom SPA router powering in-app navigation
│   ├── utils/                   # Formatting helpers and Stripe loader
│   └── index.tsx                # Application bootstrap
├── tailwind.config.js           # Tailwind CSS configuration
└── tsconfig.json                # TypeScript compiler settings
```

## Stripe Test Mode

- Use the test publishable/secret keys from your Stripe dashboard.
- Default success URL: `http://localhost:3000/success`
- Default cancel URL: `http://localhost:3000/cancel`
- Test cards: `4242 4242 4242 4242` with any future expiry and CVC.

## Deployment

1. Push to GitHub.
2. Create a Vercel project pointing to this repository.
3. Configure the environment variables described above.
4. Deploy the `main` branch. The build command is `npm run build`, and the output directory is `build/`.

After deployment, connect the `rovewear.shop` domain inside Vercel’s dashboard.

## Troubleshooting

- **Dependency install errors**: configure npm to use an accessible registry or install packages from a private mirror.
- **Tailwind styles missing**: ensure `postcss.config.js` and `tailwind.config.js` are present and `src/index.css` imports the Tailwind directives.
- **Stripe redirect issues**: verify both publishable and secret keys are present and that the domain matches the `CLIENT_URL` env variable.

For additional questions, open an issue or contact the Rovewear engineering team.
