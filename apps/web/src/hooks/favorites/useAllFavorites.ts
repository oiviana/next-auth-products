// hooks/favorites/useFavorites.ts
import { useQuery } from '@tanstack/react-query';
import { favoritesService } from '@/services/api';
import { Favorite } from '@/types/favorites';

export const useFavorites = () => {
  return useQuery({
    queryKey: ['favorites'],
    queryFn: async (): Promise<Favorite[]> => {
      const response = await favoritesService.getFavorites();
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};