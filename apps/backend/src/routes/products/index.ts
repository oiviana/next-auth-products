import { FastifyInstance } from "fastify";
import { getAllProductsBySeller, createProduct, getMoreSoldProduct, countAllProductsBySeller, totalProductsSoldBySeller, getTotalRevenueBySeller } from "@controllers/products";
import { Prisma } from "@prisma-generated/prisma";

export async function productRoutes(server: FastifyInstance) {

  server.get("/",
    { preValidation: [server.authenticate] },
    async (req, reply) => {
      try {
        const products = await getAllProductsBySeller(req, reply);
        return reply.send(products);
      } catch (error) {
        server.log.error({ error }, "Erro ao buscar produtos");
        return reply.status(500).send({ error: "Erro interno do servidor" });
      }
    });


  server.get("/more-sold",
    { preValidation: [server.authenticate] },
    async (req, reply) => {
      try {
        const moreSoldProduct = await getMoreSoldProduct(req, reply);
        return reply.send(moreSoldProduct);
      } catch (error) {
        server.log.error({ error }, "Erro ao buscar produto");
        return reply.status(500).send({ error: "Erro interno do servidor" });
      }
    });

  server.get("/all-products-by-seller",
    { preValidation: [server.authenticate] },
    async (req, reply) => {
      try {
        const allProductsBySeller = await countAllProductsBySeller(req, reply);
        return reply.send(allProductsBySeller);
      } catch (error) {
        server.log.error({ error }, "Erro ao buscar produtos");
        return reply.status(500).send({ error: "Erro interno do servidor" });
      }
    });

  server.get("/all-products-sold-by-seller",
    { preValidation: [server.authenticate] },
    async (req, reply) => {
      try {
        const allProductsSold = await totalProductsSoldBySeller(req, reply);
        return reply.send(allProductsSold);
      } catch (error) {
        server.log.error({ error }, "Erro ao buscar produtos");
        return reply.status(500).send({ error: "Erro interno do servidor" });
      }
    });

  server.get("/total-revenue-by-seller",
    { preValidation: [server.authenticate] },
    async (req, reply) => {
      try {
        const totalRevenue = await getTotalRevenueBySeller(req, reply);
        return reply.send(totalRevenue);
      } catch (error) {
        server.log.error({ error }, "Erro ao buscar faturamento");
        return reply.status(500).send({ error: "Erro interno do servidor" });
      }
    });


  server.post<{ Body: Prisma.ProductCreateInput }>(
    "/",
    { preValidation: [server.authenticate] },
    async (req, reply) => {
      try {
        const data = req.body;
        const product = await createProduct(data);

        return reply.status(201).send(product);
      } catch (error) {
        server.log.error({ error }, "Erro ao criar produto");
        return reply.status(500).send({ error: "Erro interno do servidor" });
      }
    }
  );
}
