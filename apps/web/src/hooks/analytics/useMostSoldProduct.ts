import { useQuery } from '@tanstack/react-query';
import { analyticsService } from '@/services/api';

interface MostSoldProductResponse {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  stock: number;
  soldCount: number;
  storeId: string;
}

export const useMostSoldProduct = () => {
  return useQuery({
    queryKey: ['seller-most-sold-product'],
    queryFn: async (): Promise<MostSoldProductResponse> => {
      const response = await analyticsService.getMostSoldProduct();
      return response.data;
    },
    staleTime: 1000 * 60 * 10, // 10 minutos
    retry: 1,
  });
};