import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/ProductDetail";
import { getAllProducts, getProductBySlug } from "@/lib/products";

interface ProductPageProps {
  params: { slug: string };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-6 pb-32">
      <ProductDetail product={product} />
    </div>
  );
}

export function generateStaticParams() {
  return getAllProducts().map((product) => ({ slug: product.slug }));
}
