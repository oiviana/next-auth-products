import prisma from "@lib/prisma";
import { Product, Prisma } from "@prisma-generated/prisma";
import { FastifyRequest, FastifyReply } from "fastify";
import { getUserIdByToken } from "@utils/getUserIdByToken";

export async function getAllProductsBySeller(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const userId = await getUserIdByToken(request);
    const products = await prisma.product.findMany({
      where: {
        store: {
          ownerId: userId,
        },
      },
      include: {
        store: true,
      },
    });

    return reply.send(products);
  } catch (error) {
    request.server.log.error(error);
    return reply.status(401).send({ message: "Não autorizado" });
  }
}


export async function createProduct(
  data: Prisma.ProductCreateInput
): Promise<Product> {
  return await prisma.product.create({ data });
}