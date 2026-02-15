import { getFeaturedProducts, getProducts } from "@/lib/get-products";
import { HomeContent } from "@/components/HomeContent";
import { Suspense } from 'react';

export default function Home() {
  const featuredProducts = getFeaturedProducts();
  const allProducts = getProducts();

  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f2efe6]" />}>
      <HomeContent
        featuredProducts={featuredProducts}
        allProducts={allProducts}
      />
    </Suspense>
  );
}
