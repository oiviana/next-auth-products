// hooks/products/useProductDetails.ts
import { useQuery } from '@tanstack/react-query';
import { productsService } from '@/services/api';
import { Product } from '@/types/product';

export const useProductDetails = (productId: string) => {
  return useQuery({
    queryKey: ['product-details', productId],
    queryFn: async (): Promise<Product> => {
      const response = await productsService.getProductDetails(productId);
      return response.data;
    },
    enabled: !!productId, // Só executa se tiver um productId
    staleTime: 1000 * 60 * 10, 
    retry: (failureCount, error: any) => {
      // Não tenta novamente se for erro 404
      if (error.response?.status === 404) return false;
      return failureCount < 3;
    },
  });
};