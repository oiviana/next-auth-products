import TotalProducts from "@/components/seller/dashboard/TotalProducts";
import TotalRevenue from "@/components/seller/dashboard/TotalRevenue";
import TotalProductsSold from "@/components/seller/dashboard/TotalProductsSold";
import MostSoldProduct from "@/components/seller/dashboard/MostProductSold";

export default function SellerDashboard() {
    return (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Dashboard do Vendedor</h1>
                <p className="text-gray-600 mt-2">Visão geral do seu desempenho de vendas</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <TotalProducts />
                <TotalRevenue />
                <TotalProductsSold />
                <MostSoldProduct />
            </div>
        </div>
    );
}