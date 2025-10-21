"use client";

import { useTotalProductsSold } from "@/hooks/analytics/useTotalProductsSold";

export default function TotalProductsSold() {
    const { data: soldData, isLoading, error } = useTotalProductsSold();

    if (isLoading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        console.error('Erro ao carregar produtos vendidos:', error);
        return (
            <div className="w-64 h-32 bg-white rounded-md shadow-md flex flex-col justify-center items-center gap-3 p-6">
                <p className="text-2xl font-semibold">0</p>
                <h2>Produtos Vendidos</h2>
                <span className="text-sm text-red-500">Erro ao carregar</span>
            </div>
        );
    }

    return (
        <div className="w-64 h-32 bg-white rounded-md shadow-md flex flex-col justify-center items-center gap-3 p-6">
            <p className="text-2xl font-semibold text-blue-600">
                {soldData?.totalSold || 0}
            </p>
            <h2>Produtos Vendidos</h2>
        </div>
    );
}