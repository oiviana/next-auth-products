import prisma from "@lib/prisma";
import { Product, Prisma } from "@prisma-generated/prisma";
import { FastifyRequest, FastifyReply } from "fastify";
import { getUserIdByToken } from "@utils/getUserIdByToken";

// Todos os produtos de um vendedor
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
    });

    return reply.send(products);
  } catch (error) {
    request.server.log.error(error);
    return reply.status(401).send({ message: "Não autorizado" });
  }
}

// Conta todos os produtos de um vendedor
export async function countAllProductsBySeller(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const userId = await getUserIdByToken(request);

    const totalProducts = await prisma.product.count({
      where: {
        store: {
          ownerId: userId,
        },
      },
    });

    return reply.send({ total: totalProducts });
  } catch (error) {
    request.server.log.error(error);
    return reply.status(401).send({ message: "Não autorizado" });
  }
}

// Conta todos os produtos vendidos
export async function totalProductsSoldBySeller(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const userId = await getUserIdByToken(request);

    // Soma de as colunas de quantidade
    const result = await prisma.orderItem.aggregate({
      _sum: {
        quantity: true,
      },
      where: {
        product: {
          store: {
            ownerId: userId,
          },
        },
      },
    });

    const totalSold = result._sum.quantity ?? 0;

    return reply.send({ totalSold });
  } catch (error) {
    request.server.log.error(error);
    return reply.status(401).send({ message: "Não autorizado" });
  }
}

// Total de faturamento de um vendedor
export async function getTotalRevenueBySeller(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const userId = await getUserIdByToken(request);

    // Buscar todos os pedidos que contêm produtos do vendedor
    const orders = await prisma.order.findMany({
      where: {
        items: {
          some: {
            product: {
              store: {
                ownerId: userId,
              },
            },
          },
        },
      },
      select: {
        total: true,
      },
    });

    // Somar o campo total de cada pedido
    const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);

    return reply.send({ totalRevenue });
  } catch (error) {
    request.server.log.error(error);
    return reply.status(401).send({ message: "Não autorizado" });
  }
}

//Produto mais vendido de um vendedor
export async function getMoreSoldProduct(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const userId = await getUserIdByToken(request);

    const mostSoldProduct = await prisma.product.findFirst({
      where: {
        store: {
          ownerId: userId,
        },
      },
      orderBy: {
        soldCount: 'desc',
      },
    });

    if (!mostSoldProduct) {
      return reply.status(404).send({ message: "Nenhum produto encontrado" });
    }

    return reply.send(mostSoldProduct);
  } catch (error) {
    request.server.log.error(error);
    return reply.status(401).send({ message: "Não autorizado" });
  }
}

// Cria um produto
export async function createProduct(
  data: Prisma.ProductCreateInput
): Promise<Product> {
  return await prisma.product.create({ data });
}