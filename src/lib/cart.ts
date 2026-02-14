import { Product } from './products';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

export function addToCart(cart: CartItem[], product: Product, quantity: number): CartItem[] {
  const existingIndex = cart.findIndex(item => item.product.id === product.id);
  
  const finalQuantity = Math.max(quantity, product.minQuantity);
  
  if (existingIndex >= 0) {
    const newCart = [...cart];
    newCart[existingIndex] = {
      ...newCart[existingIndex],
      quantity: newCart[existingIndex].quantity + finalQuantity
    };
    return newCart;
  }
  
  return [...cart, { product, quantity: finalQuantity }];
}

export function updateCartItemQuantity(cart: CartItem[], productId: string, quantity: number): CartItem[] {
  return cart.map(item => {
    if (item.product.id === productId) {
      const finalQuantity = Math.max(quantity, item.product.minQuantity);
      return { ...item, quantity: finalQuantity };
    }
    return item;
  });
}

export function removeFromCart(cart: CartItem[], productId: string): CartItem[] {
  return cart.filter(item => item.product.id !== productId);
}

export function getCartTotal(cart: CartItem[]): number {
  return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
}

export function getCartItemCount(cart: CartItem[]): number {
  return cart.reduce((count, item) => count + item.quantity, 0);
}

export function saveCartToStorage(cart: CartItem[]): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('ink-print-cart', JSON.stringify(cart));
  }
}

export function loadCartFromStorage(): CartItem[] {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('ink-print-cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
  }
  return [];
}
