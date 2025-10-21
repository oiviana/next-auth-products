// hooks/favorites/useIsFavorite.ts
import { useQuery } from '@tanstack/react-query';
import { favoritesService } from '@/services/api';

export const useIsFavorite = (productId: string) => {
  return useQuery({
    queryKey: ['favorites', productId],
    queryFn: async (): Promise<boolean> => {
      try {
        const response = await favoritesService.getFavorites();
        const favorites = response.data;
        return favorites.some((fav: any) => fav.productId === productId);
      } catch {
        return false;
      }
    },
    enabled: !!productId,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};