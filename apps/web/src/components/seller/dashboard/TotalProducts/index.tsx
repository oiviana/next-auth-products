"use client";

import { useTotalProducts } from "@/hooks/products/useProduct";

export default function TotalProducts() {
    const { data: total, isLoading, error } = useTotalProducts();

    if (isLoading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        console.error('Erro ao carregar produtos:', error);
        return (
            <div>
                <h2>Total de Produtos</h2>
                <p>0</p>
                <span className="text-sm text-red-500">Erro ao carregar</span>
            </div>
        );
    }

    return (
        <div className="w-64 h-32 bg-white rounded-md shadow-md flex flex-col justify-center items-center gap-3 p-6">
            <p className="text-2xl font-semibold">{total}</p>
            <h2>Produtos cadastrados</h2>
        </div>
    );
}