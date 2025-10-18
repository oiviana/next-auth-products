import UploadCSV from '@/components/forms/UploadCSV'

export default function AddProductsPage() {
  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Importar Produtos via CSV</h1>
      <UploadCSV />
    </div>
  )
}
