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
