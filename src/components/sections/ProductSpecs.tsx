import type { Product } from "@/types/product";

export function ProductSpecs({ product }: { product: Product }): JSX.Element {
  const specs = product.specs ?? {};
  const entries = Object.entries(specs).filter(([, value]) => Boolean(value));

  if (entries.length === 0) {
    return <></>;
  }

  return (
    <section className="rounded-3xl border border-neutral-200 bg-white p-6">
      <h2 className="text-lg font-semibold text-neutral-900">Specifications</h2>
      <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {entries.map(([key, value]) => (
          <div key={key}>
            <dt className="text-xs uppercase tracking-wide text-neutral-500">{key.replace(/[A-Z]/g, (match) => ` ${match}`).trim()}</dt>
            <dd className="text-sm font-medium text-neutral-900">{value as string}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
