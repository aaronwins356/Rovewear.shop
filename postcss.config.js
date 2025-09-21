/**
 * Tailwind CSS v4 exposes a dedicated PostCSS plugin entrypoint.
 * Keeping the plugin list declarative avoids the legacy warning about
 * using tailwindcss directly as the PostCSS plugin.
 */
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
    autoprefixer: {}
  }
};

module.exports = config;
