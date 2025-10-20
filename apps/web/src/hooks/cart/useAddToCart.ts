// hooks/cart/useAddToCart.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cartService } from '@/services/api';

interface AddToCartData {
  productId: string;
  quantity: number;
}

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: AddToCartData) => {
      const response = await cartService.addItem(data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      queryClient.invalidateQueries({ queryKey: ['cart-items'] });

      console.log('Item adicionado ao carrinho:', data);
    },
    onError: (error: any) => {
      console.error('Erro ao adicionar ao carrinho:', error);
    },
  });
};