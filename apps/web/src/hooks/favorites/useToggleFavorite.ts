// hooks/favorites/useToggleFavorite.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { favoritesService } from '@/services/api';
import { ToggleFavoriteData } from '@/types/favorites';


export const useToggleFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ToggleFavoriteData) => {
      const response = await favoritesService.toggleFavorite(data);
      return response.data;
    },
    onSuccess: (data, variables) => {
      // Invalidar queries relacionadas a favoritos
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
      queryClient.invalidateQueries({ queryKey: ['favorites', variables.productId] });
      
    },
    onError: (error: any) => {
      console.error('Erro ao alternar favorito:', error);
    },
  });
};