import { addCartItem } from "@controllers/cart";
import { FastifyInstance } from "fastify";
import { FastifyRequest } from "fastify/types/request";

export async function cartRoutes(server: FastifyInstance) {
server.post("/add-item",
  { 
    preValidation: [server.authenticate],
    schema: {
      body: {
        type: 'object',
        required: ['productId', 'quantity'],
        properties: {
          productId: { type: 'string' },
          quantity: { type: 'number', minimum: 1 }
        }
      }
    }
  },
  async (req, reply) => {
    try {
      const result = await addCartItem(
        req as FastifyRequest<{ Body: { productId: string; quantity: number } }>, 
        reply
      );
      return result;
    } catch (error) {
      server.log.error({ error }, "Erro ao adicionar item ao carrinho");
      return reply.status(500).send({ error: "Erro interno do servidor" });
    }
  }
);

}