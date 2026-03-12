"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ShoppingBag,
    ChevronLeft,
    ChevronRight,
    Minus,
    Plus,
    Star,
    ShieldCheck,
    Truck,
    RefreshCw
} from 'lucide-react';
import { Product } from '@/lib/products';
import { ProductCard } from '@/components/ProductCard';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';
import { RecentlyViewed } from '@/components/RecentlyViewed';
import { getProducts } from '@/lib/get-products';

import { useCart } from '@/components/CartProvider';

interface ProductDetailsProps {
    product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
    const [quantity, setQuantity] = useState(product.minQuantity || 1);
    const [activeImage, setActiveImage] = useState(0);
    const [addedToast, setAddedToast] = useState(false);
    const { addProduct } = useRecentlyViewed();
    const { addToCart } = useCart();

    useEffect(() => {
        if (product && product.id) {
            // Add current product to viewed on mount
            addProduct(product.id);
        }
    }, [product, addProduct]);

    const handleQuantityChange = (val: number) => {
        const nextVal = quantity + val;
        if (nextVal >= product.minQuantity) {
            setQuantity(nextVal);
        }
    };

    const handleAddToCart = () => {
        addToCart(product, quantity);

        setAddedToast(true);
        setTimeout(() => setAddedToast(false), 3000);
    };

    return (
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative">
            {/* Toast Notification */}
            <AnimatePresence>
                {addedToast && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="fixed bottom-10 right-10 z-[100] bg-[#32612d] text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 font-medium"
                    >
                        <ShoppingBag className="w-5 h-5" /> Added to Cart successfully!
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
                {/* Image Gallery */}
                <div className="space-y-6">
                    <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-white shadow-elegant group">
                        <Image
                            src={product.images[activeImage]}
                            alt={product.title}
                            fill
                            className="object-contain p-4 transition-transform duration-700 group-hover:scale-105"
                            priority
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />

                        {product.images.length > 1 && (
                            <>
                                <button
                                    onClick={() => setActiveImage((prev) => (prev > 0 ? prev - 1 : product.images.length - 1))}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-[#2D2926] opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => setActiveImage((prev) => (prev < product.images.length - 1 ? prev + 1 : 0))}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-[#2D2926] opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </>
                        )}
                    </div>

                    {product.images.length > 1 && (
                        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                            {product.images.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveImage(i)}
                                    className={`relative w-20 aspect-[4/5] rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${activeImage === i ? 'border-[#C4A87C]' : 'border-transparent opacity-60'
                                        }`}
                                >
                                    <Image
                                        src={img}
                                        alt={`${product.title} ${i + 1}`}
                                        fill
                                        className="object-contain p-1"
                                        sizes="100px"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div className="flex flex-col">
                    <div className="mb-8">
                        <h1 className="font-serif text-4xl md:text-5xl text-[#2D2926] mb-4 leading-tight pt-5">
                            {product.title}
                        </h1>

                        <div className="flex items-baseline gap-3 mb-6">
                            <span className="text-3xl font-semibold text-[#C4A87C]">₹{product.price}</span>
                            <span className="text-[#6B6462] text-sm italic">per piece</span>
                        </div>

                        <p className="text-[#6B6462] text-lg leading-relaxed font-light mb-8">
                            {product.description}
                        </p>
                    </div>

                    <div className="space-y-8 mb-10">
                        <div className="flex flex-col gap-4">
                            <span className="text-xs uppercase tracking-widest text-[#2D2926] font-bold">Quantity</span>
                            <div className="flex items-center gap-6">
                                <div className="flex items-center border border-[#E8E0D5] rounded-full p-1 bg-white">
                                    <button
                                        onClick={() => handleQuantityChange(-1)}
                                        disabled={quantity <= product.minQuantity}
                                        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#F8F4EF] disabled:opacity-30 transition-colors"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="w-12 text-center font-medium text-lg">{quantity}</span>
                                    <button
                                        onClick={() => handleQuantityChange(1)}
                                        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#F8F4EF] transition-colors"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                                <span className="text-xs text-[#6B6462] italic">Minimum order: {product.minQuantity} pcs</span>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 bg-[#2D2926] text-white py-4 rounded-full font-medium hover:bg-[#1a1a1a] transition-all duration-300 flex items-center justify-center gap-3 shadow-lg group"
                            >
                                <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                Add to Cart
                            </button>
                            <button
                                onClick={() => {
                                    const message = encodeURIComponent(`Hello, I am interested in ${product.title}. Price: ₹${product.price}. Please share more details.`);
                                    window.open(`https://wa.me/919347133787?text=${message}`, '_blank');
                                }}
                                className="px-8 py-4 bg-[#25D366] text-white rounded-full flex items-center justify-center hover:bg-[#128C7E] transition-all font-medium shadow-md group"
                            >
                                WhatsApp
                            </button>
                        </div>
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-[#E8E0D5]">
                        <div className="flex flex-col items-center text-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#F8F4EF] flex items-center justify-center text-[#C4A87C]">
                                <ShieldCheck className="w-5 h-5" />
                            </div>
                            <span className="text-[10px] uppercase tracking-widest font-bold text-[#2D2926]">Secure Quality</span>
                        </div>
                        <div className="flex flex-col items-center text-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#F8F4EF] flex items-center justify-center text-[#C4A87C]">
                                <Truck className="w-5 h-5" />
                            </div>
                            <span className="text-[10px] uppercase tracking-widest font-bold text-[#2D2926]">Safe Delivery</span>
                        </div>
                        <div className="flex flex-col items-center text-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#F8F4EF] flex items-center justify-center text-[#C4A87C]">
                                <RefreshCw className="w-5 h-5" />
                            </div>
                            <span className="text-[10px] uppercase tracking-widest font-bold text-[#2D2926]">Easy Customization</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Tabs/Details */}
            <section className="mb-24">
                <div className="border-b border-[#E8E0D5] mb-10 flex gap-12">
                    <button className="pb-4 text-sm font-bold uppercase tracking-widest text-[#2D2926] border-b-2 border-[#2D2926]">Description</button>
                    <button className="pb-4 text-sm font-bold uppercase tracking-widest text-[#6B6462] hover:text-[#2D2926] transition-colors">Specifications</button>
                </div>
                <div className="max-w-3xl prose prose-neutral prose-stone">
                    <p className="text-[#6B6462] leading-relaxed mb-6">
                        Our {product.title} is a testament to our commitment to craftsmanship. Each piece is meticulously produced using premium cardstock, featuring advanced printing techniques that bring every detail to life.
                    </p>
                    <ul className="text-[#6B6462] space-y-2">
                        <li>• Premium 300 GSM textured cardstock</li>
                        <li>• Precision foil stamping or high-resolution digital print</li>
                        <li>• Matching designer envelopes included</li>
                        <li>• Multiple color variants available upon request</li>
                        <li>• Professional design consultation after order</li>
                    </ul>
                </div>
            </section>

            {/* Recently Viewed */}
            <section className="pt-20 border-t border-[#E8E0D5]">
                <RecentlyViewed excludeId={product.id} />
            </section>
        </div>
    );
}
