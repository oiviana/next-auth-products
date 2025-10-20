// components/ProductGrid.tsx
'use client';

import { useState } from 'react';
import { useAvailableProducts } from '@/hooks/products/allAvailableProducts';
import ProductCard from '@/components/product/ProductCard';

export default function ProductGrid() {
  const [page, setPage] = useState(1);
  const { data, isLoading, error, isFetching } = useAvailableProducts({
    page,
    limit: 20
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="bg-red-50 border border-red-200 rounded-md p-4 max-w-md mx-auto">
          <h3 className="text-red-800 font-medium">Erro ao carregar produtos</h3>
          <p className="text-red-600 text-sm mt-1">{error.message}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-3 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  if (!data?.products || data.products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-gray-50 border border-gray-200 rounded-md p-8 max-w-md mx-auto">
          <h3 className="text-gray-800 font-medium text-lg">Nenhum produto encontrado</h3>
          <p className="text-gray-600 mt-2">Não há produtos disponíveis no momento.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Indicador de carregamento durante paginação */}
      {isFetching && (
        <div className="fixed top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-md shadow-lg z-50">
          Atualizando...
        </div>
      )}

      {/* Informações da paginação */}
      <div className="flex justify-between items-center">
        <div className="text-gray-600">
          Mostrando {data.products.length} de {data.pagination.total} produtos
        </div>
        <div className="text-sm text-gray-500">
          Página {data.pagination.page} de {data.pagination.totalPages}
        </div>
      </div>

      {/* Grid de produtos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {data.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Controles de paginação */}
      {data.pagination.totalPages > 1 && (
        <div className="flex justify-center items-center space-x-4 pt-8">
          <button
            onClick={() => setPage(prev => Math.max(prev - 1, 1))}
            disabled={page === 1 || isFetching}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Anterior
          </button>
          
          <div className="flex space-x-2">
            {Array.from({ length: Math.min(5, data.pagination.totalPages) }, (_, i) => {
              const pageNumber = i + 1;
              return (
                <button
                  key={pageNumber}
                  onClick={() => setPage(pageNumber)}
                  className={`px-3 py-1 rounded-md ${
                    page === pageNumber
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  } ${isFetching ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={isFetching}
                >
                  {pageNumber}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setPage(prev => Math.min(prev + 1, data.pagination.totalPages))}
            disabled={page === data.pagination.totalPages || isFetching}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Próxima
          </button>
        </div>
      )}
    </div>
  );
}