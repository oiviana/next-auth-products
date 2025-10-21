// app/cart/page.tsx
'use client';

import UserLayout from "@/components/common/UserLayout";
import ConfirmationDialog from "@/components/ui/ConfirmationDialog";
import { useCart } from "@/hooks/cart/useCart";
import { useRemoveCartItem } from "@/hooks/cart/useRemoveCartItem";
import { useCreateOrder } from "@/hooks/orders/useCreateOrder";
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function CartPage() {
    const { data: cart, isLoading, error } = useCart();
    const [showOrderDialog, setShowOrderDialog] = useState(false);
    const { mutate: removeItem, isPending: isRemoving } = useRemoveCartItem();
    const { mutate: createOrder, isPending: isCreatingOrder } = useCreateOrder();
    const [removingItemId, setRemovingItemId] = useState<string | null>(null);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(price);
    };

    const handleRemoveItem = (itemId: string, productName: string) => {
        if (window.confirm(`Deseja remover "${productName}" do carrinho?`)) {
            setRemovingItemId(itemId);
            removeItem(itemId, {
                onSettled: () => {
                    setRemovingItemId(null);
                }
            });
        }
    };

    const confirmOrder = () => {
        createOrder(undefined, {
            onSuccess: (data) => {
                setShowOrderDialog(false);
                alert('Pedido criado com sucesso!');
                console.info('Pedido criado:', data);
            },
            onError: (error) => {
                console.error('Erro ao criar pedido:', error);
            }
        });
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
                            <div key={item.id} className="bg-white rounded-lg shadow border border-gray-200 p-4 relative">
                                {/* Loading overlay durante remoção */}
                                {removingItemId === item.id && (
                                    <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center rounded-lg z-10">
                                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-amber-900"></div>
                                    </div>
                                )}

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
                                        <div className="flex items-center space-x-2 absolute top-[70%] left-[-30px] bg-amber-950 w-5 h-5 shadow rounded-full justify-center">
                                            <span className="text-sm text-white">{item.quantity}</span>
                                        </div>

                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-gray-900 line-clamp-2">{item.product.name}</h3>

                                                <p className="text-sm text-gray-600 mt-1">
                                                    Vendido por: {item.product.store.name}
                                                </p>

                                                <div className="flex items-center justify-between mt-2">
                                                    <div className="text-lg font-bold text-gray-900">
                                                        {formatPrice(item.product.price)}
                                                    </div>

                                                    <button
                                                        onClick={() => handleRemoveItem(item.id, item.product.name)}
                                                        disabled={isRemoving}
                                                        className="text-red-600 hover:text-red-800 transition-colors disabled:opacity-50"
                                                        title="Remover item"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Resumo do Pedido */}
                    <div className="bg-white rounded-lg shadow border border-gray-200 p-6 h-fit">
                        <ConfirmationDialog
                            isOpen={showOrderDialog}
                            message="Deseja finalizar seu pedido?"
                            cancelText="Cancelar"
                            confirmText="Finalizar pedido"
                            onConfirm={confirmOrder}
                            onClose={() => setShowOrderDialog(false)}
                        />
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

                        <button className="w-full bg-amber-900 text-white py-3 px-6 rounded-lg hover:bg-amber-950 transition-colors font-medium"
                            onClick={() => setShowOrderDialog(true)}>
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