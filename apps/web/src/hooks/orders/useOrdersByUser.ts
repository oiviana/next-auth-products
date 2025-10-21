import { useQuery } from '@tanstack/react-query';
import { ordersService } from '@/services/api';
import { Order } from '@/types/orders';


export const useOrdersByUser = () => {
  return useQuery({
    queryKey: ['user-orders'],
    queryFn: async (): Promise<Order[]> => {
      const response = await ordersService.getOrders();
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};