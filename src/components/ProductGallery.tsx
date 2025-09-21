"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

interface ProductGalleryProps {
  images: string[];
  title: string;
}

export function ProductGallery({ images, title }: ProductGalleryProps) {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % images.length);
  const prev = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="space-y-4">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-slate-900">
        <AnimatePresence initial={false}>
          <motion.div
            key={images[index]}
            initial={{ opacity: 0.2, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Image src={images[index]} alt={title} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </motion.div>
        </AnimatePresence>
        {images.length > 1 ? (
          <div className="absolute inset-0 flex items-center justify-between px-3">
            <button
              type="button"
              className="rounded-full bg-black/40 p-3 text-xs uppercase tracking-[0.3em] text-white backdrop-blur"
              onClick={prev}
            >
              Prev
            </button>
            <button
              type="button"
              className="rounded-full bg-black/40 p-3 text-xs uppercase tracking-[0.3em] text-white backdrop-blur"
              onClick={next}
            >
              Next
            </button>
          </div>
        ) : null}
      </div>
      {images.length > 1 ? (
        <div className="flex gap-2 overflow-x-auto">
          {images.map((image, imageIndex) => (
            <button
              type="button"
              key={image}
              className={`relative h-20 w-20 overflow-hidden rounded-xl border ${
                index === imageIndex ? "border-white" : "border-transparent"
              }`}
              onClick={() => setIndex(imageIndex)}
            >
              <Image src={image} alt={`${title} thumbnail ${imageIndex + 1}`} fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
