'use client';

import UserLayout from "@/components/common/UserLayout";
import { useOrdersByUser } from "@/hooks/orders/useOrdersByUser";
import Image from 'next/image';
import Link from 'next/link';

export default function UserOrdersPage() {
    const { data: orders, isLoading, error } = useOrdersByUser();

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(price);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'COMPLETED':
                return 'bg-green-100 text-green-800';
            case 'PENDING':
                return 'bg-yellow-100 text-yellow-800';
            case 'CANCELLED':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'COMPLETED':
                return 'Concluído';
            case 'PENDING':
                return 'Pendente';
            case 'CANCELLED':
                return 'Cancelado';
            default:
                return status;
        }
    };

    if (isLoading) {
        return (
            <UserLayout>
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">Meus Pedidos</h1>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-white p-6 rounded-lg border border-gray-200 animate-pulse">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="space-y-2">
                                        <div className="h-4 bg-gray-300 rounded w-32"></div>
                                        <div className="h-3 bg-gray-300 rounded w-24"></div>
                                    </div>
                                    <div className="h-6 bg-gray-300 rounded w-20"></div>
                                </div>
                                <div className="space-y-3">
                                    {[1, 2].map((j) => (
                                        <div key={j} className="flex items-center space-x-3">
                                            <div className="w-12 h-12 bg-gray-300 rounded"></div>
                                            <div className="flex-1 space-y-2">
                                                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                                                <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </UserLayout>
        );
    }

    if (error) {
        return (
            <UserLayout>
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">Erro ao carregar pedidos</h1>
                        <p className="text-gray-600 mb-6">Tente novamente mais tarde.</p>
                    </div>
                </div>
            </UserLayout>
        );
    }

    if (!orders || orders.length === 0) {
        return (
            <UserLayout>
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">Meus Pedidos</h1>
                    <div className="text-center py-12">
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 max-w-md mx-auto">
                            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 mb-4">
                                <svg className="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhum pedido encontrado</h3>
                            <p className="text-gray-600 mb-6">Você ainda não fez nenhum pedido.</p>
                            <Link
                                href="/user/products"
                                className="bg-amber-900 text-white px-6 py-3 rounded-lg hover:bg-amber-950 transition-colors"
                            >
                                Fazer Primeira Compra
                            </Link>
                        </div>
                    </div>
                </div>
            </UserLayout>
        );
    }

    return (
        <UserLayout>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Meus Pedidos</h1>

                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-white rounded-lg border border-gray-200 p-6">
                            {/* Cabeçalho do Pedido */}
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 pb-4 border-b border-gray-200">
                                <div>
                                    <div className="flex items-center space-x-4 mb-2">
                                        <span className="text-sm text-gray-600">Pedido #{(order.id).substring(0, 8)}</span>
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                                            {getStatusText(order.status)}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        Realizado em {formatDate(order.createdAt)}
                                    </p>
                                </div>
                                <div className="mt-2 sm:mt-0">
                                    <p className="text-lg font-bold text-gray-900">
                                        Total: {formatPrice(order.total)}
                                    </p>
                                </div>
                            </div>

                            {/* Itens do Pedido */}
                            <div className="space-y-4">
                                {order.items.map((item) => (
                                    <div key={item.id} className="flex items-start space-x-4">
                                        {/* Imagem do Produto */}
                                        <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                                            {item.product.images && item.product.images.length > 0 ? (
                                                <Image
                                                    src={item.product.images[0]}
                                                    alt={item.product.name}
                                                    width={64}
                                                    height={64}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                                    <span className="text-gray-400 text-xs">Sem imagem</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Informações do Produto */}
                                        <div className="flex-1 min-w-0">
                                            <Link
                                                href={`/products/${item.product.id}`}
                                                className="hover:text-amber-900 transition-colors"
                                            >
                                                <h4 className="font-medium text-gray-900 line-clamp-2">
                                                    {item.product.name}
                                                </h4>
                                            </Link>

                                            <p className="text-sm text-gray-600 mt-1">
                                                Vendido por: {item.product.store.name}
                                            </p>

                                            <div className="flex items-center justify-between mt-2">
                                                <div className="text-sm text-gray-600">
                                                    Qtd: {item.quantity} × {formatPrice(item.unitPrice)}
                                                </div>
                                                <div className="font-medium text-gray-900">
                                                    {formatPrice(item.quantity * item.unitPrice)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Ações do Pedido */}
                            <div className="flex justify-end mt-4 pt-4 border-t border-gray-200">
                                <button className="text-amber-900 hover:text-amber-950 font-medium text-sm">
                                    Ver Detalhes
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </UserLayout>
    );
}