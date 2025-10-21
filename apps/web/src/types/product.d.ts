// types/product.ts
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  stock: number;
  isVisible: boolean;
  createdAt: string;
  updatedAt: string;
  store?: {
    id: string;
    name: string;
    owner: {
      id: string;
      name: string;
      email: string;
    };
  };
}

export interface ProductsResponse {
  products: Product[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}


export interface CreateProductData {
  name: string;
  description?: string;
  price: number;
  stock: number;
  isVisible?: boolean;
}
