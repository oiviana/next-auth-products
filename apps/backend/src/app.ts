import { FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import { prismaPlugin } from "@plugins/prisma";
import { productRoutes } from "@routes/products";
import { userRoutes } from "@routes/users";
import { Prisma } from "@prisma-generated/prisma"; 
import { authRoutes } from "@routes/auth";

export async function app(server: FastifyInstance) {
  // Middlewares
  await server.register(cors, { origin: true });
  await server.register(prismaPlugin);

  // Error handler global
  server.setErrorHandler((error, request, reply) => {
    server.log.error(error); // log completo no console / arquivo

    // Tratamento de erro do Prisma
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return reply.status(400).send({ message: error.message });
    }

    // Outros erros
    return reply.status(500).send({ message: 'Erro interno do servidor' });
  });

  // Rotas
  server.register(productRoutes, { prefix: "/products" });
  server.register(userRoutes, { prefix: "/users" });
  server.register(authRoutes, { prefix: "/auth" });
}
