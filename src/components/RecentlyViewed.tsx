"use client";

import { useEffect, useState } from 'react';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';
import { Product } from '@/lib/products';
import { ProductCard } from './ProductCard';
import { motion } from 'framer-motion';

// This Client Component fetches all products to populate the recent views list.

interface RecentlyViewedProps {
    excludeId?: string;
}

export function RecentlyViewed({ excludeId }: RecentlyViewedProps = {}) {
    const { recentIds } = useRecentlyViewed();
    const [viewedProducts, setViewedProducts] = useState<Product[]>([]);

    useEffect(() => {
        async function fetchProducts() {
            if (recentIds.length > 0) {
                try {
                    const res = await fetch('/api/products');
                    const allProducts: Product[] = await res.json();

                    const filtered = recentIds
                        .filter(id => id !== excludeId)
                        .map(id => allProducts.find((p: Product) => p.id === id))
                        .filter((p): p is Product => p !== undefined);

                    // Filter out the current viewed product from list
                    setViewedProducts(filtered);
                } catch (error) {
                    console.error("Failed to load products for recently viewed", error);
                }
            }
        }

        // Remove current product id if we want it completely hidden
        fetchProducts();
    }, [recentIds]);

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
