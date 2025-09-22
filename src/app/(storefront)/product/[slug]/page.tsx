import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { FeaturedProductsCarousel } from "@/components/sections/FeaturedProductsCarousel";
import { ProductGallery } from "@/components/sections/ProductGallery";
import { ProductReviews } from "@/components/sections/ProductReviews";
import { ProductSpecs } from "@/components/sections/ProductSpecs";
import { AddToCartButton } from "@/components/ui/AddToCartButton";
import { getProductBySlug, getProducts } from "@/lib/products";
import { formatCurrency } from "@/lib/utils";

interface ProductPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) {
    return {
      title: "Product not found",
      description: "The requested ROVE eyewear piece could not be located."
    };
  }

  return {
    title: `${product.title} | ROVE Designer Eyewear`,
    description: product.description,
    openGraph: {
      title: `${product.title} | ROVE Designer Eyewear`,
      description: product.description,
      type: "website"
    }
  };
}

export default async function ProductPage({ params }: ProductPageProps): Promise<JSX.Element> {
  const product = await getProductBySlug(params.slug);
  if (!product) {
    notFound();
  }

  const galleryImages = product.images.length > 0 ? product.images : product.heroImage ? [product.heroImage] : [];
  const otherProducts = (await getProducts()).filter((item) => item._id !== product._id).slice(0, 3);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <ProductGallery images={galleryImages} title={product.title} />
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-semibold text-neutral-900">{product.title}</h1>
            <p className="mt-3 text-sm text-neutral-500">{product.description}</p>
            <p className="mt-4 text-2xl font-semibold text-neutral-900">
              {formatCurrency(product.price, product.currency)}
            </p>
          </div>
          <div className="space-y-4">
            <AddToCartButton product={product} />
            <p className="text-xs text-neutral-500">
              Ships carbon-neutral worldwide. Free 30-day returns and lifetime tune-ups.
            </p>
          </div>
          <ProductSpecs product={product} />
        </div>
      </div>
      <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <ProductReviews product={product} />
        <section className="rounded-3xl border border-neutral-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-neutral-900">Lens technology</h2>
          <p className="mt-3 text-sm text-neutral-600">
            Each ROVE lens is precision-ground with adaptive coatings to block glare and blue light without compromising
            natural color perception. Sanity Studio lets you update specs, descriptions, and availability in real time.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-neutral-600">
            <li>Zeiss optics with 100% UVA/UVB protection</li>
            <li>Hydrophobic and oleophobic nano-coating</li>
            <li>Free lifetime adjustments at partner studios</li>
          </ul>
        </section>
      </div>
      {otherProducts.length > 0 ? (
        <div className="mt-16">
          <FeaturedProductsCarousel products={otherProducts} title="You may also like" />
        </div>
      ) : null}
    </div>
  );
}
