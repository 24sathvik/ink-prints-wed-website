"use client";

import { useEffect, useState } from 'react';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';
import { Product } from '@/lib/products';
import { ProductCard } from './ProductCard';
import { motion } from 'framer-motion';

// We need to fetch product details. Since this is a client component, 
// and we don't have a robust API yet, we might need to pass all products 
// or fetch them. For now, we'll fetch from a server action or API if available, 
// or simpler: we'll accept a list of all products (or a lookup function) as a prop 
// OR we can fetch from the static JSON files via an API route. 
// However, `getProducts` is server-side.
// OPTION: We'll create a simple API route /api/products to get all products. 
// OR simpler for this task: We can pass `products` from the parent (Home page) if available.
// Home page is a Server Component, so it can fetch products and pass them.
// Let's do that: Pass `products` prop.

interface RecentlyViewedProps {
    products: Product[];
}

export function RecentlyViewed({ products }: RecentlyViewedProps) {
    const { recentIds } = useRecentlyViewed();
    const [viewedProducts, setViewedProducts] = useState<Product[]>([]);

    useEffect(() => {
        if (recentIds.length > 0 && products.length > 0) {
            const filtered = recentIds
                .map(id => products.find(p => p.id === id))
                .filter((p): p is Product => p !== undefined);
            setViewedProducts(filtered);
        }
    }, [recentIds, products]);

    if (viewedProducts.length === 0) return null;

    return (
        <section className="py-24 bg-[#f2efe6]">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="font-serif text-3xl md:text-4xl text-[#32612d] mb-4">Recently Viewed</h2>
                    <div className="h-1 w-20 bg-[#dcd8cc] mx-auto rounded-full" />
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                    {viewedProducts.map((product, index) => (
                        <ProductCard key={product.id} product={product} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
