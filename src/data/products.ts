export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  tags: string[];
}

export const PRODUCTS_DATA_URL = "/products/products.json" as const;

function isProduct(value: unknown): value is Product {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const record = value as Record<string, unknown>;
  return (
    typeof record.id === "string" &&
    typeof record.name === "string" &&
    typeof record.description === "string" &&
    typeof record.price === "number" &&
    typeof record.image === "string" &&
    Array.isArray(record.tags) &&
    record.tags.every((tag) => typeof tag === "string")
  );
}

export function parseProducts(payload: unknown): Product[] {
  if (!Array.isArray(payload)) {
    throw new Error("Product manifest is not an array.");
  }

  const parsed = payload.filter(isProduct);

  if (parsed.length !== payload.length) {
    throw new Error("Product manifest contains invalid entries.");
  }

  return parsed;
}

export async function fetchProductsFromJson(signal?: AbortSignal): Promise<Product[]> {
  const response = await fetch(PRODUCTS_DATA_URL, { signal });

  if (!response.ok) {
    throw new Error(`Unable to load products (status ${response.status}).`);
  }

  const payload = (await response.json()) as unknown;
  return parseProducts(payload);
}

export function getProductById(products: Product[], id: string): Product | undefined {
  return products.find((product) => product.id === id);
}
