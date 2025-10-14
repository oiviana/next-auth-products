import prisma from "@lib/prisma";
import { Prisma, Product } from "@prisma/client";

export async function getAllProducts(): Promise<Product[]> {
  return await prisma.product.findMany();
}

export async function createProduct(
  data: Prisma.ProductCreateInput
): Promise<Product> {
  return await prisma.product.create({ data });
}