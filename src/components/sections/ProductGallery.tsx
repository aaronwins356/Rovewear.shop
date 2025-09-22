"use client";

import Image from "next/image";
import { useState } from "react";

import type { ImageAsset } from "@/types/product";

interface ProductGalleryProps {
  images: ImageAsset[];
  title: string;
}

export function ProductGallery({ images, title }: ProductGalleryProps): JSX.Element {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex];

  return (
    <div>
      <div className="relative aspect-square overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-100">
        {activeImage?.url ? (
          <Image
            src={activeImage.url}
            alt={activeImage.alt ?? title}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 560px, 90vw"
            priority
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-neutral-500">Imagery coming soon</div>
        )}
      </div>
      {images.length > 1 ? (
        <div className="mt-4 grid grid-cols-4 gap-4">
          {images.map((image, index) => (
            <button
              key={image.url}
              type="button"
              className={`relative aspect-square overflow-hidden rounded-2xl border ${
                index === activeIndex ? "border-neutral-900" : "border-transparent"
              }`}
              onClick={() => setActiveIndex(index)}
              aria-label={`View image ${index + 1} for ${title}`}
            >
              <Image src={image.url} alt={image.alt ?? title} fill className="object-cover" sizes="120px" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
