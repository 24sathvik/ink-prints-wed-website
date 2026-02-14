"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { Product } from '@/lib/products';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.08, 0.4), ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#f2efe6] mb-4 hover-lift">
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            loading="lazy"
          />
          
          {/* Hover overlay with shimmer */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#32612d]/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {product.bestseller && (
            <div className="absolute top-3 left-3 px-3 py-1 bg-[#32612d] text-white text-xs font-medium rounded-full flex items-center gap-1 shadow-sm">
              <Star className="w-3 h-3 fill-current" />
              Bestseller
            </div>
          )}

          {/* Price badge */}
          <div className="absolute top-3 right-3 px-3 py-1.5 bg-white/90 backdrop-blur-sm text-[#32612d] text-sm font-bold rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            ₹{product.price}
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out bg-white/90 backdrop-blur-sm border-t border-[#dcd8cc]">
            <p className="text-[#32612d] font-medium text-sm text-center">View Details</p>
          </div>
        </div>
      </Link>

      <Link href={`/products/${product.id}`} className="block">
        <h3 className="font-serif text-lg text-[#000000] group-hover:text-[#32612d] transition-colors duration-300 mb-1 tracking-wide">
          {product.title}
        </h3>
        <div className="flex items-baseline gap-2">
          <span className="text-[#717f65] font-semibold text-lg">₹{product.price}</span>
          <span className="text-xs text-[#6B6462] font-medium">/ piece</span>
        </div>
        {product.minQuantity && (
          <p className="text-[10px] text-[#6B6462]/80 mt-1 uppercase tracking-wider">Min. {product.minQuantity} pcs</p>
        )}
      </Link>
    </motion.div>
  );
}
