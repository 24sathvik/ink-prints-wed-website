import { getProductById, getProducts } from '@/lib/get-products';
import { ProductDetails } from '@/components/ProductDetails';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const products = getProducts();
  return products.map((product) => ({
    id: product.id,
  }));
}

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return notFound();
  }

  return (
    <main className="min-h-screen pt-24 pb-20 bg-[#FFFDF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#6B6462] mb-12">
          <Link href="/" className="hover:text-[#C4A87C]">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#C4A87C]">Collections</Link>
          <span>/</span>
          <span className="text-[#2D2926] font-semibold">{product.title}</span>
        </nav>

        <ProductDetails product={product} />
      </div>
    </main>
  );
}
