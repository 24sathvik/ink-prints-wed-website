import { Suspense } from 'react';
import { getProducts, getCategories } from '@/lib/get-products';
import { ProductList } from './product-list';
import { ProductSkeleton } from '@/components/ProductSkeleton';

export default function ProductsPage() {
  const products = getProducts();
  const categories = getCategories();

  return (
    <Suspense fallback={
      <main className="min-h-screen pt-24 pb-20 bg-[#f2efe6]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="mb-12 space-y-4">
            <div className="h-4 w-32 bg-[#dcd8cc]/50 rounded animate-pulse" />
            <div className="h-12 w-64 bg-[#dcd8cc]/50 rounded animate-pulse" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {[...Array(8)].map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        </div>
      </main>
    }>
      <ProductList initialProducts={products} categories={categories} />
    </Suspense>
  );
}
