// components/FavoriteButton.tsx
'use client';

import { useToggleFavorite } from '@/hooks/favorites/useToggleFavorite';
import { useIsFavorite } from '@/hooks/favorites/useIsFavorite';

interface FavoriteButtonProps {
  productId: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function FavoriteButton({ 
  productId, 
  className = '',
  size = 'md'
}: FavoriteButtonProps) {
  const { data: isFavorite, isLoading: isLoadingCheck } = useIsFavorite(productId);
  const { mutate: toggleFavorite, isPending: isToggling } = useToggleFavorite();

  const handleToggle = () => {
    toggleFavorite({ productId });
  };

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const isLoading = isLoadingCheck || isToggling;

  return (
    <button
      onClick={handleToggle}
      disabled={isLoading}
      className={`
        ${sizeClasses[size]} 
        flex items-center justify-center 
        rounded-full border 
        transition-all duration-200 
        hover:scale-105 
        disabled:opacity-50 disabled:cursor-not-allowed
        absolute
        right-4
        top-4
        ${className}
        ${
          isFavorite
            ? 'bg-red-50 border-red-200 text-red-500 hover:bg-red-100'
            : 'bg-white border-gray-300 text-gray-400 hover:bg-gray-50 hover:text-red-500'
        }
      `}
      title={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
    >
      {isLoading ? (
        <div className={`animate-spin rounded-full border-2 border-current border-t-transparent ${iconSizes[size]}`} />
      ) : (
        <svg
          className={iconSizes[size]}
          fill={isFavorite ? 'currentColor' : 'none'}
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      )}
    </button>
  );
}