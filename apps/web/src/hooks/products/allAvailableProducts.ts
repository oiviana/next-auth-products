// hooks/products/useAvailableProducts.ts
import { useQuery } from '@tanstack/react-query';
import { productsService } from '@/services/api';
import { ProductsResponse } from '@/types/product';

interface UseAvailableProductsProps {
  page?: number;
  limit?: number;
  enabled?: boolean;
}

export const useAvailableProducts = ({
  page = 1,
  limit = 20,
  enabled = true
}: UseAvailableProductsProps = {}) => {
  return useQuery({
    queryKey: ['available-products', page, limit],
    queryFn: async (): Promise<ProductsResponse> => {
      const response = await productsService.getAvailableProducts({
        page: page,
        limit: limit
      });
      return response.data;
    },
    enabled,
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};