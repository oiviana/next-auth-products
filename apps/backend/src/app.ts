import { FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import { prismaPlugin } from "./plugins/prisma";
import { productRoutes } from "./routes/products";

export async function app(server: FastifyInstance) {
  await server.register(cors, { origin: true });
  await server.register(prismaPlugin);

  server.register(productRoutes, { prefix: "/products" });
}