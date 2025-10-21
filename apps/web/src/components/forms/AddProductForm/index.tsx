"use client";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateProductData, createProductSchema } from '@/schemas/products';
import { useCreateProduct } from '@/hooks/products/useCreateProduct';

export default function AddProductForm() {
  const { mutate: createProduct, isPending } = useCreateProduct();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateProductData>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      stock: 0,
      isVisible: true,
    },
  });

  const onSubmit = (data: CreateProductData) => {
    createProduct(data, {
      onSuccess: () => {
        reset();
        alert('Produto criado com sucesso!');
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Nome do Produto *
        </label>
        <input
          {...register('name')}
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-950 focus:border-amber-950"
          placeholder="Nome do produto"
        />
        {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Descrição
        </label>
        <textarea
          {...register('description')}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-950 focus:border-amber-950"
          placeholder="Descrição do produto"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
            Preço (R$) *
          </label>
          <input
            {...register('price', { valueAsNumber: true })}
            type="number"
            step="0.01"
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-950 focus:border-amber-950"
            placeholder="0.00"
          />
          {errors.price && <p className="text-red-600 text-sm mt-1">{errors.price.message}</p>}
        </div>

        <div>
          <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
            Estoque *
          </label>
          <input
            {...register('stock', { valueAsNumber: true })}
            type="number"
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-950 focus:border-amber-950"
            placeholder="0"
          />
          {errors.stock && <p className="text-red-600 text-sm mt-1">{errors.stock.message}</p>}
        </div>
      </div>

      <div className="flex items-center">
        <input
          {...register('isVisible')}
          type="checkbox"
          id="isVisible"
          className="h-4 w-4 text-amber-950 focus:ring-amber-950 border-gray-300 rounded"
        />
        <label htmlFor="isVisible" className="ml-2 block text-sm text-gray-700">
          Produto visível na loja
        </label>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-amber-950 text-white py-3 px-4 rounded-md hover:bg-amber-900 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
      >
        {isPending ? 'Criando Produto...' : 'Criar Produto'}
      </button>
    </form>
  );
}