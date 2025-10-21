import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cartService } from '@/services/api';

export const useRemoveCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (itemId: string) => {
      const response = await cartService.removeItem(itemId);
      return response.data;
    },
    onSuccess: () => {
      // Invalidar queries do carrinho para refetch
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      queryClient.invalidateQueries({ queryKey: ['cart-items'] });
    },
    onError: (error: any) => {
      console.error('Erro ao remover item do carrinho:', error);
    },
  });
};