import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import type { Category } from "@/types/product";

interface CategoryShowcaseProps {
  categories: Category[];
}

export function CategoryShowcase({ categories }: CategoryShowcaseProps): JSX.Element {
  if (categories.length === 0) {
    return <></>;
  }

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-neutral-900">Shop by category</h2>
            <p className="mt-2 max-w-lg text-sm text-neutral-500">
              Modular product taxonomy lives in Sanity. Update capsules and merchandising from the studio.
            </p>
          </div>
          <Link
            href="/catalog"
            className="inline-flex items-center rounded-full border border-neutral-200 px-5 py-2 text-sm font-semibold text-neutral-900 transition hover:border-neutral-300 hover:bg-neutral-100"
          >
            View all
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <motion.article
              key={category._id}
              className="group relative overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-50"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="relative h-60 w-full overflow-hidden">
                {category.heroImage?.url ? (
                  <Image
                    src={category.heroImage.url}
                    alt={category.heroImage.alt ?? category.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(min-width: 1024px) 400px, 90vw"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-neutral-100 text-sm text-neutral-500">
                    Coming soon
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-semibold">{category.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-white/80">
                    {category.description ?? "Hand-curated eyewear capsules."}
                  </p>
                </div>
              </div>
              <div className="px-6 py-4">
                <Link
                  href={`/catalog?category=${category.slug}`}
                  className="inline-flex items-center text-sm font-semibold text-neutral-900 hover:text-neutral-600"
                >
                  Explore category →
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
