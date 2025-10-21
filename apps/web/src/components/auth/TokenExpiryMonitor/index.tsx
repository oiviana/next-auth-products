'use client';
import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function TokenExpiryMonitor({ checkInterval = 60000 }) {
    const { user, token, logout } = useAuth();
    const [showModal, setShowModal] = useState(false);

    const checkToken = useCallback(() => {
        if (!token) return false;

        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const expiration = payload.exp * 1000;
            return Date.now() >= expiration;
        } catch {
            return false;
        }
    }, [token]);

    useEffect(() => {
        if (!token || !user) return;

        if (checkToken()) {
            setShowModal(true);
            return;
        }
        const interval = setInterval(() => {
            if (checkToken()) {
                setShowModal(true);
                clearInterval(interval);
            }
        }, checkInterval);

        return () => clearInterval(interval);
    }, [token, user, checkInterval, checkToken]);

    if (!showModal) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 max-w-sm mx-4 text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Sessão Expirada</h3>
                <p className="text-gray-600 mb-4">Sua sessão expirou. Faça login novamente.</p>
                <button
                    onClick={() => {
                        logout();
                        setShowModal(false);
                    }}
                    className="w-full bg-amber-900 text-white py-2 rounded hover:bg-amber-950 transition-colors"
                >
                    Fazer Login
                </button>
            </div>
        </div>
    );
}