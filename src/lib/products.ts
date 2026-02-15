export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  minQuantity: number;
  category: 'wedding-cards' | 'visiting-cards' | 'photo-frames' | 'albums';
  images: string[];
  featured?: boolean;
  bestseller?: boolean;
}
