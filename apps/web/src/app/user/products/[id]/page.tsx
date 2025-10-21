'use client';

import { useParams } from 'next/navigation';
import { useProductDetails } from '@/hooks/products/useProductDetails';
import Image from 'next/image';
import Link from 'next/link';
import AddToCart from '@/components/cart/addToCart';
import FavoriteButton from '@/components/favorites/FavoriteButton';

export default function ProductDetailsPage() {
  const params = useParams();
  const productId = params.id as string;

  const { data: product, isLoading, error } = useProductDetails(productId);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gray-300 h-96 rounded-lg"></div>
            <div className="space-y-4">
              <div className="bg-gray-300 h-8 rounded w-3/4"></div>
              <div className="bg-gray-300 h-4 rounded w-1/2"></div>
              <div className="bg-gray-300 h-20 rounded"></div>
              <div className="bg-gray-300 h-12 rounded w-1/3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Produto não encontrado</h1>
          <p className="text-gray-600 mb-6">O produto que você está procurando não existe ou não está mais disponível.</p>
          <Link
            href="/products"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Voltar para produtos
          </Link>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Produto não encontrado</h1>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span>›</span>
        <Link href="/user/products" className="hover:text-blue-600">Produtos</Link>
        <span>›</span>
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Galeria de Imagens */}
        <div className="space-y-4 relative">
          <div className="bg-gray-100 rounded-lg overflow-hidden">
            {product.images && product.images.length > 0 ? (
              <Image
                src={product.images[0]}
                alt={product.name}
                width={600}
                height={400}
                className="w-full h-96 object-cover"
              />
            ) : (
              <div className="w-full h-96 flex items-center justify-center bg-gray-200">
                <span className="text-gray-400">Sem imagem</span>
              </div>
            )}
          </div>
          <FavoriteButton productId={product.id} />
        </div>

        {/* Informações do Produto */}
        <div className="space-y-6">
          {/* Loja */}
          {product.store && (
            <Link
              href={`/stores/${product.store.id}`}
              className="inline-block text-amber-900 font-medium"
            >
              Vendido por: {product.store.name}
            </Link>
          )}

          {/* Nome */}
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

          {/* Preço */}
          <div className="text-4xl font-bold text-gray-900">
            {formatPrice(product.price)}
          </div>

          {/* Estoque */}
          <div className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {product.stock > 0 ? `${product.stock} unidades em estoque` : 'Fora de estoque'}
          </div>

          {/* Descrição */}
          <div className="prose max-w-none">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Descrição</h3>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
          </div>

          {/* Ações */}
          <div className="flex space-x-4 pt-6">
            <AddToCart
              productId={product.id}
              stock={product.stock}
            />
          </div>
        </div>
      </div>
    </div>
  );
}