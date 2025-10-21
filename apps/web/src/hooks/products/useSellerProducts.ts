
import { useQuery } from '@tanstack/react-query';
import { productsService } from '@/services/api';
import { Product } from '@/types/product';

export const useSellerProducts = () => {
  return useQuery({
    queryKey: ['seller-products'],
    queryFn: async (): Promise<Product[]> => {
      const response = await productsService.getProductsBySeller();
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};