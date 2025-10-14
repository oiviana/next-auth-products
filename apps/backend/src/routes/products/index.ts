import { FastifyInstance } from "fastify";
import { getAllProducts, createProduct } from "@controllers/products";
import { Prisma } from "@prisma/client";

export async function productRoutes(server: FastifyInstance) {
  server.get("/", async (req, reply) => {
    try {
      const products = await getAllProducts();
      return reply.send(products);
    } catch (error) {
      server.log.error({ error }, "Erro ao buscar produtos");
      return reply.status(500).send({ error: "Erro interno do servidor" });
    }
  });

  // POST /products - SIMPLES E DIRETO
  server.post<{ Body: Prisma.ProductCreateInput }>("/", async (req, reply) => {
    try {
      const data = req.body; 
      const product = await createProduct(data);
      return reply.status(201).send(product);
    } catch (error) {
      server.log.error({ error }, "Erro ao criar produto");
      return reply.status(500).send({ error: "Erro interno do servidor" });
    }
  });
}