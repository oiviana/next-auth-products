export interface Favorite {
  id: string;
  productId: string;
  createdAt: string;
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

export interface ToggleFavoriteData {
  productId: string;
}
