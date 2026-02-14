import { Product } from './products';

const STORAGE_KEY = 'ink-print-recently-viewed';
const MAX_ITEMS = 10;

export function addToRecentlyViewed(product: Product): void {
  if (typeof window === 'undefined') return;
  
  const current = getRecentlyViewed();
  const filtered = current.filter(p => p.id !== product.id);
  const updated = [product, ...filtered].slice(0, MAX_ITEMS);
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function getRecentlyViewed(): Product[] {
  if (typeof window === 'undefined') return [];
  
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return [];
    }
  }
  return [];
}

export function clearRecentlyViewed(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
}
