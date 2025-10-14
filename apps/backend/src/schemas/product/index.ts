import { z } from "zod";

// Schema para validação de criação de produto
export const createProductSchema = z.object({
  name: z.string(),
  price: z.number(),
  storeId: z.string(),
  description: z.string().nullable().optional(),
  imageUrl: z.string().nullable().optional(),
  stock: z.number().default(0),
  isVisible: z.boolean().default(true),
  sellerId: z.string().nullable().optional(),
  publishedAt: z.date().optional(),
  soldCount: z.number().default(0),
});


export const productSchema = createProductSchema.extend({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});


export type CreateProductInput = z.infer<typeof createProductSchema>;
export type ProductOutput = z.infer<typeof productSchema>;
