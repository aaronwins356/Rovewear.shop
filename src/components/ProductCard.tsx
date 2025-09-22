import type { Product } from "../data/products";

interface ProductCardProps {
  product: Product;
  isActive?: boolean;
  onSelect?: (product: Product) => void;
}

export function ProductCard({ product, isActive = false, onSelect }: ProductCardProps) {
  const handleClick = () => {
    onSelect?.(product);
  };

  return (
    <article
      className={`flex cursor-pointer flex-col gap-4 rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${
        isActive ? "ring-2 ring-emerald-400" : ""
      }`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleClick();
        }
      }}
      aria-pressed={isActive}
    >
      <img
        src={product.image}
        alt=""
        className="h-40 w-full rounded-2xl bg-emerald-50 object-contain"
      />
      <div className="space-y-2 text-left">
        <div className="flex flex-wrap gap-2">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-800"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-xl font-semibold text-neutral-900">{product.name}</h3>
        <p className="text-sm leading-relaxed text-neutral-600">{product.description}</p>
        <p className="text-lg font-semibold text-emerald-700">${product.price}</p>
      </div>
    </article>
  );
}
