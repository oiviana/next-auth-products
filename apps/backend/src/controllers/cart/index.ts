// controllers/cart/addCartItem.ts
import prisma from "@lib/prisma";
import { FastifyRequest, FastifyReply } from "fastify";
import { getUserIdByToken } from "@utils/getUserIdByToken";

interface AddCartItemBody {
  productId: string;
  quantity: number;
}

export async function addCartItem(
  request: FastifyRequest<{
    Body: AddCartItemBody;
  }>,
  reply: FastifyReply
) {
  try {
    const userId = await getUserIdByToken(request);
    const { productId, quantity } = request.body;

    // Validar quantidade
    if (quantity <= 0) {
      return reply.status(400).send({ message: "Quantidade deve ser maior que zero" });
    }

    // Verificar se o produto existe e está disponível
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
        isVisible: true,
        store: {
          isActive: true,
        },
      },
    });

    if (!product) {
      return reply.status(404).send({ message: "Produto não encontrado" });
    }

    if (product.stock < quantity) {
      return reply.status(400).send({ 
        message: `Quantidade indisponível. Estoque: ${product.stock}` 
      });
    }

    // Encontrar ou criar o carrinho do usuário
    let cart = await prisma.cart.findUnique({
      where: { userId },
      include: { items: true },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          userId,
          items: {
            create: [],
          },
        },
        include: { items: true },
      });
    }

    // Verificar se o item já existe no carrinho
    const existingItem = cart.items.find(item => item.productId === productId);

    if (existingItem) {
      // Atualizar quantidade do item existente
      const updatedItem = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { 
          quantity: existingItem.quantity + quantity,
          addedAt: new Date()
        },
        include: { product: true },
      });

      return reply.status(200).send({
        message: "Item atualizado no carrinho",
        cartItem: updatedItem,
      });
    } else {
      // Adicionar novo item ao carrinho
      const newItem = await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
        },
        include: { product: true },
      });

      return reply.status(201).send({
        message: "Item adicionado ao carrinho",
        cartItem: newItem,
      });
    }
  } catch (error) {
    request.server.log.error(error);
    return reply.status(500).send({ message: "Erro interno do servidor" });
  }
}