import { useQuery } from '@tanstack/react-query';
import { analyticsService } from '@/services/api';

interface TotalRevenueResponse {
  totalRevenue: number;
}

export const useTotalRevenue = () => {
  return useQuery({
    queryKey: ['seller-revenue'],
    queryFn: async (): Promise<TotalRevenueResponse> => {
      const response = await analyticsService.getTotalRevenue();
      return response.data;
    },
    staleTime: 1000 * 60 * 10, // 10 minutos
    retry: 1,
  });
};