'use client';

import { useState } from 'react';
import AddProductForm from '@/components/forms/AddProductForm';
import UploadCSV from '@/components/forms/UploadCSV';

export default function AddProductsPage() {
  const [activeTab, setActiveTab] = useState<'csv' | 'manual'>('csv');

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Adicionar Produtos</h1>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('csv')}
            className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'csv'
                ? 'border-amber-950 text-amber-950'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Importar via CSV
          </button>
          <button
            onClick={() => setActiveTab('manual')}
            className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'manual'
                ? 'border-amber-950 text-amber-950'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Adicionar Manualmente
          </button>
        </nav>
      </div>

      {/* Conteúdo das Tabs */}
      <div className="mt-6">
        {activeTab === 'csv' && (
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Importar Produtos via CSV</h2>
            <p className="text-gray-600 mb-6">
              Faça upload de um arquivo CSV para adicionar múltiplos produtos de uma vez.
            </p>
            <UploadCSV />
          </div>
        )}

        {activeTab === 'manual' && (
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Adicionar Produto Manualmente</h2>
            <p className="text-gray-600 mb-6">
              Preencha os dados do produto individualmente.
            </p>
            <AddProductForm/>
          </div>
        )}
      </div>
    </div>
  );
}