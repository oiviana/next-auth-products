"use client";

import { useTotalRevenue } from "@/hooks/analytics/useTotalRevenue";

export default function TotalRevenue() {
    const { data: revenueData, isLoading, error } = useTotalRevenue();

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(price);
    };

    if (isLoading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        console.error('Erro ao carregar faturamento:', error);
        return (
            <div className="w-64 h-32 bg-white rounded-md shadow-md flex flex-col justify-center items-center gap-3 p-6">
                <p className="text-2xl font-semibold">{formatPrice(0)}</p>
                <h2>Faturamento Total</h2>
                <span className="text-sm text-red-500">Erro ao carregar</span>
            </div>
        );
    }

    return (
        <div className="w-64 h-32 bg-white rounded-md shadow-md flex flex-col justify-center items-center gap-3 p-6">
            <p className="text-2xl font-semibold text-green-600">
                {formatPrice(revenueData?.totalRevenue || 0)}
            </p>
            <h2>Faturamento Total</h2>
        </div>
    );
}