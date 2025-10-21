import SellerLayout from "@/components/common/SellerLayout"
import Link from "next/link"

export default function SellerProductsPage() {
  return (
    <SellerLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Seus Produtos</h2>
        
        <div className="flex gap-4">
          <Link
            href="/seller/products/new"
            className="inline-block bg-amber-950 text-white px-6 py-3 rounded-lg hover:bg-amber-900 transition-colors font-medium"
          >
            Adicionar Produtos
          </Link>
          
          <Link
            href="/seller/products/all-products"
            className="inline-block bg-amber-950 text-white px-6 py-3 rounded-lg hover:bg-amber-900 transition-colors font-medium"
          >
            Ver Todos
          </Link>
        </div>
      </div>
    </SellerLayout>
  )
}