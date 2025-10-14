import { FastifyInstance } from "fastify";
import { getAllProducts, createProduct } from "@controllers/products"; // ajuste o path conforme seu projeto
import { Prisma } from "@prisma/client";

export async function productRoutes(server: FastifyInstance) {
  // GET /products
  server.get("/", async (req, reply) => {
    const products = await getAllProducts();
    return products;
  });

  // POST /products
  server.post("/", async (req, reply) => {
    // tipando o body usando o tipo do Prisma
    const data: Prisma.ProductCreateInput = req.body;

    const product = await createProduct(data);
    return product;
  });
}
