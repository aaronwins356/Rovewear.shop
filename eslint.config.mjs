import { FlatCompat } from "@eslint/eslintrc";
import path from "node:path";
import { fileURLToPath } from "node:url";

const compat = new FlatCompat({
  baseDirectory: path.dirname(fileURLToPath(new URL(import.meta.url)))
});

export default [
  {
    ignores: ["node_modules", ".next", ".sanity", "coverage", "dist"]
  },
  // We rely on the legacy Next.js preset but load it through the flat config compatibility layer.
  ...compat.extends("next/core-web-vitals")
];
