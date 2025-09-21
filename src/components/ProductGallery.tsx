import React, { useState } from 'react';
import { motion, AnimatePresence, type PanInfo } from 'framer-motion';

interface ProductGalleryProps {
  images: string[];
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 80;
    if (info.offset.x < -threshold && activeIndex < images.length - 1) {
      setActiveIndex((prev) => prev + 1);
    } else if (info.offset.x > threshold && activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-brand.accent/40 to-black">
        <AnimatePresence initial={false} mode="wait">
          <motion.img
            key={images[activeIndex]}
            src={images[activeIndex]}
            alt="ROVE eyewear"
            className="h-[28rem] w-full object-cover"
            initial={{ opacity: 0.4, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.5 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd as never}
          />
        </AnimatePresence>
      </div>
      <div className="flex justify-center gap-2">
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`h-2 w-8 rounded-full transition ${
              index === activeIndex ? 'bg-white' : 'bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`View product image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
