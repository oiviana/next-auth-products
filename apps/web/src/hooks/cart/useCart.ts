// hooks/cart/useCart.ts
import { useQuery } from '@tanstack/react-query';
import { cartService } from '@/services/api';
import { Cart } from '@/types/cart';


export const useCart = () => {
  return useQuery({
    queryKey: ['cart'],
    queryFn: async (): Promise<Cart> => {
      const response = await cartService.getCart();
      return response.data;
    },
    staleTime: 1000 * 60 * 2, // 2 minutos
    retry: 1,
  });
};