import { motion } from "framer-motion";

import type { Product } from "@/types/product";
import { ProductCard } from "@/components/ui/ProductCard";

interface FeaturedProductsCarouselProps {
  products: Product[];
  title?: string;
}

export function FeaturedProductsCarousel({ products, title = "Featured" }: FeaturedProductsCarouselProps): JSX.Element {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-neutral-900">{title}</h2>
          <p className="mt-2 text-sm text-neutral-500">Curated by our Sanity studio merch team.</p>
        </div>
      </div>
      <motion.div
        className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
      >
        {products.map((product) => (
          <motion.div key={product._id} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <ProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
