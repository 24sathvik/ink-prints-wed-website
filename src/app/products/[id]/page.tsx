"use client";

import { useState, useEffect, use } from 'react';
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
  RefreshCw,
  Heart
} from 'lucide-react';
import { getProductById, products as allProducts } from '@/lib/products';
import { ProductCard } from '@/components/ProductCard';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = use(params);
  const product = getProductById(id);

  const [quantity, setQuantity] = useState(product?.minQuantity || 1);
  const [activeImage, setActiveImage] = useState(0);
  const [recentlyViewed, setRecentlyViewed] = useState<any[]>([]);

  useEffect(() => {
    if (!product) return;

    // Handle recently viewed
    const stored = localStorage.getItem('recentlyViewed');
    let viewed = stored ? JSON.parse(stored) : [];

    // Add current product to viewed
    viewed = viewed.filter((p: any) => p.id !== product.id);
    viewed.unshift(product);
    viewed = viewed.slice(0, 10); // Keep last 10

    localStorage.setItem('recentlyViewed', JSON.stringify(viewed));
    setRecentlyViewed(viewed.filter((p: any) => p.id !== product.id));

    // Set initial quantity to min quantity
    setQuantity(product.minQuantity);
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFFDF9] pt-20">
        <h1 className="font-serif text-3xl text-[#2D2926] mb-4">Product Not Found</h1>
        <Link href="/products" className="text-[#C4A87C] hover:underline">Return to Collections</Link>
      </div>
    );
  }

  const handleQuantityChange = (val: number) => {
    const nextVal = quantity + val;
    if (nextVal >= product.minQuantity) {
      setQuantity(nextVal);
    }
  };

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          {/* Image Gallery */}
          <div className="space-y-6">
            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-white shadow-elegant group">
              <Image
                src={product.images[activeImage]}
                alt={product.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
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
                    <Image src={img} alt={`${product.title} ${i + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-[#C4A87C]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-xs text-[#6B6462] font-medium uppercase tracking-widest">(24 Reviews)</span>
              </div>

              <h1 className="font-serif text-4xl md:text-5xl text-[#2D2926] mb-4 leading-tight">
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
                  onClick={() => {
                    const message = encodeURIComponent(`Hello, I am interested in ${product.title}. Price: ₹${product.price}. Please share more details.`);
                    window.open(`https://wa.me/919999999999?text=${message}`, '_blank');
                  }}
                  className="flex-1 bg-[#25D366] text-white py-4 rounded-full font-medium hover:bg-[#128C7E] transition-all duration-300 flex items-center justify-center gap-3 shadow-lg group"
                >
                  <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Request via WhatsApp
                </button>
                <Link
                  href="/contact"
                  className="px-8 py-4 border border-[#E8E0D5] rounded-full flex items-center justify-center text-[#2D2926] hover:bg-white hover:border-[#C4A87C] hover:text-[#C4A87C] transition-all font-medium"
                >
                  Request a Quote
                </Link>
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
            <button className="pb-4 text-sm font-bold uppercase tracking-widest text-[#6B6462] hover:text-[#2D2926] transition-colors">Reviews</button>
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
        {recentlyViewed.length > 0 && (
          <section className="pt-20 border-t border-[#E8E0D5]">
            <div className="flex items-center justify-between mb-12">
              <h2 className="font-serif text-3xl md:text-4xl text-[#2D2926]">Recently Viewed</h2>
              <div className="flex gap-2">
                <button className="w-10 h-10 rounded-full border border-[#E8E0D5] flex items-center justify-center hover:bg-white transition-colors">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="w-10 h-10 rounded-full border border-[#E8E0D5] flex items-center justify-center hover:bg-white transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 overflow-x-auto pb-4 scrollbar-hide">
              {recentlyViewed.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
