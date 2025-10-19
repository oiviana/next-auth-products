// hooks/useProducts.ts
import { useQuery } from "@tanstack/react-query";
import { productsService } from "@/services/api";

async function fetchTotalProducts() {
  const response = await productsService.getCountBySeller();
  return response.data.total;
}

export function useTotalProducts() {
  return useQuery({
    queryKey: ['totalProducts'],
    queryFn: fetchTotalProducts,
    staleTime: 5 * 60 * 1000, 
    retry: 2, 
    retryDelay: 1000, 
  });
}