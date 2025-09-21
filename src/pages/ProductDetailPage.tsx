import React, { useEffect } from 'react';
import { getProductById } from '../data';
import { ProductDetail } from '../components/ProductDetail';
import { useRouter } from '../router/RouterProvider';
import { Seo } from '../components/Seo';

interface ProductDetailPageProps {
  productId: string;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ productId }) => {
  const product = getProductById(productId);
  const { navigate } = useRouter();

  useEffect(() => {
    if (!product) {
      navigate('/products', { replace: true });
    }
  }, [navigate, product]);

  if (!product) {
    return null;
  }

  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-12">
      <Seo
        title={`${product.name} | ROVE Eyewear`}
        description={product.description}
        ogImage={product.image}
      />
      <ProductDetail product={product} />
    </div>
  );
};
