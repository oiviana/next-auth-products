'use client';

import { useState } from 'react';
import { useAddToCart } from '@/hooks/cart/useAddToCart';

interface AddToCartProps {
  productId: string;
  stock: number;
  className?: string;
}

export default function AddToCart({ productId, stock, className = '' }: AddToCartProps) {
  const [quantity, setQuantity] = useState(1);
  const { mutate: addToCart, isPending } = useAddToCart();

  const handleAddToCart = () => {
    if (stock === 0) return;

    addToCart(
      { productId, quantity },
      {
        onSuccess: () => {
          setQuantity(1);
        },
      }
    );
  };

  const incrementQuantity = () => {
    if (quantity < stock) {
      setQuantity(prev => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Quantity Selector */}
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium text-gray-700">Quantidade:</span>
        <div className="flex items-center border border-gray-300 rounded-lg">
          <button
            onClick={decrementQuantity}
            disabled={quantity <= 1 || stock === 0}
            className="px-3 py-1 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            -
          </button>
          <span className="px-4 py-1 text-gray-900 font-medium min-w-[3rem] text-center">
            {quantity}
          </span>
          <button
            onClick={incrementQuantity}
            disabled={quantity >= stock || stock === 0}
            className="px-3 py-1 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            +
          </button>
        </div>
        {stock > 0 && (
          <span className="text-sm text-gray-500">
            Máx: {stock}
          </span>
        )}
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={stock === 0 || isPending}
        className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
          stock === 0 || isPending
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-amber-900 text-white hover:bg-amber-950 active:scale-95'
        }`}
      >
        {isPending ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Adicionando...
          </span>
        ) : (
          stock === 0 ? 'Esgotado' : `Adicionar ao Carrinho`
        )}
      </button>
    </div>
  );
}