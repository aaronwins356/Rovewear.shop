export type ClassValue = string | number | null | undefined | Record<string, boolean> | ClassValue[];

export function cn(...inputs: ClassValue[]): string {
  const tokens: string[] = [];

  for (const input of inputs) {
    if (!input) continue;
    if (typeof input === "string" || typeof input === "number") {
      tokens.push(String(input));
    } else if (Array.isArray(input)) {
      tokens.push(cn(...input));
    } else {
      Object.entries(input).forEach(([key, value]) => {
        if (value) tokens.push(key);
      });
    }
  }

  return tokens.join(" ");
}

export function formatCurrency(value: number, currency: string = "USD", locale: string = "en-US"): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2
  }).format(value);
}

export function parseNumber(value: string | number | null | undefined): number | null {
  if (value === null || value === undefined) {
    return null;
  }

  const nextValue = typeof value === "string" ? Number.parseFloat(value) : value;
  return Number.isFinite(nextValue) ? nextValue : null;
}

export function slugify(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}
