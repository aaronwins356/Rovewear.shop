import { format } from "date-fns";

import type { Product } from "@/types/product";
import { StarIcon } from "@/components/ui/icons";

export function ProductReviews({ product }: { product: Product }): JSX.Element {
  const reviews = product.reviews ?? [];

  if (reviews.length === 0) {
    return (
      <section className="rounded-3xl border border-dashed border-neutral-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-neutral-900">Customer reviews</h2>
        <p className="mt-3 text-sm text-neutral-500">Reviews will appear here as customers share their experiences.</p>
      </section>
    );
  }

  const average =
    reviews.reduce((total, review) => total + (review.rating ?? 0), 0) / (reviews.length > 0 ? reviews.length : 1);

  return (
    <section className="space-y-6 rounded-3xl border border-neutral-200 bg-white p-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 text-amber-500">
          {Array.from({ length: 5 }).map((_, index) => (
            <StarIcon key={index} className={`h-5 w-5 ${index < Math.round(average) ? "" : "opacity-30"}`} />
          ))}
        </div>
        <p className="text-sm font-medium text-neutral-900">
          {average.toFixed(1)} average · {reviews.length} review{reviews.length === 1 ? "" : "s"}
        </p>
      </div>
      <ul className="space-y-4">
        {reviews.map((review) => (
          <li key={review._id} className="rounded-2xl border border-neutral-100 bg-neutral-50 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-neutral-900">{review.name}</span>
              <time className="text-xs text-neutral-500" dateTime={review.createdAt}>
                {format(new Date(review.createdAt), "PP")}
              </time>
            </div>
            <p className="mt-2 text-sm text-neutral-600">{review.comment}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
