import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { ProductImage } from '../types/product';

interface ProductGalleryProps {
  name: string;
  images: ProductImage[];
}

const ProductGallery = ({ name, images }: ProductGalleryProps) => {
  const media = useMemo(
    () =>
      images.length > 0
        ? images
        : [{ src: '/products/placeholder.svg' }], // Provide a graceful fallback if catalogue data omits extra imagery.
    [images],
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const active = media[activeIndex] ?? media[0];

  return (
    <div className="space-y-6">
      <motion.div
        key={active?.src}
        className="relative overflow-hidden rounded-[2.5rem] border border-neutral-200 bg-neutral-50"
        initial={{ opacity: 0.4, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        style={{ background: active?.background ?? undefined }}
      >
        <div className="relative flex aspect-square items-center justify-center p-10">
          <img
            src={active?.src}
            alt={active?.alt ?? name}
            className="h-full w-full max-w-lg object-contain"
            loading="lazy"
          />
        </div>
      </motion.div>
      {media.length > 1 && (
        <div className="flex gap-4">
          {media.map((item, index) => (
            <button
              key={`${item.src}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border transition ${
                index === activeIndex
                  ? 'border-neutral-900 shadow-lg'
                  : 'border-neutral-200 hover:border-neutral-400'
              }`}
            >
              <span className="absolute inset-0 opacity-10" style={{ background: item.background ?? undefined }} />
              <img src={item.src} alt={item.alt ?? `${name} preview`} className="relative z-10 h-14 w-14 object-contain" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
