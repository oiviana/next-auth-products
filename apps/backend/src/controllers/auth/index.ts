// src/controllers/auth/login.ts
import { FastifyReply, FastifyRequest } from "fastify";
import bcrypt from "bcryptjs";

interface LoginRequest {
  email: string;
  password: string;
}

export async function loginController(
  req: FastifyRequest<{ Body: LoginRequest }>,
  reply: FastifyReply
) {
  const { email, password } = req.body;

  const user = await req.server.prisma.user.findUnique({ 
    where: { email } 
  });

  if (!user || !user.isActive) {
    return reply.status(401).send({ message: "Credenciais inválidas" });
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) {
    return reply.status(401).send({ message: "Credenciais inválidas" });
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}