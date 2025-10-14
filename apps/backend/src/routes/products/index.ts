import { FastifyInstance } from "fastify";

export async function productRoutes(server: FastifyInstance) {
  server.get("/", async (req, reply) => {
    const products = await server.prisma.product.findMany();
    return products;
  });

  server.post("/", async (req, reply) => {
    const product = await server.prisma.product.create({
      data: req.body as any,
    });
    return product;
  });
}
