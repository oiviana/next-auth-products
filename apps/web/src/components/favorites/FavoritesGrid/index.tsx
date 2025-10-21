'use client';

import { useFavorites } from '@/hooks/favorites/useAllFavorites';
import ProductCard from '@/components/product/ProductCard';

export default function FavoritesGrid() {
  const { data: favorites, isLoading, error, refetch } = useFavorites();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="bg-red-50 border border-red-200 rounded-md p-4 max-w-md mx-auto">
          <h3 className="text-red-800 font-medium">Erro ao carregar favoritos</h3>
          <p className="text-red-600 text-sm mt-1">{error.message}</p>
          <button 
            onClick={() => refetch()}
            className="mt-3 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  if (!favorites || favorites.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-gray-50 border border-gray-200 rounded-md p-8 max-w-md mx-auto">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 mb-4">
            <svg className="h-8 w-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
          <h3 className="text-gray-800 font-medium text-lg">Nenhum favorito ainda</h3>
          <p className="text-gray-600 mt-2">Adicione alguns produtos aos seus favoritos!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="text-gray-600">
          {favorites.length} {favorites.length === 1 ? 'produto favorito' : 'produtos favoritos'}
        </div>
      </div>

      {/* Grid de produtos favoritos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {favorites.map((favorite) => (
          <ProductCard 
            key={favorite.id} 
            product={favorite.product} 
          />
        ))}
      </div>
    </div>
  );
}