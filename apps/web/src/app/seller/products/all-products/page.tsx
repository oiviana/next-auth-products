'use client';

import { useSellerProducts } from '@/hooks/products/useSellerProducts';

export default function AllSellerProducts() {
  const { 
    data: products, 
    isLoading, 
    error 
  } = useSellerProducts();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  if (isLoading) return <div>Carregando seus produtos...</div>;
  
  if (error) return <div>Erro: {error.message}</div>;
  
  if (!products?.length) return <div>Nenhum produto encontrado</div>;

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold">Seus Produtos ({products.length})</h3>
      
      <div className="space-y-3">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="bg-white p-4 rounded border border-gray-200"
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold">{product.name}</h4>
                <p className="text-gray-600 text-sm">{product.description}</p>
                <div className="flex gap-4 mt-2 text-sm text-gray-600">
                  <span>Preço: {formatPrice(product.price)}</span>
                  <span>Estoque: {product.stock}</span>
                  <span>Visível: {product.isVisible ? 'Sim' : 'Não'}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}