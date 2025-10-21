import Image from 'next/image';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  stock: number;
  store?: {
    id: string;
    name: string;
  };
}

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className = '' }: ProductCardProps) {
  const { id, name, description, price, images, stock, store } = product;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const truncateDescription = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ${className}`}>
      <Link href={`products/${id}`}>
        {/* Wrapper da Imagem */}
        <div className="relative w-full h-48 bg-gray-200 overflow-hidden">
          {images && images.length > 0 ? (
            <Image
              src={images[0]}
              alt={name}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <span className="text-gray-400 text-sm">Sem imagem</span>
            </div>
          )}
          
          {/* Badge de estoque */}
          {stock === 0 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-medium">
              Esgotado
            </div>
          )}
        </div>
      </Link>

      {/* Conteúdo do Card */}
      <div className="p-4">

        {/* Nome do Produto */}
          <h3 className="font-semibold text-amber-950 transition-colors line-clamp-2 mb-2">
            {name}
          </h3>


        {/* Descrição */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {truncateDescription(description)}
        </p>

        {/* Preço e Ações */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(price)}
            </span>

          </div>

          {/* Botão de ação */}
          <button
            disabled={stock === 0}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              stock === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-amber-950 text-white hover:bg-amber-800'
            }`}
          >
            {stock === 0 ? 'Esgotado' : 'Comprar'}
          </button>
        </div>
      </div>
    </div>
  );
}