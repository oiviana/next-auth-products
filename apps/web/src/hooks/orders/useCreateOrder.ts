import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ordersService } from '@/services/api';

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await ordersService.createOrder();
      return response.data;
    },
    onSuccess: () => {
      // Invalidar queries relacionadas
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      queryClient.invalidateQueries({ queryKey: ['cart-items'] });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['products'] }); 
    },
    onError: (error: any) => {
      console.error('Erro ao criar pedido:', error);
    },
  });
};