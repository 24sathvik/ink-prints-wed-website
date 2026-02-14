"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Product } from '@/lib/products';
import { 
  CartItem, 
  addToCart as addToCartFn, 
  removeFromCart as removeFromCartFn,
  updateCartItemQuantity as updateQuantityFn,
  getCartTotal,
  getCartItemCount,
  saveCartToStorage,
  loadCartFromStorage
} from '@/lib/cart';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = loadCartFromStorage();
    if (saved.length > 0) {
      setItems(saved);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      saveCartToStorage(items);
    }
  }, [items, mounted]);

  const addToCart = (product: Product, quantity: number) => {
    setItems(prev => addToCartFn(prev, product, quantity));
    setIsOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setItems(prev => removeFromCartFn(prev, productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setItems(prev => updateQuantityFn(prev, productId, quantity));
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total: getCartTotal(items),
        itemCount: getCartItemCount(items),
        isOpen,
        setIsOpen
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
