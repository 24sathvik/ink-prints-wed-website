"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from './CartProvider';

export function CartDrawer() {
  const { items, isOpen, setIsOpen, removeFromCart, updateQuantity, total, itemCount } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70]"
        >
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-[#E8E0D5]">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-[#C4A87C]" />
                <h2 className="font-serif text-xl font-semibold text-[#2D2926]">Your Cart</h2>
                <span className="text-sm text-[#6B6462]">({itemCount} items)</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-[#F5F0E8] rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-[#2D2926]" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="w-16 h-16 text-[#E8DDD4] mb-4" />
                  <p className="font-serif text-lg text-[#2D2926] mb-2">Your cart is empty</p>
                  <p className="text-sm text-[#6B6462] mb-6">Add some beautiful products to get started</p>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="px-6 py-3 bg-[#C4A87C] text-white rounded-full text-sm font-medium hover:bg-[#B8977E] transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item, index) => (
                    <motion.div
                      key={item.product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex gap-4 p-4 bg-[#FDFBF7] rounded-xl"
                    >
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-[#2D2926] text-sm truncate">
                          {item.product.title}
                        </h4>
                        <p className="text-xs text-[#6B6462] mt-0.5">
                          Min: {item.product.minQuantity} pcs
                        </p>
                        <p className="text-[#C4A87C] font-semibold mt-1">
                          ₹{item.product.price * item.quantity}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              disabled={item.quantity <= item.product.minQuantity}
                              className="w-7 h-7 rounded-full bg-white border border-[#E8E0D5] flex items-center justify-center hover:border-[#C4A87C] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="w-7 h-7 rounded-full bg-white border border-[#E8E0D5] flex items-center justify-center hover:border-[#C4A87C] transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="p-2 text-[#6B6462] hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-[#E8E0D5] bg-white">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[#6B6462]">Subtotal</span>
                  <span className="font-serif text-xl font-semibold text-[#2D2926]">₹{total.toLocaleString()}</span>
                </div>
                <p className="text-xs text-[#6B6462] mb-4">Shipping calculated at checkout</p>
                <Link
                  href="/cart"
                  onClick={() => setIsOpen(false)}
                  className="block w-full py-3.5 bg-[#C4A87C] text-white text-center rounded-full font-medium hover:bg-[#B8977E] transition-colors"
                >
                  Proceed to Checkout
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="block w-full py-3 mt-2 text-[#2D2926] text-center text-sm font-medium hover:text-[#C4A87C] transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
