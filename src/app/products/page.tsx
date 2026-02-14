"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, SlidersHorizontal, ChevronDown, Search, X } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { ProductSkeleton } from '@/components/ProductSkeleton';
import { products, categories } from '@/lib/products';

function ProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortPrice] = useState<'featured' | 'low-to-high' | 'high-to-low'>('featured');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<string>('all');

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setActiveCategory(category);
    }
  }, [searchParams]);

  const filteredProducts = products
    .filter(product => {
      const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      let matchesPrice = true;
      if (priceRange === 'under-50') matchesPrice = product.price < 50;
      else if (priceRange === '50-100') matchesPrice = product.price >= 50 && product.price <= 100;
      else if (priceRange === '100-500') matchesPrice = product.price >= 100 && product.price <= 500;
      else if (priceRange === '500-1000') matchesPrice = product.price >= 500 && product.price <= 1000;
      else if (priceRange === 'above-1000') matchesPrice = product.price > 1000;

      return matchesCategory && matchesSearch && matchesPrice;
    })
    .sort((a, b) => {
      if (sortBy === 'low-to-high') return a.price - b.price;
      if (sortBy === 'high-to-low') return b.price - a.price;
      return 0;
    });

  const updateCategory = (id: string) => {
    setActiveCategory(id);
    const params = new URLSearchParams(searchParams.toString());
    if (id === 'all') {
      params.delete('category');
    } else {
      params.set('category', id);
    }
    router.push(`/products?${params.toString()}`);
  };

  return (
    <main className="min-h-screen pt-24 pb-20 bg-[#f2efe6]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <header className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <nav className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#717f65] mb-4 font-medium">
                <button onClick={() => updateCategory('all')} className="hover:text-[#32612d] transition-colors">Home</button>
                <span>/</span>
                <span className="font-bold text-[#32612d]">Collections</span>
              </nav>
              <h1 className="font-serif text-5xl md:text-6xl text-[#717f65]">Our Collections</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative flex-1 md:w-72">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#717f65]" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-5 py-4 bg-white border border-[#dcd8cc] rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-[#717f65] transition-all shadow-sm text-[#000000]"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                  >
                    <X className="w-4 h-4 text-[#6B6462]" />
                  </button>
                )}
              </div>
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 px-6 py-4 bg-white border border-[#dcd8cc] rounded-full text-sm font-medium hover:bg-[#f2efe6] transition-all shadow-sm lg:hidden text-[#32612d]"
              >
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>
          </div>

          {/* Desktop Categories */}
          <div className="hidden lg:flex items-center justify-between border-b border-[#32612d]/10 pb-6">
            <div className="flex items-center gap-8">
              <button
                onClick={() => updateCategory('all')}
                className={`relative text-sm font-medium tracking-wide transition-colors ${activeCategory === 'all' ? 'text-[#32612d]' : 'text-[#6B6462] hover:text-[#32612d]'
                  }`}
              >
                All Products
                {activeCategory === 'all' && (
                  <motion.div layoutId="categoryUnderline" className="absolute -bottom-[25px] left-0 right-0 h-0.5 bg-[#32612d]" />
                )}
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => updateCategory(cat.id)}
                  className={`relative text-sm font-medium tracking-wide transition-colors ${activeCategory === cat.id ? 'text-[#32612d]' : 'text-[#6B6462] hover:text-[#32612d]'
                    }`}
                >
                  {cat.name}
                  {activeCategory === cat.id && (
                    <motion.div layoutId="categoryUnderline" className="absolute -bottom-[25px] left-0 right-0 h-0.5 bg-[#32612d]" />
                  )}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <span className="text-xs text-[#717f65] uppercase tracking-widest font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortPrice(e.target.value as any)}
                className="bg-transparent text-sm font-medium text-[#32612d] focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="low-to-high">Price: Low to High</option>
                <option value="high-to-low">Price: High to Low</option>
              </select>
            </div>
          </div>
        </header>

        {/* Mobile Filter Drawer */}
        <AnimatePresence>
          {isFilterOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsFilterOpen(false)}
                className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[60] lg:hidden"
              />
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed bottom-0 left-0 right-0 bg-[#f2efe6] rounded-t-[2rem] p-8 z-[70] lg:hidden shadow-2xl"
              >
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-serif text-2xl text-[#32612d]">Filter & Sort</h3>
                  <button onClick={() => setIsFilterOpen(false)} className="p-2">
                    <X className="w-6 h-6 text-[#32612d]" />
                  </button>
                </div>

                <div className="space-y-8">
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-[#717f65] mb-4 font-bold">Categories</h4>
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => updateCategory('all')}
                        className={`px-4 py-2 rounded-full border text-sm transition-all ${activeCategory === 'all'
                          ? 'bg-[#32612d] text-white border-[#32612d]'
                          : 'bg-white text-[#717f65] border-[#dcd8cc]'
                          }`}
                      >
                        All
                      </button>
                      {categories.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => updateCategory(cat.id)}
                          className={`px-4 py-2 rounded-full border text-sm transition-all ${activeCategory === cat.id
                            ? 'bg-[#32612d] text-white border-[#32612d]'
                            : 'bg-white text-[#717f65] border-[#dcd8cc]'
                            }`}
                        >
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-[#717f65] mb-4 font-bold">Price Range</h4>
                    <div className="grid grid-cols-1 gap-3">
                      {[
                        { id: 'all', label: 'All Prices' },
                        { id: 'under-50', label: 'Under ₹50' },
                        { id: '50-100', label: '₹50 - ₹100' },
                        { id: '100-500', label: '₹100 - ₹500' },
                        { id: '500-1000', label: '₹500 - ₹1000' },
                        { id: 'above-1000', label: 'Above ₹1000' },
                      ].map((range) => (
                        <button
                          key={range.id}
                          onClick={() => setPriceRange(range.id)}
                          className={`flex items-center justify-between p-4 rounded-xl border text-sm transition-all ${priceRange === range.id
                            ? 'bg-[#32612d] text-white border-[#32612d]'
                            : 'bg-white border-[#dcd8cc] text-[#32612d]'
                            }`}
                        >
                          {range.label}
                          {priceRange === range.id && <div className="w-2 h-2 rounded-full bg-white" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-[#717f65] mb-4 font-bold">Sort By</h4>
                    <div className="grid grid-cols-1 gap-3">
                      {[
                        { id: 'featured', label: 'Featured' },
                        { id: 'low-to-high', label: 'Price: Low to High' },
                        { id: 'high-to-low', label: 'Price: High to Low' },
                      ].map((option) => (
                        <button
                          key={option.id}
                          onClick={() => setSortPrice(option.id as any)}
                          className={`flex items-center justify-between p-4 rounded-xl border text-sm transition-all ${sortBy === option.id
                            ? 'bg-white border-[#32612d] text-[#32612d]'
                            : 'bg-white border-[#dcd8cc] text-[#6B6462]'
                            }`}
                        >
                          {option.label}
                          {sortBy === option.id && <div className="w-2 h-2 rounded-full bg-[#32612d]" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="w-full py-4 bg-[#32612d] text-white rounded-full font-medium shadow-lg hover:bg-[#264a22] transition-colors"
                  >
                    Apply Filters
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="col-span-full py-32 text-center"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#e8e4d9] text-[#717f65] mb-6">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-3xl text-[#000000] mb-3">No products found</h3>
              <p className="text-[#6B6462] max-w-md mx-auto mb-8 font-light">
                We couldn&apos;t find any products matching your current filters.
                Try adjusting your search or price range.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setActiveCategory('all');
                  setSearchQuery('');
                  setPriceRange('all');
                }}
                className="px-8 py-3 bg-[#32612d] text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all"
              >
                Clear all filters
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>
    </main>
  );
}

export default function ProductsPage() {
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
      <ProductsContent />
    </Suspense>
  );
}
