import { useMutation, useQueryClient } from '@tanstack/react-query';
import { productsService } from '@/services/api';
import { CreateProductData } from '@/types/product';

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateProductData) => {
      const response = await productsService.createProduct(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['seller-products'] });
    },
  });
};