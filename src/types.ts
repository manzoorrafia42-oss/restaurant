export interface MenuItem {
  id: string;
  name: string;
  category: 'breakfast' | 'dinner' | 'snacks' | 'pasta' | 'grill' | 'dessert' | 'drinks' | 'wine' | 'burgers' | 'shawarma' | 'street-food';
  priceUAH: number;
  priceUSD: number;
  priceEUR: number;
  description: string;
  ingredients: string[];
  image: string;
  isPopular?: boolean;
  isChefSpecial?: boolean;
  isVegetarian?: boolean;
  isGlutenFree?: boolean;
  calories?: number;
  prepTime?: string;
  winePairing?: string;
}

export interface Review {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  comment: string;
  date: string;
  visitedFor?: string;
}

export interface RestaurantEvent {
  id: string;
  title: string;
  category: string;
  date: string;
  location: string;
  description: string;
  image: string;
  spotsLeft: number;
  price: string;
}

export interface ReservationData {
  id: string;
  name: string;
  phone: string;
  email?: string;
  persons: number;
  date: string;
  time: string;
  seatingArea: 'Garden Terrace' | 'Main Botanical Hall' | 'Private Glasshouse' | 'Wine Cellar';
  specialRequests?: string;
  createdAt: string;
}

export type Currency = 'UAH' | 'USD' | 'EUR';

export interface CartItem {
  dish: MenuItem;
  quantity: number;
  specialNote?: string;
}

export interface OrderData {
  id: string;
  items: CartItem[];
  orderType: 'dine-in' | 'delivery' | 'pickup';
  tableNumber?: string;
  deliveryAddress?: string;
  customerName: string;
  customerPhone: string;
  totalUAH: number;
  totalUSD: number;
  totalEUR: number;
  status: 'confirmed' | 'preparing';
  createdAt: string;
}
