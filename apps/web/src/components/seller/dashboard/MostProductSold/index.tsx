"use client";

import { useMostSoldProduct } from "@/hooks/analytics/useMostSoldProduct";

export default function MostSoldProduct() {
    const { data: productData, isLoading, error } = useMostSoldProduct();

    if (isLoading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        console.error('Erro ao carregar produto mais vendido:', error);
        return (
            <div className="w-64 h-32 bg-white rounded-md shadow-md flex flex-col justify-center items-center gap-3 p-6">
                <p className="text-2xl font-semibold">-</p>
                <h2>Produto Mais Vendido</h2>
                <span className="text-sm text-red-500">Erro ao carregar</span>
            </div>
        );
    }

    if (!productData) {
        return (
            <div className="w-64 h-32 bg-white rounded-md shadow-md flex flex-col justify-center items-center gap-3 p-6">
                <p className="text-2xl font-semibold text-gray-500">-</p>
                <h2>Produto Mais Vendido</h2>
                <span className="text-sm text-gray-500">Nenhum produto vendido</span>
            </div>
        );
    }

    return (
        <div className="w-64 h-32 bg-white rounded-md shadow-md flex flex-col justify-center items-center gap-3 p-6">
            <p className="text-lg font-semibold text-purple-600 text-center line-clamp-2 min-h-6">
                {productData.name}
            </p>
            <h2>Produto Mais Vendido</h2>
            <span className="text-sm text-gray-600">{productData.soldCount} vendas</span>
        </div>
    );
}