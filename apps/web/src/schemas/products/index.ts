// schemas/products.ts
import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  description: z.string().optional(),
  price: z.number().min(0.01, 'Preço deve ser maior que 0'),
  stock: z.number().min(0, 'Estoque não pode ser negativo'),
  isVisible: z.boolean(), // ← agora é obrigatório
});


export type CreateProductData = z.infer<typeof createProductSchema>;