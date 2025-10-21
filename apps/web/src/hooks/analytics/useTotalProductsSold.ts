import { useQuery } from '@tanstack/react-query';
import { analyticsService } from '@/services/api';

interface TotalProductsSoldResponse {
  totalSold: number;
}

export const useTotalProductsSold = () => {
  return useQuery({
    queryKey: ['seller-products-sold'],
    queryFn: async (): Promise<TotalProductsSoldResponse> => {
      const response = await analyticsService.getTotalProductsSold();
      return response.data;
    },
    staleTime: 1000 * 60 * 10, // 10 minutos
    retry: 1,
  });
};