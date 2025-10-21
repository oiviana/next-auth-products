import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

api.interceptors.request.use((config) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const productsService = {
  getCountBySeller: () => api.get('/products/count-products-by-seller'),
   getAvailableProducts: (params?: { page?: number; limit?: number }) => 
    api.get('/products/all-available-for-sale', { params }),
   getProductDetails: (id: string) => api.get(`/products/${id}`),


};

export const usersService = {
  createNewUser: (data: any) => api.post('/users', data),
};

export const cartService = {
  addItem: (data: { productId: string; quantity: number }) => 
    api.post('/cart/add-item', data),
  
  getCart: () => api.get('/cart'),
  
  updateItem: (itemId: string, data: { quantity: number }) => 
    api.put(`/cart/items/${itemId}`, data),
  
  removeItem: (itemId: string) => api.delete(`/cart/items/${itemId}`),
  
  clearCart: () => api.delete('/cart/clear'),
};

// services/api.ts
export const favoritesService = {
  toggleFavorite: (data: { productId: string }) => 
    api.post('/favorites/toggle', data),
  
  getFavorites: () => api.get('/favorites'),
  
  removeFavorite: (productId: string) => 
    api.delete(`/favorites/${productId}`),
}; 