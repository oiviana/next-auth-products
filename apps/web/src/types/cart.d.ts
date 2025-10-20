export interface CartItem {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  addedAt: string;
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
    stock: number;
    store: {
      id: string;
      name: string;
    };
  };
}

export interface Cart {
  id: string | null;
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  updatedAt: string;
}