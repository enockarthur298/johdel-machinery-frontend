export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  subCategory?: string;
  brand: string;
  imageUrl: string;
  images: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount?: number;
  description: string;
  powerType?: string;
  voltage?: string;
  features?: string[];
  specifications?: Record<string, string>;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  company?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  shippingAddress: Address;
  billingAddress: Address;
  shippingMethod: string;
  shippingCost: number;
  paymentMethod: string;
  status: OrderStatus;
  total: number;
  createdAt: string;
  trackingNumber?: string;
}

export interface Address {
  fullName: string;
  company?: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

export type OrderStatus = 'processing' | 'shipped' | 'delivered' | 'cancelled';