// app/cart/page.tsx
'use client';

import UserLayout from "@/components/common/UserLayout";
import { useCart } from "@/hooks/cart/useCart";
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
    const { data: cart, isLoading, error } = useCart();

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(price);
    };

    if (isLoading) {
        return (
            <UserLayout>
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">Carrinho</h1>
                    <div className="animate-pulse space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow">
                                <div className="w-20 h-20 bg-gray-300 rounded"></div>
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                                    <div className="h-6 bg-gray-300 rounded w-1/4"></div>
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
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">Erro ao carregar carrinho</h1>
                        <p className="text-gray-600 mb-6">Tente novamente mais tarde.</p>
                    </div>
                </div>
            </UserLayout>
        );
    }

    if (!cart || cart.items.length === 0) {
        return (
            <UserLayout>
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">Carrinho</h1>
                    <div className="text-center py-12">
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 max-w-md mx-auto">
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Seu carrinho está vazio</h3>
                            <p className="text-gray-600 mb-6">Adicione alguns produtos incríveis ao seu carrinho!</p>
                            <Link
                                href="/user/products"
                                className="bg-amber-900 text-white px-6 py-3 rounded-lg hover:bg-amber-950 transition-colors"
                            >
                                Continuar Comprando
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
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Carrinho</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Lista de Itens */}
                    <div className="lg:col-span-2 space-y-4">
                        {cart.items.map((item) => (
                            <div key={item.id} className="bg-white rounded-lg shadow border border-gray-200 p-4">
                                <div className="flex items-start space-x-4">
                                    {/* Imagem do Produto */}
                                    <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                                        {item.product.images && item.product.images.length > 0 ? (
                                            <Image
                                                src={item.product.images[0]}
                                                alt={item.product.name}
                                                width={80}
                                                height={80}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                                <span className="text-gray-400 text-xs">Sem imagem</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Informações do Produto */}
                                    <div className="flex-1 min-w-0 relative">
                                               <div className="flex items-center space-x-2  absolute top-[70%] left-[-30] bg-amber-950 w-5 h-5 shadow rounded-full justify-center">
                                            <span className="text-sm text-white">{item.quantity}</span>
                                        </div>
                                            <h3 className="font-semibold text-gray-900 line-clamp-2">{item.product.name}</h3>

                                        <p className="text-sm text-gray-600 mt-1">
                                            Vendido por: {item.product.store.name}
                                        </p>

                                        <div className="flex items-center justify-between mt-2">
                                            <div className="text-lg font-bold text-gray-900">
                                                {formatPrice(item.product.price)}
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Resumo do Pedido */}
                    <div className="bg-white rounded-lg shadow border border-gray-200 p-6 h-fit">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumo do Pedido</h3>

                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Itens ({cart.totalItems})</span>
                                <span className="text-gray-900">{formatPrice(cart.totalPrice)}</span>
                            </div>

                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Frete</span>
                                <span className="text-gray-900">-</span>
                            </div>

                            <div className="border-t pt-3">
                                <div className="flex justify-between text-lg font-bold">
                                    <span>Total</span>
                                    <span>{formatPrice(cart.totalPrice)}</span>
                                </div>
                            </div>
                        </div>

                        <button className="w-full bg-amber-900 text-white py-3 px-6 rounded-lg hover:bg-amber-950 transition-colors font-medium">
                            Finalizar Compra
                        </button>

                        <Link
                            href="/user/products"
                            className="block text-center text-amber-900 hover:text-amber-950 mt-3 font-medium"
                        >
                            Continuar Comprando
                        </Link>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}