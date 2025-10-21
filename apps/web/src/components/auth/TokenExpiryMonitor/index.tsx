'use client';

import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function TokenExpiryMonitor({ checkInterval = 60000 }) {
  const { user, token, logout } = useAuth();
  const router = useRouter();
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

    // Verificar imediatamente
    if (checkToken()) {
      setShowModal(true);
      return;
    }

    // Configurar intervalo para verificações futuras
    const interval = setInterval(() => {
      if (checkToken()) {
        setShowModal(true);
        clearInterval(interval);
      }
    }, checkInterval);

    return () => clearInterval(interval);
  }, [token, user, checkInterval, checkToken]);

  const handleLoginAgain = () => {
    logout();
    setShowModal(false);
    router.push('/auth'); 
  };

  if (!showModal) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-50 z-50" />
      

      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 max-w-sm mx-4 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Sessão Expirada</h3>
          <p className="text-gray-600 mb-4">Sua sessão expirou. Faça login novamente.</p>
          <button
            onClick={handleLoginAgain}
            className="w-full bg-amber-900 text-white py-2 rounded hover:bg-amber-950 transition-colors"
          >
            Fazer Login novamente
          </button>
        </div>
      </div>
    </>
  );
}